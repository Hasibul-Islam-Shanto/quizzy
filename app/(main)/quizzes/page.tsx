import { getAllQuizzes } from '@/domain/respositories/QuizRepository';
import QuizzesHeader from './_components/QuizzesHeader';
import QuizCard from './_components/QuizCard';

const QuizzesPage = async () => {
  let quizzes = [];
  try {
    quizzes = await getAllQuizzes();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Failed to load quizzes: ' + error?.message);
    } else {
      throw new Error('Failed to load quizzes due to an unknown error.');
    }
  }

  return (
    <>
      <div className="bg-gradient-soft min-h-screen">
        <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
          <QuizzesHeader />
          <div className="mb-12">
            <h2 className="text-foreground mb-6 text-2xl font-bold">
              All Quizzes
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {quizzes.map(quiz => (
                <QuizCard key={quiz.id} quiz={quiz!} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizzesPage;
