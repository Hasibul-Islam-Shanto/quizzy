import { IQuiz, IQuizAttempt } from '../quiz/quiz.entity';

export interface IUser {
  id: string;
  name: string;
  email: string | null;
  password?: string;
  role: 'PROVIDER' | 'USER' | 'ADMIN';
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  quizzesCreated: IQuiz[];
  quizAttempts: IQuizAttempt[];
}
