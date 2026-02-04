"use client";

import React from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { useAudio } from "@/lib/AudioContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AudioButtonProps {
    track: string;
    label?: string;
    className?: string;
}

export default function AudioButton({ track, label, className }: AudioButtonProps) {
    const { isPlaying, currentTrack, playTrack } = useAudio();
    const isActive = currentTrack === track && isPlaying;

    return (
        <button
            onClick={() => playTrack(track)}
            className={cn(
                "group flex items-center gap-3 rounded-full pr-4 pl-1 py-1 transition-all duration-300 border",
                isActive
                    ? "bg-maroon text-white border-maroon w-auto"
                    : "bg-paper text-maroon border-maroon/20 hover:border-maroon hover:bg-maroon/5",
                className
            )}
            aria-label={isActive ? "Pause narration" : "Play narration"}
        >
            <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                isActive ? "bg-white/20" : "bg-maroon/10 group-hover:bg-maroon/20"
            )}>
                {isActive ? (
                    <Pause className="w-4 h-4 fill-current" />
                ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
            </div>

            <div className="flex flex-col text-left">
                <span className={cn("text-xs font-bold uppercase tracking-wider", isActive ? "text-white" : "text-maroon")}>
                    {isActive ? "Now Playing" : "Listen"}
                </span>
                {label && (
                    <span className={cn("text-[10px]", isActive ? "text-white/80" : "text-ink/50")}>
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
