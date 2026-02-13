"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Lock } from "lucide-react";
import Section from "@/components/ui/Section";
import Modal from "@/components/ui/Modal";
import AudioButton from "@/components/ui/AudioButton";
import Image from "next/image";

import BackgroundVerse from "@/components/ui/BackgroundVerse";
import VerseRevealModal from "@/components/ui/VerseRevealModal";
import { verses, VerseData } from "@/lib/verses";

// Interactive Theme Chip Component
const ThemeChip = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button
        onClick={onClick}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-maroon/10 text-maroon text-xs font-bold uppercase tracking-wider hover:bg-maroon hover:text-white transition-colors ml-2 align-middle cursor-pointer border border-maroon/20"
    >
        <Sparkles className="w-3 h-3" />
        {label}
    </button>
);

import { ReflectionOption } from "@/components/ui/ReflectionModal";

import { getChapters, Chapter } from "@/lib/chaptersData";
import { useLanguage } from "@/lib/LanguageContext";
import { useKidsMode } from "@/lib/KidsModeContext";
import KidsChapters from "@/components/sections/KidsChapters";

export { getChapters }; // Replacing export { chapters } 

import ReflectionModal from "@/components/ui/ReflectionModal";
import ReflectionSummary from "@/components/ui/ReflectionSummary";
import { useReflection } from "@/lib/ReflectionContext";

export default function Chapters() {
    const { language, t } = useLanguage();
    const { isKidsMode } = useKidsMode();
    const chapters = getChapters(language);

    if (isKidsMode) return <KidsChapters />;

    const [activeTheme, setActiveTheme] = useState<{ label: string; desc: string; modern: string } | null>(null);
    const [revealedVerse, setRevealedVerse] = useState<VerseData | null>(null);
    const [showSummary, setShowSummary] = useState(false);
    const [canShowPersistent, setCanShowPersistent] = useState(false);
    const { isReflectionMode, isChapterUnlocked, reflections } = useReflection();

    // Check if journey was already completed for persistent summary (on mount)
    React.useEffect(() => {
        const stored = localStorage.getItem('userReflections');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed[5]) {
                setCanShowPersistent(true);
            }
        }
    }, []);

    return (
        <Section id="chapters" background="paper" className="py-0 px-0 md:px-0">
            {/* Prologue / Introduction */}
            <div className="max-w-3xl mx-auto text-center py-24 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <p className="text-xl md:text-2xl font-serif text-ink italic leading-loose mb-8">
                        "In the tapestry of ancient India, where kingdoms rose and fell and travellers carried stories across dusty roads, wisdom was often taught through journeys.
                    </p>
                    <p className="text-xl md:text-2xl font-serif text-ink italic leading-loose mb-8">
                        Kuvalaya-mālā is one such tale — composed in the 8th century by Uddyotana Sūri — where the outer road mirrors an inner awakening.
                    </p>
                    <p className="text-xl md:text-2xl font-serif text-ink italic leading-loose text-maroon">
                        Our story begins in the royal city of Jalore, in a palace touched by gold and shadow alike."
                    </p>
                    <div className="w-16 h-1 bg-maroon/20 mx-auto mt-12 mb-0 rounded-full" />
                </motion.div>
            </div>

            {chapters.map((chapter, index) => {
                const isUnlocked = !isReflectionMode || isChapterUnlocked(chapter.id);

                // If in reflection mode and NOT unlocked, show a locked state placeholder
                if (!isUnlocked) {
                    return (
                        <div key={chapter.id} className="py-24 flex justify-center items-center bg-paper/50 min-h-[50vh] relative overflow-hidden">
                            <div className="absolute inset-0 backdrop-blur-[2px] z-10" />
                            <div className="z-20 text-center opacity-50">
                                <Lock className="w-12 h-12 mx-auto mb-4 text-ink/30" />
                                <p className="font-serif text-ink/40 tracking-widest uppercase text-sm">{t.ui.locked}</p>
                                <p className="font-serif italic text-ink/30">{t.ui.lockedHint}</p>
                            </div>
                        </div>
                    );
                }

                return (
                    <motion.div
                        key={chapter.id}
                        id={`chapter-${chapter.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className={`py-24 px-6 md:px-12 lg:px-24 ${chapter.bg} min-h-[90vh] flex items-center relative overflow-hidden`}>
                            {/* Background Verse - Whispers of the Text */}
                            <BackgroundVerse chapterId={chapter.id} onReveal={() => setRevealedVerse(verses[chapter.id])} />

                            <div className={`max-w-6xl mx-auto w-full flex flex-col gap-12 ${chapter.align === "left" ? "md:flex-row" : "md:flex-row-reverse"} relative z-10 pointer-events-none`}>

                                {/* Image Area */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8 }}
                                    className="flex-1 pointer-events-auto"
                                >
                                    <div className="w-full aspect-[4/5] md:aspect-[3/4] rounded-sm bg-ink/5 border border-ink/10 relative overflow-hidden group shadow-lg">
                                        {chapter.image ? (
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={chapter.image}
                                                    alt={chapter.title}
                                                    fill
                                                    className="object-cover sepia-[0.2] hover:sepia-0 transition-all duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-60" />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/5 transition-colors duration-700" />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                                    {/* Abstract Geomerty as placeholder */}
                                                    <div className="w-48 h-48 border-4 border-ink/20 rounded-full" />
                                                    <div className="absolute w-64 h-64 border border-ink/10 rounded-full" />
                                                </div>
                                            </>
                                        )}
                                        <span className="absolute bottom-4 right-4 text-xs font-serif italic text-white/80 z-10 px-2 py-1 bg-black/20 backdrop-blur-sm rounded">
                                            {t.ui.visual}: {chapter.title}
                                        </span>
                                    </div>
                                </motion.div>

                                {/* Text Area */}
                                <motion.div
                                    initial={{ opacity: 0, x: chapter.align === "left" ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="flex-1 flex flex-col justify-center"
                                >
                                    <div className="pointer-events-auto">
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="text-maroon font-serif font-bold tracking-widest uppercase text-sm">{t.ui.chapter} 0{chapter.id}</span>
                                            <div className="h-px bg-maroon/20 flex-grow" />
                                            <AudioButton track={chapter.audio} />
                                        </div>

                                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-ink mb-8 leading-tight">{chapter.title}</h2>

                                        <div className="text-lg md:text-xl leading-loose font-serif text-ink/80 mb-8 text-justify">
                                            <p className="mb-6">
                                                {chapter.narrative}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mt-6">
                                                {chapter.themes.map((theme, i) => (
                                                    <ThemeChip key={i} label={theme.label} onClick={() => setActiveTheme(theme)} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                            </div>
                        </div>


                        {/* Reflection Trigger / Modal */}
                        <ReflectionModal
                            chapterId={chapter.id}
                            title={chapter.reflection.title}
                            question={chapter.reflection.question}
                            options={chapter.reflection.options}
                            feedback={chapter.reflection.feedback}
                            onComplete={() => {
                                // If this is the last chapter (5) and we just completed it, show summary
                                if (chapter.id === 5) {
                                    setShowSummary(true);
                                } else {
                                    // Smooth scroll to next chapter after a slight delay for animation
                                    setTimeout(() => {
                                        const nextChapterElement = document.getElementById(`chapter-${chapter.id + 1}`);
                                        if (nextChapterElement) {
                                            nextChapterElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }
                                    }, 600);
                                }
                            }}
                        />
                    </motion.div>
                )
            })}

            <Modal isOpen={!!activeTheme} onClose={() => setActiveTheme(null)} title={activeTheme?.label}>
                {activeTheme && (
                    <div className="max-w-prose mx-auto">
                        <p className="text-xl font-serif text-ink mb-6 italic leading-relaxed">
                            "{activeTheme.desc}"
                        </p>
                        <div className="bg-maroon/5 border-l-4 border-maroon p-6">
                            <h4 className="font-bold text-maroon text-sm uppercase tracking-wider mb-2">{t.ui.modernReflection}</h4>
                            <p className="text-ink/80">
                                {activeTheme.modern}
                            </p>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Verse Reveal Modal */}
            <VerseRevealModal
                isOpen={!!revealedVerse}
                onClose={() => setRevealedVerse(null)}
                verse={revealedVerse}
            />

            {/* Reflection Summary Modal (Popup) */}
            {showSummary && (
                <ReflectionSummary onClose={() => {
                    setShowSummary(false);
                    setCanShowPersistent(true);
                }} />
            )}

            {/* Persistent Reflection Mirror (End of Journey) */}
            {reflections[5] && !showSummary && canShowPersistent && (
                <ReflectionSummary isEmbedded />
            )}
        </Section >
    );
}
