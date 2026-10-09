import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  LearnerProfile,
  Subject,
  ProficiencyLevel,
  LearningGoal,
  ExplanationStyle,
  QuizAttempt,
  UserAccount
} from '../types/learning';
import {
  getLearnerProfile,
  saveLearnerProfile,
  resetLearnerProfile as clearProfileStorage,
  DEFAULT_PROFILE
} from '../services/storageService';
import {
  calculateMasteryScore,
  generateRecommendedAction,
  updateStudyPlanFromGaps
} from '../services/masteryEngine';
import {
  checkDatabaseHealth,
  loginUserInDb,
  registerUserInDb,
  syncProgressToDb,
  fetchAllDbUsers
} from '../services/apiService';

interface LearnerContextType {
  profile: LearnerProfile;
  isDbConnected: boolean;
  dbUsersList: UserAccount[];
  updateProfile: (updates: Partial<LearnerProfile>) => void;
  setOnboardingData: (
    subject: Subject,
    topic: string,
    proficiency: ProficiencyLevel,
    goal: LearningGoal,
    explanationStyle: ExplanationStyle,
    sessionDuration?: number
  ) => void;
  recordQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'timestamp'>) => void;
  toggleStudyPlanTask: (taskId: string) => void;
  triggerInstantJudgeDemo: () => void;
  resetAllProgress: () => void;
  
  // Auth & Database Actions
  login: (email: string, password?: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, password?: string, subject?: Subject, goal?: LearningGoal) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  switchUser: (account: UserAccount | Partial<LearnerProfile>) => void;
  syncDatabase: () => Promise<boolean>;
}

const LearnerContext = createContext<LearnerContextType | undefined>(undefined);

export const LearnerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<LearnerProfile>(getLearnerProfile);
  const [isDbConnected, setIsDbConnected] = useState<boolean>(false);
  const [dbUsersList, setDbUsersList] = useState<UserAccount[]>([]);

  // Check database health on initialization and sync
  useEffect(() => {
    saveLearnerProfile(profile);
    
    // Periodically sync or check database status
    checkDatabaseHealth().then((connected) => {
      setIsDbConnected(connected);
      if (connected) {
        fetchAllDbUsers().then(users => setDbUsersList(users));
      }
    });
  }, [profile]);

  const updateProfile = (updates: Partial<LearnerProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...updates };
      if (isDbConnected && prev.email) {
        syncProgressToDb(prev.email, updated);
      }
      return updated;
    });
  };

  const login = async (email: string, password?: string) => {
    const result = await loginUserInDb(email, password);
    if (result.success && result.user) {
      const updatedProfile: LearnerProfile = {
        ...DEFAULT_PROFILE,
        ...profile,
        ...result.user,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role || 'Learner',
        isLoggedIn: true,
        dbSynced: isDbConnected
      };
      setProfile(updatedProfile);
      saveLearnerProfile(updatedProfile);
      return { success: true, message: result.message };
    }
    return { success: false, message: result.message || 'Login failed' };
  };

  const register = async (
    name: string,
    email: string,
    password?: string,
    subject: Subject = 'Computer Science',
    goal: LearningGoal = 'Understand fundamentals'
  ) => {
    const result = await registerUserInDb({ email, password, name, subject, goal });
    if (result.success && result.user) {
      const newProfile: LearnerProfile = {
        ...DEFAULT_PROFILE,
        id: result.user.id || `user-${Date.now()}`,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role || goal,
        subject: subject,
        goal: goal,
        isLoggedIn: true,
        dbSynced: isDbConnected,
        onboardingCompleted: true,
        diagnosticCompleted: false,
        streakDays: 1,
        totalQuestionsAnswered: 0,
        totalCorrectAnswers: 0,
        totalSessionsCompleted: 1,
        conceptMasteryMap: {}
      };
      setProfile(newProfile);
      saveLearnerProfile(newProfile);
      return { success: true, message: result.message };
    }
    return { success: false, message: result.message || 'Registration failed' };
  };

  const logout = () => {
    const loggedOutProfile: LearnerProfile = {
      ...profile,
      isLoggedIn: false
    };
    setProfile(loggedOutProfile);
    saveLearnerProfile(loggedOutProfile);
  };

  const switchUser = (account: UserAccount | Partial<LearnerProfile>) => {
    const switchedProfile: LearnerProfile = {
      ...DEFAULT_PROFILE,
      ...profile,
      ...account,
      id: account.id || `user-${Date.now()}`,
      email: account.email || 'user@learnova.ai',
      name: account.name || 'Learner User',
      isLoggedIn: true,
      dbSynced: isDbConnected
    };
    setProfile(switchedProfile);
    saveLearnerProfile(switchedProfile);
  };

  const syncDatabase = async (): Promise<boolean> => {
    const health = await checkDatabaseHealth();
    setIsDbConnected(health);
    if (health && profile.email) {
      const success = await syncProgressToDb(profile.email, profile);
      if (success) {
        setProfile(prev => ({ ...prev, dbSynced: true }));
      }
      return success;
    }
    return false;
  };

  const setOnboardingData = (
    subject: Subject,
    topic: string,
    proficiency: ProficiencyLevel,
    goal: LearningGoal,
    explanationStyle: ExplanationStyle,
    sessionDuration: number = 15
  ) => {
    setProfile((prev) => ({
      ...prev,
      subject,
      topic,
      proficiency,
      goal,
      explanationStyle,
      sessionDuration,
      onboardingCompleted: true
    }));
  };

  const recordQuizAttempt = (attemptData: Omit<QuizAttempt, 'id' | 'timestamp'>) => {
    const newAttempt: QuizAttempt = {
      ...attemptData,
      id: `attempt-${Date.now()}`,
      timestamp: new Date().toISOString()
    };

    setProfile((prev) => {
      const updatedMasteryMap = { ...prev.conceptMasteryMap };

      attemptData.questions.forEach((q) => {
        const existingGap = updatedMasteryMap[q.conceptId] || {
          conceptId: q.conceptId,
          conceptName: q.conceptId.replace('-', ' ').toUpperCase(),
          topicId: attemptData.topicId,
          questionsAttempted: 0,
          correctCount: 0,
          accuracy: 0,
          masteryScore: 0,
          status: 'Needs Attention',
          confidenceLevel: 'Low',
          recommendedAction: ''
        };

        const newAttempted = existingGap.questionsAttempted + 1;
        const newCorrect = existingGap.correctCount + (q.isCorrect ? 1 : 0);

        const { score, status, confidence } = calculateMasteryScore(
          newAttempted,
          newCorrect,
          existingGap.masteryScore
        );

        const recommendedAction = generateRecommendedAction(
          existingGap.conceptName,
          status,
          q.misconceptionTriggered
        );

        updatedMasteryMap[q.conceptId] = {
          ...existingGap,
          questionsAttempted: newAttempted,
          correctCount: newCorrect,
          accuracy: Math.round((newCorrect / newAttempted) * 100),
          masteryScore: score,
          status,
          confidenceLevel: confidence,
          lastAttemptedAt: new Date().toISOString(),
          recommendedAction
        };
      });

      const updatedPlan = updateStudyPlanFromGaps(prev.studyPlan, updatedMasteryMap);
      const updated = {
        ...prev,
        diagnosticCompleted: true,
        quizAttempts: [newAttempt, ...prev.quizAttempts],
        conceptMasteryMap: updatedMasteryMap,
        studyPlan: updatedPlan,
        totalQuestionsAnswered: prev.totalQuestionsAnswered + attemptData.questions.length,
        totalCorrectAnswers: prev.totalCorrectAnswers + attemptData.score,
        totalSessionsCompleted: prev.totalSessionsCompleted + 1
      };

      if (isDbConnected && prev.email) {
        syncProgressToDb(prev.email, updated);
      }

      return updated;
    });
  };

  const toggleStudyPlanTask = (taskId: string) => {
    setProfile((prev) => ({
      ...prev,
      studyPlan: prev.studyPlan.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const triggerInstantJudgeDemo = () => {
    const judgeProfile: LearnerProfile = {
      ...DEFAULT_PROFILE,
      id: 'judge-demo-account',
      email: 'judge.demo@learnova.ai',
      name: 'Judge Demo User',
      role: 'Hackathon Evaluator',
      isLoggedIn: true,
      onboardingCompleted: true,
      diagnosticCompleted: true,
      subject: 'Computer Science',
      topic: 'DBMS & SQL JOINs',
      proficiency: 'Beginner',
      goal: 'Prepare for interviews',
      explanationStyle: 'Story-based explanations',
      sessionDuration: 15
    };
    setProfile(judgeProfile);
    saveLearnerProfile(judgeProfile);
  };

  const resetAllProgress = () => {
    const fresh = clearProfileStorage();
    setProfile(fresh);
  };

  return (
    <LearnerContext.Provider
      value={{
        profile,
        isDbConnected,
        dbUsersList,
        updateProfile,
        setOnboardingData,
        recordQuizAttempt,
        toggleStudyPlanTask,
        triggerInstantJudgeDemo,
        resetAllProgress,
        login,
        register,
        logout,
        switchUser,
        syncDatabase
      }}
    >
      {children}
    </LearnerContext.Provider>
  );
};

export const useLearner = () => {
  const context = useContext(LearnerContext);
  if (!context) {
    throw new Error('useLearner must be used within a LearnerProvider');
  }
  return context;
};
