'use client';
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Loader2, ListChecks } from 'lucide-react';
import { IQuestionForAttempt } from '@/features/questions/questions.entity';
import { submitQuizAction } from '../action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const QuizStartedQuestions = ({
  questions,
  quizId,
}: {
  questions: IQuestionForAttempt[];
  quizId: string;
}) => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isStartSubmitting, startSubmitting] = useTransition();

  const totalQuestions = questions.length;
  const questionPercentageCompleted = Math.round(
    ((currentQuestion + 1) / totalQuestions) * 100,
  );

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    startSubmitting(async () => {
      const response = await submitQuizAction(quizId, answers);
      if (response.success) {
        toast.success(response.message);
        router.push(`/attempts/${response?.attempt?.id}/score`);
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardContent className="p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-foreground flex items-center gap-2 text-sm font-medium">
                <ListChecks className="text-primary h-4 w-4" />
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <p className="text-muted-foreground mt-1 text-sm">
                Answer each question carefully before submitting.
              </p>
            </div>
            <Badge variant="secondary" className="rounded-full">
              {questionPercentageCompleted}% Complete
            </Badge>
          </div>
          <Progress value={questionPercentageCompleted} className="h-2.5" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border/50 shadow-card mb-6">
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="rounded-full">
              Question {currentQuestion + 1}
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              {questions[currentQuestion]?.options?.length ?? 0} options
            </Badge>
          </div>
          <CardTitle className="text-lg leading-relaxed">
            {questions[currentQuestion]?.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[questions[currentQuestion]?.id]?.toString()}
            onValueChange={value =>
              handleAnswerSelect(questions[currentQuestion]?.id, value)
            }
            className="space-y-3"
          >
            {questions[currentQuestion]?.options?.map((option, index) => {
              const optionId = `option-${currentQuestion}-${index}`;
              const isSelected =
                answers[questions[currentQuestion]?.id] === option;

              return (
                <Label
                  key={index}
                  htmlFor={optionId}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all ${
                    isSelected
                      ? 'border-primary/40 bg-primary/5'
                      : 'border-border/50 bg-background/70 hover:bg-background/90'
                  }`}
                >
                  <RadioGroupItem
                    value={option}
                    id={optionId}
                    className="mt-0.5"
                  />
                  <span className="text-sm leading-relaxed">{option}</span>
                </Label>
              );
            })}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="outline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <div className="flex flex-wrap gap-2">
          {questions.map((question, index) => (
            <Button
              key={index}
              variant={
                index === currentQuestion
                  ? 'default'
                  : answers[question?.id] !== undefined
                    ? 'secondary'
                    : 'outline'
              }
              size="sm"
              onClick={() => setCurrentQuestion(index)}
              className="h-9 w-9 rounded-full p-0"
            >
              {index + 1}
            </Button>
          ))}
        </div>

        {currentQuestion === questions.length - 1 ? (
          <Button
            onClick={handleSubmitQuiz}
            variant="hero"
            disabled={
              Object.keys(answers).length !== totalQuestions ||
              isStartSubmitting
            }
          >
            {isStartSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Quiz...
              </>
            ) : (
              <>
                Submit Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1}
            variant="default"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizStartedQuestions;
