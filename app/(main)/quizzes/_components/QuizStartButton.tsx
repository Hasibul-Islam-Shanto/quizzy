import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IQuiz } from '@/features/quiz/quiz.entity';
import {
  BookOpen,
  Calendar,
  CalendarClock,
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
  IQuiz,
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
      <CardHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                <BookOpen className="text-primary h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-2xl">{quiz.title}</CardTitle>
                {quiz.description && (
                  <p className="text-muted-foreground mt-1">
                    {quiz.description}
                  </p>
                )}
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
          </div>

          <div className="text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Created {formatDate(quiz.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarClock className="h-4 w-4" />
              Updated {formatDate(quiz.updatedAt)}
            </span>
            {quiz.createdBy?.name && (
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                By {quiz.createdBy.name}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="border-border/50 flex items-center justify-between border-t pt-6">
        <p className="text-muted-foreground flex items-center gap-2 text-sm">
          <ListChecks className="h-4 w-4" />
          {oneLiner}
        </p>

        {quiz.hasAttempted && quiz.hasAttemptedNotFinished && (
          <Link href={`/quizzes/${quiz.id}/attempt`}>
            <Button variant="default">
              <Play className="mr-2 h-5 w-5" />
              Continue Quiz
            </Button>
          </Link>
        )}

        {quiz.hasAttempted && !quiz.hasAttemptedNotFinished && (
          <Link href={`/quizzes/${quiz.attemptId}/score`}>
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
