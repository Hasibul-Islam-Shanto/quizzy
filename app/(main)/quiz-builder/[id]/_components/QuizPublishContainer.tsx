'use client';
import { IQuiz } from '@/features/quiz/quiz.entity';
import React, { useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import QuizQuestionCard from '../../_components/QuizQuestionCard';
import { Loader2, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { publishQuizAction } from '../../actions';
import { useRouter } from 'next/navigation';

const QuizPublishContainer = ({ quiz }: { quiz: IQuiz }) => {
  const router = useRouter();
  const [title, setTitle] = useState(quiz.title ?? '');
  const [description, setDescription] = useState(quiz.description ?? '');
  const [difficulty, setDifficulty] = useState<IQuiz['difficulty']>(
    quiz.difficulty ?? 'EASY',
  );
  const [isPublishing, startTransition] = useTransition();

  const handlePublishQuiz = () => {
    startTransition(async () => {
      const response = await publishQuizAction(quiz.id, {
        title,
        description,
        difficulty,
        isPublished: true,
      });

      if (response.error) {
        toast.error('Failed to publish quiz.', {
          description: response.error,
          duration: 2000,
          position: 'top-center',
        });
      } else {
        toast.success('Quiz published successfully!', {
          duration: 2000,
          position: 'top-center',
        });
        router.push('/quizzes');
      }
    });
  };
  return (
    <div className="space-y-8">
      <div className="bg-card shadow-card rounded-lg p-6">
        <h2 className="mb-4 text-xl font-bold">Publish Quiz</h2>
        <div className="space-y-4">
          <div>
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="quiz-title"
            >
              Quiz Title
            </label>
            <Input
              id="quiz-title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter quiz title"
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="quiz-description"
            >
              Description <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="quiz-description"
              value={description ?? ''}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter quiz description"
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="quiz-difficulty"
            >
              Difficulty
            </label>
            <Select
              value={difficulty}
              onValueChange={v => setDifficulty(v as IQuiz['difficulty'])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Difficulty</SelectLabel>
                  <SelectItem value="EASY">Easy</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HARD">Hard</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {quiz?.questions?.length === 0 && <p>No questions added yet.</p>}
      <div className="grid grid-cols-2 gap-5">
        {quiz?.questions?.map((q, index) => (
          <QuizQuestionCard key={q.id} question={q} questionIndex={index} />
        ))}
      </div>

      <Button
        variant="hero"
        size="lg"
        className="w-full flex-1 cursor-pointer"
        onClick={handlePublishQuiz}
        disabled={isPublishing || !title.trim() || !description.trim()}
      >
        {isPublishing ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Share className="mr-2 h-5 w-5" />
        )}

        {isPublishing ? 'Publishing Quiz...' : 'Publish Quiz'}
      </Button>
    </div>
  );
};

export default QuizPublishContainer;
