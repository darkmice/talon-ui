/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { NumberInput } from './number-input.js';

describe('NumberInput', () => {
  test('renders with defaultValue; typing fires onChange and onValueChange', async () => {
    const onChange = vi.fn();
    const onValueChange = vi.fn();
    render(
      <NumberInput defaultValue={5} onChange={onChange} onValueChange={onValueChange} />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('5');
    await userEvent.clear(input);
    await userEvent.type(input, '7');
    expect(onChange).toHaveBeenCalled();
    expect(onValueChange).toHaveBeenCalledWith(7);
  });

  test('clicking increment button bumps value by step', () => {
    const onValueChange = vi.fn();
    render(<NumberInput defaultValue={3} step={2} onValueChange={onValueChange} />);
    const increment = screen.getByRole('button', { name: 'Increment' });
    fireEvent.mouseDown(increment);
    fireEvent.mouseUp(increment);
    expect(onValueChange).toHaveBeenCalledWith(5);
  });

  test('clicking decrement button reduces value by step', () => {
    const onValueChange = vi.fn();
    render(<NumberInput defaultValue={10} step={3} onValueChange={onValueChange} />);
    const decrement = screen.getByRole('button', { name: 'Decrement' });
    fireEvent.mouseDown(decrement);
    fireEvent.mouseUp(decrement);
    expect(onValueChange).toHaveBeenCalledWith(7);
  });

  test('ArrowUp and ArrowDown keyboard events bump value', () => {
    const onValueChange = vi.fn();
    render(<NumberInput defaultValue={10} step={1} onValueChange={onValueChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(onValueChange).toHaveBeenCalledWith(11);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(onValueChange).toHaveBeenCalledWith(10);
  });

  test('min/max clamp on bump: value at max stays at max on increment', () => {
    const onValueChange = vi.fn();
    render(
      <NumberInput value={100} max={100} step={1} onValueChange={onValueChange} onChange={() => {}} />,
    );
    const increment = screen.getByRole('button', { name: 'Increment' });
    fireEvent.mouseDown(increment);
    fireEvent.mouseUp(increment);
    expect(onValueChange).toHaveBeenCalledWith(100);
  });

  test('min clamp: value at min stays at min on decrement', () => {
    const onValueChange = vi.fn();
    render(
      <NumberInput value={0} min={0} step={1} onValueChange={onValueChange} onChange={() => {}} />,
    );
    const decrement = screen.getByRole('button', { name: 'Decrement' });
    fireEvent.mouseDown(decrement);
    fireEvent.mouseUp(decrement);
    expect(onValueChange).toHaveBeenCalledWith(0);
  });

  test('precision formats value to N decimals (step=0.1 → 1 decimal)', () => {
    const onValueChange = vi.fn();
    render(<NumberInput defaultValue={1} step={0.1} onValueChange={onValueChange} />);
    const input = screen.getByRole('textbox');
    // defaultValue with step=0.1 → inferPrecision gives 1 decimal place
    expect(input).toHaveValue('1.0');
    const increment = screen.getByRole('button', { name: 'Increment' });
    fireEvent.mouseDown(increment);
    fireEvent.mouseUp(increment);
    expect(onValueChange).toHaveBeenCalledWith(1.1);
  });

  test('unit prop renders suffix text', () => {
    render(<NumberInput defaultValue={16} unit="px" />);
    expect(screen.getByText('px')).toBeInTheDocument();
  });

  test('forwardRef points to inner input element', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<NumberInput ref={ref} defaultValue={0} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test('disabled prop disables both the input and the stepper buttons', () => {
    render(<NumberInput disabled defaultValue={5} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Increment' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Decrement' })).toBeDisabled();
  });

  test('controlled mode: value prop overrides internal state', () => {
    const onChange = vi.fn();
    const { rerender } = render(<NumberInput value={42} onChange={onChange} />);
    expect(screen.getByRole('textbox')).toHaveValue('42');
    rerender(<NumberInput value={99} onChange={onChange} />);
    expect(screen.getByRole('textbox')).toHaveValue('99');
  });
});
