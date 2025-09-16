import { NextResponse } from 'next/server';
import { generateQuestions } from '@/infrastructure/ai/quiz-ai.service';

export async function POST(req: Request) {
  try {
    const { prompt, numQuestions } = await req.json();
    const quizData = await generateQuestions({ prompt, numQuestions });

    return NextResponse.json({ quiz: quizData });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
