"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RefreshCw, Sparkles } from "lucide-react";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const questions = [
    {
        id: 1,
        text: "Who is the author of Kuvalaya-mālā?",
        options: ["Haribhadra Suri", "Uddyotana Sūri", "Hemachandra", "Jinadasa"],
        correct: 1, // index
    },
    {
        id: 2,
        text: "What is the central ethical concept explored in the text?",
        options: ["Ahimsa (Non-violence)", "Dana (Charity)", "Tapas (Austerity)", "Puja (Worship)"],
        correct: 0,
    },
    {
        id: 3,
        text: "In which language was the text primarily written?",
        options: ["Sanskrit", "Pali", "Prakrit", "Apabhramsha"],
        correct: 2,
    },
    {
        id: 4,
        text: "What is the literary form of Kuvalaya-mālā?",
        options: ["Epic Poem", "Prose only", "Drama", "Champū (Prose + Poetry)"],
        correct: 3,
    },
];

export default function Quiz() {
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const handleOptionClick = (idx: number) => {
        if (selected !== null) return;
        setSelected(idx);

        if (idx === questions[currentQ].correct) {
            setScore(score + 1);
        }

        setTimeout(() => {
            if (currentQ < questions.length - 1) {
                setCurrentQ(currentQ + 1);
                setSelected(null);
            } else {
                setShowResult(true);
            }
        }, 1500);
    };

    const resetQuiz = () => {
        setCurrentQ(0);
        setSelected(null);
        setShowResult(false);
        setScore(0);
    };

    return (
        <Section id="quiz" background="paper">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-2">Test Your Knowledge</h2>
                    <p className="text-ink/60">Take a quick quiz to verify your understanding.</p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!showResult ? (
                        <motion.div
                            key="question"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="relative"
                        >
                            <Card className="min-h-[300px] flex flex-col justify-center">
                                <span className="text-sm font-bold text-maroon mb-4 block uppercase tracking-wider">
                                    Question {currentQ + 1} of {questions.length}
                                </span>
                                <h3 className="text-xl md:text-2xl font-bold text-ink mb-8">
                                    {questions[currentQ].text}
                                </h3>

                                <div className="grid grid-cols-1 gap-3">
                                    {questions[currentQ].options.map((option, idx) => {
                                        const isSelected = selected === idx;
                                        const isCorrect = idx === questions[currentQ].correct;
                                        const showCorrect = selected !== null && isCorrect;
                                        const showWrong = isSelected && !isCorrect;

                                        let btnVariant: "outline" | "primary" | "secondary" = "outline";
                                        if (showCorrect) btnVariant = "secondary"; // Greenish handling via CSS usually, but reusing variants
                                        // We'll rely on class manipulation for success/error colors since variants are limited

                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleOptionClick(idx)}
                                                disabled={selected !== null}
                                                className={`w-full text-left p-4 rounded-lg border-2 transition-all flex justify-between items-center
                            ${selected === null ? "hover:bg-ink/5 border-ink/10" : ""}
                            ${showCorrect ? "bg-green-100 border-green-500 text-green-900" : ""}
                            ${showWrong ? "bg-red-100 border-red-500 text-red-900" : ""}
                            ${selected !== null && !showCorrect && !showWrong ? "opacity-50 border-transparent" : ""}
                          `}
                                            >
                                                <span className="font-medium">{option}</span>
                                                {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                                                {showWrong && <XCircle className="w-5 h-5 text-red-600" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <Card className="py-12">
                                <div className="mb-6">
                                    {score === questions.length ? (
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                                            <CheckCircle2 className="w-10 h-10" />
                                        </div>
                                    ) : (
                                        <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto text-gold">
                                            <Sparkles className="w-10 h-10" />
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-3xl font-serif font-bold text-ink mb-2">Quiz Completed!</h3>
                                <p className="text-xl text-ink/70 mb-8">
                                    You scored <span className="font-bold text-maroon">{score}</span> out of {questions.length}
                                </p>
                                <Button onClick={resetQuiz} className="gap-2">
                                    <RefreshCw className="w-4 h-4" /> Try Again
                                </Button>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Section>
    );
}
