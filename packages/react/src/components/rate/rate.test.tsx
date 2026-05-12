/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Rate } from './rate.js';

describe('Rate', () => {
  test('renders 5 stars by default', () => {
    const { container } = render(<Rate />);
    const spans = container.querySelectorAll('div[role="radiogroup"] > span');
    expect(spans).toHaveLength(5);
  });

  test('count=3 renders 3 stars', () => {
    const { container } = render(<Rate count={3} />);
    const spans = container.querySelectorAll('div[role="radiogroup"] > span');
    expect(spans).toHaveLength(3);
  });

  test('clicking the 3rd star commits value=3; onValueChange fires', () => {
    const onValueChange = vi.fn();
    const { getByRole } = render(<Rate onValueChange={onValueChange} />);
    const btn = getByRole('button', { name: '3' });
    fireEvent.click(btn);
    expect(onValueChange).toHaveBeenCalledWith(3);
  });

  test('defaultValue=2 → first two stars have 100% width overlay', () => {
    const { container } = render(<Rate defaultValue={2} />);
    const overlays = container.querySelectorAll('div[role="radiogroup"] > span > span[aria-hidden]');
    // First two overlays should be width 100%
    expect((overlays[0] as HTMLElement).style.width).toBe('100%');
    expect((overlays[1] as HTMLElement).style.width).toBe('100%');
    // Third overlay should be width 0%
    expect((overlays[2] as HTMLElement).style.width).toBe('0%');
  });

  test('allowHalf + click on left-half button of star 4 commits 3.5', () => {
    const onValueChange = vi.fn();
    const { getByRole } = render(<Rate allowHalf onValueChange={onValueChange} />);
    const btn = getByRole('button', { name: '3.5' });
    fireEvent.click(btn);
    expect(onValueChange).toHaveBeenCalledWith(3.5);
  });

  test('readOnly prevents click events from committing', () => {
    const onValueChange = vi.fn();
    const { getByRole } = render(<Rate readOnly onValueChange={onValueChange} />);
    const btn = getByRole('button', { name: '3' });
    fireEvent.click(btn);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  test('ArrowRight on first button increments by 1', () => {
    const onValueChange = vi.fn();
    const { container } = render(<Rate defaultValue={2} onValueChange={onValueChange} />);
    // The first button (tabIndex=0) is the one on the first star
    const firstBtn = container.querySelector('button[tabindex="0"]') as HTMLButtonElement;
    fireEvent.keyDown(firstBtn, { key: 'ArrowRight' });
    expect(onValueChange).toHaveBeenCalledWith(3);
  });

  test('ArrowRight with allowHalf increments by 0.5', () => {
    const onValueChange = vi.fn();
    const { container } = render(<Rate defaultValue={2} allowHalf onValueChange={onValueChange} />);
    const firstBtn = container.querySelector('button[tabindex="0"]') as HTMLButtonElement;
    fireEvent.keyDown(firstBtn, { key: 'ArrowRight' });
    expect(onValueChange).toHaveBeenCalledWith(2.5);
  });

  test('forwardRef points to the outer div', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Rate ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.getAttribute('role')).toBe('radiogroup');
  });
});
