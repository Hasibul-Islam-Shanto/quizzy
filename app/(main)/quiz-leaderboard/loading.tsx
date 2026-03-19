import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
      <div className="bg-muted h-6 w-8 animate-pulse rounded" />
    </TableCell>
    <TableCell>
      <div className="bg-muted h-5 w-32 animate-pulse rounded" />
    </TableCell>
    <TableCell className="text-center">
      <div className="bg-muted mx-auto h-6 w-12 animate-pulse rounded-full" />
    </TableCell>
    <TableCell className="text-center">
      <div className="bg-muted mx-auto h-4 w-16 animate-pulse rounded" />
    </TableCell>
  </TableRow>
);

const Loading = () => {
  return (
    <div className="app-container min-h-screen">
      <div className="pt-20">
        {/* Header skeleton */}
        <div className="mb-2 flex flex-col justify-between md:mb-8 md:flex-row md:items-center">
          <div className="mb-4 md:mb-0">
            <div className="bg-muted mb-2 h-8 w-48 animate-pulse rounded" />
            <div className="bg-muted h-4 w-72 animate-pulse rounded" />
          </div>
          <div className="mb-8">
            <div className="bg-muted h-9 w-48 animate-pulse rounded-md" />
          </div>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <div className="bg-muted h-6 w-24 animate-pulse rounded" />
              <div className="bg-muted mt-2 h-4 w-64 animate-pulse rounded" />
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Loading;
