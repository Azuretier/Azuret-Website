"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import LoadingScreen from "./LoadingScreen";
import VersionSelector from "@/components/version/VersionSelector";
import VersionSwitcher from "@/components/version/VersionSwitcher";
import { UIVersion } from "@/lib/version/types";
import {
  getSelectedVersion,
  setSelectedVersion,
  hasVersionSelection,
} from "@/lib/version/storage";

// Dynamically import background to avoid SSR issues
const WebGLBackground = dynamic(() => import("./WebGLBackground"), {
  ssr: false,
});

// Dynamically import version-specific UIs
const DiscordUI = dynamic(() => import("./v1.0.0").then((mod) => mod.DiscordUI), {
  ssr: false,
});

const PatreonUI = dynamic(() => import("./v1.0.1").then((mod) => mod.PatreonUI), {
  ssr: false,
});

export default function InteractiveHomepage() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing");
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [showVersionSelector, setShowVersionSelector] = useState(false);
  const [selectedVersion, setSelectedVersionState] = useState<UIVersion | null>(null);

  // Check for existing version selection on mount
  useEffect(() => {
    const version = getSelectedVersion();
    if (version) {
      setSelectedVersionState(version);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      // Detect GPU capability
      setStatus("Detecting capabilities");
      setProgress(20);

      await new Promise((resolve) => setTimeout(resolve, 500));
      
      if (!mounted) return;

      setStatus("Loading experience");
      setProgress(40);

      await new Promise((resolve) => setTimeout(resolve, 500));
      
      if (!mounted) return;

      setProgress(60);
      setStatus("Preparing interface");

      await new Promise((resolve) => setTimeout(resolve, 500));
      
      if (!mounted) return;

      setProgress(80);
    }

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    // When background is loaded, complete the loading
    if (backgroundLoaded && progress >= 80) {
      setProgress(100);
      setStatus("Ready");

      setTimeout(() => {
        setLoading(false);
        // After loading completes, check if we need to show version selector
        if (!hasVersionSelection()) {
          setTimeout(() => {
            setShowVersionSelector(true);
          }, 300);
        }
      }, 800);
    }
  }, [backgroundLoaded, progress]);

  const handleBackgroundLoaded = () => {
    console.log("Background loaded");
    setBackgroundLoaded(true);
  };

  const handleVersionSelect = (version: UIVersion) => {
    setSelectedVersion(version);
    setSelectedVersionState(version);
    setShowVersionSelector(false);
  };

  const handleVersionChange = (version: UIVersion) => {
    setSelectedVersion(version);
    setSelectedVersionState(version);
    // Reload the page to apply the new version
    window.location.reload();
  };

  // Render the appropriate UI based on selected version
  const renderUI = () => {
    if (!selectedVersion) return null;

    switch (selectedVersion) {
      case '1.0.0':
        return <DiscordUI />;
      case '1.0.1':
        return <PatreonUI />;
      default:
        return <DiscordUI />;
    }
  };

  return (
    <>
      {/* Background shader */}
      <WebGLBackground onLoaded={handleBackgroundLoaded} />

      {/* Loading screen */}
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen progress={progress} status={status} />}
      </AnimatePresence>

      {/* Version selector modal (shown if no version selected) */}
      <AnimatePresence>
        {showVersionSelector && !loading && (
          <VersionSelector onSelect={handleVersionSelect} />
        )}
      </AnimatePresence>

      {/* Main UI - render based on selected version */}
      {!loading && selectedVersion && !showVersionSelector && (
        <>
          {renderUI()}
          <VersionSwitcher
            currentVersion={selectedVersion}
            onVersionChange={handleVersionChange}
          />
        </>
      )}
    </>
  );
}
