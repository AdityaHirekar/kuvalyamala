import React from "react";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { useKidsMode } from "@/lib/KidsModeContext";

export default function Footer() {
    const { t } = useLanguage();
    const { isKidsMode, toggleKidsMode } = useKidsMode(); // We might not need toggle here but good to have context

    // Kids Mode Theme
    if (isKidsMode) {
        return (
            <footer className="bg-sky-900 text-white pt-16 pb-28 px-6 relative overflow-hidden font-rounded">
                {/* Playful Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-300 rounded-full blur-2xl" />
                    <div className="absolute bottom-10 right-10 w-60 h-60 bg-pink-400 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                </div>

                <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
                    <div className="mb-4">
                        <h4 className="text-3xl font-bold mb-2 tracking-wide text-yellow-300 drop-shadow-sm">
                            {t.footer.title}
                        </h4>
                        <p className="text-blue-100 text-lg font-medium">
                            {t.footer.subtitle}
                        </p>
                    </div>

                    <div className="w-full h-1 bg-white/20 rounded-full max-w-xs mx-auto" />

                    <div className="flex flex-col items-center gap-2 text-sm text-blue-200">
                        <p className="opacity-80">{t.footer.project}</p>
                        <a href="https://github.com/AdityaHirekar/kuvalyamala.git" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors flex items-center gap-2 mt-2 font-bold bg-white/10 px-4 py-2 rounded-full hover:bg-white/20">
                            <Github className="w-5 h-5" /> {t.footer.source}
                        </a>
                    </div>
                </div>
            </footer>
        );
    }

    // Default Theme
    return (
        <footer className="bg-ink text-paper pt-16 pb-28 px-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-maroon rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
                <div className="mb-4">
                    <h4 className="font-serif text-2xl font-bold mb-2 tracking-wide">{t.footer.title}</h4>
                    <p className="text-white/60 text-sm font-serif italic">
                        {t.footer.subtitle}
                    </p>
                </div>

                <div className="w-full h-px bg-white/10 max-w-xs mx-auto" />

                <div className="flex flex-col items-center gap-2 text-sm text-white/40">
                    <p>{t.footer.project}</p>
                    <a href="https://github.com/AdityaHirekar/kuvalyamala.git" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2 mt-2">
                        <Github className="w-4 h-4" /> {t.footer.source}
                    </a>
                </div>

                <div className="text-[10px] text-white/20 mt-8 uppercase tracking-widest">
                    {t.footer.rights}
                </div>
            </div>
        </footer>
    );
}
