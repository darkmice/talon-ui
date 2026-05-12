/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { createRef } from 'react';
import { Banner } from './banner.js';

describe('Banner', () => {
  test('renders title and children', () => {
    render(<Banner title="Heads up">Something happened.</Banner>);
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    expect(screen.getByText('Something happened.')).toBeInTheDocument();
  });

  test('tone="success" applies success bg and left-bar classes', () => {
    const { container } = render(<Banner tone="success" title="Done" />);
    const outer = container.firstElementChild as HTMLElement;
    expect(outer.className).toMatch(/bg-status-done-bg/);
    const bar = outer.querySelector('[aria-hidden="true"]:first-child') as HTMLElement;
    expect(bar.className).toMatch(/bg-status-done-fg/);
    expect(bar.className).toMatch(/w-1/);
  });

  test('custom icon replaces default tone icon', () => {
    const CustomIcon = () => <svg data-testid="custom-icon" />;
    render(<Banner tone="info" icon={<CustomIcon />} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  test('action slot renders on the right', () => {
    render(
      <Banner tone="info" action={<button>Review</button>}>
        Body text
      </Banner>,
    );
    expect(screen.getByRole('button', { name: 'Review' })).toBeInTheDocument();
  });

  test('onDismiss: dismiss button is visible and clicking fires callback', () => {
    const onDismiss = vi.fn();
    render(<Banner tone="warning" title="Warning" onDismiss={onDismiss} />);
    const dismissBtn = screen.getByRole('button', { name: 'Dismiss' });
    expect(dismissBtn).toBeInTheDocument();
    fireEvent.click(dismissBtn);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  test('without onDismiss the dismiss button is not rendered', () => {
    render(<Banner tone="info" title="No dismiss" />);
    expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
  });

  test('forwardRef points to the outer div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Banner ref={ref} title="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  test('has role="status"', () => {
    render(<Banner title="Status" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
