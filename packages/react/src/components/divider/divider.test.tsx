/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { createRef } from 'react';
import { Divider } from './divider.js';

describe('Divider', () => {
  test('default renders <hr> with role="separator" and aria-orientation="horizontal"', () => {
    const { container } = render(<Divider />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('HR');
    expect(el).toHaveAttribute('role', 'separator');
    expect(el).toHaveAttribute('aria-orientation', 'horizontal');
  });

  test('orientation="vertical" renders <span> with aria-orientation="vertical"', () => {
    const { container } = render(<Divider orientation="vertical" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('SPAN');
    expect(el).toHaveAttribute('role', 'separator');
    expect(el).toHaveAttribute('aria-orientation', 'vertical');
  });

  test('with children and horizontal: renders <div> with role="separator" and label text', () => {
    render(<Divider>Section title</Divider>);
    const separator = screen.getByRole('separator');
    expect(separator.tagName).toBe('DIV');
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
    expect(screen.getByText('Section title')).toBeInTheDocument();
  });

  test('tone="strong" adds border-border-strong class', () => {
    const { container } = render(<Divider tone="strong" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toMatch(/border-border-strong/);
  });

  test('custom className is preserved alongside variant classes', () => {
    const { container } = render(<Divider className="my-custom-class" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toMatch(/my-custom-class/);
    expect(el.className).toMatch(/border-border/);
  });

  test('forwardRef points to the rendered element (horizontal <hr>)', () => {
    const ref = createRef<HTMLElement>();
    render(<Divider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLHRElement);
  });

  test('forwardRef points to the rendered element (vertical <span>)', () => {
    const ref = createRef<HTMLElement>();
    render(<Divider ref={ref} orientation="vertical" />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  test('forwardRef points to the rendered element (labelled <div>)', () => {
    const ref = createRef<HTMLElement>();
    render(<Divider ref={ref}>Label</Divider>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  test('tone="subtle" adds border-bg-subtle class', () => {
    const { container } = render(<Divider tone="subtle" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toMatch(/border-bg-subtle/);
  });

  test('false children renders plain <hr> (not labelled)', () => {
    const { container } = render(<Divider>{false}</Divider>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('HR');
  });
});
