import { describe, expect, it } from 'vitest';
import { buildQuizSubmissionSchema, calculateScore } from '../helpers';
import type { IQuestion } from '@/features/questions/questions.entity';

const createQuestion = (id: string, answer: string): IQuestion => ({
  id,
  answer,
  options: [],
  question: '',
  explanation: null,
});

describe('calculateScore', () => {
  it('returns full score when all answers are correct', () => {
    const questions = [
      createQuestion('q1', 'A'),
      createQuestion('q2', 'B'),
      createQuestion('q3', 'C'),
    ];
    const answers = { q1: 'A', q2: 'B', q3: 'C' };
    expect(calculateScore(answers, questions)).toBe(3);
  });

  it('returns 0 when all answers are wrong', () => {
    const questions = [
      createQuestion('q1', 'A'),
      createQuestion('q2', 'B'),
      createQuestion('q3', 'C'),
    ];
    const answers = { q1: 'B', q2: 'C', q3: 'A' };
    expect(calculateScore(answers, questions)).toBe(0);
  });

  it('returns partial score for mixed correct/wrong answers', () => {
    const questions = [
      createQuestion('q1', 'A'),
      createQuestion('q2', 'B'),
      createQuestion('q3', 'C'),
    ];
    const answers = { q1: 'A', q2: 'X', q3: 'C' };
    expect(calculateScore(answers, questions)).toBe(2);
  });

  it('returns 0 for empty answers', () => {
    const questions = [createQuestion('q1', 'A'), createQuestion('q2', 'B')];
    const answers: Record<string, string> = {};
    expect(calculateScore(answers, questions)).toBe(0);
  });

  it('treats missing answer as wrong', () => {
    const questions = [createQuestion('q1', 'A'), createQuestion('q2', 'B')];
    const answers = { q1: 'A' }; // q2 missing
    expect(calculateScore(answers, questions)).toBe(1);
  });

  it('returns 0 for empty questions array', () => {
    const questions: IQuestion[] = [];
    const answers = {};
    expect(calculateScore(answers, questions)).toBe(0);
  });

  it('ignores extra answers not in questions', () => {
    const questions = [createQuestion('q1', 'A')];
    const answers = { q1: 'A', q2: 'B', qExtra: 'X' };
    expect(calculateScore(answers, questions)).toBe(1);
  });

  it('returns correct score for single question', () => {
    const questions = [createQuestion('q1', 'A')];
    expect(calculateScore({ q1: 'A' }, questions)).toBe(1);
    expect(calculateScore({ q1: 'B' }, questions)).toBe(0);
  });

  it('handles whitespace in answers (exact match)', () => {
    const questions = [createQuestion('q1', 'Answer')];
    expect(calculateScore({ q1: 'Answer' }, questions)).toBe(1);
    expect(calculateScore({ q1: ' Answer' }, questions)).toBe(0);
  });

  it('rejects submissions with missing answers', () => {
    const questions = [createQuestion('q1', 'A'), createQuestion('q2', 'B')];
    const result = buildQuizSubmissionSchema(questions).safeParse({ q1: 'A' });

    expect(result.success).toBe(false);
  });

  it('rejects answers not present in the question options', () => {
    const questions = [
      {
        ...createQuestion('q1', 'A'),
        options: ['A', 'B', 'C', 'D'],
      },
    ];

    const result = buildQuizSubmissionSchema(questions).safeParse({ q1: 'Z' });

    expect(result.success).toBe(false);
  });
});
