'use client';
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { IQuestion } from '@/features/questions/questions.entity';
import { submitQuizAction } from '../action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const QuizStartedQuestions = ({
  questions,
  quizId,
}: {
  questions: IQuestion[];
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
        router.push(`/quizzes/${response?.attempt?.id}/score`);
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <div className="space-y-3">
      <div className="bg-card rounded-xl p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-muted-foreground text-sm">
            {questionPercentageCompleted}% Complete
          </span>
        </div>
        <Progress value={questionPercentageCompleted} className="h-2" />
      </div>

      <Card className="bg-gradient-card border-border/50 shadow-card mb-6">
        <CardHeader>
          <CardTitle className="text-base">
            {questions[currentQuestion]?.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[questions[currentQuestion]?.id]?.toString()}
            onValueChange={value =>
              handleAnswerSelect(questions[currentQuestion]?.id, value)
            }
            className="space-y-2"
          >
            {questions[currentQuestion]?.options?.map((option, index) => (
              <div
                key={index}
                className="bg-background/50 hover:bg-background/70 transition-smooth flex items-center space-x-3 rounded-lg p-2"
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer text-sm"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="outline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {questions.map((_, index) => (
            <Button
              key={index}
              variant={
                index === currentQuestion
                  ? 'default'
                  : answers[questions[index]?.id] !== undefined
                    ? 'secondary'
                    : 'outline'
              }
              size="sm"
              onClick={() => setCurrentQuestion(index)}
              className="h-10 w-10 p-0"
            >
              {index + 1}
            </Button>
          ))}
        </div>

        {currentQuestion === questions.length - 1 ? (
          <Button
            onClick={handleSubmitQuiz}
            variant="default"
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
