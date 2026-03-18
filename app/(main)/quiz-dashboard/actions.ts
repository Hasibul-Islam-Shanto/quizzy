'use server';

import { getQuizStats, getUserQuiz } from '@/features/quiz/quiz.repository';
import { currentUser } from '@clerk/nextjs/server';

export const getQuizDashboardStatsAction = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        success: false,
        message: 'User not authenticated',
      };
    }
    const stats = await getQuizStats(user.id);
    if (!stats) {
      return {
        success: false,
        message: 'Failed to fetch quiz stats',
      };
    }
    return {
      success: true,
      data: stats,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Failed to fetch quiz stats',
    };
  }
};

export const getUserQuizAction = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        success: false,
        message: 'User not authenticated',
      };
    }
    const quizzes = await getUserQuiz(user.id);
    return {
      success: true,
      data: quizzes,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Failed to fetch user quizzes',
    };
  }
};
