/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { createRef } from 'react';
import { Progress } from './progress.js';

describe('Progress', () => {
  test('default linear renders role="progressbar" with aria-valuenow', () => {
    render(<Progress value={40} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute('aria-valuenow', '40');
  });

  test('value=50 max=100 → fill width is 50%', () => {
    const { container } = render(<Progress value={50} />);
    const fill = container.querySelector('[style]') as HTMLElement;
    expect(fill.style.width).toBe('50%');
  });

  test('value > max → clamped to 100%', () => {
    const { container } = render(<Progress value={150} max={100} />);
    const fill = container.querySelector('[style]') as HTMLElement;
    expect(fill.style.width).toBe('100%');
  });

  test('showInfo=false → no percentage label', () => {
    render(<Progress value={60} showInfo={false} />);
    expect(screen.queryByText('60%')).not.toBeInTheDocument();
  });

  test('custom format(value, max) renders', () => {
    render(<Progress value={3} max={10} format={(v, m) => `${v}/${m}`} />);
    expect(screen.getByText('3/10')).toBeInTheDocument();
  });

  test('type="circle" renders an <svg> element', () => {
    const { container } = render(<Progress type="circle" value={50} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('status="error" applies bg-danger-500 to linear fill', () => {
    const { container } = render(<Progress value={30} status="error" />);
    const fill = container.querySelector('[style]') as HTMLElement;
    expect(fill.className).toMatch(/bg-danger-500/);
  });

  test('forwardRef points to outer div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Progress value={50} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute('role', 'progressbar');
  });
});
