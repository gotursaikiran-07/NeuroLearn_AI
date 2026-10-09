import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Target,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  Award,
  Sparkles
} from 'lucide-react';
import { useLearner } from '../context/LearnerContext';
import { SAMPLE_QUESTIONS } from '../data/sampleQuestions';
import type { QuestionDifficulty } from '../types/learning';

export const PracticePage: React.FC = () => {
  const navigate = useNavigate();
  const { recordQuizAttempt } = useLearner();

  const [questions] = useState(SAMPLE_QUESTIONS.filter((q) => q.topicId === 'dbms-sql-joins'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState<QuestionDifficulty>('Easy');

  const [answersLog, setAnswersLog] = useState<
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

    // Adaptive Difficulty Engine Rules:
    // If correct, increase difficulty level; if wrong, lower difficulty or target prerequisite
    if (isCorrect) {
      if (currentDifficulty === 'Easy') setCurrentDifficulty('Medium');
      else if (currentDifficulty === 'Medium') setCurrentDifficulty('Hard');
    } else {
      if (currentDifficulty === 'Hard') setCurrentDifficulty('Medium');
      else if (currentDifficulty === 'Medium') setCurrentDifficulty('Easy');
    }

    setAnswersLog((prev) => [
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
      setShowHint(false);
    } else {
      // Record complete session
      const correctCount = answersLog.filter((a) => a.isCorrect).length + (selectedIndex === currentQ.correctAnswerIndex ? 1 : 0);
      recordQuizAttempt({
        topicId: 'dbms-sql-joins',
        score: correctCount,
        total: questions.length,
        questions: answersLog
      });
      setCurrentIndex(questions.length);
    }
  };

  const isFinished = currentIndex >= questions.length;

  if (isFinished) {
    const totalCount = questions.length;
    const correctCount = answersLog.filter((a) => a.isCorrect).length;
    const percentage = Math.round((correctCount / totalCount) * 100);

    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">Practice Session Complete!</h2>
            <p className="text-xs text-slate-500">
              Your results have updated your topic mastery score and knowledge gap map.
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 max-w-xs mx-auto">
            <span className="text-xs font-bold text-slate-500 uppercase">Session Score</span>
            <div className="text-4xl font-black text-indigo-600">{percentage}%</div>
            <p className="text-xs text-slate-500">{correctCount} of {totalCount} correct</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/gaps')}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <span>View Detected Knowledge Gaps</span>
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <span>Return to Dashboard</span>
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
            <Target className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="font-bold text-sm text-white">Intelligent Practice Arena</h3>
              <p className="text-[11px] text-slate-400">Question {currentIndex + 1} of {questions.length}</p>
            </div>
          </div>

          {/* Adaptive Difficulty Indicator */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-900 text-indigo-200 border border-indigo-700 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" /> Adaptive Level: {currentDifficulty}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 space-y-6 flex-1 overflow-y-auto">
          {/* Concept Tested Tag */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold">
              Tested Concept: {currentQ.conceptName}
            </span>

            {/* Hint Trigger */}
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
            </button>
          </div>

          {showHint && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs">
              💡 <strong>Hint:</strong> {currentQ.hint}
            </div>
          )}

          {/* Question Text */}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {currentQ.questionText}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              let style = 'border-slate-200 hover:border-indigo-300 bg-white text-slate-800';

              if (selectedIndex === idx) {
                style = 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold shadow-xs';
              }

              if (isSubmitted) {
                if (idx === currentQ.correctAnswerIndex) {
                  style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                } else if (selectedIndex === idx) {
                  style = 'border-rose-400 bg-rose-50 text-rose-950';
                } else {
                  style = 'border-slate-200 bg-slate-50 opacity-60 text-slate-600';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm flex items-start justify-between transition-all ${style}`}
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

          {/* Immediate Feedback */}
          {isSubmitted && (
            <div className={`p-5 rounded-2xl border space-y-2 text-xs leading-relaxed ${
              selectedIndex === currentQ.correctAnswerIndex
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                : 'bg-rose-50/80 border-rose-200 text-rose-900'
            }`}>
              <div className="font-bold text-sm">
                {selectedIndex === currentQ.correctAnswerIndex ? '✅ Correct Answer!' : '❌ Misconception Detected'}
              </div>
              <p>{currentQ.explanation}</p>

              {selectedIndex !== currentQ.correctAnswerIndex && currentQ.misconceptionMap[selectedIndex!] && (
                <div className="mt-2 pt-2 border-t border-rose-200/80 text-[11px] font-semibold text-rose-800">
                  ⚠️ <strong>Why your selected answer was wrong:</strong> {currentQ.misconceptionMap[selectedIndex!]}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {isSubmitted ? 'Adaptive difficulty will adjust for the next item.' : 'Select an option and submit.'}
          </span>

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
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
