import { GoogleGenAI } from '@google/genai';
import { QuestionPromptType } from './quiz-ai.entity';

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

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
    You are a quiz generator. Create ${numQuestions || 3} single-choice quiz questions about "${prompt}" with difficulty "${difficulty || 'EASY'}".

    Requirements:
        - Each question must be challenging, unique, and clear.
        - Each question must include 4 answer options.
        - Provide the correct answer as the exact text from the options.
        - Provide proper explanations for correct answers with description field.
        - The "answer" must match one of the option texts exactly.
        - Return only valid JSON, no markdown, no extra text.

    Format:
        [
            {
            "question": "Question text",
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
    return JSON.parse(text!);
  } catch (error) {
    console.error('Error generating questions:', error);
    throw new Error('Failed to generate quiz questions from AI service.');
  }
};
