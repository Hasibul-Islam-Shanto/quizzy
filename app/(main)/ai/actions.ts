'use server';

import { currentUser } from '@clerk/nextjs/server';
import {
  questionRefinementActionSchema,
  questionRefinementInputSchema,
  type QuestionRefinementAction,
  type QuestionRefinementInput,
} from '@/features/ai/ai-learning.schema';
import {
  getOwnedAttemptWithFeedbackData,
  saveAttemptFeedback,
} from '@/features/attempt/attempt.repository';
import { buildAttemptFeedbackPayload } from '@/features/attempt/attempt.performance';
import {
  generateAttemptFeedbackFromAI,
  refineQuestionWithAI,
  validateQuestionWithAI,
} from '@/infrastructure/ai/openai-quiz-learning.service';
import { getQuizAnalytics } from '@/features/quiz/quiz.analytics';

export const generateFeedback = async (attemptId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, error: 'User not authenticated.' };
    }

    const attempt = await getOwnedAttemptWithFeedbackData(user.id, attemptId);

    if (!attempt) {
      return { success: false, error: 'Attempt not found.' };
    }

    if (attempt.feedback) {
      return {
        success: true,
        feedback: attempt.feedback,
        cached: true,
      };
    }

    if (!attempt.finishedAt) {
      return {
        success: false,
        error: 'Quiz feedback is only available after submission.',
      };
    }

    const feedback = await generateAttemptFeedbackFromAI(
      buildAttemptFeedbackPayload({
        score: attempt.score,
        answers: attempt.answers,
      }),
    );

    await saveAttemptFeedback({
      attemptId,
      userId: user.id,
      feedback,
    });

    return {
      success: true,
      feedback,
      cached: false,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'Failed to generate feedback.',
    };
  }
};

export const refineQuestion = async (
  input: QuestionRefinementInput,
  actionType: QuestionRefinementAction,
) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, error: 'User not authenticated.' };
    }

    const validatedInput = questionRefinementInputSchema.parse(input);
    const validatedAction = questionRefinementActionSchema.parse(actionType);

    const result = await refineQuestionWithAI({
      input: validatedInput,
      actionType: validatedAction,
    });

    return {
      success: true,
      ...result,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'Failed to refine question.',
    };
  }
};

export const validateQuestion = async (input: QuestionRefinementInput) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, error: 'User not authenticated.' };
    }

    const validatedInput = questionRefinementInputSchema.parse(input);
    const options = validatedInput.options.map(option => option.trim());
    const uniqueOptions = new Set(options.map(option => option.toLowerCase()));

    if (uniqueOptions.size !== options.length) {
      return {
        success: true,
        result: {
          isValid: false,
          issues: ['Question contains duplicate answer options.'],
          suggestions: ['Make every option distinct before publishing.'],
        },
      };
    }

    const result = await validateQuestionWithAI({
      input: validatedInput,
    });

    return { success: true, result };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'Failed to validate question.',
    };
  }
};

export const getQuizAnalyticsAction = async (quizId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, error: 'User not authenticated.' };
    }

    const analytics = await getQuizAnalytics(quizId);
    return { success: true, analytics };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'Failed to load quiz analytics.',
    };
  }
};
