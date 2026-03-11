import React from 'react';
import QuizPublishContainer from './_components/QuizPublishContainer';
import { getQuizByIdAction } from '../actions';
import { notFound } from 'next/navigation';

const PublishQuiz = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const response = await getQuizByIdAction(id);
  if (!response.success) {
    return notFound();
  }
  const quiz = response.quiz;
  return (
    <main className="bg-gradient-soft pt-20 pb-12">
      <div className="mx-auto max-w-4xl space-y-4 px-4 sm:px-6 lg:px-8">
        <QuizPublishContainer quiz={quiz!} />
      </div>
    </main>
  );
};

export default PublishQuiz;
