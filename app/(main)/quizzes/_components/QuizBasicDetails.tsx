import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IQuiz } from '@/features/quiz/quiz.entity';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CalendarClock,
  ChartNoAxesColumn,
  FileEdit,
  Globe,
  Gauge,
  Layers3,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { getDifficultyColor } from '../constants/diiffculty';

type QuizBasicDetailsProps = Pick<
  IQuiz,
  | 'id'
  | 'title'
  | 'description'
  | 'difficulty'
  | 'isPublished'
  | 'createdAt'
  | 'updatedAt'
> & {
  createdBy?: { name: string; id: string };
  questionsCount: number;
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(new Date(date));

const QuizBasicDetails = ({ quiz }: { quiz: QuizBasicDetailsProps }) => {
  return (
    <Card className="bg-gradient-card border-border/50 shadow-card mb-6">
      <CardHeader className="space-y-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-primary/12 text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
                <Layers3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
                  Creator View
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

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/quiz-builder/${quiz.id}`}>
                <FileEdit className="mr-2 h-4 w-4" />
                Edit Quiz
              </Link>
            </Button>
            {quiz.isPublished ? (
              <Button variant="hero" size="sm" asChild>
                <Link href={`/quiz-leaderboard?quizId=${quiz.id}`}>
                  <ChartNoAxesColumn className="mr-2 h-4 w-4" />
                  View Leaderboard
                </Link>
              </Button>
            ) : null}
          </div>
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
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="border-primary/10 bg-primary/5 rounded-xl border p-4">
            <div className="text-muted-foreground mb-1 flex items-center gap-2 text-xs font-semibold uppercase">
              <BookOpen className="h-3.5 w-3.5" />
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
              Last Updated
            </div>
            <p className="text-sm font-semibold text-[hsl(161,28%,54%)]">
              {formatDate(quiz.updatedAt)}
            </p>
          </div>
        </div>

        <div className="text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span className="flex items-center gap-1.5">
            <ArrowRight className="h-4 w-4" />
            {quiz.isPublished
              ? 'This quiz is live and visible to participants.'
              : 'This quiz is still in draft mode.'}
          </span>
          {quiz.createdBy?.name && (
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              By {quiz.createdBy.name}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizBasicDetails;
