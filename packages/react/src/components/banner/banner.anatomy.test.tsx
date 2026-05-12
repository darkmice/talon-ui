/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { createRef } from 'react';
import { Banner } from './banner.js';

describe('Banner anatomy (design.md §6.10)', () => {
  test('default tone="info": outer div has bg-status-info-bg and rounded-md; left bar is absolute with bg-status-info-fg and w-1', () => {
    const { container } = render(<Banner title="Info banner" />);
    const outer = container.firstElementChild as HTMLElement;
    expect(outer.className).toMatch(/bg-status-info-bg/);
    expect(outer.className).toMatch(/rounded-md/);

    // left bar: first aria-hidden span
    const bars = outer.querySelectorAll('[aria-hidden="true"]');
    const leftBar = bars[0] as HTMLElement;
    expect(leftBar.className).toMatch(/absolute/);
    expect(leftBar.className).toMatch(/bg-status-info-fg/);
    expect(leftBar.className).toMatch(/w-1/);
  });

  test('forwardRef points to the outer div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Banner ref={ref} title="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current!.getAttribute('role')).toBe('status');
  });

  test('tone="error": outer has bg-status-blocked-bg; left bar has bg-status-blocked-fg', () => {
    const { container } = render(<Banner tone="error" title="Error" />);
    const outer = container.firstElementChild as HTMLElement;
    expect(outer.className).toMatch(/bg-status-blocked-bg/);

    const bars = outer.querySelectorAll('[aria-hidden="true"]');
    const leftBar = bars[0] as HTMLElement;
    expect(leftBar.className).toMatch(/bg-status-blocked-fg/);
  });

  test('left bar spans full height: has top-0 bottom-0 left-0', () => {
    const { container } = render(<Banner title="Height test" />);
    const outer = container.firstElementChild as HTMLElement;
    const bars = outer.querySelectorAll('[aria-hidden="true"]');
    const leftBar = bars[0] as HTMLElement;
    expect(leftBar.className).toMatch(/top-0/);
    expect(leftBar.className).toMatch(/bottom-0/);
    expect(leftBar.className).toMatch(/left-0/);
  });
});
