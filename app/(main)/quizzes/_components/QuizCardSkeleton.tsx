import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const QuizCardSkeleton = () => {
  return (
    <Card className="bg-gradient-card border-border/50 !p-0 !py-3">
      <CardHeader>
        <div className="flex items-start justify-end">
          <Skeleton className="h-5 w-14 rounded-md" />
        </div>
        <CardTitle>
          <Skeleton className="mb-2 h-5 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizCardSkeleton;
