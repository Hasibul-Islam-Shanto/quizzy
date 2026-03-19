import { describe, expect, it } from 'vitest';
import { getDifficultyColor } from '../diiffculty';

describe('getDifficultyColor', () => {
  it('returns emerald colors for EASY', () => {
    expect(getDifficultyColor('EASY')).toBe(
      'bg-emerald-50 text-emerald-700 border border-emerald-200',
    );
  });

  it('returns amber colors for MEDIUM', () => {
    expect(getDifficultyColor('MEDIUM')).toBe(
      'bg-amber-50 text-amber-700 border border-amber-200',
    );
  });

  it('returns rose colors for HARD', () => {
    expect(getDifficultyColor('HARD')).toBe(
      'bg-rose-50 text-rose-700 border border-rose-200',
    );
  });

  it('returns muted colors for unknown difficulty', () => {
    expect(getDifficultyColor('UNKNOWN')).toBe(
      'bg-muted text-muted-foreground border border-border',
    );
  });

  it('returns muted colors for empty string', () => {
    expect(getDifficultyColor('')).toBe(
      'bg-muted text-muted-foreground border border-border',
    );
  });
});
