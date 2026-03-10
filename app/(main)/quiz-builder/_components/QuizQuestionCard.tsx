'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { IQuestion } from '@/features/questions/questions.entity';
import { useQuestionStore } from '@/store/question.store';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

const QuizQuestionCard = ({
  question,
  questionIndex,
}: {
  question: IQuestion;
  questionIndex: number;
}) => {
  const { deleteQuestion } = useQuestionStore();
  return (
    <Card className="bg-gradient-card shadow-card border-white/20 !px-0 !py-2">
      <CardContent className="relative space-y-2">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0 right-0"
          onClick={() => deleteQuestion(questionIndex)}
        >
          <Trash className="text-destructive h-4 w-4" />
        </Button>
        <p className="text-sm font-semibold">Question {questionIndex + 1}</p>
        <p className="text-sm"> {question?.question}</p>

        <div className="space-y-1">
          <p className="text-foreground text-sm font-medium">Answer Options:</p>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center gap-3">
              <input
                type="radio"
                checked={option === question.answer}
                readOnly
                className="text-primary"
              />
              <p className="text-sm">{option}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizQuestionCard;
