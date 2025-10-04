'use client';
import React, { useState } from 'react';
import QuizBuilderHeader from './_components/QuizBuilderHeader';
import QuizBuildPromptInput from './_components/QuizBuildPromptInput';
import QuizBuilderQuestionsContainer from './_components/QuizBuilderQuestionsContainer';

const QuizBuilderPage = () => {
  const [questions, setQuestions] = useState([]);
  return (
    <main className="bg-gradient-soft pt-20 pb-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <QuizBuilderHeader />
        <QuizBuildPromptInput setQuestions={setQuestions} />
        <QuizBuilderQuestionsContainer questions={questions} />
      </div>
    </main>
  );
};

export default QuizBuilderPage;
