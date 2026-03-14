import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IQuestion } from '@/features/questions/questions.entity';
import { CheckCircle2, HelpCircle } from 'lucide-react';

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
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
          {index + 1}
        </div>
        <div className="min-w-0 flex-1 space-y-3">
          <p className="text-foreground font-medium">{question.question}</p>
          <div className="space-y-2">
            {question.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${
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
                {option}
                {option === question.answer && (
                  <span className="text-primary ml-auto text-xs font-medium">
                    Correct
                  </span>
                )}
              </div>
            ))}
          </div>
          {question.explanation && (
            <p className="text-muted-foreground border-border/50 border-t pt-3 text-sm">
              {question.explanation}
            </p>
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
            <HelpCircle className="text-primary h-5 w-5" />
            Questions for &quot;{quizTitle}&quot;
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            You created this quiz. Here are all {questions.length} questions.
          </p>
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
