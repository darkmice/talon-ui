/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Collapse, CollapsePanel, CollapseHeader, CollapseContent } from './collapse.js';

function SimpleCollapse() {
  return (
    <Collapse type="single" defaultValue="a">
      <CollapsePanel value="a">
        <CollapseHeader>Section A</CollapseHeader>
        <CollapseContent>Content A</CollapseContent>
      </CollapsePanel>
    </Collapse>
  );
}

describe('Collapse anatomy (design.md §6.47)', () => {
  test('Root has flex flex-col border border-border rounded-md bg-bg-surface divide-y divide-border', () => {
    const { container } = render(<SimpleCollapse />);
    const root = container.firstElementChild as HTMLElement;
    const cls = root.className;
    expect(cls).toMatch(/flex/);
    expect(cls).toMatch(/flex-col/);
    expect(cls).toMatch(/border/);
    expect(cls).toMatch(/border-border/);
    expect(cls).toMatch(/rounded-md/);
    expect(cls).toMatch(/bg-bg-surface/);
    expect(cls).toMatch(/divide-y/);
    expect(cls).toMatch(/divide-border/);
  });

  test('Header trigger renders with h-11 px-tp-4 and contains a ChevronRight SVG', () => {
    render(<SimpleCollapse />);
    const trigger = screen.getByRole('button', { name: /Section A/i });
    const cls = trigger.className;
    expect(cls).toMatch(/h-11/);
    expect(cls).toMatch(/px-tp-4/);
    // ChevronRight renders as svg inside the trigger
    const svg = trigger.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
