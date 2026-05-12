/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { createRef } from 'react';
import { Skeleton } from './skeleton.js';

describe('Skeleton', () => {
  test('renders as div with role="status" and aria-label="Loading"', () => {
    render(<Skeleton />);
    const el = screen.getByRole('status');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('aria-label', 'Loading');
    expect(el.tagName).toBe('DIV');
  });

  test('shape="line" applies h-3 rounded-pill classes', () => {
    const { container } = render(<Skeleton shape="line" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toMatch(/h-3/);
    expect(el.className).toMatch(/rounded-pill/);
  });

  test('shape="circle" applies rounded-pill aspect-square classes', () => {
    const { container } = render(<Skeleton shape="circle" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toMatch(/rounded-pill/);
    expect(el.className).toMatch(/aspect-square/);
  });

  test('width and height applied as inline styles', () => {
    const { container } = render(<Skeleton width={120} height={80} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.width).toBe('120px');
    expect(el.style.height).toBe('80px');
  });

  test('animation=false does not include animate-pulse class', () => {
    const { container } = render(<Skeleton animation={false} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).not.toMatch(/animate-pulse/);
  });

  test('forwardRef attaches to the div element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
