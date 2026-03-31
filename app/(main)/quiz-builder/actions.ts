'use server';

import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import {
  createQuiz,
  getAllQuizzes,
  getPublicQuiz,
  getQuizForAttempt,
  getQuizForCreator,
  publishQuiz,
} from '@/features/quiz/quiz.repository';
import {
  aiQuizRequestSchema,
  createQuizPayloadSchema,
  publishQuizSchema,
} from '@/features/quiz/quiz.schema';
import { generateQuestions } from '@/infrastructure/ai/quiz-ai.service';
import { validateQuestionWithAI } from '@/infrastructure/ai/openai-quiz-learning.service';

export const generateQuizAction = async (data: {
  prompt: string;
  numQuestions: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        error: 'User not authenticated.',
      };
    }

    const validatedInput = aiQuizRequestSchema.parse(data);
    const questions = await generateQuestions(validatedInput);
    return questions;
  } catch (error) {
    return {
      error: (error as Error).message || 'Failed to generate quiz questions.',
    };
  }
};

export const createQuizAction = async (data: {
  title: string;
  questions: {
    id: string;
    question: string;
    topic?: string | null;
    options: string[];
    answer: string;
    explanation: string | null;
  }[];
}) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        success: false,
        error: 'User not authenticated.',
      };
    }

    const validatedPayload = createQuizPayloadSchema.parse(data);
    const quiz = await createQuiz(user.id, validatedPayload);

    revalidatePath('/quiz-dashboard');

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
      return {
        success: false,
        error: 'User not authenticated.',
      };
    }

    const validatedUpdate = publishQuizSchema.parse(updateData);
    const creatorQuiz = await getQuizForCreator(quizId, user.id);

    if (!creatorQuiz) {
      return {
        success: false,
        error: 'Quiz not found.',
      };
    }

    if (validatedUpdate.isPublished) {
      const validationResults = await Promise.all(
        creatorQuiz.questions.map(question =>
          validateQuestionWithAI({
            input: {
              question: question.question,
              options: question.options,
              correctAnswer: question.answer,
              explanation: question.explanation ?? undefined,
            },
          }),
        ),
      );

      const invalidResults = validationResults.filter(
        result => !result.isValid,
      );

      if (invalidResults.length > 0) {
        return {
          success: false,
          error:
            'Quiz contains invalid questions. Resolve the validation issues before publishing.',
          validationResults: invalidResults,
        };
      }
    }

    const updatedQuiz = await publishQuiz(quizId, user.id, validatedUpdate);

    if (!updatedQuiz) {
      return {
        success: false,
        error: 'Quiz not found.',
      };
    }

    revalidatePath('/quizzes');
    revalidatePath('/quiz-dashboard');
    revalidatePath(`/quizzes/${quizId}`);
    revalidatePath(`/quiz-builder/${quizId}`);

    return { success: true, quiz: updatedQuiz };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'Failed to publish quiz.',
    };
  }
};

export const getCreatorQuizByIdAction = async (id: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        success: false,
        quiz: null,
      };
    }

    const quiz = await getQuizForCreator(id, user.id);

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

export const getPublicQuizByIdAction = async (id: string) => {
  try {
    const quiz = await getPublicQuiz(id);

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

export const getQuizForAttemptAction = async (id: string) => {
  try {
    const quiz = await getQuizForAttempt(id);

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
      error: (error as Error).message || 'Failed to get quiz for attempt.',
    };
  }
};

export const getAllQuizzesAction = async (filters: {
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | 'ALL';
  search?: string;
}) => {
  try {
    const quizzes = await getAllQuizzes(filters);
    return { success: true, quizzes };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'Failed to get quizzes.',
    };
  }
};
