"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Sparkles, User, RefreshCw, X } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

interface Message {
    role: "user" | "kuvalaya";
    content: string;
}

const promptChips = [
    "Why did the palace feel empty?",
    "What is the meaning of Vairagya?",
    "How does one practice compassion?",
    "Do you regret leaving your kingdom?"
];

export default function AskKuvalaya() {
    const [isActive, setIsActive] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isActive) {
            scrollToBottom();
        }
    }, [messages, isActive, isLoading]);

    const fetchResponse = async (currentMessages: Message[]) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: currentMessages }),
            });

            if (!response.ok) {
                const data = await response.json();

                // Specific error messages based on status codes
                if (response.status === 401 || response.status === 403) {
                    throw new Error("Service configuration issue.");
                } else if (response.status === 429) {
                    throw new Error("Too many requests, please wait.");
                } else if (response.status >= 500) {
                    throw new Error("AI service temporarily unavailable.");
                }

                // Fallback
                throw new Error(data.error || "Something went wrong.");
            }

            const data = await response.json();
            setMessages((prev) => [...prev, { role: "kuvalaya", content: data.reply }]);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        const newMessages: Message[] = [...messages, { role: "user", content: text }];
        setMessages(newMessages);
        setInputValue("");

        await fetchResponse(newMessages);
    };

    const handleRetry = () => {
        if (messages.length === 0) return;
        fetchResponse(messages);
    };

    const startChat = (initialPrompt?: string) => {
        setIsActive(true);
        if (initialPrompt) {
            handleSend(initialPrompt);
        }
    };

    return (
        <Section id="ask-kuvalaya" background="stone" className="py-24 border-t border-maroon/10 relative">
            <div className="max-w-4xl mx-auto">

                {!isActive ? (
                    // Intro View
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <div className="inline-block p-4 bg-maroon/5 rounded-full mb-6">
                            <Sparkles className="w-10 h-10 text-maroon opacity-80" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-ink mb-6">Ask Prince Kuvalaya</h2>
                        <p className="text-xl font-serif text-ink/70 italic max-w-2xl mx-auto mb-10">
                            "I have walked the path from royalty to renunciation. Ask me of my journey, or the doubts that burden your own heart."
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-2xl mx-auto">
                            {promptChips.map((prompt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => startChat(prompt)}
                                    className="px-4 py-2 bg-white/60 border border-ink/10 rounded-full text-ink/80 text-sm hover:bg-maroon/10 hover:border-maroon/30 hover:text-maroon transition-all duration-300 font-serif"
                                >
                                    "{prompt}"
                                </button>
                            ))}
                        </div>

                        <Button
                            onClick={() => startChat()}
                            size="lg"
                            className="bg-maroon text-white hover:bg-maroon/90 px-8 py-4 text-lg shadow-xl shadow-maroon/20"
                        >
                            Start Conversation
                        </Button>

                        <p className="mt-8 text-xs text-ink/40 uppercase tracking-widest">
                            Powered by AI • Responses for reflection only
                        </p>
                    </motion.div>
                ) : (
                    // Chat Interface
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-paper rounded-xl shadow-2xl border border-ink/5 overflow-hidden flex flex-col h-[600px] max-h-[80vh] relative"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-ink/5 bg-white/40 flex justify-between items-center backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center border border-maroon/20">
                                    <Sparkles className="w-5 h-5 text-maroon" />
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-ink text-lg">Prince Kuvalaya</h3>
                                    <p className="text-xs text-ink/50 uppercase tracking-wider">Reflective AI Persona</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsActive(false)}
                                className="p-2 hover:bg-ink/5 rounded-full transition-colors text-ink/50 hover:text-ink"
                                title="Close Chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-paper scroll-smooth">
                            {messages.length === 0 && !isLoading && (
                                <div className="text-center text-ink/40 py-20 italic font-serif">
                                    "The silence is yours to break..."
                                </div>
                            )}

                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed font-serif
                                            ${msg.role === "user"
                                                ? "bg-white text-ink border border-ink/10 rounded-br-none"
                                                : "bg-[#F3EFE0] text-ink/90 border border-maroon/10 rounded-bl-none"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-[#F3EFE0] p-4 rounded-2xl rounded-bl-none border border-maroon/5 flex gap-2 items-center">
                                        <div className="w-2 h-2 bg-maroon/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <div className="w-2 h-2 bg-maroon/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <div className="w-2 h-2 bg-maroon/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            )}
                            {error && (
                                <div className="flex justify-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm border border-red-100 flex items-center gap-2">
                                            <X className="w-4 h-4" />
                                            {error}
                                        </div>
                                        <button
                                            onClick={handleRetry}
                                            className="text-xs text-maroon hover:underline flex items-center gap-1"
                                        >
                                            <RefreshCw className="w-3 h-3" /> Retry
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white/60 border-t border-ink/5 backdrop-blur-sm">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask a question..."
                                    className="flex-1 bg-white border border-ink/10 rounded-full px-5 py-3 text-ink focus:outline-none focus:border-maroon/40 focus:ring-1 focus:ring-maroon/20 transition-all font-serif placeholder:italic"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    className="p-3 bg-maroon text-white rounded-full hover:bg-maroon/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </div>
        </Section>
    );
}
