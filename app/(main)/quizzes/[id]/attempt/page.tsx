import React from 'react';
import QuizStartedQuestions from '../../_components/QuizStartedQuestions';
import QuizBasicDetails from '../../_components/QuizBasicDetails';
import {
  getQuizForAttemptAction,
  getPublicQuizByIdAction,
} from '@/app/(main)/quiz-builder/actions';
import { getMyAttemptByQuizIdAction } from '@/app/(main)/attempts/action';
import { notFound } from 'next/navigation';

const AttemptPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const [quizResponse, attemptResponse, publicQuizResponse] = await Promise.all([
    getQuizForAttemptAction(id),
    getMyAttemptByQuizIdAction(id),
    getPublicQuizByIdAction(id),
  ]);

  if (
    !quizResponse.success ||
    !quizResponse.quiz ||
    !attemptResponse.success ||
    !attemptResponse.attempt ||
    attemptResponse.attempt.finishedAt !== null ||
    !publicQuizResponse.success ||
    !publicQuizResponse.quiz
  ) {
    return notFound();
  }

  const quiz = quizResponse.quiz;
  const quizSummary = publicQuizResponse.quiz;

  return (
    <div className="bg-gradient-soft min-h-screen pb-10">
      <div className="mx-auto max-w-4xl px-4 pt-20 sm:px-6 lg:px-8">
        <QuizBasicDetails
          quiz={{
            title: quizSummary.title,
            description: quizSummary.description,
            difficulty: quizSummary.difficulty,
            isPublished: quizSummary.isPublished,
            createdAt: quizSummary.createdAt,
            updatedAt: quizSummary.updatedAt,
          }}
        />
        <QuizStartedQuestions questions={quiz.questions} quizId={quiz.id!} />
      </div>
    </div>
  );
};

export default AttemptPage;
