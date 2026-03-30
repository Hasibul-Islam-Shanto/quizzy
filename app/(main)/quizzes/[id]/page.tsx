import { currentUser } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import {
  getCreatorQuizByIdAction,
  getPublicQuizByIdAction,
} from '../../quiz-builder/actions';
import QuizBasicDetails from '../_components/QuizBasicDetails';
import QuizQuestions from '../_components/QuizQuestions';
import QuizStartButton from '../_components/QuizStartButton';
import { getMyAttemptByQuizIdAction } from '../../attempts/action';

const QuizPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await currentUser();
  const creatorResponse = user ? await getCreatorQuizByIdAction(id) : null;

  if (creatorResponse?.success && creatorResponse.quiz) {
    const quiz = creatorResponse.quiz;

    return (
      <div className="bg-gradient-soft min-h-screen pb-10">
        <div className="mx-auto max-w-4xl px-4 pt-20 sm:px-6 lg:px-8">
          <QuizBasicDetails quiz={quiz} />
          <QuizQuestions questions={quiz.questions} quizTitle={quiz.title} />
        </div>
      </div>
    );
  }

  const [quizResponse, attemptResponse] = await Promise.all([
    getPublicQuizByIdAction(id),
    user ? getMyAttemptByQuizIdAction(id) : Promise.resolve(null),
  ]);

  if (!quizResponse.success || !quizResponse.quiz) {
    return notFound();
  }

  const quiz = quizResponse.quiz;

  const hasAttempted =
    attemptResponse?.success &&
    attemptResponse.attempt &&
    attemptResponse.attempt.userId === user?.id;

  const hasAttemptedNotFinished =
    attemptResponse?.success &&
    attemptResponse.attempt &&
    attemptResponse.attempt.userId === user?.id &&
    attemptResponse.attempt.finishedAt === null;
  return (
    <div className="bg-gradient-soft min-h-screen pb-10">
      <div className="mx-auto max-w-4xl px-4 pt-20 sm:px-6 lg:px-8">
        <QuizStartButton
          quiz={{
            ...quiz,
            hasAttemptedNotFinished: hasAttemptedNotFinished ?? false,
            hasAttempted: hasAttempted ?? false,
            attemptId: attemptResponse?.attempt?.id ?? '',
          }}
        />
      </div>
    </div>
  );
};

export default QuizPage;
