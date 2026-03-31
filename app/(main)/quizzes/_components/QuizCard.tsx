import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, FileText, Trophy, Users } from 'lucide-react';
import QuizRedirectBtn from './QuizRedirectBtn';
import { IQuizListsQuiz } from '@/features/quiz/quiz.entity';
import { User } from '@clerk/nextjs/server';
import { getMyAttemptByQuizIdAction } from '../../attempts/action';
import { getDifficultyColor } from '../constants/diiffculty';

const QuizCard = async ({
  quiz,
  user,
}: {
  quiz: IQuizListsQuiz;
  user: User | null;
}) => {
  const attempt = user ? await getMyAttemptByQuizIdAction(quiz.id) : null;

  const isAuthor = user?.id === quiz.createdById;
  const hasAttempted =
    attempt?.success && attempt.attempt && attempt.attempt.userId === user?.id;

  const hasAttemptedNotFinished =
    attempt?.success &&
    attempt.attempt &&
    attempt.attempt.userId === user?.id &&
    attempt.attempt.finishedAt === null;

  const difficultyLabel =
    quiz.difficulty.charAt(0) + quiz.difficulty.slice(1).toLowerCase();

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-elegant relative !p-0 !py-3 transition-shadow duration-200">
      <CardHeader>
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="bg-primary/12 text-primary flex h-9 w-9 items-center justify-center rounded-xl">
            <FileText className="h-4.5 w-4.5" />
          </div>
          <Badge className={getDifficultyColor(quiz.difficulty)}>
            <Trophy className="mr-1 h-3 w-3" />
            {difficultyLabel}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2 text-lg">{quiz.title}</CardTitle>
        <CardDescription className="line-clamp-3 text-sm leading-relaxed">
          {quiz.description ||
            'Sharpen your knowledge with this interactive quiz experience.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="border-primary/10 bg-primary/5 rounded-xl border p-3">
              <div className="text-muted-foreground mb-1 flex items-center gap-2 text-xs font-semibold uppercase">
                <BookOpen className="h-3.5 w-3.5" />
                Questions
              </div>
              <p className="text-primary text-xl font-bold tabular-nums">
                {quiz._count.questions}
              </p>
            </div>
            <div className="border-secondary/10 bg-secondary/5 rounded-xl border p-3">
              <div className="text-muted-foreground mb-1 flex items-center gap-2 text-xs font-semibold uppercase">
                <Users className="h-3.5 w-3.5" />
                Attempts
              </div>
              <p className="text-secondary text-xl font-bold tabular-nums">
                {quiz._count.attempts}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="text-muted-foreground flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4" />
              {isAuthor ? 'You created this quiz' : 'Available to take'}
            </p>
            {hasAttempted ? (
              <Badge variant="secondary" className="rounded-full">
                Attempted
              </Badge>
            ) : null}
          </div>

          <QuizRedirectBtn
            isAuthor={isAuthor ?? false}
            id={quiz.id}
            attemptId={attempt?.attempt?.id ?? ''}
            hasAttempted={hasAttempted ?? false}
            hasAttemptedNotFinished={hasAttemptedNotFinished ?? false}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
