"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, HelpCircle } from "lucide-react";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const reflections = [
    {
        question: "What does it mean to choose wisdom over power today?",
        answer: "It means valuing inner peace over external validation. In a world of endless 'likes', wisdom is the quiet confidence that needs no audience."
    },
    {
        question: "How do the journeys we take change who we become?",
        answer: "We don't just move through the world; the world moves through us. Every challenge chips away what isn't true, revealing the character underneath."
    },
    {
        question: "Can a story teach us better than a set of instructions?",
        answer: "Instructions inform the mind, but stories speak to the heart. We remember how we felt long after we forget what we were told."
    }
];

import { useLanguage } from "@/lib/LanguageContext";
import { useKidsMode } from "@/lib/KidsModeContext";

export default function Reflections() {
    const { t } = useLanguage();
    const { isKidsMode } = useKidsMode();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    if (isKidsMode) return null;

    return (
        <Section id="reflections" background="white" className="py-24">
            <div className="max-w-6xl mx-auto text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-ink mb-6">
                        {t.reflections.sectionTitle}
                    </h2>
                    <p className="text-ink/60 italic font-serif text-lg mb-8 max-w-2xl mx-auto">
                        {t.reflections.sectionSubtitle}
                    </p>
                    <div className="w-16 h-1 bg-maroon/20 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
                    {t.reflections.cards.map((item, index) => (
                        <motion.div
                            key={index}
                            layout
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            className={cn(
                                "group cursor-pointer relative overflow-hidden rounded-xl border border-ink/5 p-8 transition-all duration-500 ease-out shadow-sm hover:shadow-xl",
                                activeIndex === index
                                    ? "bg-maroon text-white md:col-span-1 md:row-span-1"
                                    : "bg-paper text-ink hover:bg-paper/50"
                            )}
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="relative z-10 flex flex-col items-center justify-center  min-h-[200px]">
                                <AnimatePresence mode="wait">
                                    {activeIndex === index ? (
                                        <motion.div
                                            key="answer"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.4 }}
                                            className="text-center"
                                        >
                                            <Sparkles className="w-8 h-8 mx-auto mb-4 text-white/50" />
                                            <p className="text-lg md:text-xl font-serif italic leading-relaxed text-white/90">
                                                "{item.answer}"
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="question"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.4 }}
                                            className="text-center"
                                        >
                                            <HelpCircle className="w-8 h-8 mx-auto mb-4 text-maroon/20 group-hover:text-maroon/50 transition-colors" />
                                            <p className="text-xl md:text-2xl font-serif font-bold text-ink/80 group-hover:text-maroon transition-colors">
                                                {item.question}
                                            </p>
                                            <p className="mt-6 text-xs uppercase tracking-widest text-ink/30 font-bold group-hover:text-ink/50">
                                                {t.values.mobileHint}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
