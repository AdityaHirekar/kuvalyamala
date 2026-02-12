"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RefreshCw } from "lucide-react";
import { useReflection, ReflectionData } from "@/lib/ReflectionContext";
import Button from "@/components/ui/Button";

interface ReflectionSummaryProps {
    onClose?: () => void;
    isEmbedded?: boolean;
}

export default function ReflectionSummary({ onClose, isEmbedded = false }: ReflectionSummaryProps) {
    const { reflections } = useReflection();

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
        switch (trait) {
            case "Awareness":
                return {
                    text: "Your journey has been marked by a quiet observance. Like Prince Kuvalaya noticing the hollowness of the palace, you tend to see beyond the surface of things. This clarity is a rare gift. This suggests you are starting to catch yourself before you get swept away by the moment.",
                    question: "How can you use this sight to bring peace to those who cannot see?"
                };
            case "Compassion":
                return {
                    text: "Your heart leans towards connection. Even when the world is harsh, you seek the human element within it. Kuvalaya found that this softness was not a weakness, but his greatest strength. This suggests you are finding strength in softness, rather than building walls.",
                    question: "Who needs your gentleness today, including yourself?"
                };
            case "Detachment":
                return {
                    text: "You intuitively understand impermanence. You sense that holding on too tightly causes suffering. Like the Prince leaving his kingdom, you are learning the freedom of letting go. This suggests you’re becoming more aware of when attachment turns into pressure.",
                    question: "What burden are you ready to set down for good?"
                };
            case "Ego":
                return {
                    text: "You are honest about your defenses. Recognizing the self's need to protect itself is the first step to true strength. Kuvalaya, too, had to face his own pride to find his true nature. This suggests you are beginning to see your own defenses, rather than becoming them.",
                    question: "What would you do if you had nothing to prove?"
                };
            case "Control":
                return {
                    text: "You seek order in chaos. While structure provides safety, the Prince learned that life is a river, not a fortress. Your challenge—and your liberation—lies in trusting the flow. This suggests you are learning to trust the flow of life, rather than trying to force it.",
                    question: "What beautiful thing might happen if you loosened your grip?"
                };
            default:
                return {
                    text: "You are walking the path with open eyes. Like the Prince, you are questioning, feeling, and seeking. The answers are less important than the sincerity of your search.",
                    question: "Where will your inner road lead you next?"
                };
        }
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
                        <h2 className="text-2xl font-serif font-bold text-maroon tracking-wide">The Mirror of the Soul</h2>
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
                    <h2 className="text-2xl font-serif font-bold text-maroon tracking-wide">Your Reflection Insight</h2>
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
                            Continue the Journey <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
