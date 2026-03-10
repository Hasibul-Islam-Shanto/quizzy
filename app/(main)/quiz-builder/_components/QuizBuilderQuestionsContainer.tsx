'use client';
import React, { useState, useTransition } from 'react';
import { Loader2, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuizQuestionCard from './QuizQuestionCard';
import { createQuizAction } from '../actions';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useQuestionStore } from '@/store/question.store';

const QuizBuilderQuestionsContainer = () => {
  const router = useRouter();
  const [isCreatingQuiz, startTransition] = useTransition();
  const [quizTitle, setQuizTitle] = useState<string>('');
  const { questions } = useQuestionStore();

  const handleCreateQuiz = () => {
    startTransition(async () => {
      const response = await createQuizAction({ title: quizTitle, questions });
      if (response.error) {
        toast.error('Failed to create quiz.', {
          description: response.error,
          duration: 2000,
          position: 'top-center',
        });
      } else {
        toast.success('Quiz created successfully!', {
          duration: 2000,
          position: 'top-center',
        });
        router.push(`/quiz-builder/${response?.quiz?.id}`);
      }
    });
  };
  return (
    <div>
      {questions.length > 0 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">
              Title for your Quiz <span className="text-destructive">*</span>
            </p>
            <Input
              placeholder="Quiz Title"
              value={quizTitle}
              onChange={e => setQuizTitle(e.target.value)}
              className="py-5"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            {questions?.map((question, questionIndex) => (
              <QuizQuestionCard
                key={questionIndex}
                question={question}
                questionIndex={questionIndex}
              />
            ))}
          </div>

          <Button
            onClick={() => {
              handleCreateQuiz();
            }}
            variant="hero"
            size="lg"
            className="w-full flex-1 cursor-pointer"
            disabled={isCreatingQuiz || !quizTitle.trim()}
          >
            {isCreatingQuiz ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Share className="mr-2 h-5 w-5" />
            )}

            {isCreatingQuiz ? 'Creating Quiz...' : 'Create Quiz'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizBuilderQuestionsContainer;
