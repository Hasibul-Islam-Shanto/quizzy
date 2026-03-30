'use server';

import {
  createAttempt,
  createAttemptAnswers,
  getAttemptByUserIdAndQuizId,
  updateAttempt,
} from '@/features/attempt/attempt.repository';
import { getQuizById } from '@/features/quiz/quiz.repository';
import { currentUser } from '@clerk/nextjs/server';
import { calculateScore } from './constants/helpers';

export const startQuizAction = async (quizId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        success: false,
        message: 'User not authenticated',
      };
    }
    const existingAttempt = await getAttemptByUserIdAndQuizId(user.id, quizId);
    if (existingAttempt) {
      return {
        success: false,
        message: 'Attempt already exists',
      };
    }

    const attempt = await createAttempt(user.id, quizId);
    if (!attempt) {
      return {
        success: false,
        message: 'Failed to create attempt',
      };
    }
    return {
      success: true,
      attempt,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Failed to start quiz',
    };
  }
};

export const submitQuizAction = async (
  quizId: string,
  answers: Record<string, string>,
) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        success: false,
        message: 'User not authenticated',
      };
    }
    const attempt = await getAttemptByUserIdAndQuizId(user.id, quizId);

    if (!attempt) {
      return {
        success: false,
        message: 'You have not started the quiz',
      };
    }

    const quiz = await getQuizById(quizId);
    if (!quiz) {
      return {
        success: false,
        message: 'The quiz is not available',
      };
    }

    const attemptAnswers = await createAttemptAnswers(
      attempt.id,
      quiz.questions,
      answers,
    );
    if (!attemptAnswers) {
      return {
        success: false,
        message: 'Failed to create attempt answers',
      };
    }
    const score = calculateScore(answers, quiz.questions);
    const updatedAttempt = await updateAttempt(attempt.id, {
      score,
      finishedAt: new Date().toISOString(),
    });
    if (!updatedAttempt) {
      return {
        success: false,
        message: 'Failed to update attempt',
      };
    }

    return {
      success: true,
      attempt: updatedAttempt,
      message: 'Quiz submitted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Failed to submit quiz',
    };
  }
};
