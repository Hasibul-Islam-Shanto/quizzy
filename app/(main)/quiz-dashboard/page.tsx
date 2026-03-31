import React from 'react';
import QuizDashboardStats from './_components/QuizDashboardStats';
import QuizDashboardMyQuiz from './_components/QuizDashboardMyQuiz';
import { getUserQuizAction } from './actions';
import QuizAnalyticsPanel from './_components/QuizAnalyticsPanel';

const QuizDashboardPage = async () => {
  const quizzesResponse = await getUserQuizAction();
  const quizzes = quizzesResponse.success ? (quizzesResponse.data ?? []) : [];

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
        <div className="py-10">
          <QuizAnalyticsPanel
            quizzes={quizzes.map(quiz => ({
              id: quiz.id,
              title: quiz.title,
            }))}
          />
        </div>
        <QuizDashboardMyQuiz />
      </div>
    </div>
  );
};

export default QuizDashboardPage;
