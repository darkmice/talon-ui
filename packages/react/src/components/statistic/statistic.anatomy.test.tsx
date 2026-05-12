/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Statistic } from './statistic.js';

describe('Statistic anatomy (design.md §6.19)', () => {
  test('root is div with flex flex-col items-start by default', () => {
    const { container } = render(<Statistic label="Users" value={42} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.tagName).toBe('DIV');
    expect(root.className).toMatch(/flex/);
    expect(root.className).toMatch(/flex-col/);
    expect(root.className).toMatch(/items-start/);
  });

  test('value span has tp-nums text-text-primary and size variant class', () => {
    const { container } = render(<Statistic label="Users" value={42} size="md" />);
    // The value span is the second span child of root
    const root = container.firstElementChild as HTMLElement;
    const spans = root.querySelectorAll(':scope > span');
    // spans[0] = label, spans[1] = value
    const valueSpan = spans[1] as HTMLElement;
    expect(valueSpan.className).toMatch(/tp-nums/);
    expect(valueSpan.className).toMatch(/text-text-primary/);
    // md size maps to text-h2
    expect(valueSpan.className).toMatch(/text-h2/);
  });
});
