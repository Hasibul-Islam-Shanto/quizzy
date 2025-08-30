import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const { prompt, numQuestions } = await req.json();

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate ${numQuestions || 3} single-choice questions about ${prompt}.  
Each question must include a difficulty level easy. Return the data strictly in JSON format like this:
[
  {
    "question": "Question text",
    "options": ["option1", "option2", "option3", "option4"],
    "answer": "option1"
  }
]`,
    });

    // Strip code block formatting if present
    let text = response?.text?.trim();
    if (text?.startsWith('```')) {
      const firstLineBreak = text.indexOf('\n');
      const lastBackticks = text.lastIndexOf('```');
      text = text.substring(firstLineBreak + 1, lastBackticks).trim();
    }

    // Parse JSON safely
    let quizData;
    try {
      quizData = JSON.parse(text!);
    } catch (e) {
      console.log('JSON parsing error:', e);
      quizData = text; // fallback to raw text if parsing fails
    }

    return NextResponse.json({ quiz: quizData });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
