'use server';

import { Question } from '@/domain/entities/Question';
import { createQuiz, updateQuiz } from '@/domain/respositories/QuizRepository';
import { generateQuestions } from '@/infrastructure/ai/quiz-ai.service';

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
  questions: Question[];
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
    const updatedQuiz = await updateQuiz(quizId, updateData);
    return { success: true, quiz: updatedQuiz };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'Failed to publish quiz.',
    };
  }
};
