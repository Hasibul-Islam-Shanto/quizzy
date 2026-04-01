import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock3, Medal, TimerReset, Trophy, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getParticipantsAttemptsAction } from '../actions';

const RANK_BADGES = ['🥇', '🥈', '🥉'] as const;

const RankingContainer = async ({ quizId }: { quizId: string }) => {
  const participantsAttemptsResponse =
    await getParticipantsAttemptsAction(quizId);

  if (!participantsAttemptsResponse.success) {
    return (
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardContent className="p-8">
          <div className="mx-auto max-w-lg text-center">
            <div className="bg-secondary/12 text-secondary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
              <Medal className="h-5 w-5" />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {participantsAttemptsResponse.message}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const participantsAttempts = participantsAttemptsResponse.data ?? [];
  const topScore = participantsAttempts[0]?.score ?? 0;
  const averageScore =
    participantsAttempts.length > 0
      ? Math.round(
          participantsAttempts.reduce(
            (sum, student) => sum + student.score,
            0,
          ) / participantsAttempts.length,
        )
      : 0;
  const fastestTime =
    participantsAttempts.length > 0
      ? participantsAttempts.reduce(
          (fastest, student) =>
            student.timeSpentMs < fastest.timeSpentMs ? student : fastest,
          participantsAttempts[0],
        )
      : null;

  const statCards = [
    {
      label: 'Participants',
      value: participantsAttempts.length.toString(),
      icon: <Users className="h-5 w-5" />,
      iconClass: 'bg-primary/12 text-primary',
      valueClass: 'text-primary',
    },
    {
      label: 'Top Score',
      value: `${topScore}%`,
      icon: <Trophy className="h-5 w-5" />,
      iconClass: 'bg-secondary/12 text-secondary',
      valueClass: 'text-secondary',
    },
    {
      label: 'Fastest Finish',
      value: fastestTime?.timeSpentFormatted ?? '--',
      icon: <TimerReset className="h-5 w-5" />,
      iconClass: 'bg-[hsl(161,28%,54%)]/12 text-[hsl(161,28%,54%)]',
      valueClass: 'text-[hsl(161,28%,54%)]',
    },
    {
      label: 'Average Score',
      value: `${averageScore}%`,
      icon: <Clock3 className="h-5 w-5" />,
      iconClass: 'bg-primary/10 text-primary',
      valueClass: 'text-primary',
    },
  ];

  return (
    <div className="lg:col-span-2">
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader className="space-y-5">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Medal className="text-primary h-5 w-5" />
              Rankings
            </CardTitle>
          </div>
          <CardDescription>
            Complete leaderboard with detailed performance metrics
          </CardDescription>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {statCards.map(stat => (
              <div
                key={stat.label}
                className="bg-background/70 border-border/50 rounded-2xl border p-4"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <p className="text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase">
                    {stat.label}
                  </p>
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-xl',
                      stat.iconClass,
                    )}
                  >
                    {stat.icon}
                  </div>
                </div>
                <p
                  className={cn(
                    'text-2xl font-bold tabular-nums',
                    stat.valueClass,
                  )}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {participantsAttempts.length === 0 ? (
            <div className="bg-background/70 border-border/50 rounded-2xl border border-dashed p-8 text-center">
              <div className="bg-primary/12 text-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
                <Trophy className="h-5 w-5" />
              </div>
              <p className="text-foreground text-base font-semibold">
                No attempts yet
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Share your quiz with participants and rankings will appear here
                once submissions start coming in.
              </p>
            </div>
          ) : (
            <div className="border-border/50 bg-background/70 overflow-hidden rounded-2xl border">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-20">Rank</TableHead>
                    <TableHead>Participant</TableHead>
                    <TableHead className="text-center">Score</TableHead>
                    <TableHead className="text-center">Time Spent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participantsAttempts.map(student => (
                    <TableRow
                      key={student.id}
                      className={cn(
                        'hover:bg-muted/30 transition-colors',
                        student.rank <= 3 && 'bg-primary/5',
                      )}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {student.rank <= 3 ? (
                            <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-xl text-lg">
                              {RANK_BADGES[student.rank - 1]}
                            </div>
                          ) : (
                            <div className="bg-muted text-muted-foreground flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold">
                              #{student.rank}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="min-w-0">
                          <div className="text-foreground font-medium">
                            {student.name || student.id.substring(0, 16)}
                          </div>
                          <p className="text-muted-foreground mt-1 text-xs">
                            Participant ID: {student.id.substring(0, 8)}
                          </p>
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
                          className="rounded-full px-2.5"
                        >
                          {student.score}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-center font-medium">
                        {student.timeSpentFormatted}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RankingContainer;
