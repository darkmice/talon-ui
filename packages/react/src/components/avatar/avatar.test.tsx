/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, act } from '@testing-library/react';
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

describe('Avatar', () => {
  test('renders Radix Avatar Root with data-size attribute', () => {
    const { container } = renderAndFlush(<Avatar fallback="AB" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.tagName).toBe('SPAN');
    expect(root).toHaveAttribute('data-size', 'md');
  });

  test('fallback renders when src is missing', () => {
    renderAndFlush(<Avatar fallback="XY" />);
    expect(screen.getByText('XY')).toBeInTheDocument();
  });

  test('default size is md — has data-size="md"', () => {
    const { container } = renderAndFlush(<Avatar fallback="AB" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute('data-size', 'md');
  });

  test('size prop sets data-size attribute correctly', () => {
    const { container } = renderAndFlush(<Avatar size="lg" fallback="AB" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute('data-size', 'lg');
  });

  test('status="online" renders a status dot with aria-label="online"', () => {
    const { container } = renderAndFlush(<Avatar fallback="ON" status="online" />);
    const dot = container.querySelector('[aria-label="online"]');
    expect(dot).toBeInTheDocument();
  });

  test('no status dot rendered when status prop is absent', () => {
    const { container } = renderAndFlush(<Avatar fallback="AB" />);
    const dot = container.querySelector('[aria-label="online"], [aria-label="away"], [aria-label="offline"]');
    expect(dot).not.toBeInTheDocument();
  });

  test('forwardRef passes ref to the outer Root span', () => {
    const ref = { current: null as HTMLSpanElement | null };
    renderAndFlush(<Avatar ref={ref} fallback="RF" />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});

describe('AvatarGroup', () => {
  test('with 2 children and max=3, shows both, no overflow chip', () => {
    renderAndFlush(
      <AvatarGroup max={3}>
        <Avatar fallback="AL" />
        <Avatar fallback="BR" />
      </AvatarGroup>,
    );
    expect(screen.getByText('AL')).toBeInTheDocument();
    expect(screen.getByText('BR')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  test('with 5 children and max=3, shows 3 visible + overflow chip "+2" with role="status"', () => {
    renderAndFlush(
      <AvatarGroup max={3}>
        <Avatar fallback="AL" />
        <Avatar fallback="BR" />
        <Avatar fallback="CD" />
        <Avatar fallback="EF" />
        <Avatar fallback="GH" />
      </AvatarGroup>,
    );
    expect(screen.getByText('AL')).toBeInTheDocument();
    expect(screen.getByText('BR')).toBeInTheDocument();
    expect(screen.getByText('CD')).toBeInTheDocument();
    expect(screen.queryByText('EF')).not.toBeInTheDocument();
    expect(screen.queryByText('GH')).not.toBeInTheDocument();
    const overflow = screen.getByRole('status');
    expect(overflow).toBeInTheDocument();
    expect(overflow).toHaveTextContent('+2');
  });

  test('AvatarGroup applies size to overflow chip via data-size', () => {
    renderAndFlush(
      <AvatarGroup max={2} size="lg">
        <Avatar fallback="AL" />
        <Avatar fallback="BR" />
        <Avatar fallback="CD" />
      </AvatarGroup>,
    );
    const overflow = screen.getByRole('status');
    expect(overflow).toHaveAttribute('data-size', 'lg');
    // Overflow chip should have size-lg class
    expect(overflow.className).toMatch(/h-\[var\(--tp-avatar-lg\)\]/);
  });
});
