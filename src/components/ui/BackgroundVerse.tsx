"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useVerseContext } from "@/lib/VerseContext";
import { verses } from "@/lib/verses";

interface BackgroundVerseProps {
    chapterId: number;
    onReveal: () => void;
}

interface FragmentState {
    id: number;
    text: string;
    top: string;
    left: string;
    scale: number;
    duration: number;
    delay: number;
}

export default function BackgroundVerse({ chapterId, onReveal }: BackgroundVerseProps) {
    const { showBackgroundVerses } = useVerseContext();
    const shouldReduceMotion = useReducedMotion();
    const verseData = verses[chapterId];

    // Manage multiple fragments
    const [fragments, setFragments] = useState<FragmentState[]>([]);

    useEffect(() => {
        if (!verseData) return;

        // Create variations of the text from the verse data
        const textOptions = [
            verseData.fragment,
            ...verseData.fullVerse.split("\n")
        ].filter(Boolean);

        // Generate 6 fragments, spread vertically across the section
        const newFragments: FragmentState[] = Array.from({ length: 6 }).map((_, i) => {
            // Divide height into 6 zones (0-16%, 16-32%, etc.)
            const rowBase = i * 16;

            // Randomize position:
            // Top: within the zone (with some padding)
            // Left: 10% to 80% to keep it central but spread out (good for mobile)
            const top = rowBase + (Math.random() * 10 + 2);
            const left = Math.floor(Math.random() * 70) + 10;

            return {
                id: i,
                text: textOptions[i % textOptions.length],
                top: `${top}%`,
                left: `${left}%`,
                scale: 0.8 + Math.random() * 0.4, // 0.8 to 1.2
                duration: 30 + Math.random() * 20, // 30s to 50s
                delay: Math.random() * -20
            };
        });

        setFragments(newFragments);
    }, [chapterId, verseData]);

    if (!verseData || !showBackgroundVerses) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {fragments.map((frag) => (
                <motion.div
                    key={frag.id}
                    className="absolute pointer-events-auto cursor-pointer group select-none"
                    style={{
                        top: frag.top,
                        left: frag.left,
                        scale: frag.scale,
                        maxWidth: "400px"
                    }}
                    initial={{ opacity: 0 }}
                    animate={
                        shouldReduceMotion
                            ? { opacity: 0.06 }
                            : {
                                x: [0, 25, 0, -25, 0],
                                y: [0, -15, 0, 15, 0],
                                rotate: [0, 1.5, 0, -1.5, 0],
                                opacity: [0.1, 0.15, 0.1] // Pulse opacity slightly
                            }
                    }
                    whileHover={{ opacity: 0.4, scale: frag.scale * 1.1, filter: "blur(0px)" }}
                    whileInView={{ opacity: 0.15 }}
                    viewport={{ once: false }}
                    transition={{
                        duration: frag.duration,
                        repeat: Infinity,
                        ease: "easeInOut" as const,
                        delay: frag.delay,
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onReveal();
                    }}
                    title="Click to reveal verse"
                >
                    <div className="font-serif text-maroon text-3xl md:text-5xl leading-relaxed blur-[0.5px] group-hover:blur-0 transition-all duration-700 whitespace-nowrap opacity-60">
                        {frag.text}
                    </div>

                    {/* Texture/Grunge overlay for the specific fragment */}
                    <div className="absolute inset-0 bg-paper mix-blend-overlay opacity-20 pointer-events-none" />
                </motion.div>
            ))}
        </div>
    );
}
