'use client';

import { useMemo, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Brain, CheckCircle2, ListTodo, Loader2, Target } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { generateFeedback } from '@/app/(main)/ai/actions';
import {
  quizFeedbackSchema,
  type QuizFeedback,
} from '@/features/ai/ai-learning.schema';

const parseFeedback = (feedback: unknown): QuizFeedback | null => {
  const result = quizFeedbackSchema.safeParse(feedback);
  return result.success ? result.data : null;
};

const FeedbackList = ({ title, items }: { title: string; items: string[] }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="text-muted-foreground space-y-2 text-sm">
        {items.map(item => (
          <li key={item} className="flex gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AttemptFeedbackCard = ({
  attemptId,
  initialFeedback,
}: {
  attemptId: string;
  initialFeedback: unknown;
}) => {
  const router = useRouter();
  const parsedFeedback = useMemo(
    () => parseFeedback(initialFeedback),
    [initialFeedback],
  );
  const [isGenerating, startTransition] = useTransition();
  const feedback = parsedFeedback;

  const handleGenerateFeedback = () => {
    startTransition(async () => {
      const response = await generateFeedback(attemptId);

      if (!response.success || !response.feedback) {
        toast.error(response.error ?? 'Failed to generate feedback.');
        return;
      }

      toast.success(
        response.cached
          ? 'Loaded your saved AI feedback.'
          : 'Generated personalized AI feedback.',
      );
      router.refresh();
    });
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card mb-6">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Brain className="text-primary h-5 w-5" />
            AI Learning Feedback
          </CardTitle>
          <p className="text-muted-foreground mt-1 text-sm">
            Personalized strengths, weak spots, and next-step recommendations.
          </p>
        </div>
        <Button
          onClick={handleGenerateFeedback}
          disabled={isGenerating}
          variant={feedback ? 'outline' : 'default'}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : feedback ? (
            'Refresh Feedback'
          ) : (
            'Generate Feedback'
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {!feedback ? (
          <div className="text-muted-foreground rounded-lg border border-dashed p-5 text-sm">
            Generate AI feedback to see topic-specific insights and study
            recommendations based on this attempt.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-background/60 rounded-xl border p-4">
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle2 className="text-primary h-4 w-4" />
                <span className="text-sm font-semibold">Summary</span>
              </div>
              <p className="text-muted-foreground text-sm leading-6">
                {feedback.summary}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FeedbackList title="Strengths" items={feedback.strengths} />
              <FeedbackList title="Weaknesses" items={feedback.weaknesses} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <Target className="h-4 w-4" />
                  Topics To Improve
                </h4>
                <div className="flex flex-wrap gap-2">
                  {feedback.topicsToImprove.map(topic => (
                    <Badge key={topic} variant="outline">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <ListTodo className="h-4 w-4" />
                  Recommendations
                </h4>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  {feedback.recommendations.map(item => (
                    <li key={item} className="flex gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttemptFeedbackCard;
