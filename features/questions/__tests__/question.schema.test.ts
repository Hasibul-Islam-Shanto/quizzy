import { describe, expect, it } from 'vitest';
import {
  generatedQuestionSchema,
  generatedQuestionsSchema,
} from '../question.schema';

describe('generatedQuestionSchema', () => {
  it('accepts a valid generated question', () => {
    const result = generatedQuestionSchema.safeParse({
      question: 'What does HTTP stand for?',
      options: [
        'HyperText Transfer Protocol',
        'High Transfer Text Process',
        'Hyper Terminal Trace Program',
        'Host Transfer Test Protocol',
      ],
      answer: 'HyperText Transfer Protocol',
      explanation: 'HTTP is the standard protocol for web communication.',
    });

    expect(result.success).toBe(true);
  });

  it('rejects a question when the answer is not one of the options', () => {
    const result = generatedQuestionSchema.safeParse({
      question: 'What does DNS stand for?',
      options: [
        'Domain Name System',
        'Dynamic Network Service',
        'Data Name Source',
        'Distributed Node Service',
      ],
      answer: 'Domain Naming Service',
      explanation: 'This should fail.',
    });

    expect(result.success).toBe(false);
  });

  it('rejects an empty question array', () => {
    const result = generatedQuestionsSchema.safeParse([]);

    expect(result.success).toBe(false);
  });
});
