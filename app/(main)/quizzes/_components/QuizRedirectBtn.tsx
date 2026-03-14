'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye, Loader2, Play } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { startQuizAction } from '../action';
import { toast } from 'sonner';

const QuizRedirectBtn = ({
  isAuthor,
  id,
  hasAttempted,
  attemptId,
}: {
  isAuthor: boolean;
  id: string;
  hasAttempted: boolean;
  attemptId: string;
}) => {
  const router = useRouter();
  const [isStartingQuiz, startTransition] = useTransition();

  const handleStartQuiz = () => {
    startTransition(async () => {
      const response = await startQuizAction(id);
      if (response.success) {
        router.push(`/quizzes/${id}/attempt`);
      } else {
        toast.error(response.message, {
          duration: 2000,
          position: 'top-center',
        });
      }
    });
  };

  if (isAuthor) {
    return (
      <Link href={`/quizzes/${id}`} className="pt-2">
        <Button className="w-full" variant="default">
          See Details
          <ArrowRight className="mr-2 h-4 w-4" />
        </Button>
      </Link>
    );
  }
  if (!isAuthor && hasAttempted) {
    return (
      <div className="flex w-full items-center justify-center gap-5">
        <Link href={`/quizzes/${id}`} className="w-full">
          <Button className="w-full" variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            See Details
          </Button>
        </Link>
        <Link href={`/quizzes/${attemptId}/score`} className="w-full">
          <Button className="w-full" variant="default">
            See Result
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <>
      <div className="flex w-full items-center justify-center gap-5">
        <Link href={`/quizzes/${id}`} className="w-full">
          <Button className="w-full" variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            See Details
          </Button>
        </Link>
        <div className="w-full">
          <Button
            className="w-full"
            variant="default"
            onClick={handleStartQuiz}
            disabled={isStartingQuiz}
          >
            {isStartingQuiz ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Starting Quiz...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start Quiz
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuizRedirectBtn;
