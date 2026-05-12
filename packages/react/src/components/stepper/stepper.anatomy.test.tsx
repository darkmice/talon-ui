/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Stepper } from './stepper.js';

const fourSteps = [
  { title: 'Repository' },
  { title: 'Build' },
  { title: 'Deploy' },
  { title: 'Verify' },
];

describe('Stepper anatomy (design.md §6.9)', () => {
  test('root is <ol role="list" aria-label="Steps"> with flex-row (horizontal)', () => {
    const { container } = render(<Stepper steps={fourSteps} current={1} />);
    const ol = container.querySelector('ol');
    expect(ol).toBeInTheDocument();
    expect(ol?.getAttribute('role')).toBe('list');
    expect(ol?.getAttribute('aria-label')).toBe('Steps');
    expect(ol?.className).toMatch(/flex-row/);
  });

  test('current step has aria-current="step"', () => {
    const { container } = render(<Stepper steps={fourSteps} current={2} />);
    const items = Array.from(container.querySelectorAll('li'));
    // Only the current step should have aria-current
    expect(items[2]!.getAttribute('aria-current')).toBe('step');
    expect(items[0]!.getAttribute('aria-current')).toBeNull();
    expect(items[1]!.getAttribute('aria-current')).toBeNull();
    expect(items[3]!.getAttribute('aria-current')).toBeNull();
  });

  test('complete step connector uses bg-primary-200; idle step connector uses bg-border', () => {
    const { container } = render(<Stepper steps={fourSteps} current={2} />);
    // There are 3 connectors (after steps 0, 1, 2)
    const connectors = Array.from(container.querySelectorAll('span[aria-hidden]'));
    expect(connectors).toHaveLength(3);
    // Step 0 is complete → connector bg-primary-200
    expect(connectors[0]!.className).toMatch(/bg-primary-200/);
    // Step 1 is complete → connector bg-primary-200
    expect(connectors[1]!.className).toMatch(/bg-primary-200/);
    // Step 2 is current → connector bg-primary-200
    expect(connectors[2]!.className).toMatch(/bg-primary-200/);
  });

  test('idle step connector uses bg-border', () => {
    const { container } = render(<Stepper steps={fourSteps} current={0} />);
    const connectors = Array.from(container.querySelectorAll('span[aria-hidden]'));
    expect(connectors).toHaveLength(3);
    // Steps 1,2,3 are idle → their preceding connectors use bg-border
    // Step 0 is current → connector bg-primary-200
    expect(connectors[0]!.className).toMatch(/bg-primary-200/);
    // Steps 1 is idle
    expect(connectors[1]!.className).toMatch(/bg-border/);
    expect(connectors[2]!.className).toMatch(/bg-border/);
  });

  test('data-orientation attribute reflects the orientation prop', () => {
    const { container } = render(
      <Stepper steps={fourSteps} current={1} orientation="vertical" />,
    );
    const ol = container.querySelector('ol');
    expect(ol?.getAttribute('data-orientation')).toBe('vertical');
  });
});
