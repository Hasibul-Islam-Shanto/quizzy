import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAttemptByIdAction } from '../../action';
import { getDifficultyColor } from '../../constants/diiffculty';
import {
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Gauge,
  RotateCcw,
  Share2,
  Trophy,
  User,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const formatDate = (date: string | Date) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));

const getScoreBadge = (percentage: number) => {
  if (percentage >= 90)
    return {
      text: 'Excellent',
      className: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    };
  if (percentage >= 80)
    return {
      text: 'Good',
      className: 'bg-blue-100 text-blue-800 border-blue-200',
    };
  if (percentage >= 60)
    return {
      text: 'Average',
      className: 'bg-amber-100 text-amber-800 border-amber-200',
    };
  return {
    text: 'Needs Improvement',
    className: 'bg-rose-100 text-rose-800 border-rose-200',
  };
};

const ScorePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const response = await getAttemptByIdAction(id);

  if (!response.success || !response.attempt) {
    return notFound();
  }

  const attempt = response.attempt;
  const { quiz, answers, user, score, finishedAt } = attempt;
  const totalQuestions = quiz.questions.length;
  const correctCount = score;
  const percentage =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const scoreBadge = getScoreBadge(percentage);

  const getAnswerForQuestion = (questionId: string) =>
    answers.find(a => a.questionId === questionId);

  return (
    <div className="bg-gradient-soft min-h-screen pb-10">
      <div className="mx-auto max-w-4xl px-4 pt-20 sm:px-6 lg:px-8">
        <Card className="bg-gradient-card border-border/50 shadow-card mb-6">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                <BookOpen className="text-primary h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-xl">{quiz.title}</CardTitle>
                {quiz.description && (
                  <p className="text-muted-foreground mt-1 text-sm">
                    {quiz.description}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge className={getDifficultyColor(quiz.difficulty)}>
                    <Gauge className="mr-1 h-3.5 w-3.5" />
                    {quiz.difficulty}
                  </Badge>
                  <span className="text-muted-foreground flex items-center gap-1.5 text-sm">
                    <User className="h-4 w-4" />
                    {user.name}
                  </span>
                  <span className="text-muted-foreground flex items-center gap-1.5 text-sm">
                    <CalendarClock className="h-4 w-4" />
                    {formatDate(finishedAt!)}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-elegant mb-6">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                <Trophy className="text-primary h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              Quiz Completed!
            </CardTitle>
            <p className="text-muted-foreground">Here are your results</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 text-center">
              <div className="text-primary text-3xl font-bold md:text-5xl">
                {percentage}%
              </div>
              <Badge
                variant="outline"
                className={`border ${scoreBadge.className}`}
              >
                {scoreBadge.text}
              </Badge>
              <p className="text-muted-foreground text-base">
                You got {correctCount} out of {totalQuestions} questions correct
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-foreground text-lg font-semibold">
                Question Review
              </h3>
              {quiz.questions.map((question, index) => {
                const answerData = getAnswerForQuestion(question.id);
                const isCorrect = answerData?.isCorrect ?? false;
                const selected = answerData?.selected ?? 'Not answered';

                return (
                  <Card key={question.id} className="bg-gradient-card">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                          {isCorrect ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-rose-600" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1 space-y-3">
                          <p className="text-foreground font-medium">
                            Q{index + 1}: {question.question}
                          </p>
                          <div className="space-y-2 text-sm">
                            <p
                              className={
                                isCorrect ? 'text-emerald-700' : 'text-rose-700'
                              }
                            >
                              <span className="font-medium">Your answer:</span>{' '}
                              {selected}
                            </p>
                            {!isCorrect && (
                              <p className="text-emerald-700">
                                <span className="font-medium">
                                  Correct answer:
                                </span>{' '}
                                {question.answer}
                              </p>
                            )}
                            {question.explanation && (
                              <p className="text-muted-foreground border-border/50 border-t pt-3">
                                {question.explanation}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 pt-6 sm:flex-row">
              <Button variant="outline" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" />
                Share Results
              </Button>
              <Button variant="hero" className="flex-1" asChild>
                <Link href="/quizzes">Browse More Quizzes</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScorePage;
