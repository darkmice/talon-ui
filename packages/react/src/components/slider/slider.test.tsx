/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Slider } from './slider.js';

describe('Slider', () => {
  test('renders one thumb for single-value defaultValue', () => {
    const { container } = render(<Slider defaultValue={[50]} />);
    const thumbs = container.querySelectorAll('span[role="slider"]');
    expect(thumbs).toHaveLength(1);
  });

  test('renders two thumbs for defaultValue=[20, 80] (range)', () => {
    const { container } = render(<Slider defaultValue={[20, 80]} />);
    const thumbs = container.querySelectorAll('span[role="slider"]');
    expect(thumbs).toHaveLength(2);
  });

  test('disabled prop sets data-disabled on root and adds cursor-not-allowed', () => {
    const { container } = render(<Slider defaultValue={[50]} disabled />);
    const root = container.querySelector('span.relative') as HTMLSpanElement;
    expect(root).toHaveAttribute('data-disabled');
    expect(root.className).toMatch(/cursor-not-allowed/);
  });

  test('tone="danger" → range has bg-danger-500', () => {
    const { container } = render(<Slider defaultValue={[50]} tone="danger" />);
    // The Range element is a span inside the Track
    const spans = container.querySelectorAll('span');
    const rangeSpan = Array.from(spans).find((s) => s.className.includes('bg-danger-500'));
    expect(rangeSpan).toBeTruthy();
  });

  test('orientation="vertical" → root has h-40 w-5 flex-col, track has h-full w-1', () => {
    const { container } = render(<Slider defaultValue={[50]} orientation="vertical" />);
    const root = container.querySelector('span.relative') as HTMLSpanElement;
    expect(root.className).toMatch(/h-40/);
    expect(root.className).toMatch(/w-5/);
    expect(root.className).toMatch(/flex-col/);
    const spans = container.querySelectorAll('span');
    const trackSpan = Array.from(spans).find(
      (s) => s.className.includes('h-full') && s.className.includes('w-1'),
    );
    expect(trackSpan).toBeTruthy();
  });

  test('forwardRef points to the underlying Root span', () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<Slider defaultValue={[50]} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current?.className).toMatch(/relative/);
  });
});
