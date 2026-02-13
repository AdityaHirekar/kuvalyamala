"use client";

import React from "react";
import { Repeat } from "lucide-react";
import { motion } from "framer-motion";
import { useReflection } from "@/lib/ReflectionContext";

export default function ReflectionToggle() {
    const { isReflectionMode, toggleReflectionMode } = useReflection();
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            onClick={toggleReflectionMode}
            className={`fixed top-6 right-6 z-[100] p-2.5 rounded-full transition-all duration-300 border backdrop-blur-sm group
                ${isReflectionMode
                    ? "bg-maroon/10 text-maroon border-maroon/20 hover:bg-maroon hover:text-white"
                    : "bg-paper/50 text-ink/40 border-ink/10 hover:bg-paper hover:text-maroon hover:border-maroon/20"
                }`}
            title={isReflectionMode ? "Disable Reflection Mode" : "Enable Reflection Mode"}
            aria-label="Toggle Reflection Mode"
        >
            <div className="relative">
                <Repeat className={`w-5 h-5 transition-transform duration-500 ${isReflectionMode ? "rotate-180" : ""}`} />
            </div>

            {/* Tooltip */}
            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2 py-1 bg-ink text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {isReflectionMode ? "Reflection Mode On" : "Try Reflection Mode"}
            </span>
        </motion.button>
    );
}
