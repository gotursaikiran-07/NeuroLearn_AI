import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  HelpCircle,
  AlertTriangle,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useLearner } from '../context/LearnerContext';
import { SAMPLE_QUESTIONS } from '../data/sampleQuestions';

export const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, recordQuizAttempt } = useLearner();

  // Filter questions for the selected topic (or fallback to DBMS)
  const questions = SAMPLE_QUESTIONS.filter((q) => q.topicId === 'dbms-sql-joins');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Attempt state tracking
  const [userAnswers, setUserAnswers] = useState<
    {
      questionId: string;
      conceptId: string;
      selectedIndex: number;
      isCorrect: boolean;
      misconceptionTriggered?: string;
    }[]
  >([]);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedIndex(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedIndex === null || isSubmitted) return;

    const isCorrect = selectedIndex === currentQ.correctAnswerIndex;
    const misconceptionTriggered = !isCorrect ? currentQ.misconceptionMap[selectedIndex] : undefined;

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        conceptId: currentQ.conceptId,
        selectedIndex,
        isCorrect,
        misconceptionTriggered
      }
    ]);

    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIndex(null);
      setIsSubmitted(false);
    } else {
      // Finalize diagnostic test
      const correctCount = userAnswers.filter((a) => a.isCorrect).length + (selectedIndex === currentQ.correctAnswerIndex ? 1 : 0);
      recordQuizAttempt({
        topicId: 'dbms-sql-joins',
        score: correctCount,
        total: questions.length,
        questions: userAnswers
      });
      setCurrentIndex(questions.length); // trigger results view
    }
  };

  const isCompleted = currentIndex >= questions.length;

  if (isCompleted) {
    const totalCount = questions.length;
    const correctCount = userAnswers.filter((a) => a.isCorrect).length;
    const percentage = Math.round((correctCount / totalCount) * 100);

    const understoodConcepts = userAnswers
      .filter((a) => a.isCorrect)
      .map((a) => a.conceptId.replace('-', ' ').toUpperCase());

    const attentionConcepts = userAnswers
      .filter((a) => !a.isCorrect)
      .map((a) => a.conceptId.replace('-', ' ').toUpperCase());

    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">Diagnostic Assessment Complete!</h2>
            <p className="text-xs text-slate-500">
              Initial skill profile estimated for <strong className="text-slate-800">{profile.topic}</strong>.
            </p>
          </div>

          {/* Initial Score Card */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 max-w-md mx-auto">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Initial Mastery Estimate</div>
            <div className="text-4xl font-black text-indigo-600">{percentage}%</div>
            <p className="text-[11px] text-slate-400">
              * Note: This is an initial estimate based on baseline diagnostic answers, not a definitive measurement of intelligence.
            </p>
          </div>

          {/* Diagnostics Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Concepts Understood
              </h4>
              {understoodConcepts.length > 0 ? (
                <ul className="text-xs text-emerald-800 space-y-1">
                  {understoodConcepts.map((c, i) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-emerald-700 italic">No concepts mastered yet.</p>
              )}
            </div>

            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> Needs Attention
              </h4>
              {attentionConcepts.length > 0 ? (
                <ul className="text-xs text-amber-800 space-y-1">
                  {attentionConcepts.map((c, i) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-amber-700 font-medium">All baseline concepts passed!</p>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/studio')}
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Start Personalized AI Studio Lesson</span>
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2"
            >
              <span>View Student Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
        {/* Header Bar */}
        <div className="px-8 py-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="font-bold text-sm text-white">Diagnostic Assessment</h3>
              <p className="text-[11px] text-slate-400">{profile.topic} • Question {currentIndex + 1} of {questions.length}</p>
            </div>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-indigo-300 rounded-lg">
            Difficulty: {currentQ.difficulty}
          </span>
        </div>

        {/* Question & Options Body */}
        <div className="p-8 space-y-6 flex-1 overflow-y-auto">
          {/* Tested Concept Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Concept Tested: {currentQ.conceptName}
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {currentQ.questionText}
          </h2>

          {/* Multiple Choice Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              let optionStyle = 'border-slate-200 hover:border-indigo-300 bg-white text-slate-800';

              if (selectedIndex === idx) {
                optionStyle = 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold shadow-xs';
              }

              if (isSubmitted) {
                if (idx === currentQ.correctAnswerIndex) {
                  optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                } else if (selectedIndex === idx) {
                  optionStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                } else {
                  optionStyle = 'border-slate-200 bg-slate-50 opacity-60 text-slate-600';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm flex items-start justify-between transition-all ${optionStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isSubmitted && idx === currentQ.correctAnswerIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isSubmitted && selectedIndex === idx && idx !== currentQ.correctAnswerIndex && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Misconception Analysis */}
          {isSubmitted && (
            <div className={`p-5 rounded-2xl border space-y-2 text-xs leading-relaxed animate-fadeIn ${
              selectedIndex === currentQ.correctAnswerIndex
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                : 'bg-rose-50/80 border-rose-200 text-rose-900'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {selectedIndex === currentQ.correctAnswerIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Incorrect — Misconception Detected</span>
                  </>
                )}
              </div>

              <p>{currentQ.explanation}</p>

              {selectedIndex !== currentQ.correctAnswerIndex && currentQ.misconceptionMap[selectedIndex!] && (
                <div className="mt-2 pt-2 border-t border-rose-200/80 text-[11px] font-semibold text-rose-800">
                  ⚠️ <strong>Why your answer was incorrect:</strong> {currentQ.misconceptionMap[selectedIndex!]}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            {isSubmitted ? 'Click Next Question to continue.' : 'Select an answer to reveal explanation.'}
          </p>

          {!isSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedIndex === null}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'View Diagnostic Results'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
