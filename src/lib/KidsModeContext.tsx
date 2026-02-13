"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface KidsModeContextType {
    isKidsMode: boolean;
    toggleKidsMode: () => void;
}

const KidsModeContext = createContext<KidsModeContextType | undefined>(undefined);

export function KidsModeProvider({ children }: { children: React.ReactNode }) {
    const [isKidsMode, setIsKidsMode] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        try {
            const saved = localStorage.getItem("kids-mode");
            if (saved === "true") {
                setIsKidsMode(true);
            }
        } catch (e) {
            console.warn("Failed to load kids mode preference");
        }
    }, []);

    const toggleKidsMode = () => {
        setIsKidsMode((prev) => {
            const newValue = !prev;
            try {
                localStorage.setItem("kids-mode", String(newValue));
            } catch (e) {
                console.warn("Failed to save kids mode preference");
            }
            return newValue;
        });
    };

    const value = {
        isKidsMode,
        toggleKidsMode,
    };

    if (!isMounted) return null;

    return (
        <KidsModeContext.Provider value={value}>
            {children}
        </KidsModeContext.Provider>
    );
}

export function useKidsMode() {
    const context = useContext(KidsModeContext);
    if (context === undefined) {
        throw new Error("useKidsMode must be used within a KidsModeProvider");
    }
    return context;
}
