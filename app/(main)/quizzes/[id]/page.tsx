import { currentUser } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import { getQuizByIdAction } from '../../quiz-builder/actions';
import QuizBasicDetails from '../_components/QuizBasicDetails';
import QuizQuestions from '../_components/QuizQuestions';
import QuizStartButton from '../_components/QuizStartButton';

const QuizPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const [user, response] = await Promise.all([
    currentUser(),
    getQuizByIdAction(id),
  ]);

  if (!response.success || !response.quiz) {
    return notFound();
  }

  const quiz = response.quiz;
  const isCreator = user?.id === quiz.createdById;

  return (
    <div className="bg-gradient-soft min-h-screen pb-10">
      <div className="mx-auto max-w-4xl px-4 pt-20 sm:px-6 lg:px-8">
        {isCreator ? (
          <>
            <QuizBasicDetails quiz={quiz} />
            <QuizQuestions questions={quiz.questions} quizTitle={quiz.title} />
          </>
        ) : (
          <QuizStartButton
            quiz={{
              ...quiz,
              questionsCount: quiz.questions.length,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default QuizPage;
