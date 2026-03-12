import prisma from '@/config/db.config';
import { currentUser } from '@clerk/nextjs/server';
import { IQuestion } from '../questions/questions.entity';
import { Prisma } from '@prisma/client';

export const createQuiz = async (quizData: {
  title: string;
  questions: IQuestion[];
}) => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
    const quiz = await prisma.quiz.create({
      data: {
        title: quizData.title,
        description: '',
        isPublished: false,
        createdById: user.id,
        questions: {
          create: quizData.questions.map(question => ({
            question: question.question,
            options: question.options,
            answer: question.answer,
            explanation: question.explanation,
          })),
        },
      },
    });
    return quiz;
  } catch (error) {
    throw error;
  }
};

export const getQuizById = async (quizId: string) => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: true,
      },
    });
    return quiz;
  } catch (error) {
    throw error;
  }
};

export const updateQuiz = async (
  quizId: string,
  updateData: Partial<{
    title: string;
    description: string;
    isPublished: boolean;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  }>,
) => {
  try {
    const updatedQuiz = await prisma.quiz.update({
      where: { id: quizId },
      data: updateData,
    });
    return updatedQuiz;
  } catch (error) {
    throw error;
  }
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
    ];
  }
  if (filters?.difficulty && filters.difficulty !== 'ALL') {
    where.difficulty = filters.difficulty;
  }

  const quizzes = await prisma.quiz.findMany({
    where,
    include: {
      _count: {
        select: {
          attempts: true,
          questions: true,
        },
      },
    },
  });
  return quizzes;
};
