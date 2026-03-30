import { redirect } from 'next/navigation';
import LeaderBoardHeader from './_components/LeaderBoardHeader';
import RankingContainer from './_components/RankingContainer';
import { getQuizzesForLeaderboardAction } from './actions';

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
          <p className="text-red-500">{quizzesResponse.message}</p>
        </div>
      </div>
    );
  }

  const quizzes = quizzesResponse.data ?? [];

  if (quizzes.length === 0) {
    return (
      <div className="app-container min-h-screen">
        <div className="pt-20">
          <h1 className="text-foreground mb-2 text-3xl font-bold">
            Leaderboard
          </h1>
          <p className="text-muted-foreground">
            Create a quiz first to see the leaderboard.
          </p>
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
        <RankingContainer quizId={quizId} />
      </div>
    </div>
  );
};

export default QuizLeaderboardPage;
