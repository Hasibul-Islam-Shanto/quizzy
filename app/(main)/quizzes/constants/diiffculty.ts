export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'EASY':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    case 'MEDIUM':
      return 'bg-amber-50 text-amber-700 border border-amber-200';
    case 'HARD':
      return 'bg-rose-50 text-rose-700 border border-rose-200';
    default:
      return 'bg-muted text-muted-foreground border border-border';
  }
};
