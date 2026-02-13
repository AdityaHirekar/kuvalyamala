"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { ChevronDown, Smile, Star, Cloud } from "lucide-react";

export default function KidsHero() {
    const { t } = useLanguage();

    const scrollToStory = () => {
        document.getElementById("chapters")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-sky-100 text-slate-800 font-rounded selection:bg-yellow-200">

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ x: [0, 100, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-20 left-10 text-white/60"
                >
                    <Cloud className="w-24 h-24" />
                </motion.div>
                <motion.div
                    animate={{ x: [0, -150, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-40 right-20 text-white/60"
                >
                    <Cloud className="w-32 h-32" />
                </motion.div>

                {/* Sun */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-300 rounded-full blur-2xl opacity-50"
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-6">

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                >
                    <span className="inline-block px-4 py-2 bg-yellow-300 text-yellow-800 rounded-full text-sm font-bold shadow-sm mb-4">
                        ✨ A Story for You ✨
                    </span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-bold text-blue-600 drop-shadow-sm">
                    The Happy Prince
                </h1>

                <p className="text-xl md:text-2xl text-slate-600 max-w-2xl leading-relaxed">
                    Join Prince Kuvalaya on a fun adventure to find the secret of <span className="text-orange-500 font-bold">Trace Happiness</span>!
                </p>

                <div className="flex gap-4 mt-8">
                    <button
                        onClick={scrollToStory}
                        className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                    >
                        <Smile className="w-6 h-6" />
                        Start Adventure
                    </button>
                </div>
            </div>

            {/* Bouncing Arrow */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10"
            >
                <ChevronDown className="w-8 h-8 text-blue-400 opacity-50" />
            </motion.div>

        </section>
    );
}
