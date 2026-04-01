import QuizzesHeader from './_components/QuizzesHeader';
import QuizCard from './_components/QuizCard';
import { getAllQuizzesAction } from '../quiz-builder/actions';
import { IQuizListsQuiz } from '@/features/quiz/quiz.entity';
import { currentUser } from '@clerk/nextjs/server';
import { AlertTriangle, Compass, LibraryBig } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-8">
              <div className="mx-auto max-w-lg text-center">
                <div className="bg-secondary/12 text-secondary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h2 className="text-foreground text-2xl font-bold">
                  Unable to load quizzes
                </h2>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {error}
                </p>
              </div>
            </CardContent>
          </Card>
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
          <Card className="border-border/50 mb-12 shadow-sm">
            <CardContent className="p-8">
              <div className="mx-auto max-w-xl text-center">
                <div className="bg-muted text-muted-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
                  <Compass className="h-5 w-5" />
                </div>
                <h2 className="text-foreground text-2xl font-bold">
                  No quizzes found
                </h2>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  Try adjusting your search or difficulty filter to discover
                  more quizzes.
                </p>
              </div>
            </CardContent>
          </Card>
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
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-foreground mt-1 flex items-center gap-2 text-2xl font-bold">
                  <LibraryBig className="text-muted-foreground h-5 w-5" />
                  All Quizzes
                </h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  {(quizzes?.length ?? 0).toString()} quizzes available
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
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
