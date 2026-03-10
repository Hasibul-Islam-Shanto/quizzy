'use server';

import { IQuestion } from '@/features/questions/questions.entity';
import {
  createQuiz,
  getQuizById,
  updateQuiz,
} from '@/features/quiz/quiz.repository';
import { generateQuestions } from '@/infrastructure/ai/quiz-ai.service';
import { currentUser } from '@clerk/nextjs/server';

export const generateQuizAction = async (data: {
  prompt: string;
  numQuestions: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}) => {
  try {
    const questions = await generateQuestions(data);
    return questions;
  } catch (error) {
    return {
      error: (error as Error).message || 'Failed to generate quiz questions.',
    };
  }
};

export const createQuizAction = async (data: {
  title: string;
  questions: IQuestion[];
}) => {
  try {
    const quiz = await createQuiz(data);
    return { success: true, quiz };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'Failed to create quiz.',
    };
  }
};

export const publishQuizAction = async (
  quizId: string,
  updateData: Partial<{
    title: string;
    description: string;
    isPublished: boolean;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  }>,
) => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error('User not authenticated.');
    }
    const quiz = await getQuizById(quizId);
    if (!quiz || quiz.createdById !== user.id) {
      throw new Error('Quiz not found.');
    }
    await updateQuiz(quizId, updateData);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'Failed to publish quiz.',
    };
  }
};

export const getQuizByIdAction = async (id: string) => {
  try {
    const quiz = await getQuizById(id);
    if (!quiz) {
      return {
        success: false,
        quiz: null,
      };
    }
    return { success: true, quiz };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'Failed to get quiz.',
    };
  }
};
