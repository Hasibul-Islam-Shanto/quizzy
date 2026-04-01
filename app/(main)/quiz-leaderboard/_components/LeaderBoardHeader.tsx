import React, { Suspense } from 'react';
import { Medal, Trophy } from 'lucide-react';
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
    <div className="mb-8">
      <div className="mb-6 max-w-2xl">
        <h1 className="text-foreground mb-2 flex items-center gap-2 text-3xl font-bold">
          <Trophy className="text-primary h-5 w-5" />
          Quiz Leaderboard
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
          Compare participant performance, review top scores, and switch between
          quizzes to see updated rankings.
        </p>
      </div>

      <div className="bg-gradient-card border-border/50 shadow-card rounded-xl border p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="bg-secondary/12 text-secondary flex h-8 w-8 items-center justify-center rounded-lg">
            <Medal className="h-4 w-4" />
          </div>
          <div>
            <p className="text-foreground text-sm font-medium">Select Quiz</p>
            <p className="text-muted-foreground text-xs">
              Switch quizzes to compare rankings
            </p>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="bg-muted h-10 w-56 animate-pulse rounded-lg" />
          }
        >
          <QuizSelect quizzes={quizzes} currentQuizId={currentQuizId} />
        </Suspense>
      </div>
    </div>
  );
};

export default LeaderBoardHeader;
