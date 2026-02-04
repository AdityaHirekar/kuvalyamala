"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, BookOpen } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import AudioButton from "@/components/ui/AudioButton";

export default function Hero() {
    const scrollToContent = () => {
        document.getElementById("context")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Section className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
            {/* Background Decor - Temple Silhouette Hint */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-ink to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-[50px] border-maroon/20 blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="z-10 max-w-4xl relative flex flex-col items-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center mb-6"
                >
                    <BookOpen className="w-12 h-12 text-maroon opacity-80" />
                </motion.div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-ink mb-6 tracking-tight leading-none">
                    Kuvalaya-mālā
                </h1>
                <p className="text-xl md:text-2xl text-ink/70 max-w-2xl mx-auto mb-8 font-serif italic">
                    "A journey of a prince who chose wisdom over power."
                </p>

                <div className="flex flex-col items-center gap-6">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button onClick={scrollToContent} size="lg" className="shadow-2xl border-2 border-maroon/20 bg-paper text-ink hover:bg-maroon hover:text-white hover:border-maroon transition-all duration-500 font-serif px-10 py-5 text-lg">
                            Begin the Journey
                        </Button>
                    </motion.div>

                    <AudioButton track="/audio/Introduction.mp3" label="Listen to Introduction" className="bg-transparent border-maroon/0 hover:bg-maroon/5 pl-4" />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <span className="text-xs font-serif text-ink/40 tracking-[0.2em] uppercase mb-2 block">Scroll</span>
                <ChevronDown className="w-6 h-6 text-ink/30 animate-bounce mx-auto" />
            </motion.div>
        </Section>
    );
}
