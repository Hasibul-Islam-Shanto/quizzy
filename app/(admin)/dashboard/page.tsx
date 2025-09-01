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
  BarChart3,
  Users,
  BookOpen,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/navbar';

// Mock data
const quizzes = [
  {
    id: 1,
    title: 'Mathematics Basics',
    status: 'published',
    questions: 15,
    attempts: 45,
    avgScore: 78,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: 'World History Quiz',
    status: 'draft',
    questions: 20,
    attempts: 0,
    avgScore: 0,
    createdAt: '2024-01-20',
  },
  {
    id: 3,
    title: 'Science Fundamentals',
    status: 'published',
    questions: 12,
    attempts: 32,
    avgScore: 85,
    createdAt: '2024-01-18',
  },
];

const stats = [
  {
    label: 'Total Quizzes',
    value: '12',
    icon: BookOpen,
    change: '+2 this week',
  },
  {
    label: 'Total Students',
    value: '156',
    icon: Users,
    change: '+8 this month',
  },
  {
    label: 'Avg. Score',
    value: '82%',
    icon: TrendingUp,
    change: '+5% vs last month',
  },
  {
    label: 'Quiz Attempts',
    value: '1,234',
    icon: BarChart3,
    change: '+15% this week',
  },
];

const DashboardPage = () => {
  return (
    <>
      <div className="bg-gradient-soft min-h-screen pb-10">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-foreground mb-2 text-3xl font-bold">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your quizzes and track student performance
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gradient-card border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-muted-foreground text-sm font-medium">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className="text-primary h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-foreground text-2xl font-bold">
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Quizzes List */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>My Quizzes</CardTitle>
                    <CardDescription>
                      Manage and track your quiz performance
                    </CardDescription>
                  </div>
                  <Button variant="hero" size="sm" asChild>
                    <Link href="/builder">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Quiz
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quizzes.map(quiz => (
                      <div
                        key={quiz.id}
                        className="border-border/50 bg-background/50 flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <h3 className="text-foreground font-semibold">
                              {quiz.title}
                            </h3>
                            <Badge
                              variant={
                                quiz.status === 'published'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {quiz.status}
                            </Badge>
                          </div>
                          <div className="text-muted-foreground flex items-center gap-4 text-sm">
                            <span>{quiz.questions} questions</span>
                            <span>{quiz.attempts} attempts</span>
                            {quiz.attempts > 0 && (
                              <span>{quiz.avgScore}% avg score</span>
                            )}
                            <span>Created {quiz.createdAt}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/quiz-builder">
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Quiz
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/leaderboard">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Leaderboard
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Students
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Sarah completed &quot;Math Basics&quot;
                      </span>
                      <span className="text-muted-foreground">2h ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        New quiz &quot;History&quot; created
                      </span>
                      <span className="text-muted-foreground">1d ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        John scored 95% on &quot;Science&quot;
                      </span>
                      <span className="text-muted-foreground">2d ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
