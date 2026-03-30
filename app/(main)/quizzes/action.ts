'use server';

import { currentUser } from '@clerk/nextjs/server';
import {
  createAttemptForUserQuiz,
  getAttemptByUserIdAndQuizId,
  submitAttempt,
} from '@/features/attempt/attempt.repository';
import { getQuizForEvaluation } from '@/features/quiz/quiz.repository';
import { buildQuizSubmissionSchema } from './constants/helpers';

export const startQuizAction = async (quizId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        success: false,
        message: 'User not authenticated',
      };
    }

    const quiz = await getQuizForEvaluation(quizId);
    if (!quiz || !quiz.isPublished) {
      return {
        success: false,
        message: 'The quiz is not available',
      };
    }

    const { attempt, created } = await createAttemptForUserQuiz(user.id, quizId);

    if (!created && attempt.finishedAt) {
      return {
        success: false,
        message: 'Quiz already completed',
        attempt,
      };
    }

    return {
      success: true,
      attempt,
      message: created ? 'Quiz started successfully' : 'Resuming existing quiz',
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

    if (attempt.finishedAt) {
      return {
        success: true,
        attempt,
        message: 'Quiz was already submitted',
      };
    }

    const quiz = await getQuizForEvaluation(quizId);
    if (!quiz || !quiz.isPublished) {
      return {
        success: false,
        message: 'The quiz is not available',
      };
    }

    const validationResult = buildQuizSubmissionSchema(quiz.questions).safeParse(
      answers,
    );

    if (!validationResult.success) {
      return {
        success: false,
        message: validationResult.error.issues[0]?.message ?? 'Invalid answers',
      };
    }

    const result = await submitAttempt({
      userId: user.id,
      quizId,
      questions: quiz.questions,
      answers: validationResult.data,
    });

    if (!result.attempt) {
      return {
        success: false,
        message: 'You have not started the quiz',
      };
    }

    return {
      success: true,
      attempt: result.attempt,
      message:
        result.status === 'submitted'
          ? 'Quiz submitted successfully'
          : 'Quiz was already submitted',
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Failed to submit quiz',
    };
  }
};
