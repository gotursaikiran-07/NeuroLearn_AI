import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Target
} from 'lucide-react';
import { useLearner } from '../context/LearnerContext';
import { SAMPLE_LESSONS } from '../data/sampleLessons';
import type { ExplanationStyle } from '../types/learning';
import { TextToSpeechButton } from '../components/common/TextToSpeechButton';
import { AskLearnovaPanel } from '../components/ai/AskLearnovaPanel';

export const StudioPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useLearner();

  const activeLesson = SAMPLE_LESSONS['dbms-sql-joins'] || Object.values(SAMPLE_LESSONS)[0];
  const currentStyle = profile.explanationStyle;

  // Selected explanation content based on active style
  const explanationObj = activeLesson.explanations[currentStyle] || activeLesson.explanations['Story-based explanations'];

  // Knowledge check state inside studio
  const [selectedKnowledgeOpt, setSelectedKnowledgeOpt] = useState<number | null>(null);
  const [knowledgeSubmitted, setKnowledgeSubmitted] = useState(false);

  const knowledgeQ = activeLesson.knowledgeCheck[0];

  const handleStyleChange = (style: ExplanationStyle) => {
    updateProfile({ explanationStyle: style });
  };

  const handleKnowledgeSubmit = () => {
    if (selectedKnowledgeOpt !== null) {
      setKnowledgeSubmitted(true);
    }
  };

  const combinedTextToRead = `
    Lesson: ${activeLesson.title}.
    Introduction: ${explanationObj.introduction}
    Core Concept: ${explanationObj.coreConcept}
    Real World Analogy: ${explanationObj.analogy}
  `;

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
            <span>{profile.subject}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-indigo-600 font-bold">{profile.topic}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {activeLesson.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* TTS Speech Button */}
          <TextToSpeechButton textToRead={combinedTextToRead} label="Read Lesson Aloud" />

          <button
            onClick={() => navigate('/practice')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
          >
            <Target className="w-4 h-4" />
            <span>Practice Quiz Arena</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid (3 Cols on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Concept Selector (3 cols) */}
        <div className="lg:col-span-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-indigo-600" /> Topic Concepts
          </h3>

          <div className="space-y-2">
            {[
              { id: 'relational-basics', name: 'Relational Model & Keys', status: 'Mastered' },
              { id: 'left-right-join', name: 'LEFT & RIGHT JOINs', status: 'Active Focus' },
              { id: 'inner-join', name: 'INNER JOIN Operations', status: 'Strong' },
              { id: 'full-outer-join', name: 'FULL OUTER & CROSS JOINs', status: 'Next Up' },
              { id: 'join-performance', name: 'Query Optimization', status: 'Needs Attention' }
            ].map((concept) => (
              <button
                key={concept.id}
                className={`w-full p-3 rounded-2xl border text-left text-xs transition-all ${
                  concept.id === 'left-right-join'
                    ? 'border-indigo-600 bg-indigo-50/80 font-bold text-indigo-950 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="font-bold">{concept.name}</div>
                <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
                  <span>{concept.status}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Learner Preference Badge */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 block">Learner Profile</span>
            <p>Level: <strong className="text-slate-900">{profile.proficiency}</strong></p>
            <p>Goal: <strong className="text-slate-900">{profile.goal}</strong></p>
          </div>
        </div>

        {/* Center Lesson View (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          {/* Explanation Style Selector Bar (Feature 1: Explain It Another Way) */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-violet-600" /> Explain It Another Way
              </span>
              <span className="text-[10px] text-indigo-600 font-bold">1-Click Transformation</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {[
                { style: 'Simple language with real-world examples' as ExplanationStyle, label: 'Explain Simply' },
                { style: 'Story-based explanations' as ExplanationStyle, label: 'Story Mode' },
                { style: 'Step-by-step technical explanations' as ExplanationStyle, label: 'Step-by-Step' },
                { style: 'Concise revision notes' as ExplanationStyle, label: 'Quick Revision' }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleStyleChange(item.style)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold text-left transition-all ${
                    currentStyle === item.style
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white hover:bg-indigo-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 1. Learning Objective */}
          <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-2xl space-y-1">
            <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-wider">
              Learning Objective
            </span>
            <p className="text-xs text-indigo-950 font-medium leading-relaxed">
              {activeLesson.objective}
            </p>
          </div>

          {/* 2. Introduction */}
          <div className="space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. Introduction</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {explanationObj.introduction}
            </p>
          </div>

          {/* 3. Core Concept Explanation */}
          <div className="space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. Core Concept</h3>
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs text-slate-800 leading-relaxed">
              {explanationObj.coreConcept}
            </div>
          </div>

          {/* 4. Real-World Analogy */}
          <div className="space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. Relatable Analogy</h3>
            <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl text-xs text-amber-950 leading-relaxed">
              💡 {explanationObj.analogy}
            </div>
          </div>

          {/* 5. Worked Example */}
          <div className="space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">4. Worked SQL Example</h3>
            <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono space-y-2 overflow-x-auto">
              <div className="text-slate-400 font-sans text-[11px] font-semibold">Problem: {explanationObj.workedExample.problem}</div>
              <div className="text-emerald-400 font-bold">{explanationObj.workedExample.solution}</div>
              <div className="text-slate-300 font-sans text-[11px] pt-1 border-t border-slate-800">
                {explanationObj.workedExample.explanation}
              </div>
            </div>
          </div>

          {/* 6. Common Misconceptions */}
          <div className="space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">5. Misconception Alert</h3>
            <div className="space-y-2">
              {explanationObj.misconceptions.map((misc, idx) => (
                <div key={idx} className="p-3 bg-rose-50/70 border border-rose-200/80 rounded-2xl text-xs text-rose-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{misc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Knowledge Check */}
          {knowledgeQ && (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Quick Knowledge Check
              </span>
              <p className="text-xs text-slate-800 font-semibold">{knowledgeQ.questionText}</p>

              <div className="space-y-2">
                {knowledgeQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => !knowledgeSubmitted && setSelectedKnowledgeOpt(idx)}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedKnowledgeOpt === idx
                        ? 'border-indigo-600 bg-indigo-100/70 text-indigo-950 font-semibold'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {!knowledgeSubmitted ? (
                <button
                  onClick={handleKnowledgeSubmit}
                  disabled={selectedKnowledgeOpt === null}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl"
                >
                  Verify Answer
                </button>
              ) : (
                <div className="p-3 bg-emerald-100 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold">
                  {selectedKnowledgeOpt === knowledgeQ.correctAnswerIndex
                    ? 'Correct! LEFT JOIN preserves all 5 rows.'
                    : 'Not quite. Remember, LEFT JOIN retains all 5 rows from Table A regardless of matches!'}
                </div>
              )}
            </div>
          )}

          {/* 8. Key Takeaways */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl space-y-2">
            <h4 className="text-xs font-bold text-emerald-900">Key Takeaways</h4>
            <ul className="text-xs text-emerald-800 space-y-1">
              {explanationObj.summary.map((point, idx) => (
                <li key={idx}>• {point}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Ask Learnova AI Panel (4 cols) */}
        <div className="lg:col-span-4 h-full sticky top-20">
          <AskLearnovaPanel
            currentTopic={profile.topic}
            conceptName="LEFT & RIGHT JOINs"
          />
        </div>
      </div>
    </div>
  );
};
