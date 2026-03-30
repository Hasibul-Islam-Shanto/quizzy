'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';

type Quiz = { id: string; title: string };

export const QuizSelect = ({
  quizzes,
  currentQuizId,
}: {
  quizzes: Quiz[];
  currentQuizId: string | null;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (quizId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('quizId', quizId);
    router.replace(`/quiz-leaderboard?${params.toString()}`);
  };

  if (quizzes.length === 0) return null;

  return (
    <Select
      value={currentQuizId ?? quizzes[0]?.id ?? ''}
      onValueChange={handleChange}
    >
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select Quiz" />
      </SelectTrigger>
      <SelectContent>
        {quizzes.map(quiz => (
          <SelectItem key={quiz.id} value={quiz.id}>
            {quiz.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
