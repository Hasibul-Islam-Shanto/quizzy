import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React from 'react';

type StatsCardVariant = 'primary' | 'secondary' | 'accent';

const variantStyles: Record<
  StatsCardVariant,
  { iconContainer: string; value: string }
> = {
  primary: {
    iconContainer: 'bg-primary/12 text-primary',
    value: 'text-primary',
  },
  secondary: {
    iconContainer: 'bg-secondary/12 text-secondary',
    value: 'text-secondary',
  },
  accent: {
    iconContainer: 'bg-[hsl(161,28%,54%)]/12 text-[hsl(161,28%,54%)]',
    value: 'text-[hsl(161,28%,54%)]',
  },
};

const StatsCard = ({
  label,
  value,
  icon,
  description,
  variant = 'primary',
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  variant?: StatsCardVariant;
}) => {
  const styles = variantStyles[variant];

  return (
    <Card
      className={cn(
        'bg-gradient-card border-border/50 shadow-card gap-3 overflow-hidden !py-2',
        'hover:shadow-elegant transition-shadow duration-200 ease-out',
        'cursor-default',
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 px-4 pt-3">
        <div className="space-y-1">
          <p className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
            {label}
          </p>
          {description ? (
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm',
            styles.iconContainer,
          )}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent className="px-4 pt-1 pb-4">
        <p
          className={cn(
            'text-3xl font-bold tracking-tight tabular-nums md:text-4xl',
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
