import { describe, expect, it } from 'vitest';
import {
  buildAttemptFeedbackPayload,
  buildTopicPerformance,
} from '../attempt.performance';

const answers = [
  {
    selected: 'A',
    isCorrect: true,
    question: {
      question: 'What is SQL?',
      topic: 'Databases',
      answer: 'A',
    },
  },
  {
    selected: 'B',
    isCorrect: false,
    question: {
      question: 'What is an index?',
      topic: 'Databases',
      answer: 'A',
    },
  },
  {
    selected: 'C',
    isCorrect: false,
    question: {
      question: 'What is TLS?',
      topic: 'Security',
      answer: 'D',
    },
  },
];

describe('attempt.performance', () => {
  it('builds topic performance percentages', () => {
    const result = buildTopicPerformance(answers);

    expect(result).toEqual([
      {
        topic: 'Databases',
        correct: 1,
        total: 2,
        accuracyPercentage: 50,
      },
      {
        topic: 'Security',
        correct: 0,
        total: 1,
        accuracyPercentage: 0,
      },
    ]);
  });

  it('builds structured attempt feedback payloads', () => {
    const payload = buildAttemptFeedbackPayload({
      score: 1,
      answers,
    });

    expect(payload.accuracyPercentage).toBe(33);
    expect(payload.incorrectQuestionSummaries).toHaveLength(2);
    expect(payload.topicPerformance[0]?.topic).toBe('Databases');
  });
});
