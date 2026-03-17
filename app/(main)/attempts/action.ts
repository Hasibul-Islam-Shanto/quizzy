import {
  getAttemptById,
  getAttemptByUserIdAndQuizId,
} from '@/features/attempt/attempt.repository';

export const getAttemptByUserIdAndQuizIdAction = async (
  userId: string,
  quizId: string,
) => {
  try {
    const attempt = await getAttemptByUserIdAndQuizId(userId, quizId);
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

export const getAttemptByIdAction = async (id: string) => {
  try {
    const attempt = await getAttemptById(id);
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
