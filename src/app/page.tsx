"use client";

import Hero from "@/components/sections/Hero";
import Context from "@/components/sections/Context";
import Chapters from "@/components/sections/Chapters";
import Values from "@/components/sections/Values";
import Reflections from "@/components/sections/Reflections";
import Quiz from "@/components/sections/QuizSection";
import Footer from "@/components/sections/Footer";
import { AudioProvider } from "@/lib/AudioContext";
import { VerseProvider } from "@/lib/VerseContext";
import GlobalMute from "@/components/ui/GlobalMute";
import VerseGlobalToggle from "@/components/ui/VerseGlobalToggle";
import GlobalAudioPlayer from "@/components/ui/GlobalAudioPlayer";
import { ReflectionProvider } from "@/lib/ReflectionContext";
import ReflectionToggle from "@/components/ui/ReflectionToggle";
import ReflectionsSummary from "@/components/sections/ReflectionsSummary";
// import { chapters } from "@/components/sections/Chapters"; // Removed
import AskKuvalaya from "@/components/sections/AskKuvalaya";
import { LanguageProvider } from "@/lib/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { KidsModeProvider } from "@/lib/KidsModeContext"; // Added KidsModeProvider import
import KidsModeToggle from "@/components/ui/KidsModeToggle";

export default function Home() {
  return (
    <LanguageProvider>
      <KidsModeProvider>
        <AudioProvider>
          <VerseProvider>
            <ReflectionProvider>
              <div className="relative min-h-screen font-sans text-ink bg-paper selection:bg-maroon/20">
                {/* Fixed UI Elements */}
                <ReflectionToggle />
                <VerseGlobalToggle />
                <GlobalMute />
                <LanguageSwitcher />
                <KidsModeToggle />

                {/* Main Scrollable Content */}
                <main className="relative z-10 flex flex-col min-h-screen">
                  {/* Audio Player is global but part of the flow */}
                  <GlobalAudioPlayer />

                  {/* Sections */}
                  <Hero />
                  <Context />
                  <Chapters />
                  <Reflections />
                  <Quiz /> {/* Changed QuizSection back to Quiz to match original import */}
                  <Values />
                  <AskKuvalaya />
                  <Footer />
                </main>

                {/* Background Texture/Grain Overlay */}
                <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply bg-[url('/images/paper-texture.jpg')] bg-repeat opacity-5" />
                <div className="fixed inset-0 z-50 pointer-events-none border-[12px] md:border-[20px] border-white/40" />
              </div>
            </ReflectionProvider>
          </VerseProvider>
        </AudioProvider>
      </KidsModeProvider>
    </LanguageProvider>
  );
}
