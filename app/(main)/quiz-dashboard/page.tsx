import React from 'react';
import QuizDashboardStats from './_components/QuizDashboardStats';
import QuizDashboardMyQuiz from './_components/QuizDashboardMyQuiz';

const QuizDashboardPage = async () => {
  return (
    <div className="app-container min-h-screen">
      <div className="pt-20">
        <div className="mb-8">
          <h1 className="text-foreground mb-2 text-2xl font-bold">
            Quiz Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your quizzes and track your progress
          </p>
        </div>

        <QuizDashboardStats />
        <QuizDashboardMyQuiz />
      </div>
    </div>
  );
};

export default QuizDashboardPage;
