"use client";

import Hero from "@/components/sections/Hero";
import Context from "@/components/sections/Context";
import Chapters from "@/components/sections/Chapters";
import Values from "@/components/sections/Values";
import Reflections from "@/components/sections/Reflections";
import Quiz from "@/components/sections/QuizSection";
import Footer from "@/components/sections/Footer";
import { AudioProvider } from "@/lib/AudioContext";
import GlobalMute from "@/components/ui/GlobalMute";

export default function Home() {
  return (
    <AudioProvider>
      <main className="min-h-screen bg-paper overflow-x-hidden w-full m-0 p-0 selection:bg-maroon selection:text-white relative">
        <GlobalMute />
        <Hero />
        <Context />
        <Chapters />
        <Values />
        <Reflections />
        <Quiz />
        <Footer />
      </main>
    </AudioProvider>
  );
}
