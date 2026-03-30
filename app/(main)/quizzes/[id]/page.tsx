import { currentUser } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import { getQuizByIdAction } from '../../quiz-builder/actions';
import QuizBasicDetails from '../_components/QuizBasicDetails';
import QuizQuestions from '../_components/QuizQuestions';
import QuizStartButton from '../_components/QuizStartButton';
import { getAttemptByUserIdAndQuizIdAction } from '../../attempts/action';

const QuizPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await currentUser();
  const [quizResponse, attemptResponse] = await Promise.all([
    getQuizByIdAction(id),
    getAttemptByUserIdAndQuizIdAction(user?.id ?? '', id),
  ]);

  if (!quizResponse.success || !quizResponse.quiz) {
    return notFound();
  }

  const quiz = quizResponse.quiz;
  const isCreator = user?.id === quiz.createdById;

  const hasAttempted =
    attemptResponse.success &&
    attemptResponse.attempt &&
    attemptResponse.attempt.userId === user?.id;

  const hasAttemptedNotFinished =
    attemptResponse.success &&
    attemptResponse.attempt &&
    attemptResponse.attempt.userId === user?.id &&
    attemptResponse.attempt.finishedAt === null;
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
              hasAttemptedNotFinished: hasAttemptedNotFinished ?? false,
              hasAttempted: hasAttempted ?? false,
              attemptId: attemptResponse.attempt?.id ?? '',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default QuizPage;
