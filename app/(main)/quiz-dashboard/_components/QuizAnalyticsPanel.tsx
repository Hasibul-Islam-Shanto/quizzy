'use client';

import { useEffect, useState, useTransition } from 'react';
import {
  BarChart3,
  CheckCircle2,
  Clock3,
  Loader2,
  Percent,
  ShieldAlert,
  Target,
  Trophy,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
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

type MetricVariant = 'primary' | 'secondary' | 'accent';

const metricStyles: Record<
  MetricVariant,
  { icon: string; value: string; surface: string; progress: string }
> = {
  primary: {
    icon: 'bg-primary/15 text-primary',
    value: 'text-primary',
    surface: 'border-primary/15 bg-primary/5',
    progress: '[&_[data-slot=progress-indicator]]:bg-primary',
  },
  secondary: {
    icon: 'bg-secondary/15 text-secondary',
    value: 'text-secondary',
    surface: 'border-secondary/15 bg-secondary/5',
    progress: '[&_[data-slot=progress-indicator]]:bg-secondary',
  },
  accent: {
    icon: 'bg-[hsl(161,28%,54%)]/15 text-[hsl(161,28%,54%)]',
    value: 'text-[hsl(161,28%,54%)]',
    surface: 'border-[hsl(161,28%,54%)]/15 bg-[hsl(161,28%,54%)]/5',
    progress: '[&_[data-slot=progress-indicator]]:bg-[hsl(161,28%,54%)]',
  },
};

const formatDuration = (ms: number) => {
  if (!ms) return '0s';
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) return `${seconds}s`;
  return `${minutes}m ${seconds}s`;
};

const MetricCard = ({
  label,
  value,
  description,
  icon,
  variant,
}: {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  variant: MetricVariant;
}) => {
  const styles = metricStyles[variant];

  return (
    <div
      className={cn(
        'rounded-2xl border p-4 shadow-sm transition-all duration-300',
        'hover:-translate-y-0.5 hover:shadow-md',
        styles.surface,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
            {label}
          </p>
          <p
            className={cn(
              'mt-2 text-3xl font-bold tracking-tight tabular-nums',
              styles.value,
            )}
          >
            {value}
          </p>
        </div>
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
            styles.icon,
          )}
        >
          {icon}
        </div>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const AnalyticsPanelSkeleton = () => (
  <div className="space-y-5">
    <div className="grid gap-4 md:grid-cols-3">
      {[0, 1, 2].map(item => (
        <div
          key={item}
          className="bg-background/70 border-border/50 rounded-2xl border p-4"
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="space-y-2">
              <div className="bg-muted h-3 w-24 animate-pulse rounded" />
              <div className="bg-muted h-8 w-20 animate-pulse rounded" />
            </div>
            <div className="bg-muted h-10 w-10 animate-pulse rounded-xl" />
          </div>
          <div className="bg-muted h-4 w-full animate-pulse rounded" />
        </div>
      ))}
    </div>

    <div className="border-border/50 bg-background/70 rounded-2xl border p-4">
      <div className="mb-4 flex items-center gap-3">
        <div className="bg-muted h-10 w-10 animate-pulse rounded-xl" />
        <div className="space-y-2">
          <div className="bg-muted h-4 w-32 animate-pulse rounded" />
          <div className="bg-muted h-3 w-56 animate-pulse rounded" />
        </div>
      </div>

      <div className="space-y-3">
        {[0, 1, 2].map(item => (
          <div
            key={item}
            className="border-border/50 bg-background/80 rounded-xl border p-3"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="bg-muted h-4 w-28 animate-pulse rounded" />
                <div className="bg-muted h-3 w-20 animate-pulse rounded" />
              </div>
              <div className="bg-muted h-6 w-24 animate-pulse rounded-full" />
            </div>
            <div className="bg-muted h-2 w-full animate-pulse rounded-full" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

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
      <CardHeader className="space-y-5">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div className="space-y-3">
            <div className="bg-primary/12 text-primary flex h-11 w-11 items-center justify-center rounded-2xl">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl">Quiz Analytics</CardTitle>
              <p className="text-muted-foreground mt-1 max-w-xl text-sm leading-relaxed">
                Review score trends, completion quality, and the questions that
                challenge participants most.
              </p>
            </div>
          </div>

          <div className="bg-background/70 border-border/50 min-w-0 rounded-2xl border p-3 shadow-sm">
            <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
              Active Quiz
            </p>
            <Select value={selectedQuizId} onValueChange={setSelectedQuizId}>
              <SelectTrigger className="w-full min-w-0 sm:w-72">
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
        </div>
      </CardHeader>
      <CardContent>
        {quizzes.length === 0 ? (
          <div className="bg-background/60 border-border/50 rounded-2xl border p-5">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(161,28%,54%)]/15 text-[hsl(161,28%,54%)]">
              <Trophy className="h-5 w-5" />
            </div>
            <h3 className="text-foreground text-base font-semibold">
              Analytics unlock after your first quiz
            </h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Create and publish a quiz to start collecting attempt data,
              completion stats, and difficulty insights.
            </p>
          </div>
        ) : isLoading ? (
          <AnalyticsPanelSkeleton />
        ) : error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-300">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">
                  Unable to load analytics
                </p>
                <p className="mt-1 text-sm">{error}</p>
              </div>
            </div>
          </div>
        ) : analytics ? (
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-3">
              <MetricCard
                label="Average Score"
                value={`${analytics.avgScore}`}
                description="A quick read on how well participants performed across completed attempts."
                icon={<Target className="h-5 w-5" />}
                variant="primary"
              />
              <MetricCard
                label="Completion Rate"
                value={`${Math.round(analytics.completionRate * 100)}%`}
                description="How many participants stayed through the finish line after starting this quiz."
                icon={<CheckCircle2 className="h-5 w-5" />}
                variant="secondary"
              />
              <MetricCard
                label="Avg. Completion Time"
                value={formatDuration(analytics.avgTime)}
                description="Typical time participants spend before submitting a finished attempt."
                icon={<Clock3 className="h-5 w-5" />}
                variant="accent"
              />
            </div>

            <div className="border-border/50 bg-background/60 rounded-2xl border p-4 md:p-5">
              <div className="mb-4 flex items-start gap-3">
                <div className="bg-secondary/15 text-secondary flex h-10 w-10 items-center justify-center rounded-xl">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-foreground flex items-center gap-2 text-base font-semibold">
                    Hardest Questions
                    <Badge variant="secondary" className="rounded-full px-2.5">
                      {analytics.hardestQuestions.length}
                    </Badge>
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Questions with the lowest correct-answer rate so you can
                    spot confusion quickly.
                  </p>
                </div>
              </div>

              {analytics.hardestQuestions.length === 0 ? (
                <div className="border-border/50 bg-background/80 rounded-xl border border-dashed p-5 text-center">
                  <div className="bg-primary/10 text-primary mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl">
                    <Loader2 className="h-4 w-4" />
                  </div>
                  <p className="text-foreground text-sm font-medium">
                    Not enough completed attempts yet
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Once more learners finish the quiz, difficulty insights will
                    appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {analytics.hardestQuestions.map((question, index) => {
                    const progressValue = Math.round(
                      question.correctRate * 100,
                    );
                    const variant: MetricVariant =
                      index === 0
                        ? 'secondary'
                        : index === 1
                          ? 'primary'
                          : 'accent';
                    const styles = metricStyles[variant];

                    return (
                      <div
                        key={question.questionId}
                        className="border-border/50 bg-background/80 rounded-xl border p-3.5"
                      >
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                                  styles.icon,
                                )}
                              >
                                <span className="text-sm font-semibold">
                                  {index + 1}
                                </span>
                              </div>
                              <div className="min-w-0">
                                <p className="text-foreground text-sm font-semibold">
                                  Question {index + 1}
                                </p>
                                <p className="text-muted-foreground truncate text-xs">
                                  ID: {question.questionId.slice(0, 8)}
                                </p>
                              </div>
                            </div>
                          </div>

                          <Badge
                            variant="outline"
                            className="gap-1.5 rounded-full"
                          >
                            <Percent className="h-3.5 w-3.5" />
                            {progressValue}% correct
                          </Badge>
                        </div>

                        <Progress
                          value={progressValue}
                          className={cn('bg-muted/70 h-2.5', styles.progress)}
                        />
                      </div>
                    );
                  })}
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
