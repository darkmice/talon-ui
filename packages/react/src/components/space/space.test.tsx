/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { createRef } from 'react';
import { Space } from './space.js';

describe('Space', () => {
  test('default renders flex flex-row gap-tp-3', () => {
    const { container } = render(<Space />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('DIV');
    expect(el.className).toMatch(/flex/);
    expect(el.className).toMatch(/flex-row/);
    expect(el.className).toMatch(/gap-tp-3/);
  });

  test('direction="vertical" adds flex-col', () => {
    const { container } = render(<Space direction="vertical" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toMatch(/flex-col/);
  });

  test('size="xl" adds gap-tp-5', () => {
    const { container } = render(<Space size="xl" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toMatch(/gap-tp-5/);
  });

  test('align="center" adds items-center; justify="between" adds justify-between', () => {
    const { container } = render(<Space align="center" justify="between" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toMatch(/items-center/);
    expect(el.className).toMatch(/justify-between/);
  });

  test('wrap adds flex-wrap', () => {
    const { container } = render(<Space wrap />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toMatch(/flex-wrap/);
  });

  test('inline swaps flex to inline-flex', () => {
    const { container } = render(<Space inline />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toMatch(/inline-flex/);
  });

  test('custom className is preserved', () => {
    const { container } = render(<Space className="my-custom-class" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toMatch(/my-custom-class/);
  });

  test('forwardRef points to the outer div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Space ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  test('data-direction and data-size attributes match props', () => {
    const { container } = render(<Space direction="vertical" size="lg" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveAttribute('data-direction', 'vertical');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  test('data-direction defaults to horizontal when not specified', () => {
    const { container } = render(<Space />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveAttribute('data-direction', 'horizontal');
    expect(el).toHaveAttribute('data-size', 'md');
  });
});
