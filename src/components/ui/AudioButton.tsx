"use client";

import React from "react";
import { Play, Pause, Volume2, Loader2 } from "lucide-react";
import { useAudio } from "@/lib/AudioContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AudioButtonProps {
    track: string;
    label?: string;
    className?: string;
    playlist?: string[];
}

export default function AudioButton({ track, label, className, playlist: customPlaylist }: AudioButtonProps) {
    const { isPlaying, currentTrack, playTrack, isLoading } = useAudio();
    const isCurrentTrack = currentTrack === track;
    const isActive = isCurrentTrack && isPlaying;
    const isBuffering = isCurrentTrack && isLoading;

    // Use custom playlist if provided, otherwise default to chapters
    const playlist = customPlaylist || [
        "/audio/chapter-1.mp3",
        "/audio/chapter-2.mp3",
        "/audio/chapter-3.mp3",
        "/audio/chapter-4.mp3",
        "/audio/chapter-5.mp3"
    ];

    return (
        <button
            onClick={() => playTrack(track, playlist)}
            className={cn(
                "group flex items-center gap-3 rounded-full pr-4 pl-1 py-1 transition-all duration-300 border",
                isActive || isBuffering
                    ? "bg-maroon text-white border-maroon w-auto"
                    : "bg-paper text-maroon border-maroon/20 hover:border-maroon hover:bg-maroon/5",
                className
            )}
            aria-label={isActive ? "Pause narration" : "Play narration"}
            disabled={isBuffering}
        >
            <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                isActive || isBuffering ? "bg-white/20" : "bg-maroon/10 group-hover:bg-maroon/20"
            )}>
                {isBuffering ? (
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                ) : isActive ? (
                    <Pause className="w-4 h-4 fill-current" />
                ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
            </div>

            <div className="flex flex-col text-left">
                <span className={cn("text-xs font-bold uppercase tracking-wider", isActive || isBuffering ? "text-white" : "text-maroon")}>
                    {isBuffering ? "Loading..." : isActive ? "Now Playing" : "Listen"}
                </span>
                {label && (
                    <span className={cn("text-[10px]", isActive || isBuffering ? "text-white/80" : "text-ink/50")}>
                        {label}
                    </span>
                )}
            </div>

            {isActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="ml-2 flex items-end gap-0.5 h-3"
                >
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ height: ["20%", "100%", "20%"] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }}
                            className="w-1 bg-white/50 rounded-full"
                        />
                    ))}
                </motion.div>
            )}
        </button>
    );
}
