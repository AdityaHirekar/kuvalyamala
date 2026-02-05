"use client";

import React from "react";
import { ScrollText } from "lucide-react"; // Using ScrollText as an icon for manuscripts/verses
import { useVerseContext } from "@/lib/VerseContext";
import { motion } from "framer-motion";

export default function VerseGlobalToggle() {
    const { showBackgroundVerses, toggleBackgroundVerses } = useVerseContext();

    return (
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={toggleBackgroundVerses}
            className={`fixed bottom-20 right-6 z-50 p-2.5 rounded-full transition-all duration-300 border backdrop-blur-sm group
                ${showBackgroundVerses
                    ? "bg-maroon/10 text-maroon border-maroon/20 hover:bg-maroon hover:text-white"
                    : "bg-paper/50 text-ink/40 border-ink/10 hover:bg-paper hover:text-maroon hover:border-maroon/20"
                }`}
            title={showBackgroundVerses ? "Hide Background Verses" : "Show Background Verses"}
        >
            <ScrollText />
            <span className="sr-only">Toggle Background Verses</span>

            {/* Tooltip */}
            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2 py-1 bg-ink text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {showBackgroundVerses ? "Hide Verses" : "Show Verses"}
            </span>
        </motion.button>
    );
}
