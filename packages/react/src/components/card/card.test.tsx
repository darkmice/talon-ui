/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Card } from './card.js';

describe('Card', () => {
  test('renders children inside a div', () => {
    render(<Card>hello card</Card>);
    expect(screen.getByText('hello card')).toBeInTheDocument();
    const div = screen.getByText('hello card').closest('div');
    expect(div).toBeInTheDocument();
  });

  test('default padding is md → class includes p-tp-5', () => {
    const { container } = render(<Card>content</Card>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toMatch(/p-tp-5/);
  });

  test('padding="sm" → p-tp-3; padding="none" → p-0', () => {
    const { container: c1 } = render(<Card padding="sm">sm</Card>);
    expect((c1.firstElementChild as HTMLElement).className).toMatch(/p-tp-3/);

    const { container: c2 } = render(<Card padding="none">none</Card>);
    expect((c2.firstElementChild as HTMLElement).className).toMatch(/p-0/);
  });

  test('hoverable adds hover:border-primary-200 class', () => {
    const { container } = render(<Card hoverable>hover me</Card>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toMatch(/hover:border-primary-200/);
  });

  test('interactive adds cursor-pointer, focus-visible:tp-focus-ring, role="button", tabIndex=0', () => {
    const { container } = render(<Card interactive>clickable</Card>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toMatch(/cursor-pointer/);
    expect(el.className).toMatch(/focus-visible:tp-focus-ring/);
    expect(el).toHaveAttribute('role', 'button');
    expect(el).toHaveAttribute('tabindex', '0');
  });

  test('asChild renders as the child element type (e.g. <a>)', () => {
    const { container } = render(
      <Card asChild>
        <a href="/test">link card</a>
      </Card>,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('A');
    expect(el).toHaveAttribute('href', '/test');
  });

  test('forwardRef points to the outer element', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Card ref={ref}>ref-test</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  test('custom role overrides the auto-button from interactive', () => {
    const { container } = render(
      <Card interactive role="article">
        custom role
      </Card>,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveAttribute('role', 'article');
  });
});
