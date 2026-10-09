import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LearnerProvider, useLearner } from './context/LearnerContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { DashboardPage } from './pages/DashboardPage';
import { StudioPage } from './pages/StudioPage';
import { PracticePage } from './pages/PracticePage';
import { GapsPage } from './pages/GapsPage';
import { PlannerPage } from './pages/PlannerPage';
import { ProgressPage } from './pages/ProgressPage';
import { LoginPage } from './pages/LoginPage';

const AppContent: React.FC = () => {
  const { profile } = useLearner();

  // Apply dynamic accessibility font scale
  const fontClassMap = {
    sm: 'font-scale-sm',
    base: 'font-scale-base',
    lg: 'font-scale-lg',
    xl: 'font-scale-xl'
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#020d1d] text-slate-100 ${fontClassMap[profile.fontScale] || 'font-scale-base'}`}>
      <Navbar />
      <main className="flex-1 bg-transparent">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/gaps" element={<GapsPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <LearnerProvider>
        <AppContent />
      </LearnerProvider>
    </BrowserRouter>
  );
}

export default App;
