import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Target,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useLearner } from '../context/LearnerContext';

export const GapsPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useLearner();

  const gapsList = Object.values(profile.conceptMasteryMap);
  const attentionGaps = gapsList.filter((g) => g.status === 'Needs Attention');
  const improvingGaps = gapsList.filter((g) => g.status === 'Improving');
  const strongGaps = gapsList.filter((g) => g.status === 'Strong' || g.status === 'Mastered');

  const handleFixGap = (_conceptId?: string) => {
    navigate('/studio');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Transparent Knowledge Gap Engine
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            My Knowledge Gaps & Remediation
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Topic: <strong className="text-slate-800">{profile.topic}</strong> • Learnova AI continuously tracks diagnostic and practice performance to detect specific misconceptions.
          </p>
        </div>

        <button
          onClick={() => navigate('/practice')}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
        >
          <Target className="w-4 h-4" />
          <span>Take Adaptive Quiz</span>
        </button>
      </div>

      {/* Gaps Needing Attention */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-500" />
          Concepts Needing Attention ({attentionGaps.length})
        </h2>

        {attentionGaps.length === 0 ? (
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
            🎉 Great job! You currently have zero critical knowledge gaps in this topic.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {attentionGaps.map((gap) => (
              <div
                key={gap.conceptId}
                className="p-6 bg-white rounded-3xl border border-rose-200/80 shadow-xs space-y-4 relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold uppercase">
                      Needs Attention
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900 mt-1">
                      {gap.conceptName}
                    </h3>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black text-rose-600">{gap.masteryScore}%</div>
                    <span className="text-[10px] text-slate-400">Mastery Score</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-700">
                  <p><strong>Attempted:</strong> {gap.questionsAttempted} questions ({gap.correctCount} correct)</p>
                  <p><strong>Evidence Level:</strong> {gap.confidenceLevel} Confidence</p>
                </div>

                <div className="p-3 bg-rose-50/70 border border-rose-100 rounded-xl text-xs text-rose-900 leading-relaxed font-medium">
                  💡 <strong>Recommended Action:</strong> {gap.recommendedAction}
                </div>

                {/* 1-Click Fix This Gap Button */}
                <button
                  onClick={() => handleFixGap(gap.conceptId)}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Fix This Gap Now (Open Lesson)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Improving Concepts */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          Improving Concepts ({improvingGaps.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {improvingGaps.map((gap) => (
            <div key={gap.conceptId} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold">
                    Improving
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 mt-1">{gap.conceptName}</h4>
                </div>
                <span className="text-xl font-bold text-indigo-600">{gap.masteryScore}%</span>
              </div>
              <p className="text-xs text-slate-600">{gap.recommendedAction}</p>
              <button
                onClick={() => navigate('/practice')}
                className="text-xs font-bold text-indigo-600 hover:underline inline-flex items-center gap-1"
              >
                Practice Targeted Questions →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Strong / Mastered Concepts */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          Mastered & Strong Concepts ({strongGaps.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {strongGaps.map((gap) => (
            <div key={gap.conceptId} className="p-4 bg-emerald-50/50 border border-emerald-200/60 rounded-2xl space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-950">{gap.conceptName}</span>
                <span className="font-extrabold text-emerald-700">{gap.masteryScore}%</span>
              </div>
              <p className="text-[11px] text-emerald-800 font-medium">Concept mastered! Ready for advanced edge cases.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
