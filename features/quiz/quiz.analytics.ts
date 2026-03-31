import 'server-only';

import prisma from '@/config/db.config';

export type QuizAnalytics = {
  avgScore: number;
  completionRate: number;
  hardestQuestions: { questionId: string; correctRate: number }[];
  avgTime: number;
};

export const getQuizAnalytics = async (
  quizId: string,
): Promise<QuizAnalytics> => {
  const [
    totalAttempts,
    completedAttempts,
    averageScore,
    finishedAttempts,
    answerRows,
  ] = await Promise.all([
    prisma.quizAttempt.count({
      where: { quizId },
    }),
    prisma.quizAttempt.count({
      where: { quizId, finishedAt: { not: null } },
    }),
    prisma.quizAttempt.aggregate({
      where: { quizId, finishedAt: { not: null } },
      _avg: { score: true },
    }),
    prisma.quizAttempt.findMany({
      where: { quizId, finishedAt: { not: null } },
      select: {
        startedAt: true,
        finishedAt: true,
      },
    }),
    prisma.attemptAnswer.findMany({
      where: {
        attempt: {
          quizId,
          finishedAt: { not: null },
        },
      },
      select: {
        questionId: true,
        isCorrect: true,
      },
    }),
  ]);

  const avgTime =
    finishedAttempts.length === 0
      ? 0
      : Math.round(
          finishedAttempts.reduce((total, attempt) => {
            if (!attempt.finishedAt) {
              return total;
            }

            return (
              total +
              (new Date(attempt.finishedAt).getTime() -
                new Date(attempt.startedAt).getTime())
            );
          }, 0) / finishedAttempts.length,
        );

  const questionStats = new Map<string, { total: number; correct: number }>();

  for (const answerRow of answerRows) {
    const existing = questionStats.get(answerRow.questionId) ?? {
      total: 0,
      correct: 0,
    };

    existing.total += 1;
    existing.correct += answerRow.isCorrect ? 1 : 0;

    questionStats.set(answerRow.questionId, existing);
  }

  const hardestQuestions = Array.from(questionStats.entries())
    .map(([questionId, stats]) => ({
      questionId,
      correctRate:
        stats.total === 0
          ? 0
          : Number((stats.correct / stats.total).toFixed(2)),
    }))
    .sort((a, b) => a.correctRate - b.correctRate)
    .slice(0, 5);

  return {
    avgScore: Number((averageScore._avg.score ?? 0).toFixed(2)),
    completionRate:
      totalAttempts === 0
        ? 0
        : Number((completedAttempts / totalAttempts).toFixed(2)),
    hardestQuestions,
    avgTime,
  };
};
