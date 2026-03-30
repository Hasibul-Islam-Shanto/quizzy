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
import { getParticipantsAttemptsAction } from '../actions';

const RANK_BADGES = ['🥇', '🥈', '🥉'] as const;

const RankingContainer = async ({ quizId }: { quizId: string }) => {
  const participantsAttemptsResponse =
    await getParticipantsAttemptsAction(quizId);

  if (!participantsAttemptsResponse.success) {
    return (
      <Card className="bg-gradient-card border-border/50">
        <CardContent className="py-8">
          <p className="text-muted-foreground text-center">
            {participantsAttemptsResponse.message}
          </p>
        </CardContent>
      </Card>
    );
  }

  const participantsAttempts = participantsAttemptsResponse.data ?? [];

  return (
    <div className="lg:col-span-2">
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Rankings</CardTitle>
          <CardDescription>
            Complete leaderboard with detailed performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          {participantsAttempts.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">
              No attempts yet. Share your quiz to see participants here.
            </p>
          ) : (
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
                {participantsAttempts.map(student => (
                  <TableRow
                    key={student.id}
                    className={student.rank <= 3 ? 'bg-primary/5' : ''}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {student.rank <= 3 ? (
                          <span className="text-lg">
                            {RANK_BADGES[student.rank - 1]}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">
                            #{student.rank}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-foreground font-medium">
                        {student.name || student.id.substring(0, 16)}
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
                      {student.timeSpentFormatted}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RankingContainer;
