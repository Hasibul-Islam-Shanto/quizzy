import { describe, expect, it } from 'vitest';
import { cn } from '../utils';

describe('cn (class names utility)', () => {
  it('merges single class', () => {
    expect(cn('foo')).toBe('foo');
  });

  it('merges multiple classes', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('base', true && 'included', false && 'excluded')).toBe(
      'base included',
    );
  });

  it('handles undefined and null', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
  });

  it('merges tailwind classes and resolves conflicts', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('handles empty input', () => {
    expect(cn()).toBe('');
  });

  it('handles array of classes', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('handles object syntax', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });
});
