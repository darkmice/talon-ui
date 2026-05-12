/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Card } from './card.js';

describe('Card anatomy (design.md §6.5)', () => {
  test('default: div has rounded-lg bg-bg-surface border border-border shadow-card p-tp-5', () => {
    const { container } = render(<Card>content</Card>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('DIV');
    const cls = el.className;
    expect(cls).toMatch(/rounded-lg/);
    expect(cls).toMatch(/bg-bg-surface/);
    expect(cls).toMatch(/border/);
    expect(cls).toMatch(/border-border/);
    expect(cls).toMatch(/shadow-card/);
    expect(cls).toMatch(/p-tp-5/);
  });

  test('hoverable: contains hover:border-primary-200 and hover:shadow-pop', () => {
    const { container } = render(<Card hoverable>hover</Card>);
    const cls = (container.firstElementChild as HTMLElement).className;
    expect(cls).toMatch(/hover:border-primary-200/);
    expect(cls).toMatch(/hover:shadow-pop/);
  });

  test('interactive + no explicit role: element has role="button" and tabIndex="0"', () => {
    const { container } = render(<Card interactive>interactive</Card>);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveAttribute('role', 'button');
    expect(el).toHaveAttribute('tabindex', '0');
  });
});
