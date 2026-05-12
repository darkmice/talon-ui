/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { createRef } from 'react';
import { Badge } from './badge.js';

describe('Badge', () => {
  test('standalone Badge with count={3} renders pill with "3"', () => {
    render(<Badge count={3} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('count > max renders "max+" — default max is 99', () => {
    render(<Badge count={120} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  test('count > custom max renders "max+"', () => {
    render(<Badge count={1500} max={999} />);
    expect(screen.getByText('999+')).toBeInTheDocument();
  });

  test('count=0 renders nothing by default', () => {
    const { container } = render(<Badge count={0} />);
    // The outer span is present but should contain no pill text
    const spans = container.querySelectorAll('span');
    // outer span only, no pill
    expect(spans.length).toBe(1);
    expect(container.textContent).toBe('');
  });

  test('showZero={true} renders "0" when count=0', () => {
    render(<Badge count={0} showZero />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('dot prop renders the dot variant ignoring count', () => {
    const { container } = render(<Badge dot count={42} />);
    // Should not show the count text
    expect(container.textContent).toBe('');
    // dot pill should have data-kind="dot"
    const pill = container.querySelector('[data-kind="dot"]');
    expect(pill).toBeInTheDocument();
  });

  test('wrapping children: pill positioned absolutely at top-right', () => {
    const { container } = render(
      <Badge count={5}>
        <span>child</span>
      </Badge>,
    );
    const outer = container.firstElementChild as HTMLElement;
    expect(outer.className).toMatch(/relative/);
    const pillWrapper = outer.querySelector('.absolute');
    expect(pillWrapper).toBeInTheDocument();
    expect(pillWrapper!.className).toMatch(/-top-1/);
    expect(pillWrapper!.className).toMatch(/-right-1/);
  });

  test('custom label overrides aria-label', () => {
    render(<Badge count={5} label="5 notifications" />);
    const pill = screen.getByRole('status');
    expect(pill).toHaveAttribute('aria-label', '5 notifications');
  });

  test('tone="primary" applies bg-primary-500 class to pill', () => {
    const { container } = render(<Badge count={3} tone="primary" />);
    const pill = container.querySelector('[data-kind="number"]') as HTMLElement;
    expect(pill.className).toMatch(/bg-primary-500/);
  });

  test('forwardRef points to the outer span', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Badge count={3} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
