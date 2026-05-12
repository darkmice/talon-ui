/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Skeleton } from './skeleton.js';

describe('Skeleton anatomy (design.md §6.11)', () => {
  test('default rect: data-shape="rect", has bg-bg-subtle rounded-md animate-pulse [animation-duration:1.4s]', () => {
    const { container } = render(<Skeleton />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveAttribute('data-shape', 'rect');
    const cls = el.className;
    expect(cls).toMatch(/bg-bg-subtle/);
    expect(cls).toMatch(/rounded-md/);
    expect(cls).toMatch(/animate-pulse/);
    expect(cls).toMatch(/\[animation-duration:1\.4s\]/);
  });

  test('shape="circle": has rounded-pill and aspect-square', () => {
    const { container } = render(<Skeleton shape="circle" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveAttribute('data-shape', 'circle');
    const cls = el.className;
    expect(cls).toMatch(/rounded-pill/);
    expect(cls).toMatch(/aspect-square/);
  });
});
