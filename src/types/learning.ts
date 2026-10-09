export type Subject = 'Computer Science' | 'Mathematics' | 'Physics' | 'Biology' | 'English';

export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Not sure yet';

export type LearningGoal = 
  | 'Understand fundamentals' 
  | 'Prepare for exams' 
  | 'Improve problem-solving' 
  | 'Prepare for interviews';

export type ExplanationStyle = 
  | 'Simple language with real-world examples' 
  | 'Story-based explanations' 
  | 'Step-by-step technical explanations' 
  | 'Concise revision notes';

export type GapStatus = 'Needs Attention' | 'Improving' | 'Strong' | 'Mastered';

export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  topicId: string;
  conceptId: string;
  conceptName: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  misconceptionMap: Record<number, string>; // Maps wrong option index to exact misunderstanding explanation
  difficulty: QuestionDifficulty;
  hint: string;
}

export interface ConceptMastery {
  conceptId: string;
  conceptName: string;
  topicId: string;
  questionsAttempted: number;
  correctCount: number;
  accuracy: number; // percentage 0-100
  masteryScore: number; // percentage 0-100
  status: GapStatus;
  confidenceLevel: 'Low' | 'Medium' | 'High';
  lastAttemptedAt?: string;
  recommendedAction: string;
}

export interface QuizAttempt {
  id: string;
  timestamp: string;
  topicId: string;
  score: number;
  total: number;
  questions: {
    questionId: string;
    conceptId: string;
    selectedIndex: number;
    isCorrect: boolean;
    misconceptionTriggered?: string;
  }[];
}

export interface LessonContent {
  introduction: string;
  coreConcept: string;
  analogy: string;
  workedExample: {
    problem: string;
    solution: string;
    explanation: string;
  };
  misconceptions: string[];
  summary: string[];
}

export interface Lesson {
  id: string;
  topicId: string;
  conceptId: string;
  title: string;
  objective: string;
  prerequisites?: string[];
  explanations: {
    'Simple language with real-world examples': LessonContent;
    'Story-based explanations': LessonContent;
    'Step-by-step technical explanations': LessonContent;
    'Concise revision notes': LessonContent;
  };
  knowledgeCheck: Question[];
}

export interface StudyPlanItem {
  id: string;
  day: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  conceptId: string;
  type: 'lesson' | 'practice' | 'revision' | 'assessment';
  completed: boolean;
  reason: string;
}

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface AuthCredentials {
  email: string;
  password?: string;
  name?: string;
}

export interface LearnerProfile {
  id: string;
  email: string;
  name: string;
  role?: string;
  isLoggedIn: boolean;
  dbSynced?: boolean;
  subject: Subject;
  topic: string;
  proficiency: ProficiencyLevel;
  goal: LearningGoal;
  explanationStyle: ExplanationStyle;
  sessionDuration: number; // in minutes
  
  // Accessibility & UI preferences
  fontScale: 'sm' | 'base' | 'lg' | 'xl';
  simplerLanguageMode: boolean;
  autoSpeechEnabled: boolean;
  
  // Mode settings
  isDemoMode: boolean;
  apiKey?: string;
  
  // Progress tracking
  onboardingCompleted: boolean;
  diagnosticCompleted: boolean;
  currentLessonId: string;
  completedLessonIds: string[];
  
  // Performance history
  conceptMasteryMap: Record<string, ConceptMastery>;
  quizAttempts: QuizAttempt[];
  studyPlan: StudyPlanItem[];
  streakDays: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  totalSessionsCompleted: number;
}

