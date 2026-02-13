"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Check } from "lucide-react";
import { useLanguage, Language } from "@/lib/LanguageContext";

const languages: { code: Language; label: string; native: string }[] = [
    { code: "en", label: "English", native: "English" },
    { code: "hi", label: "Hindi", native: "हिन्दी" },
    { code: "mr", label: "Marathi", native: "मराठी" },
    { code: "ta", label: "Tamil", native: "தமிழ்" },
    { code: "te", label: "Telugu", native: "తెలుగు" },
];

export default function LanguageSwitcher() {
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <>
            {/* Backdrop for mobile - closes dropdown on tap */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[99] md:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            <div ref={containerRef} className="fixed top-14 right-3 md:top-20 md:right-6 z-[100]">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`p-2 md:p-2.5 rounded-full transition-all duration-300 border backdrop-blur-sm relative
                    ${isOpen
                            ? "bg-paper text-maroon border-maroon/20 shadow-sm"
                            : "bg-paper/50 text-ink/40 border-ink/10 hover:bg-paper hover:text-maroon hover:border-maroon/20"
                        }`}
                    aria-label={t.toggles.lang}
                    title={languages.find(l => l.code === language)?.native || t.toggles.lang}
                >
                    <Languages className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className="absolute right-full top-0 mr-2 md:right-0 md:top-full md:mr-0 md:mt-2 w-40 md:w-48 bg-paper border border-maroon/20 rounded-lg shadow-xl overflow-hidden py-1"
                        >
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-3 md:px-4 py-2.5 md:py-3 text-sm flex items-center justify-between hover:bg-maroon/5 transition-colors ${language === lang.code ? "text-maroon font-serif font-bold" : "text-ink/80 font-serif"
                                        }`}
                                >
                                    <div className="flex flex-col">
                                        <span className="leading-none">{lang.native}</span>
                                        <span className="text-[10px] text-ink/40 uppercase tracking-wider mt-0.5">{lang.label}</span>
                                    </div>
                                    {language === lang.code && <Check className="w-4 h-4 ml-2" />}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
