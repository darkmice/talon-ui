/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Textarea } from './textarea.js';

describe('Textarea anatomy (design.md §6.2)', () => {
  test('default md: <label> has min-h-control-md, rounded-md, border-border, focus-within:tp-focus-ring, bg-bg-surface; inner <textarea> has bg-transparent, outline-none, resize-none, text-text-primary, overflow-auto', () => {
    const { container } = render(<Textarea placeholder="请输入" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.tagName).toBe('LABEL');
    expect(wrapper.dataset['size']).toBe('md');
    expect(wrapper.dataset['tone']).toBe('default');
    const cls = wrapper.className;
    expect(cls).toMatch(/min-h-control-md/);
    expect(cls).toMatch(/rounded-md/);
    expect(cls).toMatch(/border-border/);
    expect(cls).toMatch(/focus-within:tp-focus-ring/);
    expect(cls).toMatch(/bg-bg-surface/);

    const textarea = wrapper.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea).not.toBeNull();
    expect(textarea.className).toMatch(/bg-transparent/);
    expect(textarea.className).toMatch(/outline-none/);
    expect(textarea.className).toMatch(/resize-none/);
    expect(textarea.className).toMatch(/text-text-primary/);
    expect(textarea.className).toMatch(/overflow-auto/);
  });

  test('autosize swaps overflow-auto → overflow-hidden on the textarea', () => {
    const { container } = render(<Textarea autosize />);
    const wrapper = container.firstElementChild as HTMLElement;
    const textarea = wrapper.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.className).toMatch(/overflow-hidden/);
    expect(textarea.className).not.toMatch(/overflow-auto/);
    expect(textarea).toHaveAttribute('rows', '1');
  });

  test('invalid tone: wrapper has border-[#DC2626]', () => {
    const { container } = render(<Textarea tone="invalid" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toMatch(/border-\[#DC2626\]/);
    expect(wrapper.dataset['tone']).toBe('invalid');
  });
});
