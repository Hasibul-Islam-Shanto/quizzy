import React from 'react';
import { getUserQuizAction } from '../actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Compass,
  Edit,
  Eye,
  BookOpen,
  Users,
  Gauge,
  Globe,
  FileEdit,
  Calendar,
  Layers3,
} from 'lucide-react';

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
    <section className="">
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Layers3 className="text-primary h-5 w-5" />
              My Quizzes
            </CardTitle>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              Review your quizzes, monitor activity, and jump into editing or
              preview mode.
            </p>
          </div>

          <Badge variant="secondary" className="rounded-full px-3 py-1 text-sm">
            {quizzes.length} total
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quizzes.length === 0 ? (
              <div className="bg-background/60 border-border/50 rounded-2xl border border-dashed p-8 text-center">
                <div className="bg-secondary/12 text-secondary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="text-foreground text-base font-semibold">
                  No quizzes yet
                </h3>
                <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm leading-relaxed">
                  Your quiz library will appear here once you create one. Start
                  with a draft, then publish when you are ready to share it.
                </p>
                <Button variant="hero" className="mt-5" asChild>
                  <Link href="/quiz-builder">
                    <FileEdit className="mr-2 h-4 w-4" />
                    Create your first quiz
                  </Link>
                </Button>
              </div>
            ) : (
              quizzes.map(quiz => (
                <div
                  key={quiz.id}
                  className="bg-background/70 border-border/50 rounded-2xl border p-4 transition-shadow duration-200 hover:shadow-sm"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Badge className="border-primary/15 bg-primary/10 text-primary rounded-full border">
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

                      <h3 className="text-foreground line-clamp-1 text-lg font-semibold">
                        {quiz.title}
                      </h3>
                      {quiz.description ? (
                        <p className="text-muted-foreground mt-1.5 line-clamp-2 text-sm leading-relaxed">
                          {quiz.description}
                        </p>
                      ) : (
                        <p className="text-muted-foreground mt-1.5 text-sm">
                          No description added yet.
                        </p>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center gap-2 self-start">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/quizzes/${quiz.id}`} title="View quiz">
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link
                          href={`/quiz-builder/${quiz.id}`}
                          title="Edit quiz"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
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
                    <div className="rounded-xl border border-[hsl(161,28%,54%)]/15 bg-[hsl(161,28%,54%)]/6 p-3">
                      <div className="text-muted-foreground mb-1 flex items-center gap-2 text-xs font-semibold uppercase">
                        <Calendar className="h-3.5 w-3.5" />
                        Updated
                      </div>
                      <p className="text-sm font-semibold text-[hsl(161,28%,54%)]">
                        {formatDate(quiz.updatedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>
                        {quiz.isPublished ? 'Published quiz' : 'Draft quiz'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default QuizDashboardMyQuiz;
