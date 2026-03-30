import 'server-only';

import prisma from '@/config/db.config';
import { Prisma } from '@prisma/client';
import { IQuestion } from '../questions/questions.entity';
import { calculateScore } from '@/app/(main)/quizzes/constants/helpers';
import {
  rankParticipantAttempts,
  type RankedParticipantAttempt,
} from './attempt.helpers';

export const getAttemptByUserIdAndQuizId = async (
  userId: string,
  quizId: string,
) => {
  return prisma.quizAttempt.findUnique({
    where: {
      userId_quizId: {
        userId,
        quizId,
      },
    },
  });
};

export const createAttemptForUserQuiz = async (
  userId: string,
  quizId: string,
) => {
  try {
    const attempt = await prisma.quizAttempt.create({
      data: {
        userId,
        quizId,
        score: 0,
      },
    });

    return {
      attempt,
      created: true,
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      const existingAttempt = await getAttemptByUserIdAndQuizId(userId, quizId);

      if (!existingAttempt) {
        throw error;
      }

      return {
        attempt: existingAttempt,
        created: false,
      };
    }

    throw error;
  }
};

export const submitAttempt = async ({
  userId,
  quizId,
  questions,
  answers,
}: {
  userId: string;
  quizId: string;
  questions: IQuestion[];
  answers: Record<string, string>;
}) => {
  return prisma.$transaction(async tx => {
    const attempt = await tx.quizAttempt.findUnique({
      where: {
        userId_quizId: {
          userId,
          quizId,
        },
      },
    });

    if (!attempt) {
      return {
        status: 'missing_attempt' as const,
        attempt: null,
      };
    }

    if (attempt.finishedAt) {
      return {
        status: 'already_submitted' as const,
        attempt,
      };
    }

    const score = calculateScore(answers, questions);
    const finishedAt = new Date();

    await tx.attemptAnswer.createMany({
      data: questions.map(question => ({
        attemptId: attempt.id,
        questionId: question.id,
        selected: answers[question.id],
        isCorrect: answers[question.id] === question.answer,
      })),
      skipDuplicates: true,
    });

    const updateResult = await tx.quizAttempt.updateMany({
      where: {
        id: attempt.id,
        finishedAt: null,
      },
      data: {
        score,
        finishedAt,
      },
    });

    if (updateResult.count === 0) {
      const existingAttempt = await tx.quizAttempt.findUnique({
        where: { id: attempt.id },
      });

      return {
        status: 'already_submitted' as const,
        attempt: existingAttempt,
      };
    }

    const updatedAttempt = await tx.quizAttempt.findUnique({
      where: { id: attempt.id },
    });

    return {
      status: 'submitted' as const,
      attempt: updatedAttempt,
    };
  });
};

export const getOwnedAttemptById = async (userId: string, id: string) => {
  return prisma.quizAttempt.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      answers: true,
      quiz: {
        include: {
          questions: {
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const getAllAttemptsByQuizId = async (quizId: string) => {
  return prisma.quizAttempt.findMany({
    where: { quizId },
    include: {
      user: true,
    },
  });
};

export type ParticipantAttempt = RankedParticipantAttempt;

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

  return rankParticipantAttempts(
    attempts.map(attempt => ({
      userId: attempt.user.id,
      userName: attempt.user.name,
      score: attempt.score,
      totalQuestions: attempt.quiz.questions.length,
      startedAt: new Date(attempt.startedAt),
      finishedAt: attempt.finishedAt ? new Date(attempt.finishedAt) : null,
    })),
  );
};
