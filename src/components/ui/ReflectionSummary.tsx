"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RefreshCw } from "lucide-react";
import { useReflection, ReflectionData } from "@/lib/ReflectionContext";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/LanguageContext";

interface ReflectionSummaryProps {
    onClose?: () => void;
    isEmbedded?: boolean;
}

export default function ReflectionSummary({ onClose, isEmbedded = false }: ReflectionSummaryProps) {
    const { reflections } = useReflection();
    const { t } = useLanguage();

    // Calculate dominant traits
    const calculateTraits = () => {
        const counts: Record<string, number> = {};

        Object.values(reflections).forEach((data: ReflectionData) => {
            if (data.traits) {
                data.traits.forEach(trait => {
                    counts[trait] = (counts[trait] || 0) + 1;
                });
            }
        });

        const sortedTraits = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        return sortedTraits.length > 0 ? sortedTraits[0][0] : "Awareness";
    };

    const dominantTrait = calculateTraits();

    const getInsight = (trait: string) => {
        // Map trait to localized key, default to 'Awareness' or 'Default' if not found
        // Use type assertion or check if key exists in t.summary.traits
        // For safety, we can map the string to the key
        const traitKey = trait as keyof typeof t.summary.traits;

        if (t.summary.traits[traitKey]) {
            return t.summary.traits[traitKey];
        }
        return t.summary.traits.Default;
    };

    const insight = getInsight(dominantTrait);

    if (isEmbedded) {
        return (
            <div className="w-full max-w-4xl mx-auto my-24 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-paper border border-maroon/20 rounded-xl shadow-lg overflow-hidden"
                >
                    <div className="bg-maroon/5 border-b border-maroon/10 p-6 text-center">
                        <Sparkles className="w-8 h-8 text-maroon mx-auto mb-2 opacity-50" />
                        <h2 className="text-2xl font-serif font-bold text-maroon tracking-wide">{t.summary.title}</h2>
                    </div>

                    <div className="p-8 md:p-12 text-center space-y-8">
                        <p className="text-xl md:text-2xl font-serif text-ink/80 leading-relaxed italic">
                            "{insight.text}"
                        </p>

                        <div className="w-16 h-1 bg-maroon/10 mx-auto rounded-full" />

                        <p className="text-lg font-serif text-maroon font-bold">
                            {insight.question}
                        </p>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-paper/90 backdrop-blur-md" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative bg-paper border border-maroon/20 rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden"
            >
                <div className="bg-maroon/5 border-b border-maroon/10 p-6 text-center">
                    <Sparkles className="w-8 h-8 text-maroon mx-auto mb-2 opacity-50" />
                    <h2 className="text-2xl font-serif font-bold text-maroon tracking-wide">{t.summary.insightTitle}</h2>
                </div>

                <div className="p-8 md:p-12 text-center space-y-8">
                    <p className="text-xl md:text-2xl font-serif text-ink/80 leading-relaxed italic">
                        "{insight.text}"
                    </p>

                    <div className="w-16 h-1 bg-maroon/10 mx-auto rounded-full" />

                    <p className="text-lg font-serif text-maroon font-bold">
                        {insight.question}
                    </p>

                    <div className="pt-8">
                        <Button onClick={onClose} size="lg" className="px-8">
                            {t.summary.continue} <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
