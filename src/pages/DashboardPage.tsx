import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Target,
  Brain,
  Calendar,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useLearner } from '../context/LearnerContext';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, toggleStudyPlanTask } = useLearner();

  // Prepare chart data from recorded quiz attempts
  const chartData = profile.quizAttempts.length > 0
    ? profile.quizAttempts.slice().reverse().map((attempt, idx) => ({
        session: `Session ${idx + 1}`,
        accuracy: Math.round((attempt.score / attempt.total) * 100),
        score: attempt.score
      }))
    : [
        { session: 'Diagnostic', accuracy: 40 },
        { session: 'Session 1', accuracy: 60 },
        { session: 'Session 2', accuracy: 75 },
        { session: 'Session 3', accuracy: 85 }
      ];

  const overallAccuracy = profile.totalQuestionsAnswered > 0
    ? Math.round((profile.totalCorrectAnswers / profile.totalQuestionsAnswered) * 100)
    : 0;

  const conceptList = Object.values(profile.conceptMasteryMap);
  const masteredCount = conceptList.filter((c) => c.status === 'Mastered').length;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl mx-auto">
      {/* 1. Header Greeting & Session Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Welcome back, {profile.name}! 👋
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Subject: <strong className="text-slate-800">{profile.subject}</strong> • Topic: <strong className="text-slate-800">{profile.topic}</strong> • Goal: <strong className="text-indigo-600 font-semibold">{profile.goal}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-xl text-xs font-semibold text-indigo-700 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>Target Session: {profile.sessionDuration} mins</span>
          </div>

          <button
            onClick={() => navigate('/studio')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Continue Learning</span>
          </button>
        </div>
      </div>

      {/* 2. Hero Continue Learning Banner */}
      <div className="p-6 gradient-bg rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 z-10 max-w-xl">
          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-white/20 backdrop-blur-md rounded-full inline-block">
            Current Focus • {profile.topic}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Mastering SQL JOINs: INNER, LEFT, and RIGHT Operations
          </h2>
          <p className="text-xs text-indigo-100 leading-relaxed">
            Your AI companion recommends completing the story-based student-course analogy lesson to resolve your gap in LEFT JOIN NULL preservation.
          </p>
          <button
            onClick={() => navigate('/studio')}
            className="mt-2 px-6 py-3 bg-white text-indigo-900 font-extrabold text-xs rounded-xl shadow-lg hover:bg-indigo-50 transition-colors inline-flex items-center gap-2"
          >
            <span>Resume Lesson Now</span>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </button>
        </div>

        <div className="w-full md:w-64 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-3 z-10 shrink-0">
          <div className="flex justify-between text-xs font-semibold">
            <span>Topic Progress</span>
            <span>65%</span>
          </div>
          <div className="w-full bg-indigo-950/40 rounded-full h-2 overflow-hidden">
            <div className="bg-white h-2 rounded-full w-[65%]" />
          </div>
          <p className="text-[10px] text-indigo-200 leading-tight">
            2 of 5 core concepts mastered. 1 gap detected requiring attention.
          </p>
        </div>
      </div>

      {/* 3. Learning Overview Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Questions Attempted</span>
          <div className="text-2xl font-black text-slate-900">{profile.totalQuestionsAnswered}</div>
          <span className="text-[11px] text-slate-400">Total practice items completed</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Overall Accuracy</span>
          <div className="text-2xl font-black text-indigo-600">{overallAccuracy}%</div>
          <span className="text-[11px] text-emerald-600 font-medium">+12% from last session</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Concepts Mastered</span>
          <div className="text-2xl font-black text-emerald-600">{masteredCount} / {conceptList.length}</div>
          <span className="text-[11px] text-slate-400">Based on quiz evidence</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Revision Streak</span>
          <div className="text-2xl font-black text-amber-500 flex items-center gap-1">
            🔥 {profile.streakDays} Days
          </div>
          <span className="text-[11px] text-slate-400">Consistent daily study</span>
        </div>
      </div>

      {/* 4. Knowledge Map & Learning Progress Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Knowledge Map (2 cols) */}
        <div className="lg:col-span-2 p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-600" /> Topic Knowledge Map
            </h3>
            <button
              onClick={() => navigate('/gaps')}
              className="text-xs text-indigo-600 font-bold hover:underline"
            >
              View Knowledge Gaps →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {conceptList.map((concept) => {
              let statusBadge = 'bg-slate-100 text-slate-700';
              if (concept.status === 'Mastered') statusBadge = 'bg-emerald-100 text-emerald-800 font-bold';
              else if (concept.status === 'Strong') statusBadge = 'bg-indigo-100 text-indigo-800 font-bold';
              else if (concept.status === 'Improving') statusBadge = 'bg-blue-100 text-blue-800';
              else if (concept.status === 'Needs Attention') statusBadge = 'bg-rose-100 text-rose-800 font-bold';

              return (
                <div key={concept.conceptId} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-900">{concept.conceptName}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md ${statusBadge}`}>
                      {concept.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Accuracy: {concept.accuracy}%</span>
                    <span>Mastery: {concept.masteryScore}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full"
                      style={{ width: `${concept.masteryScore}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning Progress Chart (1 col) */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" /> Mastery Trend
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">Recharts Active</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="session" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748B' }} />
                <Tooltip />
                <Area type="monotone" dataKey="accuracy" stroke="#4F46E5" strokeWidth={2} fillOpacity={1} fill="url(#colorAcc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-slate-500 text-center">
            Accuracy trajectory based on diagnostic and practice arena quiz history.
          </p>
        </div>
      </div>

      {/* 5. AI Recommendations & Weekly Learning Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Recommendations */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-600" /> AI Personalization Recommendations
          </h3>

          <div className="space-y-3">
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> Revise LEFT JOIN NULL Preservation
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-amber-200 text-amber-900 rounded-md">Priority</span>
              </div>
              <p className="text-xs text-amber-800">
                <strong>Why recommended:</strong> You missed 2 questions regarding unmatched right-table preservation.
              </p>
              <button
                onClick={() => navigate('/studio')}
                className="mt-2 text-xs font-bold text-amber-900 hover:underline inline-flex items-center gap-1"
              >
                Open Remediation Lesson →
              </button>
            </div>

            <div className="p-4 bg-indigo-50/70 border border-indigo-200/80 rounded-2xl space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-900">
                <span className="flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-indigo-600" /> Try Medium-Difficulty Practice Challenge
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-indigo-200 text-indigo-900 rounded-md">Challenge</span>
              </div>
              <p className="text-xs text-indigo-800">
                <strong>Why recommended:</strong> You scored 100% on primary key basics! Take a harder challenge.
              </p>
              <button
                onClick={() => navigate('/practice')}
                className="mt-2 text-xs font-bold text-indigo-900 hover:underline inline-flex items-center gap-1"
              >
                Launch Practice Arena →
              </button>
            </div>
          </div>
        </div>

        {/* Weekly Learning Plan */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" /> Adaptive Weekly Plan
            </h3>
            <button
              onClick={() => navigate('/planner')}
              className="text-xs text-indigo-600 font-bold hover:underline"
            >
              Full Planner →
            </button>
          </div>

          <div className="space-y-2.5">
            {profile.studyPlan.slice(0, 3).map((task) => (
              <div
                key={task.id}
                onClick={() => toggleStudyPlanTask(task.id)}
                className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                  task.completed
                    ? 'bg-slate-50 border-slate-200 text-slate-500 line-through'
                    : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-800'
                }`}
              >
                <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                  task.completed ? 'bg-emerald-500 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                }`}>
                  {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{task.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{task.reason}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
