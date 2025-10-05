import { Question } from './Question';
import { User } from './User';

export interface Quiz {
  id: string;
  title: string;
  description: string | null;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: User;
  createdById: string;
  questions: Question[];
  attempts?: QuizAttempt[];
}

export interface AttemptAnswer {
  id: string;
  attempt: QuizAttempt;
  attemptId: string;
  question: Question;
  questionId: string;
  selected: string;
  isCorrect: boolean;
}

export interface QuizAttempt {
  id: string;
  user: User;
  userId: string;
  quiz: Quiz;
  quizId: string;
  score: number;
  startedAt: string;
  finishedAt: string;
  answers: AttemptAnswer[];
}
export interface AttemptAnswer {
  id: string;
  attempt: QuizAttempt;
  attemptId: string;
  question: Question;
  questionId: string;
  selected: string;
  isCorrect: boolean;
}

export interface QuizListsQuiz {
  id: string;
  title: string;
  description: string | null;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: User;
  createdById: string;
  _count: {
    questions: number;
    attempts: number;
  };
}
