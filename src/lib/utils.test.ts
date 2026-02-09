import { cn } from './utils';

describe('cn utility', () => {
    // 15 various tests
    it('merges 2 classes', () => expect(cn('a', 'b')).toBe('a b'));
    it('merges 3 classes', () => expect(cn('a', 'b', 'c')).toBe('a b c'));
    it('overrides tailwind colors', () => expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500'));
    it('overrides tailwind bg', () => expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500'));
    it('overrides tailwind p', () => expect(cn('p-4', 'p-8')).toBe('p-8'));
    it('overrides tailwind m', () => expect(cn('m-4', 'm-8')).toBe('m-8'));
    it('handles undefined', () => expect(cn(undefined)).toBe(''));
    it('handles null', () => expect(cn(null)).toBe(''));
    it('handles false', () => expect(cn(false)).toBe(''));
    it('handles array', () => expect(cn(['a', 'b'])).toBe('a b'));
    it('handles nested array', () => expect(cn(['a', ['b']])).toBe('a b'));
    it('handles object true', () => expect(cn({ a: true })).toBe('a'));
    it('handles object false', () => expect(cn({ a: false })).toBe(''));
    it('handles object mixed', () => expect(cn({ a: true, b: false, c: true })).toBe('a c'));
    it('handles mixed types', () => expect(cn('a', { b: true }, ['c'])).toBe('a b c'));
});
