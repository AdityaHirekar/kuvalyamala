"use client";

import React from "react";
import { motion } from "framer-motion";
import { Feather, Hourglass, Languages, ScrollText } from "lucide-react";
import Section from "@/components/ui/Section";
import { useLanguage } from "@/lib/LanguageContext";
import { useKidsMode } from "@/lib/KidsModeContext";

export default function Context() {
    const { t } = useLanguage();
    const { isKidsMode } = useKidsMode();

    if (isKidsMode) return null;

    const contextItems = [
        {
            icon: Feather,
            label: t.context.labels.author,
            value: t.context.author,
        },
        {
            icon: Hourglass,
            label: t.context.labels.timePeriod,
            value: t.context.timePeriod,
        },
        {
            icon: Languages,
            label: t.context.labels.language,
            value: t.context.language,
        },
    ];

    return (
        <Section id="context" background="stone" className="py-24">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <ScrollText className="w-10 h-10 text-maroon mx-auto mb-4 opacity-50" />
                    <p className="text-2xl md:text-3xl font-serif text-ink italic leading-relaxed mb-6">
                        {t.context.quote}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {contextItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="flex flex-col items-center p-6 border-t border-b border-ink/10"
                        >
                            <item.icon className="w-6 h-6 text-maroon mb-3 opacity-70" />
                            <span className="text-xs uppercase tracking-widest text-ink/50 mb-1">{item.label}</span>
                            <span className="font-serif text-xl text-ink font-medium">{item.value}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
