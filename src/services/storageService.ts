import type { LearnerProfile } from '../types/learning';

const STORAGE_KEY = 'learnova_ai_learner_profile_v1';

export const DEFAULT_PROFILE: LearnerProfile = {
  id: 'learner-demo-1',
  email: 'alex.rivera@learnova.ai',
  name: 'Alex Rivera',
  role: 'Computer Science Student',
  isLoggedIn: true,
  dbSynced: true,
  subject: 'Computer Science',
  topic: 'DBMS & SQL JOINs',
  proficiency: 'Beginner',
  goal: 'Prepare for interviews',
  explanationStyle: 'Story-based explanations',
  sessionDuration: 15,
  
  fontScale: 'base',
  simplerLanguageMode: false,
  autoSpeechEnabled: false,
  
  isDemoMode: true,
  
  onboardingCompleted: false,
  diagnosticCompleted: false,
  currentLessonId: 'lesson-sql-joins',
  completedLessonIds: [],
  
  conceptMasteryMap: {
    'relational-basics': {
      conceptId: 'relational-basics',
      conceptName: 'Relational Model & Keys',
      topicId: 'dbms-sql-joins',
      questionsAttempted: 1,
      correctCount: 1,
      accuracy: 100,
      masteryScore: 85,
      status: 'Strong',
      confidenceLevel: 'High',
      recommendedAction: 'Ready to advance to multi-table joins.'
    },
    'left-right-join': {
      conceptId: 'left-right-join',
      conceptName: 'LEFT & RIGHT JOINs',
      topicId: 'dbms-sql-joins',
      questionsAttempted: 2,
      correctCount: 0,
      accuracy: 0,
      masteryScore: 35,
      status: 'Needs Attention',
      confidenceLevel: 'Low',
      recommendedAction: 'Study the student-course analogy lesson and complete 3 practice questions on NULL row preservation.'
    },
    'inner-join': {
      conceptId: 'inner-join',
      conceptName: 'INNER JOIN Operations',
      topicId: 'dbms-sql-joins',
      questionsAttempted: 1,
      correctCount: 1,
      accuracy: 100,
      masteryScore: 75,
      status: 'Improving',
      confidenceLevel: 'Medium',
      recommendedAction: 'Review filtering behavior with ON vs WHERE predicates.'
    },
    'full-outer-join': {
      conceptId: 'full-outer-join',
      conceptName: 'FULL OUTER & CROSS JOINs',
      topicId: 'dbms-sql-joins',
      questionsAttempted: 0,
      correctCount: 0,
      accuracy: 0,
      masteryScore: 0,
      status: 'Needs Attention',
      confidenceLevel: 'Low',
      recommendedAction: 'Complete prerequisite lesson on LEFT JOINs first.'
    },
    'join-performance': {
      conceptId: 'join-performance',
      conceptName: 'Query Optimization & Indexing',
      topicId: 'dbms-sql-joins',
      questionsAttempted: 1,
      correctCount: 0,
      accuracy: 0,
      masteryScore: 20,
      status: 'Needs Attention',
      confidenceLevel: 'Low',
      recommendedAction: 'Review predicate pushdown misconceptions.'
    }
  },
  
  quizAttempts: [],
  studyPlan: [
    {
      id: 'plan-day-1',
      day: 1,
      title: 'Foundation Check & SQL Join Mechanics',
      description: 'Review primary vs foreign key relationships and core INNER JOIN filtering.',
      estimatedMinutes: 15,
      conceptId: 'relational-basics',
      type: 'lesson',
      completed: true,
      reason: 'Establishes baseline knowledge required for table relationships.'
    },
    {
      id: 'plan-day-2',
      day: 2,
      title: 'Targeted Remediation: LEFT JOIN NULL Preservation',
      description: 'Study the story-based student-course analogy and answer 3 practice questions.',
      estimatedMinutes: 20,
      conceptId: 'left-right-join',
      type: 'practice',
      completed: false,
      reason: 'Recommended because you missed 2 questions on unmatched row preservation.'
    },
    {
      id: 'plan-day-3',
      day: 3,
      title: 'Mixed Assessment & Misconception Review',
      description: 'Test your understanding of WHERE clause filtering on LEFT JOIN queries.',
      estimatedMinutes: 15,
      conceptId: 'join-performance',
      type: 'assessment',
      completed: false,
      reason: 'Focuses on predicate pushdown edge cases identified in diagnostic test.'
    },
    {
      id: 'plan-day-4',
      day: 4,
      title: 'Advanced Master Challenge: FULL OUTER JOINs',
      description: 'Solve complex scenarios combining Cartesian products and full row preservation.',
      estimatedMinutes: 25,
      conceptId: 'full-outer-join',
      type: 'practice',
      completed: false,
      reason: 'Final step towards 100% topic mastery for interview prep.'
    }
  ],
  
  streakDays: 3,
  totalQuestionsAnswered: 5,
  totalCorrectAnswers: 2,
  totalSessionsCompleted: 4
};

export const getLearnerProfile = (): LearnerProfile => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return DEFAULT_PROFILE;
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading learner profile from localStorage:', err);
    return DEFAULT_PROFILE;
  }
};

export const saveLearnerProfile = (profile: LearnerProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Error saving learner profile to localStorage:', err);
  }
};

export const resetLearnerProfile = (): LearnerProfile => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error resetting learner profile:', err);
  }
  return DEFAULT_PROFILE;
};
