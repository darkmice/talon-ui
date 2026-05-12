/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { FileRefRow } from './file-ref-row.js';
import { RoleRow } from './role-row.js';
import { RuntimeRow } from './runtime-row.js';
import { RiskRow } from './risk-row.js';

describe('BusinessRows anatomy', () => {
  // FileRefRow
  test('FileRefRow root has h-8 and hover:bg-bg-subtle', () => {
    const { container } = render(<FileRefRow path="src/index.ts" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toMatch(/h-8/);
    expect(root.className).toMatch(/hover:bg-bg-subtle/);
  });

  // RoleRow
  test('RoleRow root has h-10; icon container has size-6 rounded-sm bg-bg-subtle', () => {
    const { container } = render(<RoleRow name="Owners" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toMatch(/h-10/);

    const iconWrapper = root.querySelector('span');
    expect(iconWrapper?.className).toMatch(/size-6/);
    expect(iconWrapper?.className).toMatch(/rounded-sm/);
    expect(iconWrapper?.className).toMatch(/bg-bg-subtle/);
  });

  // RuntimeRow
  test('RuntimeRow root has h-14; offline status adds opacity-70', () => {
    const { container: c1 } = render(<RuntimeRow name="runner" status="online" />);
    const root1 = c1.firstElementChild as HTMLElement;
    expect(root1.className).toMatch(/h-14/);
    expect(root1.className).not.toMatch(/opacity-70/);

    const { container: c2 } = render(<RuntimeRow name="runner" status="offline" />);
    const root2 = c2.firstElementChild as HTMLElement;
    expect(root2.className).toMatch(/opacity-70/);
  });

  // RiskRow
  test('RiskRow icon wrapper has text-status-pending-fg and renders AlertTriangle by default', () => {
    const { container } = render(<RiskRow message="Some risk." />);
    const iconWrapper = container.querySelector('span');
    expect(iconWrapper?.className).toMatch(/text-status-pending-fg/);
    // AlertTriangle SVG should be rendered inside
    const svg = iconWrapper?.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
