"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Frame() {
    return (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden hidden md:block">
            {/* Top Left Corner */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute top-4 left-4 w-32 h-32 text-maroon/30"
            >
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full opacity-80">
                    {/* Main Curve */}
                    <path d="M0,0 Q60,0 60,60" />
                    {/* Inner Vine */}
                    <path d="M0,10 Q40,10 40,50" strokeWidth="1" />
                    <path d="M10,0 Q10,40 50,40" strokeWidth="1" />
                    {/* Lotus/Leaf Details */}
                    <path d="M40,50 Q60,30 40,10 Q20,30 40,50 Z" fill="currentColor" stroke="none" className="opacity-40" />
                    <path d="M50,40 Q70,20 50,0 Q30,20 50,40 Z" fill="currentColor" stroke="none" className="opacity-40" />
                    {/* Beads/Dots */}
                    <circle cx="5" cy="5" r="1.5" fill="currentColor" stroke="none" />
                    <circle cx="15" cy="5" r="1" fill="currentColor" stroke="none" />
                    <circle cx="5" cy="15" r="1" fill="currentColor" stroke="none" />
                    <circle cx="65" cy="65" r="2" fill="currentColor" stroke="none" className="opacity-50" />
                    {/* Flourishes */}
                    <path d="M60,60 Q50,40 70,50" strokeWidth="0.5" />
                    <path d="M60,60 Q40,50 50,70" strokeWidth="0.5" />
                </svg>
            </motion.div>

            {/* Top Right Corner (Rotated 90) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute top-4 right-4 w-32 h-32 text-maroon/30 rotate-90"
            >
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full opacity-80">
                    <path d="M0,0 Q60,0 60,60" />
                    <path d="M0,10 Q40,10 40,50" strokeWidth="1" />
                    <path d="M10,0 Q10,40 50,40" strokeWidth="1" />
                    <path d="M40,50 Q60,30 40,10 Q20,30 40,50 Z" fill="currentColor" stroke="none" className="opacity-40" />
                    <path d="M50,40 Q70,20 50,0 Q30,20 50,40 Z" fill="currentColor" stroke="none" className="opacity-40" />
                    <circle cx="5" cy="5" r="1.5" fill="currentColor" stroke="none" />
                    <circle cx="15" cy="5" r="1" fill="currentColor" stroke="none" />
                    <circle cx="5" cy="15" r="1" fill="currentColor" stroke="none" />
                    <circle cx="65" cy="65" r="2" fill="currentColor" stroke="none" className="opacity-50" />
                    <path d="M60,60 Q50,40 70,50" strokeWidth="0.5" />
                    <path d="M60,60 Q40,50 50,70" strokeWidth="0.5" />
                </svg>
            </motion.div>

            {/* Bottom Right Corner (Rotated 180) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute bottom-4 right-4 w-32 h-32 text-maroon/30 rotate-180"
            >
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full opacity-80">
                    <path d="M0,0 Q60,0 60,60" />
                    <path d="M0,10 Q40,10 40,50" strokeWidth="1" />
                    <path d="M10,0 Q10,40 50,40" strokeWidth="1" />
                    <path d="M40,50 Q60,30 40,10 Q20,30 40,50 Z" fill="currentColor" stroke="none" className="opacity-40" />
                    <path d="M50,40 Q70,20 50,0 Q30,20 50,40 Z" fill="currentColor" stroke="none" className="opacity-40" />
                    <circle cx="5" cy="5" r="1.5" fill="currentColor" stroke="none" />
                    <circle cx="15" cy="5" r="1" fill="currentColor" stroke="none" />
                    <circle cx="5" cy="15" r="1" fill="currentColor" stroke="none" />
                    <circle cx="65" cy="65" r="2" fill="currentColor" stroke="none" className="opacity-50" />
                    <path d="M60,60 Q50,40 70,50" strokeWidth="0.5" />
                    <path d="M60,60 Q40,50 50,70" strokeWidth="0.5" />
                </svg>
            </motion.div>

            {/* Bottom Left Corner (Rotated -90) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute bottom-4 left-4 w-32 h-32 text-maroon/30 -rotate-90"
            >
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full opacity-80">
                    <path d="M0,0 Q60,0 60,60" />
                    <path d="M0,10 Q40,10 40,50" strokeWidth="1" />
                    <path d="M10,0 Q10,40 50,40" strokeWidth="1" />
                    <path d="M40,50 Q60,30 40,10 Q20,30 40,50 Z" fill="currentColor" stroke="none" className="opacity-40" />
                    <path d="M50,40 Q70,20 50,0 Q30,20 50,40 Z" fill="currentColor" stroke="none" className="opacity-40" />
                    <circle cx="5" cy="5" r="1.5" fill="currentColor" stroke="none" />
                    <circle cx="15" cy="5" r="1" fill="currentColor" stroke="none" />
                    <circle cx="5" cy="15" r="1" fill="currentColor" stroke="none" />
                    <circle cx="65" cy="65" r="2" fill="currentColor" stroke="none" className="opacity-50" />
                    <path d="M60,60 Q50,40 70,50" strokeWidth="0.5" />
                    <path d="M60,60 Q40,50 50,70" strokeWidth="0.5" />
                </svg>
            </motion.div>

            {/* Border */}
            <div className="absolute top-8 left-8 right-8 bottom-8 border-[0.5px] border-maroon/20 rounded-[32px] pointer-events-none" />
        </div>
    );
}
