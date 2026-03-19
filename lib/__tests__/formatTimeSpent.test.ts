import { describe, expect, it } from 'vitest';
import { formatTimeSpent } from '../formatTimeSpent';

describe('formatTimeSpent', () => {
  it('formats 0ms as "0s"', () => {
    expect(formatTimeSpent(0)).toBe('0s');
  });

  it('formats 45 seconds', () => {
    expect(formatTimeSpent(45_000)).toBe('45s');
  });

  it('formats 2 minutes 30 seconds', () => {
    expect(formatTimeSpent(150_000)).toBe('2m 30s');
  });

  it('formats 1 hour 15 minutes', () => {
    expect(formatTimeSpent(4_500_000)).toBe('1h 15m');
  });

  it('formats 1 day 2 hours', () => {
    expect(formatTimeSpent(93_600_000)).toBe('1d 2h');
  });

  it('formats 1 minute only', () => {
    expect(formatTimeSpent(60_000)).toBe('1m');
  });

  it('formats 1 hour only', () => {
    expect(formatTimeSpent(3_600_000)).toBe('1h');
  });

  it('formats 1 day only', () => {
    expect(formatTimeSpent(86_400_000)).toBe('1d');
  });

  it('formats complex duration (2d 3h 45m 12s)', () => {
    const ms = 2 * 86400 * 1000 + 3 * 3600 * 1000 + 45 * 60 * 1000 + 12 * 1000;
    expect(formatTimeSpent(ms)).toBe('2d 3h 45m 12s');
  });

  it('rounds down fractional seconds', () => {
    expect(formatTimeSpent(45_999)).toBe('45s');
  });

  it('formats 1 second only', () => {
    expect(formatTimeSpent(1_000)).toBe('1s');
  });

  it('formats 59 seconds (under 1 minute)', () => {
    expect(formatTimeSpent(59_000)).toBe('59s');
  });

  it('formats 23 hours 59 minutes 59 seconds', () => {
    const ms = 23 * 3600 * 1000 + 59 * 60 * 1000 + 59 * 1000;
    expect(formatTimeSpent(ms)).toBe('23h 59m 59s');
  });

  it('formats 7 days (one week)', () => {
    expect(formatTimeSpent(7 * 86_400_000)).toBe('7d');
  });

  it('handles very large duration (100 days)', () => {
    expect(formatTimeSpent(100 * 86_400_000)).toBe('100d');
  });
});
