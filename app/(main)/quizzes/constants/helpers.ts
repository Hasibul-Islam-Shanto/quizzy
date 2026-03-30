import { IQuestion } from '@/features/questions/questions.entity';
import { z } from 'zod';

export const buildQuizSubmissionSchema = (questions: IQuestion[]) =>
  z.record(z.string(), z.string()).superRefine((answers, ctx) => {
    if (Object.keys(answers).length !== questions.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'All questions must be answered before submission.',
      });
    }

    for (const question of questions) {
      const selectedAnswer = answers[question.id];

      if (!selectedAnswer) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Missing answer for question ${question.id}.`,
          path: [question.id],
        });
        continue;
      }

      if (!question.options.includes(selectedAnswer)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Selected answer must match one of the question options.',
          path: [question.id],
        });
      }
    }
  });

export const calculateScore = (
  answers: Record<string, string>,
  questions: IQuestion[],
) => {
  let score = 0;
  questions.forEach(question => {
    const answer = answers[question.id];
    if (answer === question.answer) {
      score++;
    }
  });
  return score;
};
