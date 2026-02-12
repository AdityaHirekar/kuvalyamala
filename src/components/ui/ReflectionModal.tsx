"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Lock, Check } from "lucide-react";
import { useReflection } from "@/lib/ReflectionContext";
import Button from "@/components/ui/Button";

export interface ReflectionOption {
    text: string;
    type: 'deep' | 'shallow';
    traits: string[];
}

interface ReflectionModalProps {
    chapterId: number;
    title: string;
    question: string;
    options: ReflectionOption[];
    feedback: {
        deep: string;
        shallow: string;
    };
    onComplete: () => void;
}

export default function ReflectionModal({
    chapterId,
    title,
    question,
    options,
    feedback,
    onComplete
}: ReflectionModalProps) {
    const { isReflectionMode, saveReflection, reflections } = useReflection();
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
    const [note, setNote] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);

    // Check if already completed
    const isCompleted = !!reflections[chapterId];

    // If not in reflection mode or already completed, don't show the blocking modal
    // Note: The parent component should handle NOT rendering the *next* chapter. 
    // This component is the "Gatekeeper" UI for the *current* chapter's end.
    if (!isReflectionMode) return null;

    // We removed the eager null return to allow AnimatePresence to handle exit
    // if (isCompleted && !showFeedback) { return null; }

    const handleOptionSelect = (index: number) => {
        if (showFeedback) return; // Prevent changing after submit
        setSelectedOptionIndex(index);
    };

    const handleSubmit = () => {
        if (selectedOptionIndex === null) return;

        const selectedOption = options[selectedOptionIndex];

        saveReflection(chapterId, {
            selectedOption: selectedOption.text,
            traits: selectedOption.traits,
            note,
            timestamp: Date.now()
        });

        setShowFeedback(true);
    };

    const handleContinue = () => {
        setShowFeedback(false);
        onComplete();
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto my-24 z-40">
            <div className="absolute inset-0 bg-paper/90 backdrop-blur-sm -z-10 rounded-xl" />

            <AnimatePresence>
                {!isCompleted || showFeedback ? (
                    <motion.div
                        key="modal-content"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
                        viewport={{ once: true }}
                        className="bg-paper border border-maroon/20 rounded-xl shadow-2xl overflow-hidden"
                    >
                        {/* Header / Pause Banner */}
                        <div className="bg-maroon/5 border-b border-maroon/10 p-4 text-center">
                            <div className="flex items-center justify-center gap-2 text-maroon font-bold uppercase tracking-widest text-sm">
                                <Lock className="w-4 h-4" />
                                <span>Pause & Reflect</span>
                            </div>
                        </div>

                        <div className="p-8 md:p-12">
                            <AnimatePresence mode="wait">
                                {!showFeedback ? (
                                    <motion.div
                                        key="question"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="text-center space-y-4">
                                            <span className="text-ink/40 font-serif italic">Reflection {chapterId} of 5</span>
                                            <h3 className="text-2xl md:text-3xl font-serif font-bold text-maroon mb-6 leading-tight">
                                                {question}
                                            </h3>
                                            <p className="text-sm font-serif italic text-ink/40 mb-8">
                                                There is no right answer. Choose what feels closest to you.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {options.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleOptionSelect(idx)}
                                                    className={`p-6 text-left rounded-lg border-2 transition-all duration-300 relative group
                                                ${selectedOptionIndex === idx
                                                            ? "border-maroon bg-maroon/5 text-ink shadow-md"
                                                            : "border-ink/10 bg-white/50 text-ink/70 hover:border-maroon/30 hover:bg-white"
                                                        }`}
                                                >
                                                    <span className="font-serif text-lg">{option.text}</span>
                                                    {selectedOptionIndex === idx && (
                                                        <div className="absolute top-4 right-4 text-maroon">
                                                            <Check className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-ink/40 ml-1">
                                                Your Thoughts (Optional)
                                            </label>
                                            <textarea
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                                placeholder="Write a short note..."
                                                className="w-full p-4 bg-white/50 border border-ink/10 rounded-lg focus:outline-none focus:border-maroon/40 focus:ring-1 focus:ring-maroon/20 transition-all font-serif resize-none h-24"
                                            />
                                        </div>

                                        <div className="flex justify-center pt-4">
                                            <Button
                                                onClick={handleSubmit}
                                                disabled={selectedOptionIndex === null}
                                                size="lg"
                                                className="min-w-[200px]"
                                            >
                                                Save & Continue
                                            </Button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="feedback"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center space-y-8 py-8"
                                    >
                                        <div className="w-16 h-16 bg-maroon/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Sparkles className="w-8 h-8 text-maroon" />
                                        </div>

                                        <h3 className="text-2xl font-serif font-bold text-ink">
                                            Insight Saved
                                        </h3>

                                        <div className="max-w-2xl mx-auto">
                                            <p className="text-xl font-serif italic text-ink/80 leading-relaxed">
                                                "{selectedOptionIndex !== null && options[selectedOptionIndex].type === 'deep'
                                                    ? feedback.deep
                                                    : feedback.shallow}"
                                            </p>
                                        </div>

                                        <div className="pt-8">
                                            <Button onClick={handleContinue} size="lg" variant="outline">
                                                Continue Journey <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
}
