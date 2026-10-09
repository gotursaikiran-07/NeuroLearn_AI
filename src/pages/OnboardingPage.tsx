import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Clock
} from 'lucide-react';
import { useLearner } from '../context/LearnerContext';
import { SUBJECTS_DATA } from '../data/subjects';
import type {
  Subject,
  ProficiencyLevel,
  LearningGoal,
  ExplanationStyle
} from '../types/learning';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setOnboardingData } = useLearner();

  const [step, setStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState<Subject>('Computer Science');
  const [selectedTopic, setSelectedTopic] = useState('DBMS & SQL JOINs');
  const [selectedProficiency, setSelectedProficiency] = useState<ProficiencyLevel>('Beginner');
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal>('Prepare for interviews');
  const [selectedStyle, setSelectedStyle] = useState<ExplanationStyle>('Story-based explanations');
  const [sessionDuration, setSessionDuration] = useState<number>(15);

  const currentSubjectObj = SUBJECTS_DATA.find((s) => s.name === selectedSubject) || SUBJECTS_DATA[0];

  const handleNext = () => {
    if (step < 5) {
      setStep((prev) => prev + 1);
    } else {
      setOnboardingData(
        selectedSubject,
        selectedTopic,
        selectedProficiency,
        selectedGoal,
        selectedStyle,
        sessionDuration
      );
      navigate('/assessment');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden flex flex-col">
        {/* Header Progress Bar */}
        <div className="px-8 pt-8 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Personalize Your AI Companion</h2>
              <p className="text-xs text-slate-500">Step {step} of 5</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === step
                    ? 'w-8 bg-indigo-600'
                    : i < step
                    ? 'w-3 bg-emerald-500'
                    : 'w-3 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Wizard Content Body */}
        <div className="p-8 flex-1 overflow-y-auto space-y-6">
          {/* STEP 1: Select Subject */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Choose a Subject</h3>
                <p className="text-xs text-slate-500">Select the discipline you want to study today.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SUBJECTS_DATA.map((subject) => (
                  <button
                    key={subject.name}
                    onClick={() => {
                      setSelectedSubject(subject.name);
                      setSelectedTopic(subject.topics[0]?.name || '');
                    }}
                    className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedSubject === subject.name
                        ? 'border-indigo-600 bg-indigo-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{subject.name}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{subject.description}</p>
                    </div>
                    {selectedSubject === subject.name && (
                      <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Select Topic */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Select a Topic in {selectedSubject}</h3>
                <p className="text-xs text-slate-500">What specific area would you like to focus on?</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {currentSubjectObj.topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.name)}
                    className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedTopic === topic.name
                        ? 'border-indigo-600 bg-indigo-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{topic.name}</h4>
                        <p className="text-xs text-slate-500">{topic.description}</p>
                      </div>
                    </div>
                    {selectedTopic === topic.name && (
                      <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Select Current Proficiency */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Your Current Proficiency Level</h3>
                <p className="text-xs text-slate-500">This helps the AI calibrate initial explanation depth.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { level: 'Beginner' as ProficiencyLevel, desc: 'New to this topic; prefer clear analogies and simple terms.' },
                  { level: 'Intermediate' as ProficiencyLevel, desc: 'Familiar with core concepts; ready for practical cases.' },
                  { level: 'Advanced' as ProficiencyLevel, desc: 'Strong background; seeking deep technical & edge-case insights.' },
                  { level: 'Not sure yet' as ProficiencyLevel, desc: 'Let the diagnostic assessment determine my starting point!' }
                ].map((item) => (
                  <button
                    key={item.level}
                    onClick={() => setSelectedProficiency(item.level)}
                    className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedProficiency === item.level
                        ? 'border-indigo-600 bg-indigo-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.level}</h4>
                      <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                    </div>
                    {selectedProficiency === item.level && (
                      <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Select Learning Goal */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">What is Your Main Goal?</h3>
                <p className="text-xs text-slate-500">Learnova AI tailors practice items to your objective.</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { goal: 'Understand fundamentals' as LearningGoal, desc: 'Build rock-solid foundational understanding.' },
                  { goal: 'Prepare for exams' as LearningGoal, desc: 'Focus on key formulas, definitions, and high-frequency exam questions.' },
                  { goal: 'Improve problem-solving' as LearningGoal, desc: 'Tackle practical exercises and logical challenges.' },
                  { goal: 'Prepare for interviews' as LearningGoal, desc: 'Master interview edge cases, trade-offs, and communication.' }
                ].map((item) => (
                  <button
                    key={item.goal}
                    onClick={() => setSelectedGoal(item.goal)}
                    className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedGoal === item.goal
                        ? 'border-indigo-600 bg-indigo-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.goal}</h4>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    {selectedGoal === item.goal && (
                      <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Select Explanation Style & Session Length */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Preferred Explanation Style</h3>
                <p className="text-xs text-slate-500">How do you learn best?</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { style: 'Simple language with real-world examples' as ExplanationStyle, desc: 'Plain English with everyday analogies.' },
                  { style: 'Story-based explanations' as ExplanationStyle, desc: 'Engaging narrative stories that make concepts memorable.' },
                  { style: 'Step-by-step technical explanations' as ExplanationStyle, desc: 'Rigorous technical breakdowns and execution flows.' },
                  { style: 'Concise revision notes' as ExplanationStyle, desc: 'Bullet points, tables, and quick summary cheatsheets.' }
                ].map((item) => (
                  <button
                    key={item.style}
                    onClick={() => setSelectedStyle(item.style)}
                    className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedStyle === item.style
                        ? 'border-indigo-600 bg-indigo-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.style}</h4>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    {selectedStyle === item.style && (
                      <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Session Duration Selector */}
              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-indigo-600" /> Daily Target Session Duration
                  </span>
                  <span className="font-extrabold text-indigo-600 text-sm">{sessionDuration} mins</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={45}
                  step={5}
                  value={sessionDuration}
                  onChange={(e) => setSessionDuration(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{step === 1 ? 'Cancel' : 'Back'}</span>
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white gradient-bg hover:opacity-95 shadow-md shadow-indigo-500/20 flex items-center gap-1.5 transition-all"
          >
            <span>{step === 5 ? 'Start Diagnostic Test' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
