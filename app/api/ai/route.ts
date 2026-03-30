import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { aiQuizRequestSchema } from '@/features/quiz/quiz.schema';
import { generateQuestions } from '@/infrastructure/ai/quiz-ai.service';
import { reserveAiGenerationCapacity } from '@/infrastructure/ai/ai-rate-limit.service';
import { checkUser } from '@/lib/checkUser';

const getClientIpAddress = (requestHeaders: Headers) => {
  const forwardedFor = requestHeaders.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() ?? null;
  }

  return requestHeaders.get('x-real-ip');
};

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbUser = await checkUser();
    if (!dbUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedBody = aiQuizRequestSchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json(
        {
          error:
            validatedBody.error.issues[0]?.message ?? 'Invalid AI quiz payload.',
        },
        { status: 400 },
      );
    }

    const requestHeaders = await headers();
    const ipAddress = getClientIpAddress(requestHeaders);

    await reserveAiGenerationCapacity({
      userId: dbUser.id,
      ipAddress,
      promptChars: validatedBody.data.prompt.length,
      numQuestions: validatedBody.data.numQuestions,
    });

    const quizData = await generateQuestions(validatedBody.data);

    return NextResponse.json({ quiz: quizData });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
