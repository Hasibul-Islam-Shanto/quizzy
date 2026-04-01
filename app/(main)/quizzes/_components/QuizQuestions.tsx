import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IQuestion } from '@/features/questions/questions.entity';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, HelpCircle, Lightbulb, ListChecks } from 'lucide-react';

type QuizQuestionsProps = {
  questions: IQuestion[];
  quizTitle: string;
};

const QuizQuestionItem = ({
  question,
  index,
}: {
  question: IQuestion;
  index: number;
}) => (
  <Card className="bg-gradient-card border-border/50 shadow-card">
    <CardContent className="pt-6">
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold">
          {index + 1}
        </div>
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="rounded-full">
              Question {index + 1}
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              {question.options.length} options
            </Badge>
          </div>

          <p className="text-foreground text-base leading-relaxed font-medium">
            {question.question}
          </p>

          <div className="space-y-2">
            {question.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className={`flex items-start gap-2 rounded-xl border px-3 py-3 text-sm ${
                  option === question.answer
                    ? 'border-primary/50 bg-primary/5 text-foreground'
                    : 'border-border/50 bg-muted/30 text-muted-foreground'
                }`}
              >
                {option === question.answer ? (
                  <CheckCircle2 className="text-primary h-4 w-4 shrink-0" />
                ) : (
                  <HelpCircle className="text-muted-foreground h-4 w-4 shrink-0" />
                )}
                <span className="min-w-0 flex-1">{option}</span>
                {option === question.answer && (
                  <span className="text-primary ml-auto text-xs font-medium">
                    Correct
                  </span>
                )}
              </div>
            ))}
          </div>

          {question.explanation && (
            <div className="border-secondary/10 bg-secondary/5 rounded-xl border p-3">
              <div className="text-secondary mb-2 flex items-center gap-2 text-sm font-medium">
                <Lightbulb className="h-4 w-4" />
                Explanation
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

const QuizQuestions = ({ questions, quizTitle }: QuizQuestionsProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ListChecks className="text-primary h-5 w-5" />
            Questions for &quot;{quizTitle}&quot;
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-muted-foreground text-sm">
              You created this quiz. Here are all {questions.length} questions.
            </p>
            <Badge variant="secondary" className="rounded-full">
              {questions.length} total
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <QuizQuestionItem
            key={question.id}
            question={question}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizQuestions;
