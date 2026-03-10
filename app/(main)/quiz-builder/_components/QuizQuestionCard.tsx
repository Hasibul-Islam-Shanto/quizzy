import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { IQuestion } from '@/features/questions/questions.entity';

const QuizQuestionCard = ({
  question,
  questionIndex,
}: {
  question: IQuestion;
  questionIndex: number;
}) => {
  return (
    <Card className="bg-gradient-card shadow-card border-white/20 !px-0 !py-2">
      <CardContent className="space-y-2">
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
