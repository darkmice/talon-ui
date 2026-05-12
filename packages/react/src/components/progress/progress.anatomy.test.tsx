/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Progress } from './progress.js';

describe('Progress anatomy (design.md §6.7)', () => {
  test('linear default: outer flex with gap; track has h-1.5 rounded-pill bg-bg-subtle; fill child has rounded-pill bg-primary-500', () => {
    const { container } = render(<Progress value={50} />);
    const outer = container.firstElementChild as HTMLElement;
    expect(outer.className).toMatch(/flex/);
    expect(outer.className).toMatch(/gap-tp-2/);

    // track is the first child div of the outer
    const track = outer.querySelector('div') as HTMLElement;
    expect(track.className).toMatch(/h-1\.5/);
    expect(track.className).toMatch(/rounded-pill/);
    expect(track.className).toMatch(/bg-bg-subtle/);

    // fill is nested inside track
    const fill = track.querySelector('div') as HTMLElement;
    expect(fill.className).toMatch(/rounded-pill/);
    expect(fill.className).toMatch(/bg-primary-500/);
  });

  test('circle: outer is inline-flex relative with width/height inline style; inner svg has 2 circle elements', () => {
    const { container } = render(<Progress type="circle" value={60} />);
    const outer = container.firstElementChild as HTMLElement;
    expect(outer.className).toMatch(/inline-flex/);
    expect(outer.className).toMatch(/relative/);
    expect(outer.style.width).toBeTruthy();
    expect(outer.style.height).toBeTruthy();

    const svg = outer.querySelector('svg') as SVGElement;
    expect(svg).toBeInTheDocument();
    const circles = svg.querySelectorAll('circle');
    expect(circles.length).toBe(2);
  });

  test('status="success" + circle: aria-valuenow correct; success-fg stroke colour applied', () => {
    const { container } = render(<Progress type="circle" value={100} status="success" />);
    const outer = container.firstElementChild as HTMLElement;
    expect(outer).toHaveAttribute('aria-valuenow', '100');

    const svg = outer.querySelector('svg') as SVGElement;
    const circles = svg.querySelectorAll('circle');
    // second circle is the fill/progress circle
    const fillCircle = circles[1] as SVGCircleElement;
    expect(fillCircle.className.baseVal).toMatch(/text-status-done-fg/);
  });
});
