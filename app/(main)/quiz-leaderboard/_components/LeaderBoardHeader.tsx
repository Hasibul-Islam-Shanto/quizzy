import React, { Suspense } from 'react';
import { QuizSelect } from './QuizSelect';

type Quiz = { id: string; title: string };

const LeaderBoardHeader = ({
  quizzes,
  currentQuizId,
}: {
  quizzes: Quiz[];
  currentQuizId: string | null;
}) => {
  return (
    <div className="mb-2 flex flex-col justify-between md:mb-8 md:flex-row md:items-center">
      <div className="mb-4 md:mb-0">
        <h1 className="text-foreground mb-2 text-3xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground">
          Track top performers and quiz achievements
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-4">
        <Suspense
          fallback={
            <div className="bg-muted h-9 w-48 animate-pulse rounded-md" />
          }
        >
          <QuizSelect quizzes={quizzes} currentQuizId={currentQuizId} />
        </Suspense>
      </div>
    </div>
  );
};

export default LeaderBoardHeader;
