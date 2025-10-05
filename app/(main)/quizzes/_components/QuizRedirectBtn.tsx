'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
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
          <Button className="w-full" variant="hero">
            See Details
            <ArrowRight className="mr-2 h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <Link href={`/quizzes/attempt/${id}`} className="pt-2">
          <Button className="w-full" variant="hero">
            <Play className="mr-2 h-4 w-4" />
            Start Quiz
          </Button>
        </Link>
      )}
    </>
  );
};

export default QuizRedirectBtn;
