"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface VerseContextType {
    showBackgroundVerses: boolean;
    toggleBackgroundVerses: () => void;
}

const VerseContext = createContext<VerseContextType | undefined>(undefined);

export function VerseProvider({ children }: { children: ReactNode }) {
    const [showBackgroundVerses, setShowBackgroundVerses] = useState(true);

    // Optional: Persist preference to localStorage
    useEffect(() => {
        const saved = localStorage.getItem("showBackgroundVerses");
        if (saved !== null) {
            setShowBackgroundVerses(saved === "true");
        }
    }, []);

    const toggleBackgroundVerses = () => {
        setShowBackgroundVerses((prev) => {
            const newValue = !prev;
            localStorage.setItem("showBackgroundVerses", String(newValue));
            return newValue;
        });
    };

    return (
        <VerseContext.Provider value={{ showBackgroundVerses, toggleBackgroundVerses }}>
            {children}
        </VerseContext.Provider>
    );
}

export function useVerseContext() {
    const context = useContext(VerseContext);
    if (context === undefined) {
        throw new Error("useVerseContext must be used within a VerseProvider");
    }
    return context;
}
