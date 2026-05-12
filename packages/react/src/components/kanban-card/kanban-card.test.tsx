/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { KanbanCard } from './kanban-card.js';

const defaultAssignees = [
  { id: '1', name: 'Ada Lovelace', fallback: 'AL' },
  { id: '2', name: 'Brian Kernighan', fallback: 'BK' },
  { id: '3', name: 'Carmen Sandiego', fallback: 'CS' },
  { id: '4', name: 'Dorothy Vaughan', fallback: 'DV' },
];

describe('KanbanCard', () => {
  test('renders id and title', () => {
    render(<KanbanCard id="TALON-12" title="Wire up release pipeline" />);
    expect(screen.getByText('TALON-12')).toBeInTheDocument();
    expect(screen.getByText('Wire up release pipeline')).toBeInTheDocument();
  });

  test('renders tags via Tag component', () => {
    render(
      <KanbanCard
        title="Task"
        tags={[
          { label: 'release', tone: 'info' },
          { label: 'infra' },
        ]}
      />,
    );
    expect(screen.getByText('release')).toBeInTheDocument();
    expect(screen.getByText('infra')).toBeInTheDocument();
  });

  test('renders assignees via AvatarGroup; >3 shows overflow chip', () => {
    render(
      <KanbanCard
        title="Triage bugs"
        assignees={defaultAssignees}
      />,
    );
    // With max=3, 4 assignees → overflow chip showing "+1"
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  test('renders Progress bar when progress prop provided', () => {
    const { container } = render(<KanbanCard title="Block 4" progress={70} />);
    const progressbar = container.querySelector('[role="progressbar"]');
    expect(progressbar).toBeInTheDocument();
  });

  test('onSelect makes card clickable and aria-pressed reflects selected state', async () => {
    const onSelect = vi.fn();
    const { rerender, container } = render(
      <KanbanCard title="Task" onSelect={onSelect} selected={false} />,
    );
    const card = container.firstElementChild as HTMLElement;
    expect(card).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(card);
    expect(onSelect).toHaveBeenCalledOnce();

    rerender(<KanbanCard title="Task" onSelect={onSelect} selected={true} />);
    expect(container.firstElementChild).toHaveAttribute('aria-pressed', 'true');
  });

  test('selected=true adds ring-2 and ring-primary-500 classes', () => {
    const { container } = render(<KanbanCard title="Task" selected={true} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toMatch(/ring-2/);
    expect(el.className).toMatch(/ring-primary-500/);
  });

  test('forwardRef points to outer Card div', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<KanbanCard ref={ref} title="ref-test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  test('renders description when provided', () => {
    render(
      <KanbanCard
        title="Task"
        description="Configure Changesets and the GitHub release workflow."
      />,
    );
    expect(screen.getByText('Configure Changesets and the GitHub release workflow.')).toBeInTheDocument();
  });

  test('renders timestamp when provided', () => {
    render(<KanbanCard title="Task" timestamp="Updated 2h ago" />);
    expect(screen.getByText('Updated 2h ago')).toBeInTheDocument();
  });

  test('does not render aria-pressed when onSelect is not provided', () => {
    const { container } = render(<KanbanCard title="Task" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).not.toHaveAttribute('aria-pressed');
  });
});
