import { describe, expect, it } from 'vitest';
import { rankParticipantAttempts } from '../attempt.helpers';

describe('rankParticipantAttempts', () => {
  it('keeps the best score per user', () => {
    const ranked = rankParticipantAttempts([
      {
        userId: 'user-1',
        userName: 'Ava',
        score: 3,
        totalQuestions: 5,
        startedAt: new Date('2026-03-30T10:00:00Z'),
        finishedAt: new Date('2026-03-30T10:02:00Z'),
      },
      {
        userId: 'user-1',
        userName: 'Ava',
        score: 5,
        totalQuestions: 5,
        startedAt: new Date('2026-03-30T10:05:00Z'),
        finishedAt: new Date('2026-03-30T10:08:00Z'),
      },
      {
        userId: 'user-2',
        userName: 'Ben',
        score: 4,
        totalQuestions: 5,
        startedAt: new Date('2026-03-30T10:00:00Z'),
        finishedAt: new Date('2026-03-30T10:01:00Z'),
      },
    ]);

    expect(ranked).toHaveLength(2);
    expect(ranked[0]).toMatchObject({ id: 'user-1', score: 100, rank: 1 });
    expect(ranked[1]).toMatchObject({ id: 'user-2', score: 80, rank: 2 });
  });

  it('breaks score ties by faster completion time', () => {
    const ranked = rankParticipantAttempts([
      {
        userId: 'user-1',
        userName: 'Ava',
        score: 4,
        totalQuestions: 5,
        startedAt: new Date('2026-03-30T10:00:00Z'),
        finishedAt: new Date('2026-03-30T10:04:00Z'),
      },
      {
        userId: 'user-2',
        userName: 'Ben',
        score: 4,
        totalQuestions: 5,
        startedAt: new Date('2026-03-30T10:00:00Z'),
        finishedAt: new Date('2026-03-30T10:02:00Z'),
      },
    ]);

    expect(ranked[0]).toMatchObject({ id: 'user-2', rank: 1 });
    expect(ranked[1]).toMatchObject({ id: 'user-1', rank: 2 });
  });
});
