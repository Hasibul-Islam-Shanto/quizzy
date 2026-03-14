import prisma from '@/config/db.config';
import { IQuizAttempt } from './attempt.entity';
import { IQuestion } from '../questions/questions.entity';

export const createAttempt = async (userId: string, quizId: string) => {
  const attempt = await prisma.quizAttempt.create({
    data: {
      userId,
      quizId,
      score: 0,
      startedAt: new Date(),
      finishedAt: null,
    },
  });
  return attempt;
};

export const getAttemptById = async (id: string) => {
  const attempt = await prisma.quizAttempt.findUnique({
    where: { id },
    include: {
      answers: true,
      quiz: {
        include: {
          questions: true,
        },
      },
      user: true,
    },
  });
  return attempt;
};

export const getAttemptByUserIdAndQuizId = async (
  userId: string,
  quizId: string,
) => {
  const attempt = await prisma.quizAttempt.findFirst({
    where: { userId, quizId },
  });
  return attempt;
};

export const createAttemptAnswer = async (
  attemptId: string,
  questionId: string,
  selected: string,
  answer: string,
) => {
  const attemptAnswer = await prisma.attemptAnswer.create({
    data: {
      attemptId,
      questionId,
      selected,
      isCorrect: selected === answer,
    },
  });
  return attemptAnswer;
};

export const updateAttempt = async (
  id: string,
  data: Partial<IQuizAttempt> & {
    score: number;
    finishedAt: string;
  },
) => {
  const attempt = await prisma.quizAttempt.update({
    where: { id },
    data: {
      score: data.score,
      finishedAt: data.finishedAt,
    },
  });
  return attempt;
};

export const getAllAttemptsByQuizId = async (quizId: string) => {
  const attempts = await prisma.quizAttempt.findMany({
    where: { quizId },
    include: {
      user: true,
    },
  });
  return attempts;
};

export const createAttemptAnswers = async (
  attemptId: string,
  questions: IQuestion[],
  answers: Record<string, string>,
) => {
  const attemptAnswers = await prisma.attemptAnswer.createMany({
    data: questions.map(question => ({
      attemptId,
      questionId: question.id,
      selected: answers[question.id],
      isCorrect: answers[question.id] === question.answer,
    })),
  });
  return attemptAnswers;
};
