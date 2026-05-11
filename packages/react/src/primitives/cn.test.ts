/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { describe, test, expect } from 'vitest';
import { cn } from './cn.js';

describe('cn()', () => {
  test('joins multiple class strings', () => {
    expect(cn('a', 'b')).toBe('a b');
  });
  test('drops falsy values', () => {
    expect(cn('a', false, undefined, 'b')).toBe('a b');
  });
  test('lets later tailwind classes override earlier ones', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });
  test('handles arrays and objects', () => {
    expect(cn(['a', { b: true, c: false }])).toBe('a b');
  });
});
