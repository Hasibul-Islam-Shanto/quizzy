import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import LeaderBoardHeader from './_components/LeaderBoardHeader';
import RankingContainer from './_components/RankingContainer';
import RankingContainerSkeleton from './_components/RankingContainerSkeleton';
import { getQuizzesForLeaderboardAction } from './actions';
import { AlertTriangle, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const QuizLeaderboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ quizId?: string }>;
}) => {
  const params = await searchParams;
  const quizId = params.quizId ?? null;

  const quizzesResponse = await getQuizzesForLeaderboardAction();

  if (!quizzesResponse.success) {
    return (
      <div className="app-container min-h-screen">
        <div className="pt-20">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-8">
              <div className="mx-auto max-w-lg text-center">
                <div className="bg-secondary/12 text-secondary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h2 className="text-foreground text-2xl font-bold">
                  Unable to load leaderboard
                </h2>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {quizzesResponse.message}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const quizzes = quizzesResponse.data ?? [];

  if (quizzes.length === 0) {
    return (
      <div className="app-container min-h-screen">
        <div className="pt-20">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-8">
              <div className="mx-auto max-w-xl text-center">
                <div className="bg-primary/12 text-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
                  <Trophy className="h-5 w-5" />
                </div>
                <h1 className="text-foreground text-3xl font-bold">
                  Leaderboard is waiting for quiz activity
                </h1>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  Publish or participate in a quiz first, then leaderboard
                  rankings will appear here automatically.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!quizId) {
    redirect(`/quiz-leaderboard?quizId=${quizzes[0].id}`);
  }

  const isValidQuiz = quizzes.some(q => q.id === quizId);
  if (!isValidQuiz) {
    redirect(`/quiz-leaderboard?quizId=${quizzes[0].id}`);
  }

  return (
    <div className="app-container min-h-screen">
      <div className="pt-20">
        <LeaderBoardHeader
          quizzes={quizzes.map(q => ({ id: q.id, title: q.title }))}
          currentQuizId={quizId}
        />
        <Suspense key={quizId} fallback={<RankingContainerSkeleton />}>
          <RankingContainer quizId={quizId} />
        </Suspense>
      </div>
    </div>
  );
};

export default QuizLeaderboardPage;
