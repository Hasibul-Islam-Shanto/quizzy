import 'server-only';

import { GoogleGenAI } from '@google/genai';
import {
  questionRefinementActionSchema,
  questionRefinementInputSchema,
  questionValidationResultSchema,
  quizFeedbackSchema,
  refinedQuestionSchema,
  type QuestionRefinementAction,
  type QuestionRefinementInput,
  type QuestionValidationResult,
  type QuizFeedback,
  type RefinedQuestion,
} from '@/features/ai/ai-learning.schema';

const GEMINI_MODELS = [
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
] as const;

const quizFeedbackJsonSchema = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    strengths: { type: 'array', items: { type: 'string' } },
    weaknesses: { type: 'array', items: { type: 'string' } },
    topicsToImprove: { type: 'array', items: { type: 'string' } },
    recommendations: { type: 'array', items: { type: 'string' } },
  },
  required: [
    'summary',
    'strengths',
    'weaknesses',
    'topicsToImprove',
    'recommendations',
  ],
  additionalProperties: false,
} as const;

const refinedQuestionJsonSchema = {
  type: 'object',
  properties: {
    question: { type: 'string' },
    options: {
      type: 'array',
      items: { type: 'string' },
      minItems: 4,
      maxItems: 4,
    },
    correctAnswer: { type: 'string' },
    explanation: { type: 'string' },
  },
  required: ['question', 'options', 'correctAnswer', 'explanation'],
  additionalProperties: false,
} as const;

const questionValidationJsonSchema = {
  type: 'object',
  properties: {
    isValid: { type: 'boolean' },
    issues: { type: 'array', items: { type: 'string' } },
    suggestions: { type: 'array', items: { type: 'string' } },
  },
  required: ['isValid', 'issues', 'suggestions'],
  additionalProperties: false,
} as const;

const refinementInstructionByAction: Record<QuestionRefinementAction, string> =
  {
    make_harder:
      'Increase conceptual difficulty while preserving the same learning objective and keeping exactly one correct answer.',
    make_easier:
      'Simplify wording and cognitive load while preserving the same learning objective and keeping exactly one correct answer.',
    improve_distractors:
      'Keep the same core question and correct answer, but make incorrect options more plausible and educationally useful.',
    fix_ambiguity:
      'Rewrite the question and options to remove ambiguity while preserving the same learning objective and keeping exactly one correct answer.',
    rewrite_explanation:
      'Keep the question and answer quality intact, but rewrite the explanation to be clearer, more direct, and more instructive.',
  };

const getGeminiClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      'GEMINI_API_KEY environment variable is not set. Please set it to use Gemini-powered quiz features.',
    );
  }

  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

const isFallbackEligibleError = (error: unknown) => {
  const message =
    error instanceof Error ? error.message : JSON.stringify(error ?? {});

  return (
    message.includes('"code":429') ||
    message.includes('"status":"RESOURCE_EXHAUSTED"') ||
    message.includes('"code":404') ||
    message.includes('"status":"NOT_FOUND"')
  );
};

const stripMarkdownFences = (text: string) => {
  if (!text.startsWith('```')) {
    return text;
  }

  return text
    .replace(/^```(?:json)?\n?/, '')
    .replace(/```$/, '')
    .trim();
};

const extractJsonCandidate = (text: string) => {
  const objectStart = text.indexOf('{');
  const arrayStart = text.indexOf('[');

  const startPositions = [objectStart, arrayStart].filter(
    position => position >= 0,
  );

  if (startPositions.length === 0) {
    return text;
  }

  const start = Math.min(...startPositions);
  const objectEnd = text.lastIndexOf('}');
  const arrayEnd = text.lastIndexOf(']');
  const end = Math.max(objectEnd, arrayEnd);

  if (end <= start) {
    return text.slice(start);
  }

  return text.slice(start, end + 1);
};

const removeTrailingCommas = (text: string) =>
  text.replace(/,\s*([}\]])/g, '$1');

const parseStructuredJson = (text: string) => {
  const normalizedText = stripMarkdownFences(text.trim());
  const candidates = [
    normalizedText,
    extractJsonCandidate(normalizedText),
    removeTrailingCommas(normalizedText),
    removeTrailingCommas(extractJsonCandidate(normalizedText)),
  ];

  let lastError: unknown;

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error('Failed to parse structured AI response.');
};

const unwrapStructuredOutput = (
  payload: unknown,
  schemaName: string,
): unknown => {
  if (Array.isArray(payload)) {
    if (payload.length === 1) {
      return unwrapStructuredOutput(payload[0], schemaName);
    }

    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return payload;
  }

  const record = payload as Record<string, unknown>;

  if (record[schemaName]) {
    return unwrapStructuredOutput(record[schemaName], schemaName);
  }

  if (record.data) {
    return unwrapStructuredOutput(record.data, schemaName);
  }

  return payload;
};

const createStructuredCompletion = async <T>({
  systemPrompt,
  userPrompt,
  schema,
  schemaName,
  responseJsonSchema,
}: {
  systemPrompt: string;
  userPrompt: string;
  schema: { parse: (data: unknown) => T };
  schemaName: string;
  responseJsonSchema?: unknown;
}) => {
  const ai = getGeminiClient();
  let lastError: unknown;

  for (const model of GEMINI_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        config: {
          responseMimeType: 'application/json',
          responseJsonSchema,
          maxOutputTokens: 2_048,
          seed: 1,
          temperature: 0,
        },
        contents: `
System:
${systemPrompt}

Return only valid JSON.
Return a single JSON object at the root.
Use exactly the fields required by the target schema.
Do not wrap the JSON in markdown fences.
Do not nest the payload under another key like "${schemaName}" or "data".

User Input:
${userPrompt}
`,
      });

      const text = response?.text?.trim();

      if (!text) {
        throw new Error('Gemini did not return structured data.');
      }

      const parsed = parseStructuredJson(text);
      const normalized = unwrapStructuredOutput(parsed, schemaName);

      return schema.parse(normalized);
    } catch (error) {
      lastError = error;

      if (!isFallbackEligibleError(error) || model === GEMINI_MODELS.at(-1)) {
        throw error;
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error('All Gemini fallback models failed.');
};

export const generateAttemptFeedbackFromAI = async ({
  score,
  totalQuestions,
  accuracyPercentage,
  topicPerformance,
  incorrectQuestionSummaries,
}: {
  score: number;
  totalQuestions: number;
  accuracyPercentage: number;
  topicPerformance: Array<{
    topic: string;
    correct: number;
    total: number;
    accuracyPercentage: number;
  }>;
  incorrectQuestionSummaries: Array<{
    question: string;
    topic: string;
    selected: string;
    correctAnswer: string;
  }>;
}): Promise<QuizFeedback> => {
  const knownTopics = new Set(topicPerformance.map(item => item.topic));

  const feedback = await createStructuredCompletion<QuizFeedback>({
    systemPrompt:
      'You are an AI learning analyst. Use only the provided performance data. Do not invent topics or skills that are not present in the input. The JSON must contain exactly these keys: summary, strengths, weaknesses, topicsToImprove, recommendations.',
    userPrompt: JSON.stringify(
      {
        score,
        totalQuestions,
        accuracyPercentage,
        topicPerformance,
        incorrectQuestionSummaries,
        requiredOutput:
          'Provide concise, learner-friendly feedback with realistic strengths, weaknesses, and recommendations.',
      },
      null,
      2,
    ),
    schema: quizFeedbackSchema,
    schemaName: 'quiz_feedback',
    responseJsonSchema: quizFeedbackJsonSchema,
  });

  return {
    ...feedback,
    topicsToImprove: feedback.topicsToImprove.filter(topic =>
      knownTopics.has(topic),
    ),
  };
};

export const refineQuestionWithAI = async ({
  input,
  actionType,
}: {
  input: QuestionRefinementInput;
  actionType: QuestionRefinementAction;
}) => {
  const validatedInput = questionRefinementInputSchema.parse(input);
  const validatedAction = questionRefinementActionSchema.parse(actionType);

  const prompt = JSON.stringify(
    {
      instruction: refinementInstructionByAction[validatedAction],
      originalQuestion: validatedInput,
      constraints: [
        'Preserve the same topic intent as the original question.',
        'Return exactly 4 unique options.',
        'correctAnswer must be one of the options.',
        'Do not change the question into a different subject.',
      ],
    },
    null,
    2,
  );

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const refinedQuestion = await createStructuredCompletion<RefinedQuestion>(
        {
          systemPrompt:
            'You are an expert assessment designer. Return only valid structured JSON.',
          userPrompt: prompt,
          schema: refinedQuestionSchema,
          schemaName: 'refined_question',
          responseJsonSchema: refinedQuestionJsonSchema,
        },
      );

      const validatedOutput = refinedQuestionSchema.parse(refinedQuestion);

      return {
        question: validatedOutput,
        diff: {
          questionChanged:
            validatedOutput.question.trim() !== validatedInput.question.trim(),
          optionsChanged:
            JSON.stringify(validatedOutput.options) !==
            JSON.stringify(validatedInput.options),
          explanationChanged:
            (validatedOutput.explanation ?? '').trim() !==
            (validatedInput.explanation ?? '').trim(),
        },
        fallbackUsed: false,
      };
    } catch (error) {
      if (attempt === 1) {
        return {
          question: {
            ...validatedInput,
            explanation: validatedInput.explanation ?? '',
          },
          diff: {
            questionChanged: false,
            optionsChanged: false,
            explanationChanged: false,
          },
          fallbackUsed: true,
          error: (error as Error).message,
        };
      }
    }
  }

  return {
    question: {
      ...validatedInput,
      explanation: validatedInput.explanation ?? '',
    },
    diff: {
      questionChanged: false,
      optionsChanged: false,
      explanationChanged: false,
    },
    fallbackUsed: true,
  };
};

export const validateQuestionWithAI = async ({
  input,
}: {
  input: QuestionRefinementInput;
}): Promise<QuestionValidationResult> => {
  const validatedInput = questionRefinementInputSchema.parse(input);

  return createStructuredCompletion<QuestionValidationResult>({
    systemPrompt:
      'You are a strict quiz QA system. Judge ambiguity, multiple plausible answers, weak distractors, and option quality conservatively.',
    userPrompt: JSON.stringify(
      {
        question: validatedInput,
        requiredChecks: [
          'ambiguity',
          'multiple correct answers',
          'weak distractors',
          'duplicate options',
        ],
      },
      null,
      2,
    ),
    schema: questionValidationResultSchema,
    schemaName: 'question_validation',
    responseJsonSchema: questionValidationJsonSchema,
  });
};
