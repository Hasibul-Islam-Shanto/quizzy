import { z } from 'zod';

export const difficultySchema = z.enum(['EASY', 'MEDIUM', 'HARD']);

export const questionSchema = z.object({
  id: z.string().min(1).optional().default(''),
  question: z.string().trim().min(10).max(300),
  topic: z.string().trim().min(2).max(80).nullable().optional(),
  options: z.array(z.string().trim().min(1).max(150)).length(4),
  answer: z.string().trim().min(1).max(150),
  explanation: z.string().trim().max(500).nullable(),
});

export const generatedQuestionSchema = questionSchema.superRefine(
  (question, ctx) => {
    if (!question.options.includes(question.answer)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Answer must match one of the provided options exactly.',
        path: ['answer'],
      });
    }
  },
);

export const questionForAttemptSchema = z.object({
  id: z.string().min(1),
  question: z.string().trim().min(10).max(300),
  topic: z.string().trim().min(2).max(80).nullable().optional(),
  options: z.array(z.string().trim().min(1).max(150)).length(4),
});

export const generatedQuestionsSchema = z.array(generatedQuestionSchema).min(1);

export type QuestionInput = z.infer<typeof questionSchema>;
export type GeneratedQuestion = z.infer<typeof generatedQuestionSchema>;
