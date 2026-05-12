/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Slider } from './slider.js';

describe('Slider anatomy', () => {
  test('default: Root span contains Track + Range + 1 Thumb with correct classes', () => {
    const { container } = render(<Slider />);
    const root = container.querySelector('span.relative') as HTMLSpanElement;
    expect(root).toBeInTheDocument();
    expect(root.className).toMatch(/relative/);
    expect(root.className).toMatch(/flex/);
    expect(root.className).toMatch(/w-full/);
    expect(root.className).toMatch(/touch-none/);
    expect(root.className).toMatch(/select-none/);
    expect(root.className).toMatch(/items-center/);
    expect(root.className).toMatch(/h-5/);

    // Track and Range exist inside
    const spans = root.querySelectorAll('span');
    const trackSpan = Array.from(spans).find(
      (s) => s.className.includes('rounded-pill') && s.className.includes('bg-bg-subtle'),
    );
    expect(trackSpan).toBeTruthy();

    // Range inside Track
    const rangeSpan = Array.from(spans).find((s) => s.className.includes('bg-primary-500'));
    expect(rangeSpan).toBeTruthy();

    // 1 Thumb
    const thumbs = root.querySelectorAll('span[role="slider"]');
    expect(thumbs).toHaveLength(1);
  });

  test('Range default: absolute rounded-pill h-full bg-primary-500', () => {
    const { container } = render(<Slider />);
    const spans = container.querySelectorAll('span');
    const rangeSpan = Array.from(spans).find((s) => s.className.includes('bg-primary-500'));
    expect(rangeSpan).toBeTruthy();
    expect(rangeSpan!.className).toMatch(/absolute/);
    expect(rangeSpan!.className).toMatch(/rounded-pill/);
    expect(rangeSpan!.className).toMatch(/h-full/);
  });

  test('Thumb default: block size-4 rounded-pill bg-bg-surface border-[1.5px] border-primary-500 shadow-card', () => {
    const { container } = render(<Slider />);
    const thumb = container.querySelector('span[role="slider"]') as HTMLSpanElement;
    expect(thumb).toBeInTheDocument();
    expect(thumb.className).toMatch(/block/);
    expect(thumb.className).toMatch(/size-4/);
    expect(thumb.className).toMatch(/rounded-pill/);
    expect(thumb.className).toMatch(/bg-bg-surface/);
    expect(thumb.className).toMatch(/border-\[1\.5px\]/);
    expect(thumb.className).toMatch(/border-primary-500/);
    expect(thumb.className).toMatch(/shadow-card/);
  });
});
