/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { RadioGroup, RadioGroupItem } from './radio.js';

describe('RadioGroup', () => {
  test('renders three items; clicking the second selects it; onValueChange fires with the value', () => {
    const handler = vi.fn();
    render(
      <RadioGroup onValueChange={handler}>
        <RadioGroupItem value="a" aria-label="a" />
        <RadioGroupItem value="b" aria-label="b" />
        <RadioGroupItem value="c" aria-label="c" />
      </RadioGroup>,
    );
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    fireEvent.click(radios[1]);
    expect(handler).toHaveBeenCalledWith('b');
  });

  test('defaultValue selects the matching item on mount', () => {
    render(
      <RadioGroup defaultValue="b">
        <RadioGroupItem value="a" aria-label="a" />
        <RadioGroupItem value="b" aria-label="b" />
        <RadioGroupItem value="c" aria-label="c" />
      </RadioGroup>,
    );
    const radios = screen.getAllByRole('radio');
    expect(radios[1]).toHaveAttribute('data-state', 'checked');
    expect(radios[0]).toHaveAttribute('data-state', 'unchecked');
  });

  test('disabled prop disables all items', () => {
    render(
      <RadioGroup disabled>
        <RadioGroupItem value="a" aria-label="a" />
        <RadioGroupItem value="b" aria-label="b" />
      </RadioGroup>,
    );
    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  test('single item with disabled prop is non-interactive', () => {
    const handler = vi.fn();
    render(
      <RadioGroup onValueChange={handler}>
        <RadioGroupItem value="a" aria-label="a" disabled />
      </RadioGroup>,
    );
    const radio = screen.getByRole('radio');
    expect(radio).toBeDisabled();
    fireEvent.click(radio);
    expect(handler).not.toHaveBeenCalled();
  });

  test('orientation="horizontal" applies flex-row class', () => {
    const { container } = render(
      <RadioGroup orientation="horizontal">
        <RadioGroupItem value="a" aria-label="a" />
      </RadioGroup>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toMatch(/flex-row/);
  });

  test('tone="danger" sets danger border class on checked item', () => {
    const { container } = render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" aria-label="a" tone="danger" />
      </RadioGroup>,
    );
    const btn = container.querySelector('button') as HTMLButtonElement;
    expect(btn.className).toMatch(/data-\[state=checked\]:border-danger-500/);
  });

  test('forwardRef points to the group root div element', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <RadioGroup ref={ref}>
        <RadioGroupItem value="a" aria-label="a" />
      </RadioGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
