'use server';

import { currentUser } from '@clerk/nextjs/server';
import {
  getAttemptByUserIdAndQuizId,
  getOwnedAttemptById,
} from '@/features/attempt/attempt.repository';

export const getMyAttemptByQuizIdAction = async (quizId: string) => {
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
        message: 'Attempt not found',
      };
    }

    return {
      success: true,
      attempt,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Failed to get attempt',
    };
  }
};

export const getOwnedAttemptByIdAction = async (id: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        success: false,
        message: 'User not authenticated',
      };
    }

    const attempt = await getOwnedAttemptById(user.id, id);
    if (!attempt) {
      return {
        success: false,
        message: 'Attempt not found',
      };
    }

    return {
      success: true,
      attempt,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Failed to get attempt',
    };
  }
};
