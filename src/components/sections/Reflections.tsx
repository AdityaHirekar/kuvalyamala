"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

const reflections = [
    "What does it mean to choose wisdom over power today?",
    "How do the journeys we take change who we become?",
    "Can a story teach us better than a set of instructions?"
];

export default function Reflections() {
    return (
        <Section id="reflections" background="white">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-4">
                        Why This Story Matters
                    </h2>
                    <div className="w-16 h-1 bg-maroon mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reflections.map((text, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <Card className="h-full flex items-center justify-center min-h-[200px] border-maroon/10 bg-paper hover:bg-maroon hover:text-white transition-all duration-500 group cursor-default">
                                <p className="text-xl font-serif italic font-medium leading-relaxed group-hover:text-white transition-colors">
                                    {text}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
