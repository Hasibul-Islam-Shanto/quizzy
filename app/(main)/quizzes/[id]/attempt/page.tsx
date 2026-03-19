import React from 'react';
import QuizStartedQuestions from '../../_components/QuizStartedQuestions';
import QuizBasicDetails from '../../_components/QuizBasicDetails';
import { getQuizByIdAction } from '@/app/(main)/quiz-builder/actions';
import { currentUser } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

const AttemptPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const [user, response] = await Promise.all([
    currentUser(),
    getQuizByIdAction(id),
  ]);

  if (!response.success || !response.quiz) {
    return notFound();
  }

  const quiz = response.quiz;
  // const isCreator = user?.id === quiz.createdById;
  return (
    <div className="bg-gradient-soft min-h-screen pb-10">
      <div className="mx-auto max-w-4xl px-4 pt-20 sm:px-6 lg:px-8">
        <QuizBasicDetails
          quiz={{
            title: quiz.title,
            description: quiz.description,
            difficulty: quiz.difficulty,
            isPublished: quiz.isPublished,
            createdAt: quiz.createdAt,
            updatedAt: quiz.updatedAt,
          }}
        />
        <QuizStartedQuestions questions={quiz.questions} quizId={quiz.id!} />
      </div>
    </div>
  );
};

export default AttemptPage;
