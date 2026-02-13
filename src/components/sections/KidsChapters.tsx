"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { getKidsChapters } from "@/lib/chaptersData";
import { ChevronRight, ChevronLeft, Star, Medal } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function KidsChapters() {
    const { language } = useLanguage();
    const fullChapters = getKidsChapters(language);
    const chapters = fullChapters.slice(0, 1); // Only show the first chapter as requested
    const [currentIndex, setCurrentIndex] = useState(0);
    const [badgeEarned, setBadgeEarned] = useState<number[]>([]);

    const nextChapter = () => {
        if (currentIndex < chapters.length - 1) {
            setCurrentIndex(prev => prev + 1);
            // Earn badge for previous chapter when moving forward
            if (!badgeEarned.includes(currentIndex)) {
                setBadgeEarned(prev => [...prev, currentIndex]);
            }
        }
    };

    const prevChapter = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleOptionSelect = (isGood: boolean, feedback: string) => {
        // Simple alert for now, could be a nice modal
        if (isGood) {
            // alert("🌟 " + feedback);
        } else {
            // alert("💡 " + feedback);
        }
        // Unlock badge for current chapter on interaction
        if (!badgeEarned.includes(currentIndex)) {
            setBadgeEarned(prev => [...prev, currentIndex]);
        }
    };

    const currentChapter = chapters[currentIndex];

    return (
        <section className="py-12 bg-sky-50 min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-rounded">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-300 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-300 rounded-full blur-3xl opacity-30 translate-x-1/3 translate-y-1/3" />

            <div className="max-w-4xl w-full px-4 z-10">

                {/* Header / Progress */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-slate-700">Adventure Step {currentIndex + 1}</h2>
                    <div className="flex gap-2">
                        {chapters.map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "w-3 h-3 rounded-full transition-all",
                                    i === currentIndex ? "bg-orange-500 scale-125" :
                                        i < currentIndex ? "bg-green-500" : "bg-slate-200"
                                )}
                            />
                        ))}
                    </div>
                </div>

                {/* Main Card */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentChapter.id}
                            initial={{ opacity: 0, x: 50, rotate: 2 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            exit={{ opacity: 0, x: -50, rotate: -2 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white transform origin-bottom"
                        >
                            <div className="grid md:grid-cols-2 gap-0">
                                {/* Image Side */}
                                <div className="relative h-64 md:h-auto bg-slate-100">
                                    <Image
                                        src={currentChapter.image}
                                        alt={currentChapter.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6 md:hidden">
                                        <h3 className="text-2xl font-bold text-white">{currentChapter.title}</h3>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="p-6 md:p-10 flex flex-col justify-center bg-white">
                                    <h3 className="text-3xl font-bold text-slate-800 mb-4 hidden md:block text-orange-500">
                                        {currentChapter.title}
                                    </h3>
                                    <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium">
                                        {currentChapter.narrative}
                                    </p>

                                    {/* Kid Reflection */}
                                    <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100">
                                        <p className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                            {currentChapter.reflection.question}
                                        </p>
                                        <div className="grid gap-3">
                                            {currentChapter.reflection.options.map((opt, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleOptionSelect(opt.isGood, opt.feedback)}
                                                    className="text-left p-3 rounded-xl bg-white border-2 border-blue-100 hover:border-orange-400 hover:bg-orange-50 transition-all text-sm font-bold text-slate-600 active:scale-95"
                                                >
                                                    {opt.text}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevChapter}
                        disabled={currentIndex === 0}
                        className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg disabled:opacity-0 hover:scale-110 transition-all text-slate-600 hover:text-orange-500"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    <button
                        onClick={nextChapter}
                        disabled={currentIndex === chapters.length - 1}
                        className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg disabled:opacity-0 hover:scale-110 transition-all text-slate-600 hover:text-orange-500"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                </div>

                {/* Badge Collection */}
                <div className="mt-12 flex justify-center gap-4 flex-wrap">
                    {chapters.map((ch, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className={cn(
                                "w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all",
                                badgeEarned.includes(i) || i < currentIndex
                                    ? "bg-yellow-100 border-yellow-400"
                                    : "bg-slate-100 border-slate-200 grayscale opacity-50"
                            )}>
                                <Medal className={cn(
                                    "w-8 h-8",
                                    badgeEarned.includes(i) || i < currentIndex ? "text-yellow-500" : "text-slate-400"
                                )} />
                            </div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                                {ch.badge}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
