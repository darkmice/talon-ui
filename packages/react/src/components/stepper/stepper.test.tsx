/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { createRef } from 'react';
import { Stepper } from './stepper.js';

const fourSteps = [
  { title: 'Repository' },
  { title: 'Build' },
  { title: 'Deploy' },
  { title: 'Verify' },
];

describe('Stepper', () => {
  test('renders 4 steps; first 2 complete, 3rd current, 4th idle when current=2', () => {
    const { container } = render(<Stepper steps={fourSteps} current={2} />);
    const items = Array.from(container.querySelectorAll('li'));
    expect(items).toHaveLength(4);
    expect(items[0]!.dataset['status']).toBe('complete');
    expect(items[1]!.dataset['status']).toBe('complete');
    expect(items[2]!.dataset['status']).toBe('current');
    expect(items[3]!.dataset['status']).toBe('idle');
  });

  test('explicit status="error" on a step overrides computed status', () => {
    const steps = [
      { title: 'Prep' },
      { title: 'Validate' },
      { title: 'Deploy', status: 'error' as const },
      { title: 'Wrap-up' },
    ];
    const { container } = render(<Stepper steps={steps} current={2} />);
    const items = Array.from(container.querySelectorAll('li'));
    // index 2 would normally be 'current' but explicit status wins
    expect(items[2]!.dataset['status']).toBe('error');
  });

  test('onStepClick fires with the correct index when indicator is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Stepper steps={fourSteps} current={1} onStepClick={handleClick} />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[2]!);
    expect(handleClick).toHaveBeenCalledWith(2);
  });

  test('vertical orientation switches root to flex-col', () => {
    const { container } = render(
      <Stepper steps={fourSteps} current={1} orientation="vertical" />,
    );
    const ol = container.querySelector('ol');
    expect(ol?.className).toMatch(/flex-col/);
  });

  test('forwardRef attaches to the outer ol element', () => {
    const ref = createRef<HTMLOListElement>();
    const { container } = render(<Stepper steps={fourSteps} current={0} ref={ref} />);
    const ol = container.querySelector('ol');
    expect(ref.current).toBe(ol);
  });

  test('no onStepClick — indicators are divs, not buttons', () => {
    render(<Stepper steps={fourSteps} current={1} />);
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });

  test('step with custom icon renders the icon instead of number/check/X', () => {
    const steps = [{ title: 'Custom', icon: <span data-testid="custom-icon">★</span> }];
    render(<Stepper steps={steps} current={0} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
