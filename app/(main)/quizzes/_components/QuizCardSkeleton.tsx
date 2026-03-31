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
    <Card className="bg-gradient-card border-border/50 shadow-card !p-0 !py-3">
      <CardHeader>
        <div className="mb-4 flex items-start justify-between">
          <Skeleton className="h-9 w-9 rounded-xl" />
          <Skeleton className="h-5 w-20 rounded-full" />
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
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
          </div>
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Skeleton className="h-10 rounded-lg" />
            <Skeleton className="h-10 rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizCardSkeleton;
