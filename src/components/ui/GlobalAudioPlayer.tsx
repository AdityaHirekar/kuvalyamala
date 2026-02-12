"use client";

import React, { useEffect, useState } from "react";
import { useAudio } from "@/lib/AudioContext";
import { Play, Pause, SkipBack, SkipForward, X, Volume2, VolumeX, Disc } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { chapters } from "@/components/sections/Chapters";

export default function GlobalAudioPlayer() {
    const {
        currentTrack,
        isPlaying,
        isLoading,
        playTrack,
        pauseTrack,
        playNext,
        playPrevious,
        currentTrackIndex,
        playlist,
        isMuted,
        toggleMute,
        currentTime,
        duration,
        seek
    } = useAudio();

    const [isVisible, setIsVisible] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [localTime, setLocalTime] = useState(0);

    // Sync local time with context time unless dragging
    useEffect(() => {
        if (!isDragging) {
            setLocalTime(currentTime);
        }
    }, [currentTime, isDragging]);

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        setLocalTime(time);
        seek(time);
    };

    const handleSeekStart = () => setIsDragging(true);
    const handleSeekEnd = () => setIsDragging(false);

    // Show player when a track is active
    useEffect(() => {
        if (currentTrack) {
            setIsVisible(true);
        }
    }, [currentTrack]);

    if (!currentTrack) return null;

    // Find current chapter info
    const currentChapter = chapters.find(c => c.audio === currentTrack);
    const title = currentChapter ? currentChapter.title : "Introduction";
    const subtitle = currentChapter ? `Chapter ${currentChapter.id}` : "Prologue";

    const handlePlayPause = () => {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack(currentTrack);
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        pauseTrack();
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none"
                >
                    <div className="max-w-xl mx-auto bg-paper/90 backdrop-blur-md border border-maroon/20 rounded-full shadow-2xl p-2 pr-6 flex items-center gap-4 pointer-events-auto relative overflow-hidden">

                        {/* Progress Bar / Scrubber */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-maroon/10 group-hover:h-2 transition-all cursor-pointer">
                            <div
                                className="h-full bg-maroon/40 absolute top-0 left-0 pointer-events-none"
                                style={{ width: `${(localTime / duration) * 100}%` }}
                            />
                            <input
                                type="range"
                                min={0}
                                max={duration || 100}
                                value={localTime}
                                onChange={handleSeek}
                                onMouseDown={handleSeekStart}
                                onMouseUp={handleSeekEnd}
                                onTouchStart={handleSeekStart}
                                onTouchEnd={handleSeekEnd}
                                className="w-full h-full opacity-0 cursor-pointer absolute top-0 left-0 z-10"
                            />
                        </div>

                        {/* Album Art / Icon */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isPlaying ? 'bg-maroon text-white' : 'bg-maroon/10 text-maroon'}`}>
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Disc className={`w-6 h-6 ${isPlaying ? 'animate-spin-slow' : ''}`} />
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-maroon truncate font-serif">{title}</h4>
                            <div className="flex items-center gap-2">
                                <p className="text-xs text-ink/60 truncate">{subtitle}</p>
                                <span className="text-[10px] text-ink/40 font-mono">
                                    {formatTime(localTime)} / {formatTime(duration)}
                                </span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={playPrevious}
                                disabled={currentTrackIndex <= 0}
                                className="p-2 text-ink/40 hover:text-maroon disabled:opacity-30 transition-colors"
                            >
                                <SkipBack className="w-5 h-5" />
                            </button>

                            <button
                                onClick={handlePlayPause}
                                className="w-10 h-10 rounded-full bg-maroon text-white flex items-center justify-center hover:bg-maroon/90 transition-colors shadow-lg"
                            >
                                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                            </button>

                            <button
                                onClick={playNext}
                                disabled={currentTrackIndex === -1 || currentTrackIndex >= playlist.length - 1} // Disable if last or no playlist
                                className="p-2 text-ink/40 hover:text-maroon disabled:opacity-30 transition-colors"
                            >
                                <SkipForward className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Close/Mute (Optional) */}
                        <button
                            onClick={handleClose}
                            className="p-2 text-ink/30 hover:text-red-500 transition-colors ml-2"
                        >
                            <X className="w-4 h-4" />
                        </button>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
