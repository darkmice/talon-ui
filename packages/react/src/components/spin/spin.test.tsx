/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { createRef } from 'react';
import { Spin } from './spin.js';

describe('Spin', () => {
  test('default renders spinner inside <span role="status">', () => {
    render(<Spin />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('tip="Loading…" renders text below spinner', () => {
    render(<Spin tip="Loading…" />);
    expect(screen.getByText('Loading…')).toBeInTheDocument();
    // aria-label should be the tip string
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading…');
  });

  test('with children: wraps children + overlay; spinning=false removes overlay; children stay rendered', () => {
    const { rerender } = render(
      <Spin spinning>
        <p>content</p>
      </Spin>,
    );
    // children present
    expect(screen.getByText('content')).toBeInTheDocument();
    // overlay (status) present
    expect(screen.getByRole('status')).toBeInTheDocument();

    rerender(
      <Spin spinning={false}>
        <p>content</p>
      </Spin>,
    );
    // children still rendered
    expect(screen.getByText('content')).toBeInTheDocument();
    // overlay removed
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  test('spinning=false (no children) renders nothing', () => {
    const { container } = render(<Spin spinning={false} />);
    // outer div exists but no status role
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    // outer div should be empty
    expect(container.firstElementChild?.textContent).toBe('');
  });

  test('size="lg" applies size-7 to the icon', () => {
    const { container } = render(<Spin size="lg" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg!.getAttribute('class')).toMatch(/size-7/);
  });

  test('forwardRef points to outer div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Spin ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
