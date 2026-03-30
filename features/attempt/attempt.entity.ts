import { IQuestion } from '../questions/questions.entity';
import { IQuiz } from '../quiz/quiz.entity';
import { IUser } from '../user/user.entity';

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
  finishedAt: string | null;
  answers: IAttemptAnswer[];
}
