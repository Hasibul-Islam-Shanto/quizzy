import { z } from 'zod';

export const quizCreateSchema = z.object({
  prompt: z
    .string()
    .min(10, { message: 'Prompt must be at least 10 characters.' }),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD'], {
    message: 'Please select a difficulty level.',
  }),
  numQuestions: z.coerce.number().int().min(5, {
    message: 'You must create at least 5 questions.',
  }),
});

export type QuizCreateType = z.input<typeof quizCreateSchema>;
