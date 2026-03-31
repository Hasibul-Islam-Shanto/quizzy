import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const TableRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="h-9 w-9 rounded-xl" />
    </TableCell>
    <TableCell>
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
    </TableCell>
    <TableCell className="text-center">
      <Skeleton className="mx-auto h-6 w-12 rounded-full" />
    </TableCell>
    <TableCell className="text-center">
      <Skeleton className="mx-auto h-4 w-16" />
    </TableCell>
  </TableRow>
);

const Loading = () => {
  return (
    <div className="app-container min-h-screen">
      <div className="pt-20">
        <div className="mb-8">
          <div className="mb-6 space-y-2">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-5 w-[28rem] max-w-full" />
          </div>

          <div className="bg-gradient-card border-border/50 shadow-card rounded-xl border p-4">
            <div className="mb-3 flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
            <Skeleton className="h-10 w-full rounded-lg sm:w-72" />
          </div>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader className="space-y-5">
              <div>
                <Skeleton className="h-6 w-24" />
                <Skeleton className="mt-2 h-4 w-64" />
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-background/70 border-border/50 rounded-2xl border p-4"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-10 w-10 rounded-xl" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                  </div>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="border-border/50 bg-background/70 overflow-hidden rounded-2xl border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Rank</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead className="text-center">Score</TableHead>
                      <TableHead className="text-center">Time Spent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Loading;
