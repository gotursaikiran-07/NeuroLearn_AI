import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  LogIn,
  UserPlus,
  LogOut,
  Database,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Flame,
  Award,
  BookOpen,
  Target,
  Clock,
  ShieldCheck,
  RefreshCw,
  Zap,
  ArrowRight,
  TrendingUp,
  BarChart2
} from 'lucide-react';
import { useLearner } from '../context/LearnerContext';
import type { Subject, LearningGoal } from '../types/learning';

export const LoginPage: React.FC = () => {
  const {
    profile,
    isDbConnected,
    login,
    register,
    logout,
    switchUser,
    syncDatabase
  } = useLearner();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'demo'>('login');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regSubject, setRegSubject] = useState<Subject>('Computer Science');
  const [regGoal, setRegGoal] = useState<LearningGoal>('Understand fundamentals');

  // Status feedback
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Demo user profiles for fast switching
  const demoAccounts = [
    {
      id: 'demo-alex',
      name: 'Alex Rivera',
      email: 'alex.rivera@learnova.ai',
      role: 'Computer Science Student',
      subject: 'Computer Science' as Subject,
      topic: 'DBMS & SQL JOINs',
      masteryScore: 65,
      streakDays: 3,
      totalSessions: 4,
      accuracy: 75
    },
    {
      id: 'demo-priya',
      name: 'Priya Sharma',
      email: 'priya.sharma@learnova.ai',
      role: 'Data Science Specialist',
      subject: 'Computer Science' as Subject,
      topic: 'Advanced SQL & Indexing',
      masteryScore: 82,
      streakDays: 7,
      totalSessions: 9,
      accuracy: 88
    },
    {
      id: 'demo-judge',
      name: 'Hackathon Judge Account',
      email: 'judge.demo@learnova.ai',
      role: 'Hackathon Evaluator',
      subject: 'Computer Science' as Subject,
      topic: 'DBMS & SQL JOINs',
      masteryScore: 90,
      streakDays: 5,
      totalSessions: 6,
      accuracy: 92
    }
  ];

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }
    setLoading(true);
    setMessage(null);
    const res = await login(loginEmail, loginPassword);
    setLoading(false);
    if (res.success) {
      setMessage({ type: 'success', text: res.message });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: 'error', text: res.message });
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail) {
      setMessage({ type: 'error', text: 'Name and Email are required.' });
      return;
    }
    setLoading(true);
    setMessage(null);
    const res = await register(regName, regEmail, regPassword, regSubject, regGoal);
    setLoading(false);
    if (res.success) {
      setMessage({ type: 'success', text: res.message });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: 'error', text: res.message });
    }
  };

  const handleManualSync = async () => {
    setLoading(true);
    const success = await syncDatabase();
    setLoading(false);
    if (success) {
      setMessage({ type: 'success', text: 'User details & progress synced to SQLite database successfully!' });
    } else {
      setMessage({ type: 'error', text: 'Database server is offline or unreachable. Operating in local browser storage.' });
    }
  };

  // Calculate overall metrics from conceptMasteryMap
  const masteryValues = Object.values(profile.conceptMasteryMap || {});
  const overallMastery = masteryValues.length > 0
    ? Math.round(masteryValues.reduce((acc, curr) => acc + curr.masteryScore, 0) / masteryValues.length)
    : 0;

  const totalAttempted = profile.totalQuestionsAnswered || 0;
  const totalCorrect = profile.totalCorrectAnswers || 0;
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner & Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold">
              <User className="w-3.5 h-3.5" /> Learnova User Account & Progress Tracker
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              isDbConnected ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
            }`}>
              <Database className="w-3.5 h-3.5" />
              {isDbConnected ? 'SQLite Database Connected' : 'Local Browser Database (Offline)'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            User Authentication & Progress Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sign in to access stored learning progress, track mastery metrics, and sync user details with the database.
          </p>
        </div>

        {/* Quick Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleManualSync}
            disabled={loading}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync Database</span>
          </button>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all"
          >
            <BarChart2 className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </button>
        </div>
      </div>

      {/* Alert / Notification Feedback */}
      {message && (
        <div className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs font-semibold ${
          message.type === 'success'
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
            : 'bg-rose-50 border border-rose-200 text-rose-800'
        }`}>
          <div className="flex items-center gap-2">
            {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-rose-600" />}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
      )}

      {/* Main Grid: User Profile & Login / Switcher */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Account Details & Tracked Progress (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active User Card */}
          <div className="p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Sparkles className="w-48 h-48 text-indigo-400" />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center font-extrabold text-2xl text-indigo-300 shadow-inner">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-white">{profile.name || 'Learner Account'}</h2>
                    {profile.isLoggedIn ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <ShieldCheck className="w-3 h-3" /> Signed In
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Guest / Offline
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-indigo-200 mt-0.5 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 opacity-70" />
                    <span>{profile.email || 'guest@learnova.ai'}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 font-medium">
                    Role: <span className="text-indigo-300 font-semibold">{profile.role || profile.goal}</span>
                  </p>
                </div>
              </div>

              {profile.isLoggedIn && (
                <button
                  onClick={logout}
                  className="px-3.5 py-2 bg-white/10 hover:bg-rose-500/20 hover:text-rose-300 text-slate-300 rounded-xl text-xs font-bold border border-white/10 flex items-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>

            {/* Subject & Active Topic */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Current Subject</span>
                <span className="font-extrabold text-white text-sm mt-0.5 block">{profile.subject}</span>
              </div>
              <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Active Topic</span>
                <span className="font-extrabold text-indigo-300 text-sm mt-0.5 block">{profile.topic}</span>
              </div>
            </div>

            {/* Overall Topic Mastery Score Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" /> Topic Mastery Score
                </span>
                <span className="text-emerald-300 text-base">{overallMastery}%</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-indigo-400 via-emerald-400 to-teal-300 rounded-full transition-all duration-500"
                  style={{ width: `${overallMastery}%` }}
                />
              </div>
            </div>

            {/* Four Progress Stat Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-white/5 rounded-2xl text-center border border-white/5">
                <Flame className="w-5 h-5 text-amber-400 mx-auto mb-1 fill-current" />
                <span className="block text-lg font-black text-white">{profile.streakDays}</span>
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Streak Days</span>
              </div>

              <div className="p-3 bg-white/5 rounded-2xl text-center border border-white/5">
                <Target className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                <span className="block text-lg font-black text-white">{totalAttempted}</span>
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Questions</span>
              </div>

              <div className="p-3 bg-white/5 rounded-2xl text-center border border-white/5">
                <Award className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <span className="block text-lg font-black text-emerald-300">{overallAccuracy}%</span>
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Accuracy</span>
              </div>

              <div className="p-3 bg-white/5 rounded-2xl text-center border border-white/5">
                <Clock className="w-5 h-5 text-sky-400 mx-auto mb-1" />
                <span className="block text-lg font-black text-white">{profile.totalSessionsCompleted}</span>
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Sessions</span>
              </div>
            </div>
          </div>

          {/* Stored Concept Mastery Details Table */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                Tracked Concept Mastery Breakdown
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                {masteryValues.length} concepts evaluated
              </span>
            </div>

            {masteryValues.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-4 bg-slate-50 rounded-2xl text-center">
                No quiz attempts recorded yet. Take the diagnostic assessment to establish baseline mastery!
              </p>
            ) : (
              <div className="space-y-3">
                {masteryValues.map((concept) => (
                  <div
                    key={concept.conceptId}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">
                          {concept.conceptName}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          concept.status === 'Mastered' || concept.status === 'Strong'
                            ? 'bg-emerald-100 text-emerald-800'
                            : concept.status === 'Improving'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {concept.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {concept.questionsAttempted} Attempted • {concept.correctCount} Correct ({concept.accuracy}% accuracy)
                      </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-right">
                        <span className="text-xs font-black text-indigo-700 block">
                          {concept.masteryScore}% Mastery
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Confidence: {concept.confidenceLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Authentication Form / Saved Account Switcher (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            
            {/* Tab Buttons */}
            <div className="flex rounded-2xl bg-slate-100 p-1 text-xs font-bold">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'login'
                    ? 'bg-white text-indigo-700 shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </button>

              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'register'
                    ? 'bg-white text-indigo-700 shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                Register
              </button>

              <button
                onClick={() => setActiveTab('demo')}
                className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'demo'
                    ? 'bg-white text-indigo-700 shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Accounts
              </button>
            </div>

            {/* TAB 1: SIGN IN */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    User Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex.rivera@learnova.ai"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{loading ? 'Authenticating...' : 'Sign In & Load Tracked Progress'}</span>
                </button>
              </form>
            )}

            {/* TAB 2: REGISTER */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pranitha Sai"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. sai@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                    <select
                      value={regSubject}
                      onChange={(e) => setRegSubject(e.target.value as Subject)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white"
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                      <option value="Biology">Biology</option>
                      <option value="English">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Goal</label>
                    <select
                      value={regGoal}
                      onChange={(e) => setRegGoal(e.target.value as LearningGoal)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white"
                    >
                      <option value="Understand fundamentals">Understand fundamentals</option>
                      <option value="Prepare for exams">Prepare for exams</option>
                      <option value="Improve problem-solving">Improve problem-solving</option>
                      <option value="Prepare for interviews">Prepare for interviews</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{loading ? 'Creating Account...' : 'Register New Account'}</span>
                </button>
              </form>
            )}

            {/* TAB 3: ACCOUNTS SWITCHER */}
            {activeTab === 'demo' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 mb-3">
                  Click any profile below to instantly switch users and load their saved progress metrics:
                </p>

                {demoAccounts.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => switchUser(acc)}
                    className="w-full p-3.5 bg-slate-50 hover:bg-indigo-50/60 rounded-2xl border border-slate-200/80 text-left transition-all group flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-xs group-hover:text-indigo-700">
                          {acc.name}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          {acc.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {acc.subject} • {acc.topic}
                      </p>
                    </div>

                    <div className="text-right flex items-center gap-2">
                      <div>
                        <span className="text-xs font-extrabold text-emerald-600 block">
                          {acc.masteryScore}% Mastery
                        </span>
                        <span className="text-[10px] font-bold text-amber-600">
                          🔥 {acc.streakDays} Days
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
