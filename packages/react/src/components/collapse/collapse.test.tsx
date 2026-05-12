/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { createRef } from 'react';
import { Collapse, CollapsePanel, CollapseHeader, CollapseContent } from './collapse.js';

function BasicCollapse({ type = 'single' as const, collapsible = false }) {
  return (
    <Collapse type={type} defaultValue="a" collapsible={collapsible}>
      <CollapsePanel value="a">
        <CollapseHeader>Panel A</CollapseHeader>
        <CollapseContent>Content A</CollapseContent>
      </CollapsePanel>
      <CollapsePanel value="b">
        <CollapseHeader>Panel B</CollapseHeader>
        <CollapseContent>Content B</CollapseContent>
      </CollapsePanel>
    </Collapse>
  );
}

describe('Collapse', () => {
  test('type="single" defaultValue="a" — panel A is open initially', () => {
    render(<BasicCollapse />);
    expect(screen.getByText('Content A')).toBeInTheDocument();
    const triggerA = screen.getByRole('button', { name: /Panel A/i });
    expect(triggerA).toHaveAttribute('data-state', 'open');
  });

  test('clicking second header opens it and closes the first', async () => {
    const user = userEvent.setup();
    render(<BasicCollapse />);
    const triggerB = screen.getByRole('button', { name: /Panel B/i });
    await user.click(triggerB);
    expect(triggerB).toHaveAttribute('data-state', 'open');
    const triggerA = screen.getByRole('button', { name: /Panel A/i });
    expect(triggerA).toHaveAttribute('data-state', 'closed');
  });

  test('type="single" collapsible — clicking the open panel closes it', async () => {
    const user = userEvent.setup();
    render(<BasicCollapse collapsible />);
    const triggerA = screen.getByRole('button', { name: /Panel A/i });
    expect(triggerA).toHaveAttribute('data-state', 'open');
    await user.click(triggerA);
    expect(triggerA).toHaveAttribute('data-state', 'closed');
  });

  test('type="multiple" allows several open at once', async () => {
    const user = userEvent.setup();
    render(
      <Collapse type="multiple" defaultValue={['a']}>
        <CollapsePanel value="a">
          <CollapseHeader>Panel A</CollapseHeader>
          <CollapseContent>Content A</CollapseContent>
        </CollapsePanel>
        <CollapsePanel value="b">
          <CollapseHeader>Panel B</CollapseHeader>
          <CollapseContent>Content B</CollapseContent>
        </CollapsePanel>
      </Collapse>,
    );
    const triggerA = screen.getByRole('button', { name: /Panel A/i });
    const triggerB = screen.getByRole('button', { name: /Panel B/i });
    expect(triggerA).toHaveAttribute('data-state', 'open');
    await user.click(triggerB);
    // both open simultaneously
    expect(triggerA).toHaveAttribute('data-state', 'open');
    expect(triggerB).toHaveAttribute('data-state', 'open');
  });

  test('extra slot renders in the header', () => {
    render(
      <Collapse type="single">
        <CollapsePanel value="a">
          <CollapseHeader extra="3 items">Panel A</CollapseHeader>
          <CollapseContent>Content A</CollapseContent>
        </CollapsePanel>
      </Collapse>,
    );
    expect(screen.getByText('3 items')).toBeInTheDocument();
  });

  test('forwardRef on Collapse points to the root div', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Collapse type="single" ref={ref}>
        <CollapsePanel value="a">
          <CollapseHeader>Panel A</CollapseHeader>
          <CollapseContent>Content A</CollapseContent>
        </CollapsePanel>
      </Collapse>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
