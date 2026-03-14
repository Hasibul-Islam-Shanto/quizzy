'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye, Play } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const QuizRedirectBtn = ({
  isAuthor,
  id,
}: {
  isAuthor: boolean;
  id: string;
}) => {
  return (
    <>
      {isAuthor ? (
        <Link href={`/quizzes/${id}`} className="pt-2">
          <Button className="w-full" variant="default">
            See Details
            <ArrowRight className="mr-2 h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <div className="flex w-full items-center justify-center gap-5">
          <Link href={`/quizzes/${id}`} className="w-full">
            <Button className="w-full" variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              See Details
            </Button>
          </Link>
          <Link href={`/quizzes/attempt/${id}`} className="w-full">
            <Button className="w-full" variant="hero">
              <Play className="mr-2 h-4 w-4" />
              Start Quiz
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default QuizRedirectBtn;
