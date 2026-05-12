/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { Input } from './input.js';

describe('Input', () => {
  test('renders an input with controlled value; typing fires onChange', async () => {
    const onChange = vi.fn();
    render(<Input value="hello" onChange={onChange} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('hello');
    await userEvent.type(input, 'x');
    expect(onChange).toHaveBeenCalled();
  });

  test('disabled prop disables the input element', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  test('aria-invalid prop sets data-tone="invalid" on the wrapper', () => {
    const { container } = render(<Input aria-invalid="true" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.dataset['tone']).toBe('invalid');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  test('prefix and suffix render inside the wrapper', () => {
    render(
      <Input
        prefix={<span data-testid="prefix-icon">P</span>}
        suffix={<span data-testid="suffix-icon">S</span>}
      />,
    );
    expect(screen.getByTestId('prefix-icon')).toBeInTheDocument();
    expect(screen.getByTestId('suffix-icon')).toBeInTheDocument();
  });

  test('forwardRef points to the inner <input> element', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test('wrapperClassName is applied to the label; className is applied to the inner input', () => {
    const { container } = render(
      <Input wrapperClassName="my-wrapper" className="my-input" />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const input = wrapper.querySelector('input') as HTMLInputElement;
    expect(wrapper.className).toMatch(/my-wrapper/);
    expect(input.className).toMatch(/my-input/);
  });
});
