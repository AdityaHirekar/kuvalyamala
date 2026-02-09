"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReflection } from "@/lib/ReflectionContext";
import Section from "@/components/ui/Section";
import { BookOpen, Sparkles, Trash2 } from "lucide-react";

export default function ReflectionsSummary({ chapters }: { chapters: any[] }) {
    const { isReflectionMode, reflections } = useReflection();

    if (!isReflectionMode || Object.keys(reflections).length === 0) return null;

    const clearReflections = () => {
        if (window.confirm("Are you sure you want to clear your reflections? This cannot be undone.")) {
            localStorage.removeItem('userReflections');
            window.location.reload(); // Simple reload to clear state for now as context doesn't expose clear
        }
    };

    return (
        <Section id="reflections-summary" background="stone" className="py-24 border-t border-maroon/10">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-block p-3 bg-maroon/10 rounded-full mb-6">
                        <BookOpen className="w-8 h-8 text-maroon" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-ink mb-6">Your Journey's Mirror</h2>
                    <p className="text-xl font-serif text-ink/70 italic max-w-2xl mx-auto">
                        "The path you walked, and the thoughts you gathered along the way."
                    </p>
                </div>

                <div className="grid gap-8">
                    {chapters.map((chapter) => {
                        const reflection = reflections[chapter.id];
                        if (!reflection) return null;

                        return (
                            <motion.div
                                key={chapter.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-paper p-8 rounded-lg shadow-sm border border-ink/5 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-maroon/30" />
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-xs font-bold uppercase tracking-widest text-maroon">Chapter {chapter.id}</span>
                                            <div className="h-px w-8 bg-maroon/20" />
                                            <h4 className="font-serif font-bold text-ink/80">{chapter.title}</h4>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-sm text-ink/50 italic mb-2">Question</p>
                                            <p className="font-serif text-ink">{chapter.reflection.question}</p>
                                        </div>

                                        <div className="bg-maroon/5 p-4 rounded-md inline-block">
                                            <p className="text-sm text-ink/50 italic mb-1">Your Choice</p>
                                            <div className="flex items-center gap-2 text-maroon font-medium font-serif">
                                                <Sparkles className="w-4 h-4" />
                                                {reflection.selectedOption}
                                            </div>
                                        </div>
                                    </div>

                                    {reflection.note && (
                                        <div className="flex-1 md:border-l border-ink/10 md:pl-8">
                                            <p className="text-sm text-ink/50 italic mb-3">Your Note</p>
                                            <p className="font-serif text-ink/80 italic leading-relaxed">
                                                "{reflection.note}"
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <button
                        onClick={clearReflections}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/30 hover:text-red-500 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                        Reset My Reflections
                    </button>
                </div>
            </div>
        </Section>
    );
}
