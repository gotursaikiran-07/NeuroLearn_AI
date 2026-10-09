import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { useLearner } from '../context/LearnerContext';

export const PlannerPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, toggleStudyPlanTask } = useLearner();

  const completedCount = profile.studyPlan.filter((t) => t.completed).length;
  const progressPercent = profile.studyPlan.length > 0
    ? Math.round((completedCount / profile.studyPlan.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> AI Adaptive Planner
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Personalized Study Plan
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Goal: <strong className="text-slate-800">{profile.goal}</strong> • Target Session: <strong className="text-indigo-600">{profile.sessionDuration} mins/day</strong>
          </p>
        </div>

        <div className="w-full md:w-48 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center space-y-1">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>Weekly Progress</span>
            <span className="text-indigo-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Plan Notice */}
      <div className="p-4 bg-indigo-50/70 border border-indigo-200/80 rounded-2xl text-xs text-indigo-950 flex items-center justify-between gap-4">
        <p>
          💡 <strong>Dynamic Recalculation:</strong> Your schedule automatically shifts daily tasks based on new diagnostic test scores and detected knowledge gaps.
        </p>
      </div>

      {/* Tasks Schedule List */}
      <div className="space-y-4">
        {profile.studyPlan.map((task) => (
          <div
            key={task.id}
            className={`p-6 rounded-3xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              task.completed
                ? 'bg-slate-100/60 border-slate-200 text-slate-500'
                : 'bg-white border-slate-200 shadow-xs hover:border-indigo-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() => toggleStudyPlanTask(task.id)}
                className={`w-7 h-7 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  task.completed
                    ? 'bg-emerald-500 border-emerald-600 text-white'
                    : 'border-slate-300 bg-white hover:border-indigo-400'
                }`}
              >
                {task.completed && <CheckCircle2 className="w-4 h-4" />}
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-bold uppercase">
                    Day {task.day}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {task.estimatedMinutes} mins
                  </span>
                </div>
                <h3 className={`font-bold text-base ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                  {task.title}
                </h3>
                <p className="text-xs text-slate-600">{task.description}</p>
                <div className="text-[11px] text-indigo-600 font-medium pt-1">
                  🎯 <strong>AI Context:</strong> {task.reason}
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate(task.type === 'practice' ? '/practice' : '/studio')}
              className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl shrink-0 transition-colors"
            >
              Start Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
