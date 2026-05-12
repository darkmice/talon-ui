/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { NumberInput } from './number-input.js';

describe('NumberInput anatomy (design.md §6.41)', () => {
  test('default md: wrapper is <label> with h-control-md; contains input, optional unit span, and div with two arrow buttons', () => {
    const { container } = render(<NumberInput defaultValue={0} unit="px" />);
    const wrapper = container.firstElementChild as HTMLElement;

    expect(wrapper.tagName).toBe('LABEL');
    expect(wrapper.dataset['size']).toBe('md');
    expect(wrapper.dataset['tone']).toBe('default');
    expect(wrapper.className).toMatch(/h-control-md/);
    expect(wrapper.className).toMatch(/rounded-md/);
    expect(wrapper.className).toMatch(/border-border/);
    expect(wrapper.className).toMatch(/bg-bg-surface/);

    // inner input
    const input = wrapper.querySelector('input') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.getAttribute('type')).toBe('text');
    expect(input.getAttribute('inputMode')).toBe('decimal');

    // unit span
    const unitSpan = wrapper.querySelector('span');
    expect(unitSpan).not.toBeNull();
    expect(unitSpan?.textContent).toBe('px');

    // stepper div with two buttons
    const stepperDiv = wrapper.querySelector('div');
    expect(stepperDiv).not.toBeNull();
    const buttons = stepperDiv?.querySelectorAll('button');
    expect(buttons?.length).toBe(2);
  });

  test('inner input has tp-nums, bg-transparent, and outline-none classes', () => {
    const { container } = render(<NumberInput defaultValue={0} />);
    const wrapper = container.firstElementChild as HTMLElement;
    const input = wrapper.querySelector('input') as HTMLInputElement;
    expect(input.className).toMatch(/tp-nums/);
    expect(input.className).toMatch(/bg-transparent/);
    expect(input.className).toMatch(/outline-none/);
  });

  test('arrow buttons have aria-label="Increment" and aria-label="Decrement"', () => {
    render(<NumberInput defaultValue={0} />);
    expect(screen.getByRole('button', { name: 'Increment' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Decrement' })).toBeInTheDocument();
  });

  test('size sm: wrapper has h-control-sm and text-caption', () => {
    const { container } = render(<NumberInput size="sm" defaultValue={0} />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toMatch(/h-control-sm/);
    expect(wrapper.className).toMatch(/text-caption/);
    expect(wrapper.dataset['size']).toBe('sm');
  });

  test('tone invalid: wrapper has border-[#C8322B]', () => {
    const { container } = render(<NumberInput tone="invalid" defaultValue={0} />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toMatch(/border-\[#C8322B\]/);
    expect(wrapper.dataset['tone']).toBe('invalid');
  });

  test('aria-invalid auto-derives invalid tone', () => {
    const { container } = render(<NumberInput aria-invalid="true" defaultValue={0} />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.dataset['tone']).toBe('invalid');
  });
});
