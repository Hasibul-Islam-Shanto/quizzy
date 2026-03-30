'use client';
import React, { useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Send, Sparkles, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateQuizAction } from '../actions';
import { quizCreateSchema, QuizCreateType } from '@/features/quiz/quiz.schema';
import { useQuestionStore } from '@/store/question.store';

const QuizBuildPromptInput = () => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<QuizCreateType>({
    mode: 'all',
    resolver: zodResolver(quizCreateSchema),
  });
  const [isGeneratingQuestions, startTransition] = useTransition();
  const { setQuestions, questions } = useQuestionStore();

  const onSubmit = (data: QuizCreateType) => {
    startTransition(async () => {
      const response = await generateQuizAction({
        prompt: data.prompt,
        difficulty: data.difficulty,
        numQuestions: data.numQuestions as number,
      });

      if (!Array.isArray(response)) {
        console.error(response.error);
      } else {
        const newQuestions = response;
        setQuestions([...questions, ...newQuestions]);
        reset();
        setValue('difficulty', 'EASY');
      }
    });
  };

  return (
    <Card className="bg-gradient-card shadow-elegant border-border/50 mb-8">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Sparkles className="text-primary h-5 w-5" />
          Tell us what you want to quiz about
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Textarea
              {...register('prompt')}
              placeholder="Type your topic, paste text content, or describe what you'd like to quiz about..."
              className={`bg-background/50 min-h-[120px] resize-none border-gray-200 ${
                errors.prompt ? 'border-destructive' : ''
              }`}
            />
            <p className="text-destructive text-xs font-medium">
              {errors.prompt && errors.prompt.message}
            </p>
          </div>

          <div className="grid w-full grid-cols-3 gap-3">
            <div>
              <Select
                onValueChange={value => {
                  setValue('difficulty', value as 'EASY' | 'MEDIUM' | 'HARD');
                  if (errors?.difficulty) clearErrors('difficulty');
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Difficulty</SelectLabel>
                    <SelectItem value="EASY">Easy</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HARD">Hard</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-destructive text-xs font-medium">
                {errors.difficulty && errors.difficulty.message}
              </p>
            </div>
            <div>
              <Input
                {...register('numQuestions')}
                type="number"
                placeholder="Number of Questions"
              />
              <p className="text-destructive text-xs font-medium">
                {errors.numQuestions && errors.numQuestions.message}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              type="submit"
              variant="hero"
              className="flex-1"
              disabled={isGeneratingQuestions}
            >
              {isGeneratingQuestions ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Generate Quiz
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="default"
              className="border-1 border-gray-200"
              disabled
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuizBuildPromptInput;
