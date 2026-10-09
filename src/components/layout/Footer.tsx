import React from 'react';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4 fill-current" />
            </div>
            <div>
              <span className="font-extrabold text-base text-white tracking-tight">
                Learnova <span className="text-indigo-400">AI</span>
              </span>
              <p className="text-[11px] text-slate-400">Hackathon Prototype • Venture-Grade EdTech Platform</p>
            </div>
          </div>

          {/* Responsible AI Disclaimer */}
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 border border-slate-700/60 rounded-xl text-[11px] text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>AI-generated explanations are meant for educational support. Always verify critical facts with official textbooks.</span>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Learnova AI. Built with React, TypeScript, Tailwind CSS & Gemini API.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3 h-3 text-rose-500 fill-current" /> for personalized learning.
          </p>
        </div>
      </div>
    </footer>
  );
};
