'use client';
import { Button } from '@/components/ui/button';
import { Eye, Loader2, Play } from 'lucide-react';
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
  hasAttemptedNotFinished,
}: {
  isAuthor: boolean;
  id: string;
  hasAttempted: boolean;
  attemptId: string;
  hasAttemptedNotFinished: boolean;
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
      <div className="pt-1">
        <Link href={`/quizzes/${id}`} className="block w-full">
          <Button className="w-full" variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </Link>
      </div>
    );
  }

  if (!isAuthor && hasAttempted) {
    return (
      <div className="grid w-full gap-3 sm:grid-cols-2">
        <Link href={`/quizzes/${id}`} className="w-full">
          <Button className="w-full" variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            See Details
          </Button>
        </Link>
        {hasAttemptedNotFinished ? (
          <Link href={`/quizzes/${id}/attempt`} className="w-full">
            <Button className="w-full" variant="default">
              <Play className="mr-2 h-4 w-4" />
              Continue Quiz
            </Button>
          </Link>
        ) : (
          <Link href={`/attempts/${attemptId}/score`} className="w-full">
            <Button className="w-full" variant="default">
              <Eye className="mr-2 h-4 w-4" />
              See Result
            </Button>
          </Link>
        )}
      </div>
    );
  }
  return (
    <div className="grid w-full gap-3 sm:grid-cols-2">
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
  );
};

export default QuizRedirectBtn;
