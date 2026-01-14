"use client";

import { motion } from "framer-motion";
import { UIVersion, VERSIONS } from "@/lib/version/types";

interface VersionSelectorProps {
  onSelect: (version: UIVersion) => void;
}

export default function VersionSelector({ onSelect }: VersionSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="relative w-full max-w-2xl mx-4 p-8 bg-[#2b2d31] rounded-2xl shadow-2xl border border-white/10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Choose Your Experience
          </h2>
          <p className="text-white/60 text-sm md:text-base">
            Select the UI version that best fits your preference
          </p>
        </div>

        {/* Version Options */}
        <div className="grid md:grid-cols-2 gap-4">
          {Object.values(VERSIONS).map((versionInfo) => (
            <motion.button
              key={versionInfo.version}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(versionInfo.version)}
              className="group relative p-6 bg-[#313338] hover:bg-[#383a40] rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 text-left"
            >
              {/* Version badge */}
              <div className="absolute top-4 right-4 px-2 py-1 bg-blue-500/20 rounded-md">
                <span className="text-xs font-mono text-blue-400">
                  v{versionInfo.version}
                </span>
              </div>

              {/* Version icon/emoji */}
              <div className="w-14 h-14 mb-4 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-3xl">
                {versionInfo.version === '1.0.0' ? '💬' : '🎨'}
              </div>

              {/* Version info */}
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {versionInfo.name}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {versionInfo.description}
              </p>

              {/* Hover indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-white/40">
          You can change this anytime from the settings
        </p>
      </motion.div>
    </motion.div>
  );
}
