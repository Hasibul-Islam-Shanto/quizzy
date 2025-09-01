import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  Users,
  BarChart3,
  Play,
  BookOpen,
  Filter,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

// Mock quiz data
const quizzes = [
  {
    id: 1,
    title: 'Mathematics Fundamentals',
    description:
      'Test your knowledge of basic mathematical concepts including algebra, geometry, and statistics.',
    difficulty: 'Beginner',
    questions: 15,
    participants: 234,
    avgScore: 78,
    duration: '20 min',
    category: 'Mathematics',
    createdBy: 'Dr. Sarah Wilson',
    featured: true,
  },
  {
    id: 2,
    title: 'World History: Ancient Civilizations',
    description:
      'Explore the rise and fall of ancient civilizations from Mesopotamia to the Roman Empire.',
    difficulty: 'Intermediate',
    questions: 25,
    participants: 189,
    avgScore: 82,
    duration: '30 min',
    category: 'History',
    createdBy: 'Prof. Michael Chen',
    featured: false,
  },
  {
    id: 3,
    title: 'Introduction to Programming',
    description:
      'Learn the basics of programming concepts, algorithms, and problem-solving techniques.',
    difficulty: 'Beginner',
    questions: 20,
    participants: 567,
    avgScore: 71,
    duration: '25 min',
    category: 'Technology',
    createdBy: 'Alex Rodriguez',
    featured: true,
  },
  {
    id: 4,
    title: 'Environmental Science',
    description:
      'Understanding ecosystems, climate change, and environmental conservation principles.',
    difficulty: 'Intermediate',
    questions: 18,
    participants: 145,
    avgScore: 85,
    duration: '22 min',
    category: 'Science',
    createdBy: 'Dr. Emma Thompson',
    featured: false,
  },
  {
    id: 5,
    title: 'Creative Writing Techniques',
    description:
      'Master the art of storytelling, character development, and narrative structure.',
    difficulty: 'Advanced',
    questions: 12,
    participants: 98,
    avgScore: 89,
    duration: '15 min',
    category: 'Literature',
    createdBy: 'Jane Mitchell',
    featured: false,
  },
  {
    id: 6,
    title: 'Business Strategy Basics',
    description:
      'Learn fundamental business concepts, market analysis, and strategic planning.',
    difficulty: 'Intermediate',
    questions: 22,
    participants: 312,
    avgScore: 76,
    duration: '28 min',
    category: 'Business',
    createdBy: 'Robert Johnson',
    featured: true,
  },
];

const categories = [
  'All',
  'Mathematics',
  'History',
  'Technology',
  'Science',
  'Literature',
  'Business',
];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const QuizzesPage = () => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };
  return (
    <>
      {' '}
      <div className="bg-gradient-soft min-h-screen">
        <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-foreground mb-2 text-3xl font-bold">
              Explore Quizzes
            </h1>
            <p className="text-muted-foreground">
              Discover and take quizzes on various topics to test your knowledge
            </p>
          </div>

          {/* Filters and Search */}
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
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Category
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Difficulty
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Quizzes */}
          <div className="mb-12">
            <h2 className="text-foreground mb-6 text-2xl font-bold">
              Featured Quizzes
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {quizzes
                .filter(quiz => quiz.featured)
                .map(quiz => (
                  <Card
                    key={quiz.id}
                    className="bg-gradient-card border-border/50 hover-scale transition-all duration-300 hover:shadow-lg"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <Badge variant="secondary" className="mb-2">
                          Featured
                        </Badge>
                        <Badge className={getDifficultyColor(quiz.difficulty)}>
                          {quiz.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="line-clamp-2">
                        {quiz.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {quiz.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-muted-foreground flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              <span>{quiz.questions} questions</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{quiz.duration}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="text-muted-foreground flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{quiz.participants} taken</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BarChart3 className="h-4 w-4" />
                              <span>{quiz.avgScore}% avg</span>
                            </div>
                          </div>
                        </div>

                        <Link href={`/quizzes/${quiz.id}`} className="pt-2">
                          <Button className="w-full" variant="hero">
                            <Play className="mr-2 h-4 w-4" />
                            Start Quiz
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* All Quizzes */}
          <div>
            <h2 className="text-foreground mb-6 text-2xl font-bold">
              All Quizzes
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {quizzes.map(quiz => (
                <Card
                  key={quiz.id}
                  className="bg-gradient-card border-border/50 hover-scale transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="mb-2">
                        {quiz.category}
                      </Badge>
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2">{quiz.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {quiz.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-muted-foreground flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{quiz.questions} questions</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{quiz.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="text-muted-foreground flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{quiz.participants} taken</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart3 className="h-4 w-4" />
                            <span>{quiz.avgScore}% avg</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-muted-foreground text-xs">
                        Created by {quiz.createdBy}
                      </div>

                      <Link href={`/quizzes/${quiz.id}`} className="pt-2">
                        <Button className="w-full" variant="outline">
                          <Play className="mr-2 h-4 w-4" />
                          Start Quiz
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizzesPage;
