import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const StatsCardSkeleton = () => (
  <Card className="bg-gradient-card border-border/50 shadow-card">
    <div className="flex flex-row items-start justify-between gap-3 px-4 pt-3">
      <div className="space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-10 w-10 rounded-xl" />
    </div>
    <div className="px-4 pt-2 pb-4">
      <Skeleton className="h-9 w-20" />
    </div>
  </Card>
);

const QuizItemSkeleton = () => (
  <div className="bg-background/70 border-border/50 flex flex-col gap-4 rounded-2xl border p-4">
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </div>

    <div className="grid gap-3 sm:grid-cols-3">
      <Skeleton className="h-20 rounded-xl" />
      <Skeleton className="h-20 rounded-xl" />
      <Skeleton className="h-20 rounded-xl" />
    </div>

    <div className="flex gap-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-28" />
    </div>
  </div>
);

const AnalyticsPanelSkeleton = () => (
  <Card className="bg-gradient-card border-border/50 shadow-card">
    <CardHeader className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-11 w-11 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>
        </div>
        <div className="bg-background/70 border-border/50 rounded-2xl border p-3 shadow-sm">
          <Skeleton className="mb-2 h-3 w-20" />
          <Skeleton className="h-10 w-72 max-w-full rounded-lg" />
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-36 rounded-2xl" />
        <Skeleton className="h-36 rounded-2xl" />
        <Skeleton className="h-36 rounded-2xl" />
      </div>
      <div className="border-border/50 rounded-2xl border p-4">
        <div className="mb-4 flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-56" />
          </div>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const Loading = () => {
  return (
    <div className="app-container min-h-screen">
      <div className="pt-20">
        <div className="mb-8 flex w-full flex-col items-start justify-between gap-3 md:flex-row">
          <div className="space-y-2">
            <Skeleton className="h-8 w-52" />
            <Skeleton className="h-5 w-72 max-w-full" />
          </div>
          <Skeleton className="h-11 w-36 rounded-md" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
        </div>

        <div className="space-y-6 py-6">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-4 w-72 max-w-full" />
              </div>
              <Skeleton className="h-8 w-24 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <QuizItemSkeleton />
                <QuizItemSkeleton />
                <QuizItemSkeleton />
              </div>
            </CardContent>
          </Card>

          <AnalyticsPanelSkeleton />
        </div>
      </div>
    </div>
  );
};

export default Loading;
