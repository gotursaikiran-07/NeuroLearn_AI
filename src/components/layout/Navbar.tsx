import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  LayoutDashboard,
  BookOpen,
  Target,
  AlertTriangle,
  Calendar,
  Award,
  Shield,
  Type,
  Zap,
  HelpCircle
} from 'lucide-react';
import { useLearner } from '../../context/LearnerContext';
import { TransparencyModal } from '../ai/TransparencyModal';

export const Navbar: React.FC = () => {
  const { profile, updateProfile, triggerInstantJudgeDemo } = useLearner();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const navigate = useNavigate();

  const handleInstantDemo = () => {
    triggerInstantJudgeDemo();
    navigate('/studio');
  };

  const cycleFontScale = () => {
    const scales: ('sm' | 'base' | 'lg' | 'xl')[] = ['sm', 'base', 'lg', 'xl'];
    const currentIndex = scales.indexOf(profile.fontScale);
    const nextScale = scales[(currentIndex + 1) % scales.length];
    updateProfile({ fontScale: nextScale });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <NavLink to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                  Learnova <span className="gradient-text font-black">AI</span>
                </span>
                <span className="block text-[10px] text-slate-400 font-medium -mt-1">
                  Personalized Intelligence
                </span>
              </div>
            </NavLink>

            {/* Main Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </NavLink>

              <NavLink
                to="/assessment"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <HelpCircle className="w-4 h-4" />
                Diagnostic
              </NavLink>

              <NavLink
                to="/studio"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <BookOpen className="w-4 h-4 text-indigo-600" />
                AI Studio
              </NavLink>

              <NavLink
                to="/practice"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <Target className="w-4 h-4" />
                Practice
              </NavLink>

              <NavLink
                to="/gaps"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isActive ? 'bg-amber-50 text-amber-700 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Gaps
              </NavLink>

              <NavLink
                to="/planner"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <Calendar className="w-4 h-4" />
                Planner
              </NavLink>

              <NavLink
                to="/progress"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <Award className="w-4 h-4" />
                Progress
              </NavLink>
            </nav>

            {/* Action Buttons & Accessibility */}
            <div className="flex items-center gap-2">
              {/* Accessibility Font Size Toggle */}
              <button
                onClick={cycleFontScale}
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                title={`Current Font Scale: ${profile.fontScale.toUpperCase()}. Click to cycle.`}
              >
                <Type className="w-4 h-4" />
                <span className="uppercase text-[10px] font-bold">{profile.fontScale}</span>
              </button>

              {/* Responsible AI Privacy Shield */}
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="AI Transparency & Responsible AI Policy"
              >
                <Shield className="w-4 h-4" />
              </button>

              {/* Instant Judge Demo Button */}
              <button
                onClick={handleInstantDemo}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white gradient-bg hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
                title="Preloads scenario journey (SQL JOINs beginner interview prep)"
              >
                <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
                <span>Instant Demo</span>
              </button>

              {/* Login & User Account Button */}
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                  }`
                }
                title="User Login & Tracked Progress"
              >
                <div className="w-6 h-6 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-black text-[10px]">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="hidden lg:inline">{profile.name ? profile.name.split(' ')[0] : 'Login'}</span>
              </NavLink>
            </div>
          </div>
        </div>
      </header>

      {/* AI Transparency & Privacy Modal */}
      <TransparencyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </>
  );
};
