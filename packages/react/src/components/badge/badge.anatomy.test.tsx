/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Badge } from './badge.js';

describe('Badge anatomy (design.md §6.49)', () => {
  test('standalone count=5: pill has h-3 min-w-3 rounded-pill tp-nums bg-danger-500', () => {
    const { container } = render(<Badge count={5} />);
    const pill = container.querySelector('[data-kind="number"]') as HTMLElement;
    expect(pill).toBeInTheDocument();
    const cls = pill.className;
    expect(cls).toMatch(/h-3/);
    expect(cls).toMatch(/min-w-3/);
    expect(cls).toMatch(/rounded-pill/);
    expect(cls).toMatch(/tp-nums/);
    expect(cls).toMatch(/bg-danger-500/);
  });

  test('wrapping with child: outer is relative inline-flex, pill wrapper is absolute -top-1 -right-1', () => {
    const { container } = render(
      <Badge count={3}>
        <span>avatar</span>
      </Badge>,
    );
    const outer = container.firstElementChild as HTMLElement;
    expect(outer.className).toMatch(/relative/);
    expect(outer.className).toMatch(/inline-flex/);
    const pillWrapper = outer.querySelector('.absolute') as HTMLElement;
    expect(pillWrapper).toBeInTheDocument();
    expect(pillWrapper.className).toMatch(/-top-1/);
    expect(pillWrapper.className).toMatch(/-right-1/);
  });

  test('dot variant: pill has h-2 w-2 and no text content', () => {
    const { container } = render(<Badge dot />);
    const pill = container.querySelector('[data-kind="dot"]') as HTMLElement;
    expect(pill).toBeInTheDocument();
    const cls = pill.className;
    expect(cls).toMatch(/h-2/);
    expect(cls).toMatch(/w-2/);
    expect(pill.textContent).toBe('');
  });
});
