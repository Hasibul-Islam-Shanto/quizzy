import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IPublicQuiz } from '@/features/quiz/quiz.entity';
import {
  BookOpen,
  Calendar,
  CalendarClock,
  ChartNoAxesColumn,
  FileEdit,
  Globe,
  Gauge,
  ListChecks,
  Play,
  User,
  Eye,
} from 'lucide-react';
import { getDifficultyColor } from '../constants/diiffculty';
import Link from 'next/link';

type QuizStartButtonProps = Pick<
  IPublicQuiz,
  | 'id'
  | 'title'
  | 'description'
  | 'difficulty'
  | 'isPublished'
  | 'createdAt'
  | 'updatedAt'
> & {
  createdBy?: { name: string };
  questionsCount: number;
  hasAttempted: boolean;
  hasAttemptedNotFinished: boolean;
  attemptId: string;
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(new Date(date));

const QuizStartButton = ({ quiz }: { quiz: QuizStartButtonProps }) => {
  const oneLiner = `${quiz.questionsCount} questions • Ready to test your knowledge`;

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader className="space-y-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-primary/12 text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
                  Quiz Overview
                </p>
                <CardTitle className="text-2xl">{quiz.title}</CardTitle>
              </div>
            </div>

            {quiz.description ? (
              <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed md:text-base">
                {quiz.description}
              </p>
            ) : (
              <p className="text-muted-foreground text-sm">
                No description added yet.
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge className={getDifficultyColor(quiz.difficulty)}>
              <Gauge className="mr-1 h-3.5 w-3.5" />
              {quiz.difficulty}
            </Badge>
            <Badge
              variant={quiz.isPublished ? 'default' : 'secondary'}
              className="capitalize"
            >
              {quiz.isPublished ? (
                <>
                  <Globe className="mr-1 h-3.5 w-3.5" />
                  Published
                </>
              ) : (
                <>
                  <FileEdit className="mr-1 h-3.5 w-3.5" />
                  Draft
                </>
              )}
            </Badge>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="border-primary/10 bg-primary/5 rounded-xl border p-4">
            <div className="text-muted-foreground mb-1 flex items-center gap-2 text-xs font-semibold uppercase">
              <ListChecks className="h-3.5 w-3.5" />
              Questions
            </div>
            <p className="text-primary text-2xl font-bold tabular-nums">
              {quiz.questionsCount}
            </p>
          </div>
          <div className="border-secondary/10 bg-secondary/5 rounded-xl border p-4">
            <div className="text-muted-foreground mb-1 flex items-center gap-2 text-xs font-semibold uppercase">
              <Calendar className="h-3.5 w-3.5" />
              Created
            </div>
            <p className="text-secondary text-sm font-semibold">
              {formatDate(quiz.createdAt)}
            </p>
          </div>
          <div className="rounded-xl border border-[hsl(161,28%,54%)]/15 bg-[hsl(161,28%,54%)]/6 p-4">
            <div className="text-muted-foreground mb-1 flex items-center gap-2 text-xs font-semibold uppercase">
              <CalendarClock className="h-3.5 w-3.5" />
              Updated
            </div>
            <p className="text-sm font-semibold text-[hsl(161,28%,54%)]">
              {formatDate(quiz.updatedAt)}
            </p>
          </div>
        </div>

        <div className="text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span className="flex items-center gap-1.5">
            <ChartNoAxesColumn className="h-4 w-4" />
            {oneLiner}
          </span>
          {quiz.createdBy?.name && (
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              By {quiz.createdBy.name}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="border-border/50 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-end">
        {!quiz.hasAttempted && (
          <Button variant="hero" asChild>
            <Link href={`/quizzes/${quiz.id}/attempt`}>
              <Play className="mr-2 h-5 w-5" />
              Start Quiz
            </Link>
          </Button>
        )}

        {quiz.hasAttempted && quiz.hasAttemptedNotFinished && (
          <Link href={`/quizzes/${quiz.id}/attempt`}>
            <Button variant="hero">
              <Play className="mr-2 h-5 w-5" />
              Continue Quiz
            </Button>
          </Link>
        )}

        {quiz.hasAttempted && !quiz.hasAttemptedNotFinished && (
          <Link href={`/attempts/${quiz.attemptId}/score`}>
            <Button variant="default">
              <Eye className="mr-2 h-5 w-5" />
              See Result
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizStartButton;
