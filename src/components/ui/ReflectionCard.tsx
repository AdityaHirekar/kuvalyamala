"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageSquare, Check, ArrowRight, PenTool } from "lucide-react";
import { useReflection } from "@/lib/ReflectionContext";

interface ReflectionCardProps {
    chapterId: number;
    title: string;
    question: string;
    options: string[];
    onContinue: () => void;
}

export default function ReflectionCard({ chapterId, title, question, options, onContinue }: ReflectionCardProps) {
    const { isReflectionMode, saveReflection, reflections } = useReflection();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [note, setNote] = useState("");
    const [isSaved, setIsSaved] = useState(false);

    // Load existing reflection if available
    useEffect(() => {
        if (reflections[chapterId]) {
            setSelectedOption(reflections[chapterId].selectedOption);
            setNote(reflections[chapterId].note);
            setIsSaved(true);
        }
    }, [reflections, chapterId]);

    if (!isReflectionMode) return null;

    const handleSave = () => {
        if (selectedOption) {
            saveReflection(chapterId, {
                selectedOption,
                note,
                timestamp: Date.now()
            });
            setIsSaved(true);
            // Optional: Auto-continue after short delay or just show success
            setTimeout(onContinue, 800);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full max-w-2xl mx-auto my-16 relative z-30"
        >
            <div className="bg-paper/80 backdrop-blur-md border border-maroon/20 rounded-lg p-8 shadow-xl relative overflow-hidden">
                {/* Decor */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-maroon/40 to-transparent" />
                <Sparkles className="absolute top-4 right-4 w-5 h-5 text-maroon/40" />

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-maroon/10 rounded-full">
                        <MessageSquare className="w-5 h-5 text-maroon" />
                    </div>
                    <h3 className="font-serif text-xl text-ink font-bold tracking-wide">Reflection: {title}</h3>
                </div>

                <p className="text-lg font-serif italic text-ink/80 mb-8 leading-relaxed">
                    "{question}"
                </p>

                <div className="space-y-3 mb-8">
                    {options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedOption(option)}
                            className={`w-full text-left p-4 rounded-md border transition-all duration-300 flex items-center justify-between group
                                ${selectedOption === option
                                    ? "bg-maroon/10 border-maroon text-maroon font-medium shadow-sm"
                                    : "bg-white/50 border-ink/10 text-ink/70 hover:bg-white hover:border-maroon/30"
                                }`}
                        >
                            <span>{option}</span>
                            {selectedOption === option && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <Check className="w-4 h-4 text-maroon" />
                                </motion.div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="mb-8">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/40 mb-2">
                        <PenTool className="w-3 h-3" />
                        Add your thought (Optional)
                    </label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="What comes to mind right now?"
                        className="w-full bg-white/50 border border-ink/10 rounded-md p-3 text-ink/80 focus:outline-none focus:border-maroon/50 focus:ring-1 focus:ring-maroon/20 transition-all resize-none h-24 font-serif"
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onContinue}
                        className="px-6 py-2 text-ink/50 hover:text-ink text-sm font-serif italic transition-colors"
                    >
                        Skip for now
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!selectedOption}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full font-serif font-bold tracking-wide transition-all
                            ${selectedOption
                                ? "bg-maroon text-white shadow-lg hover:shadow-xl hover:scale-105"
                                : "bg-ink/10 text-ink/30 cursor-not-allowed"
                            }`}
                    >
                        {isSaved ? "Updated" : "Save & Continue"}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
