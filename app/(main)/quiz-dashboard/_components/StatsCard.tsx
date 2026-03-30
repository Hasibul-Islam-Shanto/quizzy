import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React from 'react';

type StatsCardVariant = 'primary' | 'secondary' | 'accent';

const variantStyles: Record<
  StatsCardVariant,
  { iconContainer: string; value: string }
> = {
  primary: {
    iconContainer: 'bg-primary/15 text-primary',
    value: 'text-primary',
  },
  secondary: {
    iconContainer: 'bg-secondary/15 text-secondary',
    value: 'text-secondary',
  },
  accent: {
    iconContainer: 'bg-[hsl(161,28%,54%)]/15 text-[hsl(161,28%,54%)]',
    value: 'text-[hsl(161,28%,54%)]',
  },
};

const StatsCard = ({
  label,
  value,
  icon,
  variant = 'primary',
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  variant?: StatsCardVariant;
}) => {
  const styles = variantStyles[variant];

  return (
    <Card
      className={cn(
        'bg-gradient-card border-border/50 shadow-card gap-3 !py-2',
        'transition-all duration-300 ease-out',
        'hover:shadow-elegant hover:-translate-y-0.5 hover:scale-[1.02]',
        'cursor-default',
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 pt-2">
        <p className="text-muted-foreground text-sm font-medium">{label}</p>
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
            styles.iconContainer,
          )}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent className="px-4 pt-0 pb-4">
        <p
          className={cn(
            'text-2xl font-bold tracking-tight tabular-nums md:text-3xl',
            styles.value,
          )}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
