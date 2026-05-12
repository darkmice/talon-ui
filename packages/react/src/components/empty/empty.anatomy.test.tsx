/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Empty } from './empty.js';

describe('Empty anatomy (design.md §6.11)', () => {
  test('default: root is <div role="status"> with flex-col items-center text-center', () => {
    const { container } = render(<Empty />);
    const root = container.querySelector('[role="status"]') as HTMLElement;
    expect(root).toBeInTheDocument();
    expect(root.tagName).toBe('DIV');
    const cls = root.className;
    expect(cls).toMatch(/flex/);
    expect(cls).toMatch(/flex-col/);
    expect(cls).toMatch(/items-center/);
    expect(cls).toMatch(/text-center/);
  });

  test('icon container has text-text-tertiary and default size-12', () => {
    const { container } = render(<Empty />);
    const root = container.querySelector('[role="status"]') as HTMLElement;
    const iconWrapper = root.firstElementChild as HTMLElement;
    expect(iconWrapper.className).toMatch(/text-text-tertiary/);
    expect(iconWrapper.className).toMatch(/size-12/);
  });

  test('md size (default): root has py-tp-8', () => {
    const { container } = render(<Empty />);
    const root = container.querySelector('[role="status"]') as HTMLElement;
    expect(root.className).toMatch(/py-tp-8/);
  });

  test('sm size: root has py-tp-5 and icon has size-8', () => {
    const { container } = render(<Empty size="sm" />);
    const root = container.querySelector('[role="status"]') as HTMLElement;
    expect(root.className).toMatch(/py-tp-5/);
    const iconWrapper = root.firstElementChild as HTMLElement;
    expect(iconWrapper.className).toMatch(/size-8/);
  });

  test('title renders in a <p> with text-body-strong text-text-primary', () => {
    const { container } = render(<Empty title="My title" />);
    const titleEl = container.querySelector('p') as HTMLElement;
    expect(titleEl).toBeInTheDocument();
    expect(titleEl.className).toMatch(/text-body-strong/);
    expect(titleEl.className).toMatch(/text-text-primary/);
  });

  test('action slot is wrapped in a div with mt-tp-4', () => {
    const { container } = render(<Empty action={<button>Go</button>} />);
    const actionWrapper = container.querySelector('.mt-tp-4') as HTMLElement;
    expect(actionWrapper).toBeInTheDocument();
    expect(actionWrapper.querySelector('button')).toBeInTheDocument();
  });
});
