"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smile, Sparkles } from "lucide-react";
import { useKidsMode } from "@/lib/KidsModeContext";

export default function KidsModeToggle() {
    const { isKidsMode, toggleKidsMode } = useKidsMode();

    return (
        <div className="fixed top-24 right-3 md:top-36 md:right-6 z-[100]">
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, rotate: isKidsMode ? 10 : -10 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleKidsMode}
                className={`p-2 md:p-3 rounded-full shadow-lg border-2 transition-all duration-300
                    ${isKidsMode
                        ? "bg-gradient-to-r from-yellow-300 to-orange-400 border-white text-white shadow-orange-200"
                        : "bg-paper/80 border-maroon/20 text-maroon/60 hover:text-maroon hover:border-maroon/50"
                    }`}
                aria-label={isKidsMode ? "Kids Mode On" : "Kids Mode Off"}
                title={isKidsMode ? "Fun Mode ON" : "Try Fun Mode"}
            >
                {/* Icon */}
                <div className="relative z-10">
                    {isKidsMode ? (
                        <Sparkles className="w-5 h-5 md:w-6 md:h-6 animate-pulse" />
                    ) : (
                        <Smile className="w-5 h-5 md:w-6 md:h-6" />
                    )}
                </div>

                {/* Background glow effect for kids mode */}
                {isKidsMode && (
                    <motion.div
                        className="absolute inset-0 rounded-full bg-white/30 blur-md"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                )}
            </motion.button>
        </div>
    );
}
