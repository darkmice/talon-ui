/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Result } from './result.js';

describe('Result anatomy', () => {
  test('Root is <div role="status"> with flex-col items-center text-center classes', () => {
    const { container } = render(<Result status="info" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.tagName).toBe('DIV');
    expect(root).toHaveAttribute('role', 'status');
    expect(root.className).toMatch(/flex-col/);
    expect(root.className).toMatch(/items-center/);
    expect(root.className).toMatch(/text-center/);
  });

  test('status="404" sets data-status="404", icon has text-text-tertiary class', () => {
    const { container } = render(<Result status="404" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute('data-status', '404');
    const iconSpan = root.querySelector('span') as HTMLElement;
    expect(iconSpan.className).toMatch(/text-text-tertiary/);
  });

  test('status="success" sets data-status="success", icon has text-status-done-fg class', () => {
    const { container } = render(<Result status="success" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute('data-status', 'success');
    const iconSpan = root.querySelector('span') as HTMLElement;
    expect(iconSpan.className).toMatch(/text-status-done-fg/);
  });

  test('icon wrapper has inline-flex items-center justify-center classes', () => {
    const { container } = render(<Result status="error" />);
    const root = container.firstElementChild as HTMLElement;
    const iconSpan = root.querySelector('span') as HTMLElement;
    expect(iconSpan.className).toMatch(/inline-flex/);
    expect(iconSpan.className).toMatch(/items-center/);
    expect(iconSpan.className).toMatch(/justify-center/);
  });

  test('size="md" applies [&>svg]:size-14 to icon wrapper', () => {
    const { container } = render(<Result status="info" size="md" />);
    const root = container.firstElementChild as HTMLElement;
    const iconSpan = root.querySelector('span') as HTMLElement;
    expect(iconSpan.className).toMatch(/size-14/);
  });

  test('size="lg" applies [&>svg]:size-20 to icon wrapper', () => {
    const { container } = render(<Result status="info" size="lg" />);
    const root = container.firstElementChild as HTMLElement;
    const iconSpan = root.querySelector('span') as HTMLElement;
    expect(iconSpan.className).toMatch(/size-20/);
  });
});
