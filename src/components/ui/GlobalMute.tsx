"use client";

import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/lib/AudioContext";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalMute() {
    const { isMuted, toggleMute } = useAudio();

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className={`fixed bottom-6 right-6 z-[100] p-3 rounded-full shadow-xl border-2 transition-colors ${isMuted
                ? "bg-maroon border-maroon text-white"
                : "bg-paper border-ink/10 text-ink hover:border-maroon"
                }`}
            aria-label={isMuted ? "Unmute all audio" : "Mute all audio"}
            title="Classroom Mode: Mute All"
        >
            <AnimatePresence mode="wait">
                {isMuted ? (
                    <motion.div key="muted" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <VolumeX className="w-6 h-6" />
                    </motion.div>
                ) : (
                    <motion.div key="unmuted" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Volume2 className="w-6 h-6" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
