'use server';

import { getParticipantsAttempts } from '@/features/attempt/attempt.repository';
import { getParticipatedQuizzes } from '@/features/quiz/quiz.repository';
import { currentUser } from '@clerk/nextjs/server';

export const getQuizzesForLeaderboardAction = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, message: 'User not authenticated' };
    }

    const quizzes = await getParticipatedQuizzes(user.id);
    return { success: true, data: quizzes };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Failed to load quizzes',
    };
  }
};

export const getParticipantsAttemptsAction = async (quizId: string) => {
  try {
    const participantsAttempts = await getParticipantsAttempts(quizId);
    if (!participantsAttempts) {
      return { success: false, message: 'No participants attempts found' };
    }
    return { success: true, data: participantsAttempts };
  } catch (error) {
    return {
      success: false,
      message:
        (error as Error).message || 'Failed to load participants attempts',
    };
  }
};
