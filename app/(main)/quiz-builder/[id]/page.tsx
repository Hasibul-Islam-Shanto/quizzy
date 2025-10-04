import { getQuizById } from '@/domain/respositories/QuizRepository';
import React from 'react';
import QuizPublishContainer from './_components/QuizPublishContainer';

const PublishQuiz = async ({ params }: { params: { id: string } }) => {
  const quiz = await getQuizById(params?.id);
  return (
    <main className="bg-gradient-soft pt-20 pb-12">
      <div className="mx-auto max-w-4xl space-y-4 px-4 sm:px-6 lg:px-8">
        <QuizPublishContainer quiz={quiz!} />
      </div>
    </main>
  );
};

export default PublishQuiz;
