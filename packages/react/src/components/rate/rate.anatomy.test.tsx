/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Rate } from './rate.js';

describe('Rate anatomy', () => {
  test('default: <div role="radiogroup" aria-label="Rating"> with 5 child spans each containing 2 SVGs + 1 button', () => {
    const { container } = render(<Rate />);
    const root = container.querySelector('div[role="radiogroup"]') as HTMLDivElement;
    expect(root).toBeInTheDocument();
    expect(root).toHaveAttribute('aria-label', 'Rating');
    expect(root.className).toMatch(/inline-flex/);
    expect(root.className).toMatch(/items-center/);
    expect(root.className).toMatch(/gap-tp-1/);

    const starSpans = root.querySelectorAll(':scope > span');
    expect(starSpans).toHaveLength(5);

    // Each span has 2 SVGs (background + foreground) + 1 button (no allowHalf)
    starSpans.forEach((span) => {
      const svgs = span.querySelectorAll('svg');
      expect(svgs).toHaveLength(2);
      const buttons = span.querySelectorAll('button');
      expect(buttons).toHaveLength(1);
    });
  });

  test('filled star (value=3): the 3rd span overlay has width=100%', () => {
    const { container } = render(<Rate value={3} />);
    const starSpans = container.querySelectorAll('div[role="radiogroup"] > span');
    const thirdSpanOverlay = starSpans[2]?.querySelector('span[aria-hidden]') as HTMLElement;
    expect(thirdSpanOverlay).toBeTruthy();
    expect(thirdSpanOverlay.style.width).toBe('100%');
  });

  test('half-filled (value=2.5, count=5): the 3rd span overlay has width=50%', () => {
    const { container } = render(<Rate value={2.5} count={5} allowHalf />);
    const starSpans = container.querySelectorAll('div[role="radiogroup"] > span');
    const thirdSpanOverlay = starSpans[2]?.querySelector('span[aria-hidden]') as HTMLElement;
    expect(thirdSpanOverlay).toBeTruthy();
    expect(thirdSpanOverlay.style.width).toBe('50%');
  });

  test('allowHalf: each star span has 2 buttons (half + full)', () => {
    const { container } = render(<Rate allowHalf />);
    const starSpans = container.querySelectorAll('div[role="radiogroup"] > span');
    starSpans.forEach((span) => {
      const buttons = span.querySelectorAll('button');
      expect(buttons).toHaveLength(2);
    });
  });
});
