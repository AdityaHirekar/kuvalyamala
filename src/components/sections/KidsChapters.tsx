"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { getKidsChapters } from "@/lib/chaptersData";
import {
    ChevronRight, ChevronLeft, Star, Medal,
    Sparkles, Gift, Ghost, Smile, Frown, HeartHandshake,
    Wind, Hammer, BicepsFlexed, Heart, Footprints, Squirrel
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Map string names to Lucide components
const iconMap: { [key: string]: React.ElementType } = {
    Sparkles, Gift, Ghost, Smile, Frown, HeartHandshake,
    Wind, Hammer, BicepsFlexed, Heart
};

// Simple component to highlight emotional keywords
const HighlightText = ({ text }: { text: string }) => {
    // Words to highlight with specific colors
    const highlights: { [key: string]: string } = {
        "Prince": "text-purple-600 font-bold",
        "Palace": "text-yellow-600 font-bold",
        "Gold": "text-yellow-500 font-bold",
        "Toys": "text-blue-500 font-bold",
        "Bored": "text-slate-500 font-bold",
        "Sad": "text-blue-600 font-bold",
        "Happy": "text-green-600 font-bold",
        "Angry": "text-red-500 font-bold",
        "Kind": "text-pink-500 font-bold",
        "Love": "text-red-500 font-bold",
        "Hero": "text-orange-500 font-bold"
    };

    const parts = text.split(new RegExp(`(${Object.keys(highlights).join("|")})`, "gi"));

    return (
        <span>
            {parts.map((part, i) => {
                // Find case-insensitive match
                const matchKey = Object.keys(highlights).find(k => k.toLowerCase() === part.toLowerCase());
                return matchKey ? (
                    <span key={i} className={highlights[matchKey]}>{part}</span>
                ) : (
                    <span key={i}>{part}</span>
                );
            })}
        </span>
    );
};

export default function KidsChapters() {
    const { language } = useLanguage();
    const fullChapters = getKidsChapters(language);
    const chapters = fullChapters; // Show all chapters as requested
    const [currentIndex, setCurrentIndex] = useState(0);
    const [badgeEarned, setBadgeEarned] = useState<number[]>([]);

    const [userChoices, setUserChoices] = useState<string[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
    const [isVictoryDismissed, setIsVictoryDismissed] = useState(false);
    const [squirrelMessage, setSquirrelMessage] = useState<string | null>(null);

    const squirrelSayings = [
        "You're doing great!",
        "Keep going, hero!",
        "I love stories!",
        "Find the hidden stars!",
        "You are so smart!",
        "What happens next?",
        "Reading is magic!",
        "Squeak squeak! 🌰"
    ];

    const handleSquirrelClick = () => {
        const randomMsg = squirrelSayings[Math.floor(Math.random() * squirrelSayings.length)];
        setSquirrelMessage(randomMsg);
        // Auto-hide after 3 seconds
        setTimeout(() => setSquirrelMessage(null), 3000);
    };

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

    const handleOptionSelect = (chapterId: number, optionIndex: number, isGood: boolean, feedback: string, tag: string) => {
        // Collect the tag
        if (tag) {
            setUserChoices(prev => [...prev, tag]);
        }

        // Track selection visually
        setSelectedAnswers(prev => ({ ...prev, [chapterId]: optionIndex }));

        // Squirrel reacts to answer
        setSquirrelMessage(isGood ? "Yay! Good choice! 🌟" : "Don't worry, try again! 💪");
        setTimeout(() => setSquirrelMessage(null), 3000);

        // Unlock badge for current chapter on interaction
        if (!badgeEarned.includes(currentIndex)) {
            const newBadges = [...badgeEarned, currentIndex];
            setBadgeEarned(newBadges);
        }
    };

    // Generate Insight
    const getInsight = () => {
        // Simple logic: check for presence of positive traits
        const traits = userChoices;
        const hasKindness = traits.includes("Helping") || traits.includes("Friendly") || traits.includes("Loving");
        const hasCalm = traits.includes("Calm") || traits.includes("Peaceful");
        const hasCuriosity = traits.includes("Curious");

        if (hasKindness && hasCalm) return "You like to help others and stay calm.";
        if (hasKindness) return "You have a very kind and loving heart.";
        if (hasCalm) return "You are peaceful and make good choices.";
        if (hasCuriosity) return "You are curious and love to learn new things!";
        return "You are a kind and brave hero!";
    };

    const currentChapter = chapters[currentIndex];

    return (
        <section id="chapters" className="py-12 bg-sky-50 min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-rounded">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-300 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-300 rounded-full blur-3xl opacity-30 translate-x-1/3 translate-y-1/3" />

            <div className="max-w-4xl w-full px-4 z-10">

                {/* Header / Progress */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-slate-700 flex items-center gap-3">
                        <span className="bg-orange-100 p-2 rounded-full">
                            <Footprints className="w-6 h-6 text-orange-500" />
                        </span>
                        Adventure Step {currentIndex + 1}
                    </h2>
                    <div className="flex gap-2">
                        {chapters.map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "transition-all duration-300",
                                    i === currentIndex ? "scale-125" : "scale-100 opacity-50"
                                )}
                            >
                                <Footprints className={cn(
                                    "w-5 h-5",
                                    i <= currentIndex ? "fill-orange-500 text-orange-500" : "text-slate-300"
                                )} />
                            </div>
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

                                    <div className="space-y-4 mb-8">
                                        {currentChapter.narrative.map((paragraph, index) => (
                                            <p key={index} className="text-lg text-slate-600 leading-relaxed font-medium">
                                                <HighlightText text={paragraph} />
                                            </p>
                                        ))}
                                    </div>

                                    {/* Kid Reflection */}
                                    <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 relative mt-8 md:mt-0">
                                        {/* Squirrel Companion */}
                                        {/* Squirrel Companion */}
                                        <button
                                            onClick={handleSquirrelClick}
                                            className="absolute -top-8 -right-2 md:-right-6 w-16 h-16 md:w-20 md:h-20 animate-bounce-slow z-50 transition-transform active:scale-95 cursor-pointer hover:scale-110"
                                            title="Click me for a surprise!"
                                        >
                                            <img
                                                src="/images/squirrel.png?v=3"
                                                alt="Squirrel Companion"
                                                className="w-full h-full object-contain drop-shadow-md mix-blend-multiply"
                                            />
                                            {/* Speech Bubble */}
                                            <AnimatePresence>
                                                {squirrelMessage && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0, y: 10 }}
                                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0, y: 10 }}
                                                        className="absolute -top-16 right-0 bg-white text-slate-800 text-xs font-bold p-3 rounded-xl shadow-xl w-32 border-2 border-orange-200 z-50 text-center"
                                                    >
                                                        {squirrelMessage}
                                                        <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white border-b-2 border-r-2 border-orange-200 rotate-45 transform"></div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </button>

                                        <div className="mb-4">
                                            <p className="font-bold text-blue-800 flex items-center gap-2 text-lg">
                                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                                {currentChapter.reflection.question}
                                            </p>
                                            <p className="text-blue-600/70 text-sm ml-7 mt-1 font-medium bg-white/50 inline-block px-2 py-0.5 rounded-md">
                                                Pick the one that is closest to what you do.
                                            </p>
                                        </div>
                                        <div className="grid gap-3">
                                            {currentChapter.reflection.options.map((opt, idx) => {
                                                const isSelected = selectedAnswers[currentChapter.id] === idx;
                                                const Icon = iconMap[opt.icon] || Star;

                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleOptionSelect(currentChapter.id, idx, opt.isGood, opt.feedback, opt.tag)}
                                                        className={cn(
                                                            "text-left p-3 rounded-xl border-2 transition-all text-sm font-bold active:scale-95 group",
                                                            isSelected
                                                                ? "bg-orange-100 border-orange-400 text-orange-800"
                                                                : "bg-white border-blue-100 text-slate-600 hover:border-orange-400 hover:bg-orange-50"
                                                        )}
                                                    >
                                                        <div className="flex justify-between items-center gap-3">
                                                            <div className="flex items-center gap-3">
                                                                <div className={cn(
                                                                    "p-2 rounded-lg transition-colors",
                                                                    isSelected ? "bg-orange-200 text-orange-600" : "bg-blue-50 text-blue-400 group-hover:bg-orange-100 group-hover:text-orange-500"
                                                                )}>
                                                                    <Icon className="w-5 h-5" />
                                                                </div>
                                                                <span>{opt.text}</span>
                                                            </div>
                                                            {isSelected && <Star className="w-4 h-4 fill-orange-500 text-orange-500" />}
                                                        </div>
                                                        {isSelected && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: "auto" }}
                                                                className="mt-2 text-xs font-normal text-slate-500 border-t border-orange-200 pt-2 ml-12"
                                                            >
                                                                {opt.feedback}
                                                            </motion.div>
                                                        )}
                                                    </button>
                                                );
                                            })}
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
                                "w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-500 bg-white",
                                badgeEarned.includes(i) || i < currentIndex
                                    ? "border-yellow-400 rotate-12 scale-110"
                                    : "border-slate-200 grayscale opacity-50"
                            )}>
                                <img
                                    src={[
                                        "/images/seekerstar.png",
                                        "/images/friendshipheart.png",
                                        "/images/kindnessshield.png",
                                        "/images/peacedove.png",
                                        "/images/herocrown.png"
                                    ][i]}
                                    alt={ch.badge}
                                    className={cn(
                                        "w-full h-full object-cover rounded-full",
                                        badgeEarned.includes(i) || i < currentIndex ? "" : "grayscale"
                                    )}
                                />
                            </div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                                {ch.badge}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Victory Modal */}
                <AnimatePresence>
                    {badgeEarned.length === chapters.length && !isVictoryDismissed && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        >
                            <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden border-4 border-yellow-400 shadow-2xl">
                                {/* Confetti / Decor */}
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500" />

                                <div className="mb-6 inline-block p-4 bg-yellow-100 rounded-full border-2 border-yellow-300">
                                    <Medal className="w-16 h-16 text-yellow-500" />
                                </div>

                                <h2 className="text-3xl font-bold text-slate-800 mb-4">Hooray! You did it!</h2>
                                <p className="text-lg text-slate-600 mb-4">
                                    You collected all the badges and helped Prince Kuvalaya find happiness!
                                </p>

                                {/* Personal Insight */}
                                <div className="bg-blue-50 rounded-xl p-4 mb-8 border border-blue-100">
                                    <p className="text-blue-800 font-bold text-xl">
                                        "{getInsight()}"
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={() => {
                                            setIsVictoryDismissed(true);
                                            // Give time for modal to close before scrolling
                                            setTimeout(() => {
                                                document.getElementById("ask-kuvalaya")?.scrollIntoView({ behavior: "smooth" });
                                            }, 100);
                                        }}
                                        className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-lg transition-transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <Star className="w-5 h-5 fill-white" />
                                        Talk to the Prince
                                    </button>
                                    <button
                                        onClick={() => {
                                            setBadgeEarned([]);
                                            setCurrentIndex(0);
                                            setIsVictoryDismissed(false);
                                            setUserChoices([]); // Reset choices too
                                        }}
                                        className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-colors"
                                    >
                                        Read Again
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}
