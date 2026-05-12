/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, act } from '@testing-library/react';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { Avatar } from './avatar.js';
import { AvatarGroup } from './avatar-group.js';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

function renderAndFlush(ui: React.ReactElement) {
  const result = render(ui);
  act(() => {
    vi.runAllTimers();
  });
  return result;
}

describe('Avatar anatomy (design.md §6.4)', () => {
  test('Avatar default (md, no status): wrapper has rounded-pill bg-bg-subtle text-text-secondary and avatar-md sizing', () => {
    const { container } = renderAndFlush(<Avatar fallback="AB" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.tagName).toBe('SPAN');
    const cls = root.className;
    expect(cls).toMatch(/rounded-pill/);
    expect(cls).toMatch(/bg-bg-subtle/);
    expect(cls).toMatch(/text-text-secondary/);
    // md sizing via arbitrary value
    expect(cls).toMatch(/w-\[var\(--tp-avatar-md\)\]/);
    expect(cls).toMatch(/h-\[var\(--tp-avatar-md\)\]/);
    // no status dot
    const statusDots = container.querySelectorAll(
      '[aria-label="online"], [aria-label="away"], [aria-label="offline"]',
    );
    expect(statusDots.length).toBe(0);
  });

  test('Avatar with status="online": wrapper has child element with class bg-status-done-fg and ring-bg-surface', () => {
    const { container } = renderAndFlush(<Avatar fallback="ON" status="online" />);
    const dot = container.querySelector('[aria-label="online"]') as HTMLElement;
    expect(dot).toBeInTheDocument();
    const cls = dot.className;
    expect(cls).toMatch(/bg-status-done-fg/);
    expect(cls).toMatch(/ring-bg-surface/);
  });

  test('Avatar with status="away": dot has bg-status-pending-fg', () => {
    const { container } = renderAndFlush(<Avatar fallback="AW" status="away" />);
    const dot = container.querySelector('[aria-label="away"]') as HTMLElement;
    expect(dot.className).toMatch(/bg-status-pending-fg/);
  });

  test('AvatarGroup of 5 with max=3: 4 children in DOM (3 avatars + 1 overflow), overflow has +2 text', () => {
    const { container } = renderAndFlush(
      <AvatarGroup max={3}>
        <Avatar fallback="AL" />
        <Avatar fallback="BR" />
        <Avatar fallback="CD" />
        <Avatar fallback="EF" />
        <Avatar fallback="GH" />
      </AvatarGroup>,
    );
    const group = container.firstElementChild as HTMLElement;
    // group wrapper has 4 direct children: 3 avatars + 1 overflow chip
    expect(group.children.length).toBe(4);

    // the overflow chip is the 4th child
    const overflowChip = group.children[3] as HTMLElement;
    expect(overflowChip.textContent).toBe('+2');
    expect(overflowChip).toHaveAttribute('role', 'status');

    // subsequent children (i > 0) have -ml-tp-2
    const secondChild = group.children[1] as HTMLElement;
    expect(secondChild.className).toMatch(/-ml-tp-2/);
    const thirdChild = group.children[2] as HTMLElement;
    expect(thirdChild.className).toMatch(/-ml-tp-2/);
    // overflow chip also has -ml-tp-2
    expect(overflowChip.className).toMatch(/-ml-tp-2/);
  });
});
