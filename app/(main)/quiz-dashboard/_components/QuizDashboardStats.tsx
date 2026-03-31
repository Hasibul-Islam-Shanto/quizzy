import React from 'react';
import { getQuizDashboardStatsAction } from '../actions';
import StatsCard from './StatsCard';
import { BarChart3, BookOpen, Users } from 'lucide-react';

const QuizDashboardStats = async () => {
  const response = await getQuizDashboardStatsAction();

  if (!response.success) {
    return <div className="text-red-500">{response.message}</div>;
  }

  const { quizCount, totalAttempts, totalAttendees } = response.data ?? {
    quizCount: 0,
    totalAttempts: 0,
    totalAttendees: 0,
  };

  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatsCard
          label="Total Quizzes"
          value={quizCount.toString()}
          description="Published and draft quizzes."
          icon={<BookOpen className="h-5 w-5" />}
          variant="primary"
        />
        <StatsCard
          label="Total Attempts"
          value={totalAttempts.toString()}
          description="All learner submissions."
          icon={<BarChart3 className="h-5 w-5" />}
          variant="secondary"
        />
        <StatsCard
          label="Total Attendees"
          value={totalAttendees.toString()}
          description="Unique participants reached."
          icon={<Users className="h-5 w-5" />}
          variant="accent"
        />
      </div>
    </section>
  );
};

export default QuizDashboardStats;
