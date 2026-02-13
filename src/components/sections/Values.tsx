"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/ui/Section";
import { Leaf, Heart, Shield, Scale, Lightbulb, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const values = [
    {
        icon: Leaf,
        title: "Vairāgya",
        subtitle: "Detachment",
        desc: "True detachment often begins not in poverty, but in comfort—when one realizes that even the finest gold cannot cure the soul's hunger."
    },
    {
        icon: Heart,
        title: "Karunā",
        subtitle: "Compassion",
        desc: "Compassion is not innate; it is learned by walking in the dust of the world and seeing the suffering hidden behind every face."
    },
    {
        icon: Shield,
        title: "Ahimsā",
        subtitle: "Non-Violence",
        desc: "Ahimsā is the brave choice of gentleness over harm, understanding that to hurt another is to wound one's own self."
    },
    {
        icon: Scale,
        title: "Dharma",
        subtitle: "Duty & Ethics",
        desc: "Acting rightly is hardest when no one is watching. Dharma is the quiet inner compass that guides us through moral storms."
    },
    {
        icon: Lightbulb,
        title: "Jñāna",
        subtitle: "Wisdom",
        desc: "Wisdom is not memorized from varied scriptures, but distilled from the raw, lived experience of the journey itself."
    }
];

import { useLanguage } from "@/lib/LanguageContext";

export default function Values() {
    const { t } = useLanguage();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Map icons to the translated items based on index
    // Note: This relies on the order in the dictionary matching the icons
    const icons = [Leaf, Heart, Shield, Scale, Lightbulb];
    const itemsWithIcons = t.values.items.map((item, index) => ({
        ...item,
        icon: icons[index] || Leaf
    }));

    return (
        <Section id="values" background="stone" className="py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-ink mb-6">
                        {t.values.title}
                    </h2>
                    <div className="w-24 h-1 bg-maroon mx-auto rounded-full opacity-50" />
                </motion.div>

                {/* Interactive Accordion */}
                <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[500px] w-full min-h-[500px] md:min-h-0 items-stretch justify-center">
                    {itemsWithIcons.map((item, index) => {
                        const isHovered = hoveredIndex === index;
                        // Default active logic:
                        // On mobile: Click to activate.
                        // On desktop: Hover to active, or default to middle (index 2) if none hovered.
                        const isActive = hoveredIndex === index || (hoveredIndex === null && index === 2);

                        return (
                            <motion.div
                                key={index}
                                layout
                                onHoverStart={() => setHoveredIndex(index)}
                                onHoverEnd={() => setHoveredIndex(null)}
                                onClick={() => setHoveredIndex(index)}
                                className={cn(
                                    "relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-out flex flex-col items-center justify-center shadow-sm hover:shadow-xl border border-ink/5",
                                    // Mobile: Active expands height (flex-grow), others shrunk
                                    // Desktop: Active expands width (flex-[3]), others flex-[1]
                                    isActive
                                        ? "bg-maroon text-white flex-[3] py-8"
                                        : "bg-paper text-ink flex-[1] py-4 md:py-8 grayscale hover:grayscale-0"
                                )}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {/* Background Pattern for Active Card */}
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.1 }}
                                        className="absolute inset-0 pointer-events-none"
                                    >
                                        <div className="w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent -translate-x-1/4 -translate-y-1/4" />
                                    </motion.div>
                                )}

                                <div className="flex flex-col items-center z-10 w-full h-full justify-center text-center relative">
                                    {/* Icon */}
                                    <motion.div layout className={cn("mb-4 p-3 rounded-full transition-all duration-300", isActive ? "bg-white/10" : "bg-maroon/5 text-maroon")}>
                                        <item.icon className="w-6 h-6 md:w-8 md:h-8" />
                                    </motion.div>

                                    {/* Title container - handles rotation on desktop */}
                                    <div className="relative flex items-center justify-center w-full">
                                        <motion.h3
                                            layout="position"
                                            className={cn(
                                                "text-lg md:text-2xl font-serif font-bold whitespace-nowrap transition-all duration-300",
                                                !isActive && "md:absolute md:top-12 md:left-1/2 md:-translate-x-1/2 md:rotate-90 md:origin-center"
                                            )}
                                        >
                                            {item.title}
                                        </motion.h3>
                                    </div>

                                    {/* Subtitle - Hidden on inactive desktop */}
                                    <motion.span
                                        layout="position"
                                        className={cn(
                                            "text-[10px] md:text-xs uppercase tracking-widest opacity-60 mb-2 md:mb-6 transition-opacity duration-300",
                                            !isActive && "md:opacity-0"
                                        )}
                                    >
                                        {item.subtitle}
                                    </motion.span>

                                    {/* Description - Only visible when active */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="font-serif text-sm md:text-lg leading-relaxed italic opacity-90 max-w-[250px] md:max-w-md mx-auto px-2">
                                                    "{item.desc}"
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
                <p className="text-center text-ink/40 text-sm mt-8 font-serif italic md:hidden">
                    {t.values.mobileHint}
                </p>
            </div>
        </Section>
    );
}
