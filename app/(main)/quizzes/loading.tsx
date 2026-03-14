import { Skeleton } from '@/components/ui/skeleton';
import QuizCardSkeleton from './_components/QuizCardSkeleton';

const QuizzesPageSkeleton = () => {
  return (
    <div className="app-container min-h-screen">
      <div className="">
        <Skeleton className="mb-2 h-9 w-64" />
        <Skeleton className="h-5 w-96 max-w-full" />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
          <Skeleton className="h-9 w-32 rounded-md sm:w-40" />
        </div>
      </div>

      <div className="">
        <Skeleton className="h-8 w-40" />
      </div>
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <QuizCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default QuizzesPageSkeleton;
