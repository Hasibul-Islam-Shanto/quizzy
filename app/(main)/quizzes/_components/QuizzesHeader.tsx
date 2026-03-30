'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectLabel,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useDebounce } from '@/hooks/useDebounce';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const QuizzesHeader = ({
  search,
  difficulty,
}: {
  search: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'ALL';
}) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>(search);
  const searchParams = useSearchParams();
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const updateFilters = useCallback(
    (updates: { search?: string; difficulty?: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (updates.search !== undefined) params.set('search', updates.search);
      if (updates.difficulty !== undefined)
        params.set('difficulty', updates.difficulty);
      router.replace(`/quizzes?${params.toString()}`);
    },
    [router, searchParams],
  );

  const updateFiltersRef = useRef(updateFilters);
  updateFiltersRef.current = updateFilters;

  const handleDifficultyChange = (value: string) => {
    updateFilters({ difficulty: value });
  };

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  // Only run when debounced search changes - NOT when updateFilters changes.
  // Otherwise, when user selects a difficulty, updateFilters gets recreated,
  // this effect runs with stale searchParams, and overwrites the URL.
  useEffect(() => {
    updateFiltersRef.current({ search: debouncedSearchValue });
  }, [debouncedSearchValue]);

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
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                className="bg-background/50 border-border/50 pl-10"
              />
            </div>
          </div>

          <Select value={difficulty} onValueChange={handleDifficultyChange}>
            <SelectTrigger>
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Difficulty</SelectLabel>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="EASY">Easy</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HARD">Hard</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default QuizzesHeader;
