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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <StatsCard
        label="Total Quizzes"
        value={quizCount.toString()}
        icon={<BookOpen className="h-4 w-4" />}
        variant="primary"
      />
      <StatsCard
        label="Total Attempts"
        value={totalAttempts.toString()}
        icon={<BarChart3 className="h-4 w-4" />}
        variant="secondary"
      />
      <StatsCard
        label="Total Attendees"
        value={totalAttendees.toString()}
        icon={<Users className="h-4 w-4" />}
        variant="accent"
      />
    </div>
  );
};

export default QuizDashboardStats;
