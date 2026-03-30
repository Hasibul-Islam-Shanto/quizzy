import { describe, expect, it } from 'vitest';
import {
  aiQuizRequestSchema,
  createQuizPayloadSchema,
  publishQuizSchema,
} from '../quiz.schema';

const validQuestion = {
  question: 'Which SQL command is used to remove rows from a table?',
  options: ['DELETE', 'DROP', 'REMOVE', 'TRUNCATE'],
  answer: 'DELETE',
  explanation: 'DELETE removes selected rows while DROP removes the table.',
};

describe('quiz.schema', () => {
  it('validates AI quiz generation requests', () => {
    const result = aiQuizRequestSchema.safeParse({
      prompt: 'Generate a backend systems quiz about SQL transactions.',
      difficulty: 'MEDIUM',
      numQuestions: 6,
    });

    expect(result.success).toBe(true);
  });

  it('rejects invalid quiz creation payloads', () => {
    const result = createQuizPayloadSchema.safeParse({
      title: 'Hi',
      questions: [],
    });

    expect(result.success).toBe(false);
  });

  it('accepts valid publish payloads', () => {
    const result = publishQuizSchema.safeParse({
      title: 'Database Fundamentals',
      description: 'A quick production-ready quiz covering SQL essentials.',
      difficulty: 'EASY',
      isPublished: true,
    });

    expect(result.success).toBe(true);
  });

  it('accepts valid quiz creation payloads', () => {
    const result = createQuizPayloadSchema.safeParse({
      title: 'Database Fundamentals',
      questions: [validQuestion],
    });

    expect(result.success).toBe(true);
  });
});
