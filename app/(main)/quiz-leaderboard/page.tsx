import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trophy, Medal, Award, Clock, Target } from 'lucide-react';

// Mock leaderboard data
const leaderboardData = [
  {
    rank: 1,
    name: 'Sarah Johnson',
    score: 98,
    totalQuizzes: 12,
    avgScore: 95,
    timeSpent: '45m',
    badge: '🥇',
  },
  {
    rank: 2,
    name: 'Mike Chen',
    score: 95,
    totalQuizzes: 11,
    avgScore: 92,
    timeSpent: '52m',
    badge: '🥈',
  },
  {
    rank: 3,
    name: 'Emma Davis',
    score: 92,
    totalQuizzes: 10,
    avgScore: 89,
    timeSpent: '48m',
    badge: '🥉',
  },
  {
    rank: 4,
    name: 'Alex Thompson',
    score: 89,
    totalQuizzes: 9,
    avgScore: 87,
    timeSpent: '55m',
    badge: null,
  },
  {
    rank: 5,
    name: 'Lisa Rodriguez',
    score: 87,
    totalQuizzes: 8,
    avgScore: 85,
    timeSpent: '42m',
    badge: null,
  },
  {
    rank: 6,
    name: 'David Kim',
    score: 85,
    totalQuizzes: 7,
    avgScore: 83,
    timeSpent: '38m',
    badge: null,
  },
  {
    rank: 7,
    name: 'Maria Garcia',
    score: 82,
    totalQuizzes: 6,
    avgScore: 81,
    timeSpent: '47m',
    badge: null,
  },
  {
    rank: 8,
    name: 'James Wilson',
    score: 80,
    totalQuizzes: 5,
    avgScore: 79,
    timeSpent: '35m',
    badge: null,
  },
];

const topPerformers = leaderboardData.slice(0, 3);
const QuizLeaderboardPage = () => {
  return (
    <>
      <div className="bg-gradient-soft min-h-screen">
        <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-foreground mb-2 text-3xl font-bold">
              Leaderboard
            </h1>
            <p className="text-muted-foreground">
              Track top performers and quiz achievements
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-4">
            <Select defaultValue="all-quizzes">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Quiz" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-quizzes">All Quizzes</SelectItem>
                <SelectItem value="math-basics">Mathematics Basics</SelectItem>
                <SelectItem value="science">Science Fundamentals</SelectItem>
                <SelectItem value="history">World History Quiz</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="this-month">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">Export Results</Button>
          </div>

          <div className="grid grid-cols-1 gap-8 pb-10 lg:grid-cols-4">
            {/* Top Performers Spotlight */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="text-primary h-5 w-5" />
                    Top Performers
                  </CardTitle>
                  <CardDescription>This month&apos;s champions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topPerformers.map(performer => (
                    <div
                      key={performer.rank}
                      className="bg-background/50 border-border/30 flex items-center gap-3 rounded-lg border p-3"
                    >
                      <div className="text-2xl">{performer.badge}</div>
                      <div className="flex-1">
                        <div className="text-foreground font-semibold">
                          {performer.name}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {performer.score}% avg • {performer.totalQuizzes}{' '}
                          quizzes
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Achievement Stats */}
              <Card className="bg-gradient-card border-border/50 mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="text-primary h-5 w-5" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="text-primary h-4 w-4" />
                      <span className="text-sm">Perfect Scores</span>
                    </div>
                    <Badge variant="secondary">23</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="text-primary h-4 w-4" />
                      <span className="text-sm">Speed Demon</span>
                    </div>
                    <Badge variant="secondary">8</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Medal className="text-primary h-4 w-4" />
                      <span className="text-sm">Streak Master</span>
                    </div>
                    <Badge variant="secondary">15</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Leaderboard Table */}
            <div className="lg:col-span-3">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Rankings</CardTitle>
                  <CardDescription>
                    Complete leaderboard with detailed performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">Rank</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead className="text-center">
                          Latest Score
                        </TableHead>
                        <TableHead className="text-center">
                          Quizzes Taken
                        </TableHead>
                        <TableHead className="text-center">Avg Score</TableHead>
                        <TableHead className="text-center">
                          Time Spent
                        </TableHead>
                        <TableHead className="text-center">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaderboardData.map(student => (
                        <TableRow
                          key={student.rank}
                          className={student.rank <= 3 ? 'bg-primary/5' : ''}
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {student.badge ? (
                                <span className="text-lg">{student.badge}</span>
                              ) : (
                                <span className="text-muted-foreground">
                                  #{student.rank}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-foreground font-medium">
                              {student.name}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant={
                                student.score >= 90
                                  ? 'default'
                                  : student.score >= 80
                                    ? 'secondary'
                                    : 'outline'
                              }
                            >
                              {student.score}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-center">
                            {student.totalQuizzes}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-center">
                            {student.avgScore}%
                          </TableCell>
                          <TableCell className="text-muted-foreground text-center">
                            {student.timeSpent}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline" className="text-xs">
                              Active
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizLeaderboardPage;
