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

export type ParticipantAttempt = {
  rank: number;
  id: string;
  name: string;
  timeSpentMs: number;
  timeSpentFormatted: string; // e.g. "2m 30s" or "45s"
  score: number; // percentage
};

const formatTimeSpent = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(' ');
};

export const getParticipantsAttempts = async (
  quizId: string,
): Promise<ParticipantAttempt[]> => {
  const attempts = await prisma.quizAttempt.findMany({
    where: {
      quizId,
      finishedAt: { not: null },
    },
    include: {
      user: { select: { id: true, name: true } },
      quiz: {
        select: {
          questions: { select: { id: true } },
        },
      },
    },
  });

  const userBestAttempt = new Map<
    string,
    { attempt: (typeof attempts)[0]; timeSpentMs: number; percentage: number }
  >();

  for (const a of attempts) {
    const totalQuestions = a.quiz.questions.length;
    const percentage =
      totalQuestions > 0 ? Math.round((a.score / totalQuestions) * 100) : 0;
    const timeSpentMs = a.finishedAt
      ? new Date(a.finishedAt).getTime() - new Date(a.startedAt).getTime()
      : 0;

    const existing = userBestAttempt.get(a.userId);
    const isBetter =
      !existing ||
      percentage > existing.percentage ||
      (percentage === existing.percentage &&
        timeSpentMs < existing.timeSpentMs);

    if (isBetter) {
      userBestAttempt.set(a.userId, {
        attempt: a,
        timeSpentMs,
        percentage,
      });
    }
  }

  const sorted = Array.from(userBestAttempt.values())
    .map(({ attempt, timeSpentMs, percentage }) => ({
      id: attempt.user.id,
      name: attempt.user.name,
      timeSpentMs,
      timeSpentFormatted: formatTimeSpent(timeSpentMs),
      score: percentage,
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeSpentMs - b.timeSpentMs;
    });

  return sorted.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));
};
