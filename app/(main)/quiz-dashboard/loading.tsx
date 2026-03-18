import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const StatsCardSkeleton = () => (
  <Card className="bg-gradient-card border-border/50 shadow-card">
    <div className="flex flex-row items-center justify-between gap-3 px-4 py-3">
      <div className="bg-muted h-4 w-20 animate-pulse rounded" />
      <div className="bg-muted h-8 w-8 animate-pulse rounded-lg" />
    </div>
    <div className="px-4 pt-0 pb-4">
      <div className="bg-muted h-8 w-16 animate-pulse rounded" />
    </div>
  </Card>
);

const QuizItemSkeleton = () => (
  <div className="border-border/50 bg-background/50 flex flex-col gap-3 rounded-lg border p-4">
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1 space-y-2">
        <div className="bg-muted h-5 w-3/4 animate-pulse rounded" />
        <div className="bg-muted h-4 w-full animate-pulse rounded" />
      </div>
      <div className="flex gap-2">
        <div className="bg-muted h-9 w-9 animate-pulse rounded-md" />
        <div className="bg-muted h-9 w-9 animate-pulse rounded-md" />
      </div>
    </div>
    <div className="flex gap-2">
      <div className="bg-muted h-6 w-16 animate-pulse rounded-full" />
      <div className="bg-muted h-6 w-20 animate-pulse rounded-full" />
    </div>
    <div className="flex gap-4">
      <div className="bg-muted h-4 w-24 animate-pulse rounded" />
      <div className="bg-muted h-4 w-20 animate-pulse rounded" />
      <div className="bg-muted h-4 w-28 animate-pulse rounded" />
    </div>
  </div>
);

const Loading = () => {
  return (
    <div className="app-container min-h-screen">
      <div className="pt-20">
        <div className="mb-8">
          <div className="bg-muted mb-2 h-8 w-48 animate-pulse rounded" />
          <div className="bg-muted h-4 w-72 animate-pulse rounded" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
        </div>

        <div className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <div className="bg-muted h-6 w-32 animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <QuizItemSkeleton />
                  <QuizItemSkeleton />
                  <QuizItemSkeleton />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-gradient-card border-border/50 shadow-card p-3">
              <div className="bg-muted mb-4 h-5 w-28 animate-pulse rounded" />
              <CardContent className="space-y-3 !p-0">
                <div className="bg-muted h-9 w-full animate-pulse rounded-md" />
                <div className="bg-muted h-9 w-full animate-pulse rounded-md" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
