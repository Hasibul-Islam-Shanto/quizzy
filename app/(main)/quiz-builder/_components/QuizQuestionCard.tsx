'use client';
import React, { useMemo, useState, useTransition } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { IQuestion } from '@/features/questions/questions.entity';
import { useQuestionStore } from '@/store/question.store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Loader2, ShieldCheck, Sparkles, Trash } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { refineQuestion, validateQuestion } from '@/app/(main)/ai/actions';
import { toast } from 'sonner';

const refineOptions = [
  { value: 'make_harder', label: 'Make Harder' },
  { value: 'make_easier', label: 'Make Easier' },
  { value: 'improve_distractors', label: 'Improve Distractors' },
  { value: 'fix_ambiguity', label: 'Fix Ambiguity' },
  { value: 'rewrite_explanation', label: 'Rewrite Explanation' },
] as const;

const QuizQuestionCard = ({
  question,
  questionIndex,
}: {
  question: IQuestion;
  questionIndex: number;
}) => {
  const { deleteQuestion, updateQuestion } = useQuestionStore();
  const [selectedRefinement, setSelectedRefinement] = useState<
    (typeof refineOptions)[number]['value']
  >('improve_distractors');
  const [validationState, setValidationState] = useState<{
    isValid: boolean;
    issues: string[];
    suggestions: string[];
  } | null>(null);
  const [isRefining, startRefining] = useTransition();
  const [isValidating, startValidating] = useTransition();

  const topicLabel = useMemo(
    () => question.topic?.trim() || 'General',
    [question.topic],
  );

  const handleValidate = () => {
    startValidating(async () => {
      const response = await validateQuestion({
        question: question.question,
        options: question.options,
        correctAnswer: question.answer,
        explanation: question.explanation ?? undefined,
      });

      if (!response.success || !response.result) {
        toast.error(response.error ?? 'Failed to validate question.');
        return;
      }

      setValidationState(response.result);
      toast.success(
        response.result.isValid
          ? 'Question passed AI validation.'
          : 'Question needs review before publishing.',
      );
    });
  };

  const handleRefine = () => {
    startRefining(async () => {
      const response = await refineQuestion(
        {
          question: question.question,
          options: question.options,
          correctAnswer: question.answer,
          explanation: question.explanation ?? undefined,
        },
        selectedRefinement,
      );

      if (!response.success || !('question' in response)) {
        toast.error(response.error ?? 'Failed to refine question.');
        return;
      }

      updateQuestion(questionIndex, {
        ...question,
        question: response.question.question,
        options: response.question.options,
        answer: response.question.correctAnswer,
        explanation: response.question.explanation,
      });

      setValidationState(null);
      toast.success(
        response.fallbackUsed
          ? 'Refinement fell back to the original question.'
          : 'Question refined successfully.',
      );
    });
  };

  return (
    <Card className="bg-gradient-card shadow-card border-border/50 !px-0 !py-2">
      <CardContent className="relative space-y-2">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0 right-0"
          onClick={() => deleteQuestion(questionIndex)}
        >
          <Trash className="text-destructive h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">Question {questionIndex + 1}</p>
          <Badge variant="outline">{topicLabel}</Badge>
        </div>
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

        {question.explanation && (
          <div className="bg-background/60 rounded-lg border p-3">
            <p className="text-xs font-semibold tracking-wide uppercase">
              Explanation
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              {question.explanation}
            </p>
          </div>
        )}

        <div className="border-border/50 space-y-3 border-t pt-4">
          <p className="text-xs font-semibold tracking-wide uppercase">
            AI Controls
          </p>

          <div className="flex flex-col gap-3">
            <Select
              value={selectedRefinement}
              onValueChange={value =>
                setSelectedRefinement(
                  value as (typeof refineOptions)[number]['value'],
                )
              }
            >
              <SelectTrigger className="w-full md:flex-1">
                <SelectValue placeholder="Select refinement" />
              </SelectTrigger>
              <SelectContent>
                {refineOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex w-full flex-col items-center gap-3 md:flex-row">
              <Button
                variant="outline"
                className="w-full md:flex-1"
                disabled={isValidating}
                onClick={handleValidate}
              >
                {isValidating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Validating...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Validate
                  </>
                )}
              </Button>

              <Button
                className="w-full md:flex-1"
                disabled={isRefining}
                onClick={handleRefine}
              >
                {isRefining ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Refining...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Refine
                  </>
                )}
              </Button>
            </div>
          </div>

          {validationState && (
            <div className="bg-background/60 rounded-lg border p-3">
              <div className="mb-2 flex items-center gap-2">
                <Brain className="text-primary h-4 w-4" />
                <p className="text-sm font-semibold">
                  {validationState.isValid
                    ? 'AI QA passed'
                    : 'AI QA found issues'}
                </p>
              </div>
              <div className="space-y-3 text-sm">
                {validationState.issues.length > 0 && (
                  <div>
                    <p className="font-medium">Issues</p>
                    <ul className="text-muted-foreground mt-1 space-y-1">
                      {validationState.issues.map(issue => (
                        <li key={issue}>• {issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {validationState.suggestions.length > 0 && (
                  <div>
                    <p className="font-medium">Suggestions</p>
                    <ul className="text-muted-foreground mt-1 space-y-1">
                      {validationState.suggestions.map(suggestion => (
                        <li key={suggestion}>• {suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizQuestionCard;
