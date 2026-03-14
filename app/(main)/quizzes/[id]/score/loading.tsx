import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ScorePageSkeleton = () => {
  return (
    <div className="bg-gradient-soft min-h-screen pb-10">
      <div className="mx-auto max-w-4xl px-4 pt-20 sm:px-6 lg:px-8">
        <Card className="bg-gradient-card border-border/50 shadow-card mb-6">
          <CardHeader>
            <div className="flex items-start gap-3">
              <Skeleton className="h-12 w-12 shrink-0 rounded-lg" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full max-w-md" />
                <div className="mt-3 flex flex-wrap gap-2">
                  <Skeleton className="h-5 w-20 rounded-md" />
                  <Skeleton className="h-5 w-24 rounded-md" />
                  <Skeleton className="h-5 w-32 rounded-md" />
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-elegant mb-6">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <Skeleton className="h-16 w-16 rounded-full" />
            </div>
            <Skeleton className="mx-auto mb-2 h-8 w-48" />
            <Skeleton className="mx-auto h-4 w-40" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 text-center">
              <Skeleton className="mx-auto h-14 w-24" />
              <Skeleton className="mx-auto h-6 w-28 rounded-md" />
              <Skeleton className="mx-auto h-5 w-64" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-6 w-36" />
              {Array.from({ length: 5 }).map((_, i) => (
                <Card key={i} className="border-border/50 bg-card">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Skeleton className="mt-1 h-6 w-6 shrink-0 rounded-full" />
                      <div className="min-w-0 flex-1 space-y-3">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-4/5" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-6 sm:flex-row">
              <Skeleton className="h-10 flex-1 rounded-md" />
              <Skeleton className="h-10 flex-1 rounded-md" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScorePageSkeleton;
