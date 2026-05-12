/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { createRef } from 'react';
import { Result } from './result.js';

describe('Result', () => {
  test('status="success" renders CheckCircle2 icon with text-status-done-fg class', () => {
    const { container } = render(<Result status="success" />);
    const iconWrapper = container.querySelector('[class*="text-status-done-fg"]');
    expect(iconWrapper).toBeInTheDocument();
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('status="error" renders XCircle icon with text-danger-500 class', () => {
    const { container } = render(<Result status="error" />);
    const iconWrapper = container.querySelector('[class*="text-danger-500"]');
    expect(iconWrapper).toBeInTheDocument();
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('without title, uses default title for status', () => {
    render(<Result status="success" />);
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  test('without title, shows correct default for 404', () => {
    render(<Result status="404" />);
    expect(screen.getByText('404 — Not found')).toBeInTheDocument();
  });

  test('without title, shows correct default for 500', () => {
    render(<Result status="500" />);
    expect(screen.getByText('500 — Internal error')).toBeInTheDocument();
  });

  test('custom title overrides default title', () => {
    render(<Result status="success" title="Deployment complete" />);
    expect(screen.getByText('Deployment complete')).toBeInTheDocument();
    expect(screen.queryByText('Success')).not.toBeInTheDocument();
  });

  test('description renders when provided', () => {
    render(<Result status="info" description="Something happened." />);
    expect(screen.getByText('Something happened.')).toBeInTheDocument();
  });

  test('description does not render when omitted', () => {
    const { container } = render(<Result status="info" />);
    const paras = container.querySelectorAll('p');
    // Only the title paragraph
    expect(paras.length).toBe(1);
  });

  test('extra slot renders action content', () => {
    render(
      <Result
        status="success"
        extra={<button>Go to dashboard</button>}
      />,
    );
    expect(screen.getByRole('button', { name: 'Go to dashboard' })).toBeInTheDocument();
  });

  test('extra slot wrapper has flex justify-center gap', () => {
    const { container } = render(
      <Result status="success" extra={<button>Action</button>} />,
    );
    const extraDiv = container.querySelector('[class*="flex"][class*="justify-center"]');
    expect(extraDiv).toBeInTheDocument();
  });

  test('custom icon overrides default status icon', () => {
    const { container } = render(
      <Result status="success" icon={<span data-testid="custom-icon" />} />,
    );
    expect(container.querySelector('[data-testid="custom-icon"]')).toBeInTheDocument();
    // No svg from lucide
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  test('forwardRef points to the outer div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Result status="info" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  test('default status is info when none specified', () => {
    render(<Result />);
    expect(screen.getByText('Info')).toBeInTheDocument();
  });
});
