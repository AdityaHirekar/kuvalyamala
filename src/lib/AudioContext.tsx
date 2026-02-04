"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

interface AudioContextType {
    isPlaying: boolean;
    currentTrack: string | null;
    isMuted: boolean;
    playTrack: (track: string) => void;
    pauseTrack: () => void;
    toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [currentTrack, setCurrentTrack] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio element
        audioRef.current = new Audio();
        audioRef.current.onended = () => {
            setIsPlaying(false);
            setCurrentTrack(null);
        };
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const playTrack = (track: string) => {
        if (!audioRef.current) return;

        if (currentTrack === track && isPlaying) {
            // Pause if clicking same track
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            // Play new track
            if (currentTrack !== track) {
                audioRef.current.src = track;
                setCurrentTrack(track);
            }
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            setIsPlaying(true);
        }
    };

    const pauseTrack = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    return (
        <AudioContext.Provider value={{ isPlaying, currentTrack, isMuted, playTrack, pauseTrack, toggleMute }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
}
