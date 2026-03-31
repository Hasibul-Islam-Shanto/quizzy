import React from 'react';
import QuizDashboardStats from './_components/QuizDashboardStats';
import QuizDashboardMyQuiz from './_components/QuizDashboardMyQuiz';
import { getUserQuizAction } from './actions';
import QuizAnalyticsPanel from './_components/QuizAnalyticsPanel';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Plus } from 'lucide-react';
import Link from 'next/link';

const QuizDashboardPage = async () => {
  const quizzesResponse = await getUserQuizAction();
  const quizzes = quizzesResponse.success ? (quizzesResponse.data ?? []) : [];

  return (
    <div className="app-container min-h-screen">
      <div className="flex-col space-y-5 py-10 pt-20">
        <div className="mb-8 flex w-full flex-col items-start justify-between gap-3 md:flex-row">
          <div>
            <h1 className="text-foreground mb-2 flex items-center gap-2 text-2xl font-bold">
              <LayoutDashboard className="text-primary h-5 w-5" />
              Quiz Dashboard
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed md:text-base">
              Manage your quizzes and track your progress
            </p>
          </div>
          <Button variant="hero" size="lg" asChild>
            <Link href="/quiz-builder" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Create Quiz
            </Link>
          </Button>
        </div>

        <QuizDashboardStats />
        <QuizDashboardMyQuiz />
        <QuizAnalyticsPanel
          quizzes={quizzes.map(quiz => ({
            id: quiz.id,
            title: quiz.title,
          }))}
        />
      </div>
    </div>
  );
};

export default QuizDashboardPage;
