/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { Textarea } from './textarea.js';

describe('Textarea', () => {
  test('renders with value; typing fires onChange', async () => {
    const onChange = vi.fn();
    render(<Textarea value="hello" onChange={onChange} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('hello');
    await userEvent.type(textarea, 'x');
    expect(onChange).toHaveBeenCalled();
  });

  test('disabled prevents typing', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  test('aria-invalid="true" implicitly sets data-tone="invalid" on wrapper', () => {
    const { container } = render(<Textarea aria-invalid="true" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.dataset['tone']).toBe('invalid');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  test('forwardRef points to the inner <textarea>', () => {
    const ref = { current: null as HTMLTextAreaElement | null };
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  test('wrapperClassName applies to the label; className applies to the textarea', () => {
    const { container } = render(
      <Textarea wrapperClassName="my-wrapper" className="my-textarea" />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const textarea = wrapper.querySelector('textarea') as HTMLTextAreaElement;
    expect(wrapper.className).toMatch(/my-wrapper/);
    expect(textarea.className).toMatch(/my-textarea/);
  });

  test('without autosize, rows prop is forwarded literally', () => {
    render(<Textarea rows={5} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '5');
  });
});
