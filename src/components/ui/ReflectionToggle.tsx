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
            className={`fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg border-2 transition-all duration-300 group
                ${isReflectionMode
                    ? "bg-maroon border-maroon text-white"
                    : "bg-paper border-ink/10 text-ink/60 hover:text-maroon hover:border-maroon/30"
                }`}
            title={isReflectionMode ? "Disable Reflection Mode" : "Enable Reflection Mode"}
            aria-label="Toggle Reflection Mode"
        >
            <div className="relative">
                <Repeat className={`w-5 h-5 transition-transform duration-500 ${isReflectionMode ? "rotate-180" : ""}`} />

                {/* Status Indicator Dot */}
                {isReflectionMode && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400"></span>
                    </span>
                )}
            </div>

            {/* Tooltip */}
            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-ink text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
                {isReflectionMode ? "Reflection Mode On" : "Try Reflection Mode"}
            </span>
        </motion.button>
    );
}
