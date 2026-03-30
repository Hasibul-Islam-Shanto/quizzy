import { z } from 'zod';
import {
  difficultySchema,
  generatedQuestionsSchema,
} from '../questions/question.schema';

export const quizCreateSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(10, { message: 'Prompt must be at least 10 characters.' })
    .max(2_000, { message: 'Prompt must be at most 2000 characters.' }),
  difficulty: difficultySchema,
  numQuestions: z.coerce
    .number()
    .int()
    .min(5, {
      message: 'You must create at least 5 questions.',
    })
    .max(20, { message: 'You can generate at most 20 questions at a time.' }),
});

export const createQuizPayloadSchema = z.object({
  title: z.string().trim().min(3).max(120),
  questions: generatedQuestionsSchema.min(1).max(50),
});

export const publishQuizSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(10).max(1_000),
  isPublished: z.boolean(),
  difficulty: difficultySchema,
});

export const aiQuizRequestSchema = quizCreateSchema;

export type QuizCreateType = z.input<typeof quizCreateSchema>;
