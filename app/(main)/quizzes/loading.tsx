import { Skeleton } from '@/components/ui/skeleton';
import QuizCardSkeleton from './_components/QuizCardSkeleton';

const QuizzesPageSkeleton = () => {
  return (
    <div className="app-container min-h-screen">
      <div className="pt-20">
        <div className="mb-8">
          <Skeleton className="mb-2 h-9 w-64" />
          <Skeleton className="h-5 w-[32rem] max-w-full" />
        </div>

        <div className="bg-gradient-card border-border/50 shadow-card mb-8 rounded-xl border p-4">
          <div className="mb-3 flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-44" />
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <Skeleton className="h-10 w-32 rounded-lg sm:w-48" />
          </div>
        </div>

        <div className="mb-6 space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-36" />
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 xl:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <QuizCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizzesPageSkeleton;
