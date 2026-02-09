"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Types for Reflection Data
export interface ReflectionData {
    selectedOption: string;
    note: string;
    timestamp: number;
}

interface ReflectionContextType {
    isReflectionMode: boolean;
    toggleReflectionMode: () => void;
    reflections: Record<number, ReflectionData>;
    saveReflection: (chapterId: number, data: ReflectionData) => void;
}

const ReflectionContext = createContext<ReflectionContextType | undefined>(undefined);

export function ReflectionProvider({ children }: { children: React.ReactNode }) {
    const [isReflectionMode, setIsReflectionMode] = useState(false);
    const [reflections, setReflections] = useState<Record<number, ReflectionData>>({});
    const [isMounted, setIsMounted] = useState(false);

    // Load state from localStorage on mount
    useEffect(() => {
        setIsMounted(true);
        const storedMode = localStorage.getItem('reflectionMode');
        const storedReflections = localStorage.getItem('userReflections');

        if (storedMode) {
            setIsReflectionMode(JSON.parse(storedMode));
        }
        if (storedReflections) {
            setReflections(JSON.parse(storedReflections));
        }
    }, []);

    const toggleReflectionMode = () => {
        const newMode = !isReflectionMode;
        setIsReflectionMode(newMode);
        localStorage.setItem('reflectionMode', JSON.stringify(newMode));
    };

    const saveReflection = (chapterId: number, data: ReflectionData) => {
        const updatedReflections = {
            ...reflections,
            [chapterId]: data
        };
        setReflections(updatedReflections);
        localStorage.setItem('userReflections', JSON.stringify(updatedReflections));
    };

    return (
        <ReflectionContext.Provider value={{ isReflectionMode, toggleReflectionMode, reflections, saveReflection }}>
            {children}
        </ReflectionContext.Provider>
    );
}

export function useReflection() {
    const context = useContext(ReflectionContext);
    if (context === undefined) {
        throw new Error('useReflection must be used within a ReflectionProvider');
    }
    return context;
}
