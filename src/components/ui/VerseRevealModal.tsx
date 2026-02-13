"use client";

import React from "react";
import { X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { VerseData } from "@/lib/verses";
import { useLanguage } from "@/lib/LanguageContext";

interface VerseRevealModalProps {
    isOpen: boolean;
    onClose: () => void;
    verse: VerseData | null;
}

export default function VerseRevealModal({ isOpen, onClose, verse }: VerseRevealModalProps) {
    const { language, t } = useLanguage();

    if (!verse) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-paper border border-maroon/20 w-full max-w-lg shadow-2xl relative overflow-hidden"
                        >
                            {/* Decorative Top Border */}
                            <div className="h-2 w-full bg-maroon/10 border-b border-maroon/20" />

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-ink/50 hover:text-maroon transition-colors rounded-full hover:bg-maroon/5"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-8 md:p-10 text-center">
                                <div className="flex items-center justify-center gap-2 mb-6 text-maroon/60 text-xs font-bold tracking-widest uppercase">
                                    <Sparkles size={12} />
                                    <span>{t.verses.title}</span>
                                    <Sparkles size={12} />
                                </div>

                                {/* Sanskrit Verse */}
                                <div className="mb-8 relative">
                                    <div className="text-2xl md:text-3xl font-serif text-maroon leading-loose whitespace-pre-line">
                                        {verse.fullVerse}
                                    </div>
                                    {/* Subtle decoration */}
                                    <div className="w-16 h-px bg-maroon/20 mx-auto mt-6" />
                                </div>

                                {/* Meaning */}
                                <div className="text-ink/80 text-lg leading-relaxed font-serif italic mb-6">
                                    "{verse.meaning[language]}"
                                </div>

                                {/* Source/Footer */}
                                <div className="text-xs text-ink/40 font-mono tracking-wider uppercase mt-8">
                                    {verse.source || "Classical Verse"}
                                </div>
                            </div>

                            {/* Decorative Bottom Border */}
                            <div className="h-2 w-full bg-maroon/5 border-t border-maroon/10" />
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
