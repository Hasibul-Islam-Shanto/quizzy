import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { IQuiz } from '@/features/quiz/quiz.entity';
import {
  BookOpen,
  Calendar,
  CalendarClock,
  FileEdit,
  Globe,
  Gauge,
  User,
} from 'lucide-react';
import { getDifficultyColor } from '../constants/diiffculty';

type QuizBasicDetailsProps = Pick<
  IQuiz,
  | 'title'
  | 'description'
  | 'difficulty'
  | 'isPublished'
  | 'createdAt'
  | 'updatedAt'
> & {
  createdBy?: { name: string; id: string };
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(new Date(date));

const QuizBasicDetails = ({ quiz }: { quiz: QuizBasicDetailsProps }) => {
  return (
    <Card className="bg-gradient-card border-border/50 shadow-card mb-6">
      <CardHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                <BookOpen className="text-primary h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-2xl">{quiz.title}</CardTitle>
                {quiz.description && (
                  <p className="text-muted-foreground mt-1">
                    {quiz.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={getDifficultyColor(quiz.difficulty)}>
                <Gauge className="mr-1 h-3.5 w-3.5" />
                {quiz.difficulty}
              </Badge>
              <Badge
                variant={quiz.isPublished ? 'default' : 'secondary'}
                className="capitalize"
              >
                {quiz.isPublished ? (
                  <>
                    <Globe className="mr-1 h-3.5 w-3.5" />
                    Published
                  </>
                ) : (
                  <>
                    <FileEdit className="mr-1 h-3.5 w-3.5" />
                    Draft
                  </>
                )}
              </Badge>
            </div>
          </div>

          <div className="text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Created {formatDate(quiz.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarClock className="h-4 w-4" />
              Updated {formatDate(quiz.updatedAt)}
            </span>
            {quiz.createdBy?.name && (
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                By {quiz.createdBy.name}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default QuizBasicDetails;
