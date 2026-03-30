import { formatTimeSpent } from '@/lib/formatTimeSpent';

export type RankedParticipantAttempt = {
  rank: number;
  id: string;
  name: string;
  timeSpentMs: number;
  timeSpentFormatted: string;
  score: number;
};

type ParticipantAttemptInput = {
  userId: string;
  userName: string;
  score: number;
  totalQuestions: number;
  startedAt: Date;
  finishedAt: Date | null;
};

export const rankParticipantAttempts = (
  attempts: ParticipantAttemptInput[],
): RankedParticipantAttempt[] => {
  const userBestAttempt = new Map<
    string,
    { attempt: ParticipantAttemptInput; timeSpentMs: number; percentage: number }
  >();

  for (const attempt of attempts) {
    if (!attempt.finishedAt) {
      continue;
    }

    const percentage =
      attempt.totalQuestions > 0
        ? Math.round((attempt.score / attempt.totalQuestions) * 100)
        : 0;
    const timeSpentMs =
      attempt.finishedAt.getTime() - attempt.startedAt.getTime();

    const existing = userBestAttempt.get(attempt.userId);
    const isBetter =
      !existing ||
      percentage > existing.percentage ||
      (percentage === existing.percentage &&
        timeSpentMs < existing.timeSpentMs);

    if (isBetter) {
      userBestAttempt.set(attempt.userId, {
        attempt,
        timeSpentMs,
        percentage,
      });
    }
  }

  const sorted = Array.from(userBestAttempt.values())
    .map(({ attempt, timeSpentMs, percentage }) => ({
      id: attempt.userId,
      name: attempt.userName,
      timeSpentMs,
      timeSpentFormatted: formatTimeSpent(timeSpentMs),
      score: percentage,
    }))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.timeSpentMs - b.timeSpentMs;
    });

  return sorted.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));
};
