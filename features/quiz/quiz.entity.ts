import { IQuestion } from '../questions/questions.entity';
import { IUser } from '../user/user.entity';

export interface IQuiz {
  id: string;
  title: string;
  description: string | null;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: IUser;
  createdById: string;
  questions: IQuestion[];
  attempts?: IQuizAttempt[];
}

export interface IPublicQuiz {
  id: string;
  title: string;
  description: string | null;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: Pick<IUser, 'id' | 'name'>;
  createdById: string;
  questionsCount: number;
}

export interface IAttemptAnswer {
  id: string;
  attempt: IQuizAttempt;
  attemptId: string;
  question: IQuestion;
  questionId: string;
  selected: string;
  isCorrect: boolean;
}

export interface IQuizAttempt {
  id: string;
  user: IUser;
  userId: string;
  quiz: IQuiz;
  quizId: string;
  score: number;
  startedAt: string;
  finishedAt: string;
  answers: IAttemptAnswer[];
}
export interface IAttemptAnswer {
  id: string;
  attempt: IQuizAttempt;
  attemptId: string;
  question: IQuestion;
  questionId: string;
  selected: string;
  isCorrect: boolean;
}

export interface IQuizListsQuiz {
  id: string;
  title: string;
  description: string | null;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: IUser;
  createdById: string;
  _count: {
    questions: number;
    attempts: number;
  };
}

export interface IQuizAttemptSummary {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  startedAt: Date;
  finishedAt: Date | null;
}
