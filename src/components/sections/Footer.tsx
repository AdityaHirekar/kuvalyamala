import React from "react";
import { Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-ink text-paper py-16 px-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-maroon rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
                <div className="mb-4">
                    <h4 className="font-serif text-2xl font-bold mb-2 tracking-wide">Kuvalaya-mālā</h4>
                    <p className="text-white/60 text-sm font-serif italic">
                        "Stories are the bridge between the known and the unknown."
                    </p>
                </div>

                <div className="w-full h-px bg-white/10 max-w-xs mx-auto" />

                <div className="flex flex-col items-center gap-2 text-sm text-white/40">
                    <p>An IKS Project by Aditya, Rakesh, Utsav and Piyush</p>
                    <a href="#" className="hover:text-white transition-colors flex items-center gap-2 mt-2">
                        <Github className="w-4 h-4" /> View Source
                    </a>
                </div>

                <div className="text-[10px] text-white/20 mt-8 uppercase tracking-widest">
                    © 2026 Educational Purpose Only
                </div>
            </div>
        </footer>
    );
}
