/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { createRef } from 'react';
import { Empty } from './empty.js';

describe('Empty', () => {
  test('default renders the Inbox icon with no title or description', () => {
    const { container } = render(<Empty />);
    // role="status" present
    expect(container.querySelector('[role="status"]')).toBeInTheDocument();
    // SVG rendered (Inbox icon)
    expect(container.querySelector('svg')).toBeInTheDocument();
    // No paragraph elements
    expect(container.querySelectorAll('p')).toHaveLength(0);
  });

  test('title and description render when provided', () => {
    render(<Empty title="No data" description="Nothing to show here." />);
    expect(screen.getByText('No data')).toBeInTheDocument();
    expect(screen.getByText('Nothing to show here.')).toBeInTheDocument();
  });

  test('action slot renders when provided', () => {
    render(<Empty action={<button>Create item</button>} />);
    expect(screen.getByRole('button', { name: 'Create item' })).toBeInTheDocument();
  });

  test('size="lg" applies py-tp-10 and icon size-16', () => {
    const { container } = render(<Empty size="lg" />);
    const root = container.querySelector('[role="status"]') as HTMLElement;
    expect(root.className).toMatch(/py-tp-10/);
    const iconWrapper = root.firstElementChild as HTMLElement;
    expect(iconWrapper.className).toMatch(/size-16/);
  });

  test('custom icon replaces the default Inbox icon', () => {
    render(<Empty icon={<span data-testid="custom-icon" />} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  test('forwardRef points to the outer div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Empty ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.getAttribute('role')).toBe('status');
  });
});
