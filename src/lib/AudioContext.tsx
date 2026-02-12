"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

interface AudioContextType {
    isPlaying: boolean;
    currentTrack: string | null;
    isMuted: boolean;
    isLoading: boolean;
    playTrack: (track: string, playlist?: string[]) => void;
    pauseTrack: () => void;
    toggleMute: () => void;
    playNext: () => void;
    playPrevious: () => void;
    seek: (time: number) => void;
    currentTrackIndex: number;
    playlist: string[];
    currentTime: number;
    duration: number;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [currentTrack, setCurrentTrack] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [playlist, setPlaylist] = useState<string[]>([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio element
        audioRef.current = new Audio();

        const audio = audioRef.current;

        const handleLoadStart = () => setIsLoading(true);
        const handleWaiting = () => setIsLoading(true);
        const handlePlaying = () => {
            setIsLoading(false);
            setIsPlaying(true);
        };
        const handlePause = () => {
            setIsLoading(false);
            setIsPlaying(false);
        };
        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTrack(null);
            setIsLoading(false);
            setCurrentTime(0);
        };
        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };
        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
            setIsLoading(false);
        };
        const handleError = (e: Event) => {
            console.error("Audio error:", e);
            setIsLoading(false);
            setIsPlaying(false);
        };

        audio.addEventListener('loadstart', handleLoadStart);
        audio.addEventListener('waiting', handleWaiting);
        audio.addEventListener('playing', handlePlaying);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('loadstart', handleLoadStart);
                audioRef.current.removeEventListener('waiting', handleWaiting);
                audioRef.current.removeEventListener('playing', handlePlaying);
                audioRef.current.removeEventListener('pause', handlePause);
                audioRef.current.removeEventListener('ended', handleEnded);
                audioRef.current.removeEventListener('error', handleError);
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const playTrack = (track: string, newPlaylist?: string[]) => {
        if (!audioRef.current) return;

        if (newPlaylist) {
            setPlaylist(newPlaylist);
            const index = newPlaylist.indexOf(track);
            setCurrentTrackIndex(index);
        } else if (playlist.length > 0 && playlist.includes(track)) {
            const index = playlist.indexOf(track);
            setCurrentTrackIndex(index);
        }

        if (currentTrack === track) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            }
        } else {
            // New track: set src immediately and attempt play
            audioRef.current.src = track;
            setCurrentTrack(track);
            // isLoading will be set by loadstart/waiting events
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        }
    };

    const playNext = () => {
        if (playlist.length === 0 || currentTrackIndex === -1 || currentTrackIndex >= playlist.length - 1) return;
        playTrack(playlist[currentTrackIndex + 1]);
    };

    const playPrevious = () => {
        if (playlist.length === 0 || currentTrackIndex <= 0) return;
        playTrack(playlist[currentTrackIndex - 1]);
    };

    const seek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const pauseTrack = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    return (
        <AudioContext.Provider value={{
            isPlaying,
            currentTrack,
            isMuted,
            isLoading,
            playTrack,
            pauseTrack,
            toggleMute,
            playNext,
            playPrevious,
            seek,
            currentTrackIndex,
            playlist,
            currentTime,
            duration
        }}>
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
