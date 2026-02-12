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

interface Chapter {
    id: number;
    title: string;
    narrative: string;
    audio: string;
    image: string;
    themes: { label: string; desc: string; modern: string }[];
    reflection: {
        title: string;
        question: string;
        options: ReflectionOption[];
        feedback: { deep: string; shallow: string };
    };
    bg: string;
    align: string;
}

const chapters: Chapter[] = [
    {
        id: 1,
        title: "The Palace & The Restless Heart",
        narrative: `The golden spires of Jalore pierced the sky, a testament to King Kuvalayachandra's power. Yet, amidst the fragrant garlands and courtly music, Prince Kuvalaya felt a gnawing emptiness. The silks that draped him felt like chains; the praise of poets sounded like hollow echoes. Sitting by the ornate window, watching the sun set over his kingdom, a profound question took root in his heart: "Is this theatre of pleasure all there is to existence?" It was here, in the lap of unparalleled luxury, that the first seed of renunciation—Vairagya—was quietly sown.`,
        audio: "/audio/chapter-1.mp3",
        image: "/images/chapter-1-v2.png",
        themes: [
            {
                label: "Vairagya (Detachment)",
                desc: "The realization that worldly pleasures are fleeting and do not offer lasting happiness.",
                modern: "In a consumerist world, Vairagya invites us to find joy in simplicity and inner contentment rather than accumulation."
            }
        ],
        reflection: {
            title: "Impermanence / Vairāgya",
            question: "When do you feel most empty, even when things seem 'good'?",
            options: [
                { text: "When I have everything I wanted but still feel bored.", type: "shallow", traits: ["Awareness"] },
                { text: "When I realize that nothing I have will last forever.", type: "deep", traits: ["Detachment", "Awareness"] },
                { text: "When others don't appreciate my success.", type: "shallow", traits: ["Ego"] },
                { text: "When I see that my comfort requires others' labor.", type: "deep", traits: ["Compassion", "Awareness"] }
            ],
            feedback: {
                deep: "You've touched the root of Vairagya—seeing beyond the surface comfort to the transient nature of reality.",
                shallow: "It's natural to feel that way. Kuvalaya felt it too—that the external world often fails to satisfy the internal spirit."
            }
        },
        bg: "bg-paper",
        align: "left"
    },
    {
        id: 2,
        title: "The Road & The Many Worlds",
        narrative: `Trading his royal robes for the dust of the road, Kuvalaya stepped into the vast, chaotic tapestry of India. He walked the great trade routes where caravans carried spices and stories. He stood in bustling marketplaces where eighteen languages mingled in the air—Apabhramsha poets debating with Sanskrit scholars, merchants haggling in Prakrit, thieves whispering in secret codes. He saw the raw beauty of art intertwined with the ugliness of greed. The world was not the idyllic garden of the palace; it was detailed, suffering, vibrant, and utterly human.`,
        audio: "/audio/chapter-2.mp3",
        image: "/images/chapter-2.png",
        themes: [
            {
                label: "Society & Culture",
                desc: "The text vividly documents 8th-century Indian society, capturing the diversity of languages, trades, and customs.",
                modern: "Recognizing our shared history of diversity helps foster tolerance and cultural appreciation today."
            }
        ],
        reflection: {
            title: "Karma / Choice",
            question: "When you meet someone different from you, what is your first instinct?",
            options: [
                { text: "To judge them based on how they look.", type: "shallow", traits: ["Ego"] },
                { text: "To wonder what their life experience has been like.", type: "deep", traits: ["Compassion", "Awareness"] },
                { text: "To avoid them if possible.", type: "shallow", traits: ["Control"] },
                { text: "To see myself in them.", type: "deep", traits: ["Compassion"] }
            ],
            feedback: {
                deep: "This empathy is the bridge between worlds. Kuvalaya learned that every stranger holds a mirror to our own humanity.",
                shallow: "We often protect ourselves with judgment. The Prince had to unlearn his royal prejudices to truly see the world."
            }
        },
        bg: "bg-[#EAE5D9]",
        align: "right"
    },
    {
        id: 3,
        title: "Encounters & Trials",
        narrative: `The journey tested him not with swords, but with dilemmas. He met characters who wore masks of virtue to hide hearts of vice, and simple peasants who held deep wisdom. He witnessed the play of Karma in the lives of the people—how a moment of anger shattered a family, how a small act of kindness rippled through a village. Every face he met was a mirror, revealing the complexities of the human psyche—the interplay of passion (Kashaya) and reason. He realized that the true battlefield was not on a map, but within the mind.`,
        audio: "/audio/chapter-3.mp3",
        image: "/images/chapter-3.png",
        themes: [
            {
                label: "Karma (Action)",
                desc: "The law of cause and effect, where every intent and action shapes one's future and character.",
                modern: "Understanding that our choices have consequences empowers us to act with responsibility and foresight."
            }
        ],
        reflection: {
            title: "Compassion / Karuṇā",
            question: "What makes it hardest to be kind?",
            options: [
                { text: "When I am tired or stressed.", type: "shallow", traits: ["Control"] },
                { text: "When I feel the other person doesn't deserve it.", type: "deep", traits: ["Ego", "Awareness"] },
                { text: "When no one is watching.", type: "shallow", traits: ["Ego"] },
                { text: "When kindness requires me to give up something I value.", type: "deep", traits: ["Compassion", "Detachment"] }
            ],
            feedback: {
                deep: "True compassion challenges our ego. Kuvalaya found that kindness is most powerful when it is most difficult.",
                shallow: "Fatigue and stress are real barriers. Yet, the story suggests that kindness itself can be a source of strength."
            }
        },
        bg: "bg-paper",
        align: "left"
    },
    {
        id: 4,
        title: "The Monk & The Mirror",
        narrative: `In a quiet grove, shielded from the midday sun, he encountered a Jain monk whose stillness silenced the noise of the prince's mind. The monk did not preach; he simply held up a mirror of wisdom. "The violence you see in the world," the monk spoke softly, "is but a reflection of the violence within." He explained that true Ahimsa is not just the absence of killing, but the absence of the desire to harm. The Prince wept, realizing his own pride and anger were the true enemies he had been fleeing all along.`,
        audio: "/audio/chapter-4.mp3",
        image: "/images/chapter-4.png",
        themes: [
            {
                label: "Ahimsa (Non-Violence)",
                desc: "True non-violence begins in the mind. Aggressive thoughts lead to aggressive actions.",
                modern: "Addressing internal biases and anger is the first step towards creating a peaceful society."
            }
        ],
        reflection: {
            title: "Humility / Vinaya",
            question: "When someone points out your mistake, what is your immediate internal reaction?",
            options: [
                { text: "To defend myself and explain why I did it.", type: "shallow", traits: ["Ego", "Control"] },
                { text: "To feel shame and hide.", type: "shallow", traits: ["Ego"] },
                { text: "To observe the defensiveness without acting on it.", type: "deep", traits: ["Awareness", "Detachment"] },
                { text: "To allow the truth of it to change me.", type: "deep", traits: ["Awareness", "Compassion"] }
            ],
            feedback: {
                deep: "This openness is the essence of Vinaya (Humility). It transforms a mistake into a step towards liberation.",
                shallow: "Defense is the ego's shield. The monk taught Kuvalaya that dropping the shield is the only way to truly grow."
            }
        },
        bg: "bg-[#EAE5D9]",
        align: "right"
    },
    {
        id: 5,
        title: "The Inner Turn",
        narrative: `The journey ended where it truly began—within. Kuvalaya understood that true conquest was not of kingdoms, or even of the external world, but of the self—becoming a 'Jina' (Conqueror of Self). He cast aside the weight of his ego like an old garment. Standing under the vast, star-lit sky, he found a lightness he had never known in the palace. The story of the Prince ended, but the story of the Soul—liberated, compassionate, and awake—had just begun.`,
        audio: "/audio/chapter-5.mp3",
        image: "/images/chapter-5.png",
        themes: [
            {
                label: "Dharma (Duty/Ethics)",
                desc: "Dharma is the universal law of moral order that sustains life and leads to spiritual liberation.",
                modern: "Living with integrity and purpose (Dharma) provides a compass in navigating life's complexities."
            }
        ],
        reflection: {
            title: "Integration / Dharma in action",
            question: "What does 'conquering yourself' mean to you now?",
            options: [
                { text: "Being disciplined and strict.", type: "shallow", traits: ["Control"] },
                { text: "Understanding my own mind so it doesn't control me.", type: "deep", traits: ["Awareness", "Control"] },
                { text: "Being better than others.", type: "shallow", traits: ["Ego"] },
                { text: "Finding peace regardless of external circumstances.", type: "deep", traits: ["Detachment", "Awareness"] }
            ],
            feedback: {
                deep: "A profound realization. Like the Jina, you see that true victory is internal freedom.",
                shallow: "Discipline is a tool, but not the goal. The ultimate victory, as Kuvalaya found, is the peace that comes from understanding."
            }
        },
        bg: "bg-paper",
        align: "left"
    }
];

export { chapters }; // Export for Summary component

import ReflectionModal from "@/components/ui/ReflectionModal";
import ReflectionSummary from "@/components/ui/ReflectionSummary";
import { useReflection } from "@/lib/ReflectionContext";

export default function Chapters() {
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
                                <p className="font-serif text-ink/40 tracking-widest uppercase text-sm">Chapter Locked</p>
                                <p className="font-serif italic text-ink/30">Reflect on the previous path to continue.</p>
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
                                            Visual: {chapter.title}
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
                                            <span className="text-maroon font-serif font-bold tracking-widest uppercase text-sm">Chapter 0{chapter.id}</span>
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
                            <h4 className="font-bold text-maroon text-sm uppercase tracking-wider mb-2">Modern Reflection</h4>
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
