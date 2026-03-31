'use client';

import { useEffect, useState, useTransition } from 'react';
import { BarChart3, Clock3, Loader2, Percent, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { getQuizAnalyticsAction } from '@/app/(main)/ai/actions';

type QuizOption = {
  id: string;
  title: string;
};

type Analytics = {
  avgScore: number;
  completionRate: number;
  hardestQuestions: { questionId: string; correctRate: number }[];
  avgTime: number;
};

const formatDuration = (ms: number) => {
  if (!ms) return '0s';
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) return `${seconds}s`;
  return `${minutes}m ${seconds}s`;
};

const QuizAnalyticsPanel = ({ quizzes }: { quizzes: QuizOption[] }) => {
  const [selectedQuizId, setSelectedQuizId] = useState<string>(
    quizzes[0]?.id ?? '',
  );
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    if (!selectedQuizId) {
      return;
    }

    startTransition(async () => {
      const response = await getQuizAnalyticsAction(selectedQuizId);

      if (!response.success || !response.analytics) {
        setError(response.error ?? 'Failed to load quiz analytics.');
        setAnalytics(null);
        return;
      }

      setError(null);
      setAnalytics(response.analytics);
    });
  }, [selectedQuizId]);

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="text-primary h-5 w-5" />
              Quiz Analytics
            </CardTitle>
            <p className="text-muted-foreground mt-1 text-sm">
              Track average performance, completion, and hardest questions.
            </p>
          </div>
          <Select value={selectedQuizId} onValueChange={setSelectedQuizId}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue placeholder="Select quiz" />
            </SelectTrigger>
            <SelectContent>
              {quizzes.map(quiz => (
                <SelectItem key={quiz.id} value={quiz.id}>
                  {quiz.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {quizzes.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            Create and publish a quiz to unlock analytics.
          </p>
        ) : isLoading ? (
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading analytics...
          </div>
        ) : error ? (
          <p className="text-sm text-rose-600">{error}</p>
        ) : analytics ? (
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border p-4">
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  Average Score
                </p>
                <p className="mt-2 text-2xl font-semibold">
                  {analytics.avgScore}
                </p>
              </div>
              <div className="rounded-xl border p-4">
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  Completion Rate
                </p>
                <p className="mt-2 text-2xl font-semibold">
                  {Math.round(analytics.completionRate * 100)}%
                </p>
              </div>
              <div className="rounded-xl border p-4">
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  Avg. Completion Time
                </p>
                <p className="mt-2 flex items-center gap-2 text-2xl font-semibold">
                  <Clock3 className="h-5 w-5" />
                  {formatDuration(analytics.avgTime)}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <ShieldAlert className="h-4 w-4" />
                Hardest Questions
              </h3>
              {analytics.hardestQuestions.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Not enough completed attempts yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {analytics.hardestQuestions.map(question => (
                    <div
                      key={question.questionId}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <span className="text-sm font-medium">
                        Question {question.questionId.slice(0, 8)}
                      </span>
                      <Badge variant="outline" className="gap-1">
                        <Percent className="h-3.5 w-3.5" />
                        {Math.round(question.correctRate * 100)}% correct
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default QuizAnalyticsPanel;
