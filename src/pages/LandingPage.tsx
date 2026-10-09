import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  Brain,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  BarChart3,
  Sliders,
  Award
} from 'lucide-react';
import { useLearner } from '../context/LearnerContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { triggerInstantJudgeDemo } = useLearner();

  const handleStartJourney = () => {
    navigate('/onboarding');
  };

  const handleInstantDemo = () => {
    triggerInstantJudgeDemo();
    navigate('/studio');
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-100/50 via-violet-50/30 to-transparent blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 fill-current text-indigo-600" />
            <span>Learnova AI • Hackathon Winning EdTech Prototype</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Education That <span className="gradient-text">Understands You.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Your AI learning companion discovers what you know, explains what you don't, and helps you master what comes next.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleStartJourney}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Start My Learning Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleInstantDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border border-slate-200 shadow-sm flex items-center justify-center gap-2 transition-all hover:border-slate-300"
            >
              <Zap className="w-5 h-5 text-amber-500 fill-current" />
              <span>Explore Instant Demo</span>
            </button>
          </div>

          {/* Interactive Product Preview Mockup */}
          <div className="pt-10 max-w-5xl mx-auto">
            <div className="glass-panel rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200/80 text-left space-y-6">
              {/* Fake Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold text-slate-400 ml-2">Learnova AI Studio • SQL JOINs</span>
                </div>
                <span className="text-[11px] px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Adaptive Mastery Active
                </span>
              </div>

              {/* Preview Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Left Card: Mastery Indicator */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200/60 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Topic Mastery</span>
                    <span className="text-indigo-600 font-extrabold">68%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-indigo-600 h-2 rounded-full w-[68%]" />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    <strong className="text-slate-800">Gap Detected:</strong> Unmatched row preservation in LEFT JOIN queries.
                  </p>
                </div>

                {/* Center Card: Suggested Lesson */}
                <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-bold">
                    <BookOpen className="w-4 h-4" /> Recommended Lesson
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Story Mode: The King's Scroll Analogy</h4>
                  <p className="text-xs text-slate-600">Understand NULL values using the King's citizen banquet story.</p>
                </div>

                {/* Right Card: Adaptive Control */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200/60 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-700 font-bold">
                    <Sliders className="w-4 h-4 text-violet-600" /> Explanation Controls
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[10px] px-2 py-1 bg-indigo-100 text-indigo-800 font-medium rounded-md">Explain Simply</span>
                    <span className="text-[10px] px-2 py-1 bg-violet-100 text-violet-800 font-medium rounded-md">Story Mode</span>
                    <span className="text-[10px] px-2 py-1 bg-slate-100 text-slate-700 font-medium rounded-md">Real-World</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Workflow Section */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              How Learnova AI Works
            </h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              A 3-step continuous feedback loop that guarantees genuine mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4 relative">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-xl">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900">Assess Knowledge</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Take a 5-question diagnostic assessment. The AI identifies what concepts you grasp and pinpoints your exact misconceptions.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4 relative">
              <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center font-black text-xl">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900">Learn Your Way</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Experience tailored explanations. Transform difficult topics into relatable stories, step-by-step code, or simplified audio.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4 relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xl">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900">Master & Grow</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Practice with adaptive questions that automatically increase in difficulty as you answer correctly, resolving knowledge gaps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Designed for High-Impact Learning
            </h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              Every feature is built around cognitive learning science and AI-driven personalization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Brain className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Adaptive Tutoring</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Explanations adjust to your specific proficiency level, learning goal, and preferred explanation style.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Intelligent Practice</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Question difficulty dynamically shifts based on your accuracy streaks and misconception triggers.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Gap Detector</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tracks specific concepts needing attention and generates 1-click remediation actions.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Adaptive Planner</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Auto-generates a weekly study plan that recalculates dynamically as you attempt practice quizzes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible AI & Privacy Guarantee Section */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
            <ShieldCheck className="w-4 h-4" /> Responsible AI & Privacy Standard
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Private, Ethical & Verifiable Education
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Learnova AI does not collect personal names, emails, or phone numbers. All learning records remain stored locally in your browser. Our AI model provides transparent mastery estimates and encourages cross-verification with authoritative educational sources.
          </p>
          <button
            onClick={handleStartJourney}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/20 transition-all inline-flex items-center gap-2"
          >
            <span>Start Learning Now (No Account Needed)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
