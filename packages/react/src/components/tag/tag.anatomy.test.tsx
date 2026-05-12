/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Tag } from './tag.js';

describe('Tag anatomy (design.md §6.3)', () => {
  test('default neutral md: span root has bg-bg-subtle text-text-secondary h-[22px] rounded-sm', () => {
    const { container } = render(<Tag>chip</Tag>);
    const span = container.firstElementChild as HTMLElement;
    expect(span.tagName).toBe('SPAN');
    const cls = span.className;
    expect(cls).toMatch(/bg-bg-subtle/);
    expect(cls).toMatch(/text-text-secondary/);
    expect(cls).toMatch(/h-\[22px\]/);
    expect(cls).toMatch(/rounded-sm/);
  });

  test('status tone done adds role="status", data-tone="done", bg-status-done-bg text-status-done-fg', () => {
    const { container } = render(<Tag tone="done">done</Tag>);
    const span = container.firstElementChild as HTMLElement;
    expect(span).toHaveAttribute('role', 'status');
    expect(span).toHaveAttribute('data-tone', 'done');
    const cls = span.className;
    expect(cls).toMatch(/bg-status-done-bg/);
    expect(cls).toMatch(/text-status-done-fg/);
  });

  test('size sm uses h-[18px] and text-[11px]', () => {
    const { container } = render(<Tag size="sm">sm</Tag>);
    const span = container.firstElementChild as HTMLElement;
    const cls = span.className;
    expect(cls).toMatch(/h-\[18px\]/);
    expect(cls).toMatch(/text-\[11px\]/);
  });
});
