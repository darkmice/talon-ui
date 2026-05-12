/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { createRef } from 'react';
import { Statistic } from './statistic.js';

describe('Statistic', () => {
  test('renders label and value', () => {
    render(<Statistic label="Active users" value={1284} />);
    expect(screen.getByText('Active users')).toBeInTheDocument();
    expect(screen.getByText('1284')).toBeInTheDocument();
  });

  test('precision=2 with value=12.345 renders "12.35"', () => {
    render(<Statistic label="Rate" value={12.345} precision={2} />);
    expect(screen.getByText('12.35')).toBeInTheDocument();
  });

  test('prefix and suffix render around value', () => {
    const { container } = render(<Statistic label="Revenue" value={100} prefix="$" suffix="USD" />);
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(container.textContent).toContain('100');
  });

  test('delta=12 shows TrendingUp icon and renders absolute value', () => {
    const { container } = render(<Statistic label="Revenue" value={100} delta={12} />);
    const deltaSpan = container.querySelector('.text-status-done-fg');
    expect(deltaSpan).toBeInTheDocument();
    expect(deltaSpan!.textContent).toContain('12');
  });

  test('delta=-5 shows TrendingDown icon in danger color', () => {
    const { container } = render(<Statistic label="Errors" value={32} delta={-5} />);
    const deltaSpan = container.querySelector('.text-danger-500');
    expect(deltaSpan).toBeInTheDocument();
    expect(deltaSpan!.textContent).toContain('5');
  });

  test('size="lg" applies text-display to value span', () => {
    const { container } = render(<Statistic label="Metric" value={42} size="lg" />);
    const valueSpan = container.querySelector('.text-display');
    expect(valueSpan).toBeInTheDocument();
  });

  test('align="center" applies items-center and text-center to root', () => {
    const { container } = render(<Statistic label="Metric" value={42} align="center" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toMatch(/items-center/);
    expect(root.className).toMatch(/text-center/);
  });

  test('forwardRef points to outer div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Statistic label="Metric" value={42} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
