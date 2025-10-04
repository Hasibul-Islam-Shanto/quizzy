import { Quiz, QuizAttempt } from './Quiz';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'PROVIDER' | 'USER' | 'ADMIN';
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  quizzesCreated: Quiz[];
  quizAttempts: QuizAttempt[];
}
