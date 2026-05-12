/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Input } from './input.js';

describe('Input anatomy (design.md §6.2)', () => {
  test('default md: wrapper is <label> with h-control-md, rounded-md, border-border, focus-within:tp-focus-ring, bg-bg-surface; inner <input> has bg-transparent and outline-none', () => {
    const { container } = render(<Input placeholder="搜索" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.tagName).toBe('LABEL');
    expect(wrapper.dataset['size']).toBe('md');
    expect(wrapper.dataset['tone']).toBe('default');
    const cls = wrapper.className;
    expect(cls).toMatch(/h-control-md/);
    expect(cls).toMatch(/rounded-md/);
    expect(cls).toMatch(/border-border/);
    expect(cls).toMatch(/focus-within:tp-focus-ring/);
    expect(cls).toMatch(/bg-bg-surface/);

    const input = wrapper.querySelector('input') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.className).toMatch(/bg-transparent/);
    expect(input.className).toMatch(/outline-none/);
  });

  test('invalid tone: wrapper has border-[#DC2626]', () => {
    const { container } = render(<Input tone="invalid" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toMatch(/border-\[#DC2626\]/);
    expect(wrapper.dataset['tone']).toBe('invalid');
  });

  test('size sm: wrapper has h-control-sm and text-caption', () => {
    const { container } = render(<Input size="sm" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toMatch(/h-control-sm/);
    expect(wrapper.className).toMatch(/text-caption/);
    expect(wrapper.dataset['size']).toBe('sm');
  });
});
