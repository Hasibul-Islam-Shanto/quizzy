import { GoogleGenAI } from '@google/genai';
import { QuestionPromptType } from './quiz-ai.entity';
import { generatedQuestionsSchema } from '@/features/questions/question.schema';

const GEMINI_MODELS = [
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
] as const;

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

export const generateQuestions = async ({
  prompt,
  numQuestions,
  difficulty,
}: QuestionPromptType) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error(
        'GEMINI_API_KEY environment variable is not set. Please set it to use the GoogleGenAI service.',
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    let lastError: unknown;

    for (const model of GEMINI_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model,
          config: {
            responseMimeType: 'application/json',
            maxOutputTokens: Math.max(512, (numQuestions || 3) * 250),
            seed: 1,
            temperature: 0,
          },
          contents: `
    You are a quiz generator. Create ${numQuestions || 3} single-choice quiz questions about "${prompt}" with difficulty "${difficulty || 'EASY'}".

    Requirements:
        - Each question must be challenging, unique, and clear.
        - Each question must include a concise topic label grounded in the prompt.
        - Each question must include 4 answer options.
        - Provide the correct answer as the exact text from the options.
        - Provide proper explanations for correct answers with description field.
        - The "answer" must match one of the option texts exactly.
        - Return only valid JSON, no markdown, no extra text.

    Format:
        [
            {
            "question": "Question text",
            "topic": "Topic label",
            "options": ["option1", "option2", "option3", "option4"],
            "answer": "option1",
            "explanation": "Explanation text"
            }
        ]
`,
        });

        let text = response?.text?.trim();

        if (text?.startsWith('```')) {
          text = text
            .replace(/^```(?:json)?\n?/, '')
            .replace(/```$/, '')
            .trim();
        }

        const parsedQuestions = JSON.parse(text!);
        return generatedQuestionsSchema.parse(parsedQuestions);
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
  } catch (error) {
    console.error('Error generating questions:', error);
    throw new Error('Failed to generate quiz questions from AI service.');
  }
};
