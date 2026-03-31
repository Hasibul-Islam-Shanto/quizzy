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
import { Filter, Search } from 'lucide-react';
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
      if (updates.search !== undefined) {
        const trimmedSearch = updates.search.trim();

        if (trimmedSearch) {
          params.set('search', trimmedSearch);
        } else {
          params.delete('search');
        }
      }

      if (updates.difficulty !== undefined) {
        if (updates.difficulty === 'ALL') {
          params.delete('difficulty');
        } else {
          params.set('difficulty', updates.difficulty);
        }
      }

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
    if (debouncedSearchValue === search) {
      return;
    }

    updateFiltersRef.current({ search: debouncedSearchValue });
  }, [debouncedSearchValue, search]);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-foreground text-3xl font-bold">Explore Quizzes</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed md:text-base">
          Browse available quizzes, filter by difficulty, and choose the one you
          want to take next.
        </p>
      </div>

      <div className="bg-gradient-card border-border/50 shadow-card mb-8 rounded-xl border p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="bg-secondary/12 text-secondary flex h-8 w-8 items-center justify-center rounded-lg">
            <Filter className="h-4 w-4" />
          </div>
          <div>
            <p className="text-foreground text-sm font-medium">Filters</p>
            <p className="text-muted-foreground text-xs">
              Search by title and narrow by difficulty
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search quizzes..."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                className="bg-background/80 border-border/50 h-10 rounded-lg pl-10"
              />
            </div>
          </div>

          <Select value={difficulty} onValueChange={handleDifficultyChange}>
            <SelectTrigger className="bg-background/80 border-border/50 h-10 rounded-lg sm:w-48">
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
