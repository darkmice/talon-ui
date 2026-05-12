/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Space } from './space.js';

describe('Space anatomy (design.md §4)', () => {
  test('default: flex flex-row gap-tp-3', () => {
    const { container } = render(<Space />);
    const el = container.firstElementChild as HTMLElement;
    const cls = el.className;
    expect(cls).toMatch(/flex/);
    expect(cls).toMatch(/flex-row/);
    expect(cls).toMatch(/gap-tp-3/);
  });

  test('inline + vertical + size lg: inline-flex flex-col gap-tp-4', () => {
    const { container } = render(<Space inline direction="vertical" size="lg" />);
    const el = container.firstElementChild as HTMLElement;
    const cls = el.className;
    expect(cls).toMatch(/inline-flex/);
    expect(cls).toMatch(/flex-col/);
    expect(cls).toMatch(/gap-tp-4/);
  });

  test('align="center" justify="between" wrap: classes include items-center, justify-between, flex-wrap', () => {
    const { container } = render(<Space align="center" justify="between" wrap />);
    const el = container.firstElementChild as HTMLElement;
    const cls = el.className;
    expect(cls).toMatch(/items-center/);
    expect(cls).toMatch(/justify-between/);
    expect(cls).toMatch(/flex-wrap/);
  });
});
