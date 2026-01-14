"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X } from "lucide-react";
import { UIVersion, VERSIONS } from "@/lib/version/types";

interface VersionSwitcherProps {
  currentVersion: UIVersion;
  onVersionChange: (version: UIVersion) => void;
}

export default function VersionSwitcher({
  currentVersion,
  onVersionChange,
}: VersionSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleVersionSelect = (version: UIVersion) => {
    onVersionChange(version);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating action button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#5865f2] hover:bg-[#4752c4] rounded-full shadow-lg flex items-center justify-center text-white transition-colors"
        title="Change UI Version"
      >
        <Settings size={24} />
      </motion.button>

      {/* Bottom drawer for mobile / Modal for desktop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer/Modal */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg mx-auto"
            >
              <div className="bg-[#2b2d31] rounded-t-2xl md:rounded-2xl shadow-2xl border-t border-white/10 md:border md:border-white/10 max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-[#2b2d31] border-b border-white/10 px-6 py-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    Switch UI Version
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Current version indicator */}
                <div className="px-6 py-4 bg-blue-500/10 border-b border-white/10">
                  <p className="text-xs text-white/60 uppercase tracking-wide mb-1">
                    Current Version
                  </p>
                  <p className="text-white font-medium">
                    {VERSIONS[currentVersion].name}{" "}
                    <span className="text-blue-400 font-mono text-sm">
                      v{currentVersion}
                    </span>
                  </p>
                </div>

                {/* Version options */}
                <div className="p-4 space-y-3">
                  {Object.values(VERSIONS).map((versionInfo) => {
                    const isCurrent = versionInfo.version === currentVersion;
                    return (
                      <motion.button
                        key={versionInfo.version}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleVersionSelect(versionInfo.version)}
                        disabled={isCurrent}
                        className={`w-full p-4 rounded-xl border transition-all text-left ${
                          isCurrent
                            ? "bg-blue-500/20 border-blue-500/50 cursor-default"
                            : "bg-[#313338] hover:bg-[#383a40] border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl flex-shrink-0">
                            {versionInfo.version === '1.0.0' ? '💬' : '🎨'}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-white font-medium">
                                {versionInfo.name}
                              </h4>
                              {isCurrent && (
                                <span className="px-2 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                                  Active
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-white/60 mb-1">
                              {versionInfo.description}
                            </p>
                            <p className="text-xs text-white/40 font-mono">
                              v{versionInfo.version}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-white/10 bg-[#2b2d31]">
                  <p className="text-xs text-white/40 text-center">
                    Your selection will be saved and applied immediately
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
