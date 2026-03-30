import QuizzesHeader from './_components/QuizzesHeader';
import QuizCard from './_components/QuizCard';
import { getAllQuizzesAction } from '../quiz-builder/actions';
import { IQuizListsQuiz } from '@/features/quiz/quiz.entity';
import { currentUser } from '@clerk/nextjs/server';

const QuizzesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | 'ALL';
    search?: string;
  }>;
}) => {
  const { difficulty, search } = await searchParams;
  const user = await currentUser();
  let quizzes: IQuizListsQuiz[] | null = null;
  let error: string | null = null;
  try {
    const response = await getAllQuizzesAction({ difficulty, search });
    if (!response.success) {
      error = response.error ?? null;
    }
    quizzes = response.quizzes ?? null;
  } catch (err) {
    error = (err as Error).message ?? 'Failed to load quizzes.';
  }

  if (error) {
    return (
      <div className="app-container min-h-screen">
        <div className="pt-20">
          <h2 className="text-foreground mb-6 text-2xl font-bold">Error</h2>
        </div>
      </div>
    );
  }

  if (quizzes && quizzes.length === 0) {
    return (
      <div className="app-container min-h-screen">
        <div className="pt-20">
          <QuizzesHeader
            search={search ?? ''}
            difficulty={difficulty ?? 'ALL'}
          />
          <div className="mb-12">
            <h2 className="text-foreground mb-6 text-2xl font-bold">
              No quizzes found.
            </h2>
            <p className="text-muted-foreground">
              No quizzes found matching your search criteria.
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="app-container min-h-screen">
        <div className="pt-20">
          <QuizzesHeader
            search={search ?? ''}
            difficulty={difficulty ?? 'ALL'}
          />
          <div className="mb-12">
            <h2 className="text-foreground mb-6 text-2xl font-bold">
              All Quizzes
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {quizzes?.map(quiz => (
                <QuizCard key={quiz.id} quiz={quiz!} user={user} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizzesPage;
