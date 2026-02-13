"use client";

import React from "react";
import { ScrollText } from "lucide-react";
import { useVerseContext } from "@/lib/VerseContext";
import { motion } from "framer-motion";

export default function VerseGlobalToggle() {
    const { showBackgroundVerses, toggleBackgroundVerses } = useVerseContext();
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={toggleBackgroundVerses}
            className={`fixed bottom-16 right-3 md:bottom-20 md:right-6 z-[100] p-2 md:p-2.5 rounded-full transition-all duration-300 border backdrop-blur-sm
                ${showBackgroundVerses
                    ? "bg-maroon/10 text-maroon border-maroon/20 hover:bg-maroon hover:text-white"
                    : "bg-paper/50 text-ink/40 border-ink/10 hover:bg-paper hover:text-maroon hover:border-maroon/20"
                }`}
            title={showBackgroundVerses ? "Hide Background Verses" : "Show Background Verses"}
        >
            <ScrollText className="w-4 h-4 md:w-5 md:h-5" />
            <span className="sr-only">Toggle Background Verses</span>
        </motion.button>
    );
}
