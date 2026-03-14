import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen } from 'lucide-react';
import QuizRedirectBtn from './QuizRedirectBtn';
import { getDifficultyColor } from '../constants/diiffculty';
import { IQuizListsQuiz } from '@/features/quiz/quiz.entity';
import { getAttemptByUserIdAndQuizIdAction } from '../action';
import { User } from '@clerk/nextjs/server';

const QuizCard = async ({
  quiz,
  user,
}: {
  quiz: IQuizListsQuiz;
  user: User | null;
}) => {
  const attempt = await getAttemptByUserIdAndQuizIdAction(
    user?.id ?? '',
    quiz.id,
  );

  const isAuthor = user?.id === quiz.createdById;
  const hasAttempted =
    attempt.success && attempt.attempt && attempt.attempt.userId === user?.id;

  return (
    <Card className="bg-gradient-card border-border/50 hover-scale !p-0 !py-3 transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-end">
          <Badge className={getDifficultyColor(quiz.difficulty)}>
            {quiz.difficulty}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2">{quiz.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {quiz.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-muted-foreground flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{quiz._count.questions} questions</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{quiz._count.attempts} taken</span>
              </div>
            </div>
          </div>

          <QuizRedirectBtn
            isAuthor={isAuthor ?? false}
            id={quiz.id}
            attemptId={attempt.attempt?.id ?? ''}
            hasAttempted={hasAttempted ?? false}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
