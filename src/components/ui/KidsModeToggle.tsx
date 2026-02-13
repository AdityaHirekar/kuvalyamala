"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smile, Sparkles } from "lucide-react";
import { useKidsMode } from "@/lib/KidsModeContext";
import { useLanguage } from "@/lib/LanguageContext";

export default function KidsModeToggle() {
    const { isKidsMode, toggleKidsMode } = useKidsMode();
    const { t } = useLanguage();
    const [isHovered, setIsHovered] = React.useState(false);

    // Adjust position to stack with others (Language: top-20 right-6, Reflection: top-6 right-6)
    // Let's put this one below language switcher? Or maybe left side?
    // Stacking vertically on right seems consistent.
    // Reflection: top-6
    // Language: top-20
    // Kids: top-36? (144px) 

    return (
        <div className="fixed top-36 right-6 z-[100]">
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, rotate: isKidsMode ? 10 : -10 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleKidsMode}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`p-3 rounded-full shadow-lg border-2 transition-all duration-300 relative group
                    ${isKidsMode
                        ? "bg-gradient-to-r from-yellow-300 to-orange-400 border-white text-white shadow-orange-200"
                        : "bg-paper/80 border-maroon/20 text-maroon/60 hover:text-maroon hover:border-maroon/50"
                    }`}
                aria-label={isKidsMode ? "Kids Mode On" : "Kids Mode Off"}
            >
                {/* Icon */}
                <div className="relative z-10">
                    {isKidsMode ? (
                        <Sparkles className="w-6 h-6 animate-pulse" />
                    ) : (
                        <Smile className="w-6 h-6" />
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

                {/* Tooltip */}
                <span className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 shadow-sm
                    ${isKidsMode
                        ? "bg-orange-100 text-orange-600 opacity-100 scale-100"
                        : "bg-ink text-white opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100"
                    }`}>
                    {isKidsMode ? "Fun Mode ON!" : "Try Fun Mode"}
                </span>

            </motion.button>
        </div>
    );
}
