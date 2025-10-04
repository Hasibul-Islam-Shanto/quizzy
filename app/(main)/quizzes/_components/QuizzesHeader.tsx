import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BarChart3, Search } from 'lucide-react';
import React from 'react';

const QuizzesHeader = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-foreground mb-2 text-3xl font-bold">
          Explore Quizzes
        </h1>
        <p className="text-muted-foreground">
          Discover and take quizzes on various topics to test your knowledge
        </p>
      </div>
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search quizzes..."
                className="bg-background/50 border-border/50 pl-10"
              />
            </div>
          </div>

          <Button variant="outline" size="sm">
            <BarChart3 className="mr-2 h-4 w-4" />
            Difficulty
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuizzesHeader;
