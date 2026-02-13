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

export default function Home() {
  return (
    <LanguageProvider>
      <AudioProvider>
        <VerseProvider>
          <ReflectionProvider>
            <main className="min-h-screen bg-paper overflow-x-hidden w-full m-0 p-0 selection:bg-maroon selection:text-white relative">
              <GlobalAudioPlayer />
              <GlobalMute />
              <VerseGlobalToggle />
              <ReflectionToggle />
              <LanguageSwitcher />
              <Hero />
              <Context />
              <Chapters />
              <Values />
              <Reflections />
              <Quiz />
              <ReflectionsSummary />
              <AskKuvalaya />
              <Footer />
            </main>
          </ReflectionProvider>
        </VerseProvider>
      </AudioProvider>
    </LanguageProvider>
  );
}
