"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { en, Dictionary } from "@/locales/en";
import { hi } from "@/locales/hi";
import { mr } from "@/locales/mr";
import { ta } from "@/locales/ta";
import { te } from "@/locales/te";

export type Language = "en" | "hi" | "mr" | "ta" | "te";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const dictionaries: Record<Language, Dictionary> = {
    en,
    hi,
    mr,
    ta,
    te,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        try {
            const savedLang = localStorage.getItem("app-language") as Language;
            if (savedLang && dictionaries[savedLang]) {
                setLanguage(savedLang);
            }
        } catch (error) {
            console.warn("Failed to load language from local storage", error);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        try {
            localStorage.setItem("app-language", lang);
        } catch (error) {
            console.warn("Failed to save language to local storage", error);
        }
    };

    const value = {
        language,
        setLanguage: handleSetLanguage,
        t: dictionaries[language],
    };

    // Prevent hydration mismatch
    if (!isClient) {
        return null;
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
