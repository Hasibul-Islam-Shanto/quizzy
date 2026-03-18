import React from 'react';
import { getUserQuizAction } from '../actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Edit,
  Eye,
  Plus,
  BookOpen,
  Users,
  Gauge,
  Globe,
  FileEdit,
  Calendar,
} from 'lucide-react';
import { getDifficultyColor } from '@/app/(main)/quizzes/constants/diiffculty';

const formatDate = (date: Date | string) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(new Date(date));

const QuizDashboardMyQuiz = async () => {
  const response = await getUserQuizAction();

  if (!response.success) {
    return <div className="text-red-500">{response.message}</div>;
  }

  const quizzes = response.data ?? [];

  return (
    <div className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quizzes.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center text-sm">
                  No quizzes yet. Create your first quiz to get started.
                </p>
              ) : (
                quizzes.map(quiz => (
                  <div
                    key={quiz.id}
                    className="border-border/50 bg-background/50 hover:border-primary/20 flex flex-col gap-3 rounded-lg border p-4 transition-all duration-200 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-foreground line-clamp-1 font-semibold">
                          {quiz.title}
                        </h3>
                        {quiz.description && (
                          <p className="text-muted-foreground mt-0.5 line-clamp-2 text-sm">
                            {quiz.description}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/quizzes/${quiz.id}`} title="View">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/quiz-builder/${quiz.id}`} title="Edit">
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        <Gauge className="mr-1 h-3 w-3" />
                        {quiz.difficulty}
                      </Badge>
                      <Badge
                        variant={quiz.isPublished ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {quiz.isPublished ? (
                          <>
                            <Globe className="mr-1 h-3 w-3" />
                            Published
                          </>
                        ) : (
                          <>
                            <FileEdit className="mr-1 h-3 w-3" />
                            Draft
                          </>
                        )}
                      </Badge>
                    </div>

                    <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        {quiz._count.questions} questions
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {quiz._count.attempts} attempts
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        Updated {formatDate(quiz.updatedAt)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="bg-gradient-card border-border/50 shadow-card p-3">
          <CardTitle>Quick Actions</CardTitle>
          <CardContent className="space-y-5 !p-0">
            <Button variant="hero" size="sm" className="w-full" asChild>
              <Link href="/quiz-builder">
                <Plus className="mr-2 h-4 w-4" />
                Create Quiz
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/quiz-leaderboard">
                <Eye className="mr-2 h-4 w-4" />
                View Leaderboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizDashboardMyQuiz;
