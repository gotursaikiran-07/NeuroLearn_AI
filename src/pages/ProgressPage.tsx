import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Flame,
  Star
} from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5 text-amber-500" /> Genuine Learning Growth & Milestones
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Progress & Achievements
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Celebrating consistent effort, misconception resolution, and measurable topic mastery.
          </p>
        </div>

        <button
          onClick={() => navigate('/studio')}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
        >
          <BookOpen className="w-4 h-4" />
          <span>Resume Learning Studio</span>
        </button>
      </div>

      {/* Effort Encouragement Statement Card */}
      <div className="p-6 bg-gradient-to-r from-indigo-900 via-violet-900 to-slate-900 rounded-3xl text-white shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 fill-current" /> Academic Effort & Mastery Commitment
        </div>
        <h2 className="text-xl sm:text-2xl font-black">
          "True mastery comes from confronting misunderstandings, not just repeating what you already know."
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          You've resolved 2 key misconceptions on SQL table joins. Keep practicing regularly to solidify long-term retention.
        </p>
      </div>

      {/* Milestones & Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
            <Flame className="w-6 h-6 text-amber-500 fill-current" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">3-Day Revision Streak</h3>
          <p className="text-xs text-slate-600">Studied consistently for 3 consecutive days. Building effective daily habits!</p>
          <span className="text-[10px] font-bold text-emerald-600 uppercase">Streak Active</span>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">Relational Foundation Master</h3>
          <p className="text-xs text-slate-600">Achieved 85%+ mastery on Primary Keys & Relational Model primitives.</p>
          <span className="text-[10px] font-bold text-emerald-600 uppercase">Badge Unlocked</span>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
            <Star className="w-6 h-6 text-amber-500 fill-current" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">Interview Prep Ready</h3>
          <p className="text-xs text-slate-600">Answered 5+ interview-grade practice items on join edge cases.</p>
          <span className="text-[10px] font-bold text-indigo-600 uppercase">In Progress</span>
        </div>
      </div>
    </div>
  );
};
