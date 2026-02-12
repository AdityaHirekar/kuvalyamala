"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, BookOpen } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import AudioButton from "@/components/ui/AudioButton";

export default function Hero() {
    const fullPlaylist = [
        "/audio/Introduction.mp3",
        "/audio/chapter-1.mp3",
        "/audio/chapter-2.mp3",
        "/audio/chapter-3.mp3",
        "/audio/chapter-4.mp3",
        "/audio/chapter-5.mp3"
    ];

    const scrollToContent = () => {
        document.getElementById("context")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Section className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden bg-paper">
            {/* Ambient Background Light */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-maroon/5 rounded-full blur-[100px]"
                />
            </div>

            {/* Background Decor - Palace Arch Silhouette */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
                    <path
                        d="M720 100 C 400 100, 200 600, 100 900 H 1340 C 1240 600, 1040 100, 720 100 Z"
                        fill="currentColor"
                        className="text-ink"
                    />
                    <path
                        d="M720 150 C 450 150, 300 600, 200 900 H 1240 C 1140 600, 990 150, 720 150 Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-maroon"
                    />
                </svg>
            </div>

            <div className="z-10 max-w-4xl relative flex flex-col items-center px-6">

                {/* Icon Entrance */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex justify-center mb-8"
                >
                    <BookOpen className="w-10 h-10 text-maroon opacity-60" />
                </motion.div>

                {/* Title Entrance */}
                <motion.h1
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-ink mb-6 tracking-tight leading-none"
                >
                    Kuvalaya-mālā
                </motion.h1>

                {/* Subtitle Entrance - The Hook */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                >
                    <p className="text-xl md:text-3xl text-ink/80 max-w-2xl mx-auto mb-10 font-serif italic leading-relaxed">
                        "A prince who had everything — except peace."
                    </p>

                    {/* Alternative Options (Commented for reference): 
                        "When power failed to quiet the heart." 
                        "From palace to path: a story of awakening." 
                    */}
                </motion.div>

                {/* Actions Entrance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                    className="flex flex-col items-center gap-8"
                >
                    <div className="flex flex-col items-center gap-3">
                        <Button
                            onClick={scrollToContent}
                            size="lg"
                            className="bg-transparent border border-maroon/30 text-ink hover:bg-maroon hover:text-white hover:border-maroon transition-all duration-700 font-serif px-12 py-4 text-lg rounded-sm tracking-widest uppercase"
                        >
                            Begin the Journey
                        </Button>
                        <span className="text-xs font-serif text-ink/40 tracking-wider italic">
                            Listen to the story unfold as you explore.
                        </span>
                    </div>

                    <AudioButton
                        track="/audio/Introduction.mp3"
                        label="Introduction"
                        playlist={fullPlaylist}
                        className="bg-transparent border-none hover:bg-maroon/5 pl-4 opacity-70 hover:opacity-100 transition-opacity"
                    />
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <ChevronDown className="w-6 h-6 text-ink/20 animate-bounce mx-auto" />
            </motion.div>
        </Section>
    );
}
