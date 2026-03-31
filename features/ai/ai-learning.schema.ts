import { z } from 'zod';

const uniqueTrimmedOptions = (options: string[]) =>
  new Set(options.map(option => option.trim().toLowerCase())).size ===
  options.length;

export const quizFeedbackSchema = z.object({
  summary: z.string().trim().min(1).max(1_000),
  strengths: z.array(z.string().trim().min(1).max(200)).max(5),
  weaknesses: z.array(z.string().trim().min(1).max(200)).max(5),
  topicsToImprove: z.array(z.string().trim().min(1).max(80)).max(10),
  recommendations: z.array(z.string().trim().min(1).max(240)).max(5),
});

export const questionRefinementActionSchema = z.enum([
  'make_harder',
  'make_easier',
  'improve_distractors',
  'fix_ambiguity',
  'rewrite_explanation',
]);

const questionRefinementBaseSchema = z.object({
  question: z.string().trim().min(10).max(300),
  options: z.array(z.string().trim().min(1).max(150)).length(4),
  correctAnswer: z.string().trim().min(1).max(150),
  explanation: z.string().trim().max(500).optional(),
});

export const questionRefinementInputSchema =
  questionRefinementBaseSchema.superRefine((input, ctx) => {
    if (!input.options.includes(input.correctAnswer)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'correctAnswer must match one of the options.',
        path: ['correctAnswer'],
      });
    }

    if (!uniqueTrimmedOptions(input.options)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Question options must be unique.',
        path: ['options'],
      });
    }
  });

export const refinedQuestionSchema = questionRefinementBaseSchema
  .extend({
    explanation: z.string().trim().min(1).max(500),
  })
  .superRefine((input, ctx) => {
    if (!input.options.includes(input.correctAnswer)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'correctAnswer must match one of the options.',
        path: ['correctAnswer'],
      });
    }

    if (!uniqueTrimmedOptions(input.options)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Question options must be unique.',
        path: ['options'],
      });
    }
  });

export const questionValidationResultSchema = z.object({
  isValid: z.boolean(),
  issues: z.array(z.string().trim().min(1).max(240)).max(6),
  suggestions: z.array(z.string().trim().min(1).max(240)).max(6),
});

export type QuizFeedback = z.infer<typeof quizFeedbackSchema>;
export type QuestionRefinementAction = z.infer<
  typeof questionRefinementActionSchema
>;
export type QuestionRefinementInput = z.infer<
  typeof questionRefinementInputSchema
>;
export type RefinedQuestion = z.infer<typeof refinedQuestionSchema>;
export type QuestionValidationResult = z.infer<
  typeof questionValidationResultSchema
>;
