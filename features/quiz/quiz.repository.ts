import 'server-only';

import prisma from '@/config/db.config';
import { Prisma } from '@prisma/client';
import { IQuestion } from '../questions/questions.entity';

const creatorSummarySelect = {
  id: true,
  name: true,
} satisfies Prisma.UserSelect;

const quizListSelect = {
  id: true,
  title: true,
  description: true,
  difficulty: true,
  isPublished: true,
  createdAt: true,
  updatedAt: true,
  createdById: true,
  _count: {
    select: {
      attempts: true,
      questions: true,
    },
  },
} satisfies Prisma.QuizSelect;

const publicQuizSelect = {
  id: true,
  title: true,
  description: true,
  difficulty: true,
  isPublished: true,
  createdAt: true,
  updatedAt: true,
  createdById: true,
  createdBy: {
    select: creatorSummarySelect,
  },
  _count: {
    select: {
      questions: true,
    },
  },
} satisfies Prisma.QuizSelect;

const creatorQuizSelect = {
  id: true,
  title: true,
  description: true,
  difficulty: true,
  isPublished: true,
  createdAt: true,
  updatedAt: true,
  createdById: true,
  createdBy: {
    select: creatorSummarySelect,
  },
  questions: {
    select: {
      id: true,
      question: true,
      topic: true,
      options: true,
      answer: true,
      explanation: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  },
} satisfies Prisma.QuizSelect;

const attemptQuizSelect = {
  id: true,
  title: true,
  description: true,
  difficulty: true,
  isPublished: true,
  createdAt: true,
  updatedAt: true,
  createdById: true,
  createdBy: {
    select: creatorSummarySelect,
  },
  questions: {
    select: {
      id: true,
      question: true,
      topic: true,
      options: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  },
} satisfies Prisma.QuizSelect;

const evaluationQuizSelect = {
  id: true,
  title: true,
  difficulty: true,
  isPublished: true,
  questions: {
    select: {
      id: true,
      question: true,
      topic: true,
      options: true,
      answer: true,
      explanation: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  },
} satisfies Prisma.QuizSelect;

export const createQuiz = async (
  creatorId: string,
  quizData: {
    title: string;
    questions: IQuestion[];
  },
) => {
  return prisma.quiz.create({
    data: {
      title: quizData.title,
      description: '',
      isPublished: false,
      createdById: creatorId,
      questions: {
        create: quizData.questions.map(question => ({
          question: question.question,
          topic: question.topic,
          options: question.options,
          answer: question.answer,
          explanation: question.explanation,
        })),
      },
    },
  });
};

export const getPublicQuiz = async (quizId: string) => {
  const quiz = await prisma.quiz.findFirst({
    where: {
      id: quizId,
      isPublished: true,
    },
    select: publicQuizSelect,
  });

  if (!quiz) {
    return null;
  }

  return {
    ...quiz,
    questionsCount: quiz._count.questions,
  };
};

export const getQuizForAttempt = async (quizId: string) => {
  return prisma.quiz.findFirst({
    where: {
      id: quizId,
      isPublished: true,
    },
    select: attemptQuizSelect,
  });
};

export const getQuizForEvaluation = async (quizId: string) => {
  return prisma.quiz.findFirst({
    where: {
      id: quizId,
      isPublished: true,
    },
    select: evaluationQuizSelect,
  });
};

export const getQuizForCreator = async (quizId: string, creatorId: string) => {
  return prisma.quiz.findFirst({
    where: {
      id: quizId,
      createdById: creatorId,
    },
    select: creatorQuizSelect,
  });
};

export const publishQuiz = async (
  quizId: string,
  creatorId: string,
  updateData: {
    title: string;
    description: string;
    isPublished: boolean;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  },
) => {
  const result = await prisma.quiz.updateMany({
    where: {
      id: quizId,
      createdById: creatorId,
    },
    data: updateData,
  });

  if (result.count === 0) {
    return null;
  }

  return prisma.quiz.findUnique({
    where: { id: quizId },
    select: creatorQuizSelect,
  });
};

export const getAllQuizzes = async (filters: {
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | 'ALL';
  search?: string;
}) => {
  const where: Prisma.QuizWhereInput = {
    isPublished: true,
  };

  if (filters.search?.trim()) {
    where.OR = [
      {
        title: {
          contains: filters.search.trim(),
          mode: 'insensitive',
        },
      },
      {
        description: {
          contains: filters.search.trim(),
          mode: 'insensitive',
        },
      },
    ];
  }

  if (filters.difficulty && filters.difficulty !== 'ALL') {
    where.difficulty = filters.difficulty;
  }

  return prisma.quiz.findMany({
    where,
    select: quizListSelect,
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getQuizStats = async (userId: string) => {
  const [quizCountResult, totalAttemptsResult, distinctAttendees] =
    await Promise.all([
      prisma.quiz.aggregate({
        where: { createdById: userId },
        _count: true,
      }),
      prisma.quizAttempt.aggregate({
        where: {
          quiz: { createdById: userId },
        },
        _count: true,
      }),
      prisma.quizAttempt.findMany({
        where: {
          quiz: { createdById: userId },
        },
        distinct: ['userId'],
        select: { userId: true },
      }),
    ]);

  return {
    quizCount: quizCountResult._count,
    totalAttempts: totalAttemptsResult._count,
    totalAttendees: distinctAttendees.length,
  };
};

export const getUserQuiz = async (userId: string) => {
  return prisma.quiz.findMany({
    where: { createdById: userId },
    select: quizListSelect,
    orderBy: {
      updatedAt: 'desc',
    },
  });
};

export const getParticipatedQuizzes = async (userId: string) => {
  return prisma.quiz.findMany({
    where: {
      isPublished: true,
      attempts: { some: { userId } },
    },
    select: {
      id: true,
      title: true,
      description: true,
      difficulty: true,
      isPublished: true,
      createdAt: true,
      updatedAt: true,
      createdById: true,
      _count: { select: { attempts: true } },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
};
