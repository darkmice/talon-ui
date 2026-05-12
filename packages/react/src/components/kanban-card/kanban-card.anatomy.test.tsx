/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { KanbanCard } from './kanban-card.js';

describe('KanbanCard anatomy (design.md §6.8)', () => {
  test('Card root has Card-style classes: border, rounded-lg, bg-bg-surface', () => {
    const { container } = render(<KanbanCard title="Anatomy check" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('DIV');
    const cls = el.className;
    expect(cls).toMatch(/rounded-lg/);
    expect(cls).toMatch(/bg-bg-surface/);
    expect(cls).toMatch(/border/);
    expect(cls).toMatch(/border-border/);
  });

  test('title has text-body-strong class', () => {
    const { container } = render(<KanbanCard title="Body strong title" />);
    const titleEl = container.querySelector('.text-body-strong');
    expect(titleEl).toBeInTheDocument();
    expect(titleEl?.textContent).toBe('Body strong title');
  });

  test('description has text-caption, text-text-secondary and line-clamp-2 classes', () => {
    const { container } = render(
      <KanbanCard title="Task" description="A description line here." />,
    );
    const descEl = container.querySelector('.text-caption.text-text-secondary.line-clamp-2');
    expect(descEl).toBeInTheDocument();
    expect(descEl?.textContent).toBe('A description line here.');
  });

  test('size="sm" applies max-w-[280px]; size="md" applies max-w-[320px]', () => {
    const { container: c1 } = render(<KanbanCard title="sm" size="sm" />);
    expect((c1.firstElementChild as HTMLElement).className).toMatch(/max-w-\[280px\]/);

    const { container: c2 } = render(<KanbanCard title="md" size="md" />);
    expect((c2.firstElementChild as HTMLElement).className).toMatch(/max-w-\[320px\]/);
  });

  test('id is rendered with font-mono and text-text-tertiary', () => {
    const { container } = render(<KanbanCard id="TALON-12" title="Task" />);
    const idEl = container.querySelector('.font-mono.text-text-tertiary');
    expect(idEl).toBeInTheDocument();
    expect(idEl?.textContent).toBe('TALON-12');
  });
});
