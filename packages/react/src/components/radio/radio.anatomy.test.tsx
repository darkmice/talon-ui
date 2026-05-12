/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { RadioGroup, RadioGroupItem } from './radio.js';

describe('RadioGroup anatomy', () => {
  test('default: root is inline-flex gap-tp-3 flex-col (vertical)', () => {
    const { container } = render(
      <RadioGroup>
        <RadioGroupItem value="a" aria-label="a" />
      </RadioGroup>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toMatch(/inline-flex/);
    expect(root.className).toMatch(/gap-tp-3/);
    expect(root.className).toMatch(/flex-col/);
  });

  test('item default: button with rounded-pill and size-4', () => {
    const { container } = render(
      <RadioGroup>
        <RadioGroupItem value="a" aria-label="a" />
      </RadioGroup>,
    );
    const btn = container.querySelector('button') as HTMLButtonElement;
    expect(btn.className).toMatch(/rounded-pill/);
    expect(btn.className).toMatch(/size-4/);
  });

  test('checked: indicator span renders with bg-primary-500 and size-[8px]', () => {
    const { container } = render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" aria-label="a" />
      </RadioGroup>,
    );
    // Radix Indicator renders a wrapper span; the inner indicator span carries the colour class.
    const spans = Array.from(container.querySelectorAll('span'));
    const indicatorDot = spans.find((s) => s.className.includes('bg-primary-500'));
    expect(indicatorDot).toBeInTheDocument();
    expect(indicatorDot!.className).toMatch(/bg-primary-500/);
    expect(indicatorDot!.className).toMatch(/size-\[8px\]/);
  });
});
