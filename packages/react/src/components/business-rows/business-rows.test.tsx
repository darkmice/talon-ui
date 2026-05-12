/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { FileRefRow } from './file-ref-row.js';
import { RoleRow } from './role-row.js';
import { RuntimeRow } from './runtime-row.js';
import { RiskRow } from './risk-row.js';

// ─── FileRefRow ───────────────────────────────────────────────────────────────

describe('FileRefRow', () => {
  test('renders path and timestamp', () => {
    render(
      <FileRefRow path="packages/react/src/index.ts" timestamp="2h ago" />,
    );
    expect(screen.getByText('packages/react/src/index.ts')).toBeInTheDocument();
    expect(screen.getByText('2h ago')).toBeInTheDocument();
  });

  test('renders as <div> by default', () => {
    const { container } = render(<FileRefRow path="some/path.ts" />);
    expect(container.firstElementChild?.tagName).toBe('DIV');
  });

  test('href prop renders an <a> element', () => {
    const { container } = render(
      <FileRefRow path="some/path.ts" href="https://example.com" />,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('A');
    expect(el).toHaveAttribute('href', 'https://example.com');
  });

  test('omitting timestamp does not render timestamp span', () => {
    const { container } = render(<FileRefRow path="foo/bar.ts" />);
    // The only spans should be the icon wrapper and the path span (no timestamp)
    const spans = container.querySelectorAll('span');
    // icon wrapper span + path span = 2 spans; no timestamp span
    expect(spans).toHaveLength(2);
  });

  test('forwardRef points to the root element', () => {
    const ref = { current: null as HTMLElement | null };
    render(<FileRefRow ref={ref} path="ref-test.ts" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// ─── RoleRow ─────────────────────────────────────────────────────────────────

const makeMembers = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    name: `Member ${i + 1}`,
  }));

describe('RoleRow', () => {
  test('renders role name and member count', () => {
    render(<RoleRow name="Owners" members={makeMembers(2)} />);
    expect(screen.getByText('Owners')).toBeInTheDocument();
    expect(screen.getByText('2 人')).toBeInTheDocument();
  });

  test('AvatarGroup shows overflow chip for >3 members', () => {
    render(<RoleRow name="Maintainers" members={makeMembers(5)} />);
    // AvatarGroup max=3, 5 members → +2 overflow
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  test('renders manage link when manageHref is provided', () => {
    render(
      <RoleRow name="Viewers" members={[]} manageHref="/manage" manageLabel="Manage members" />,
    );
    const link = screen.getByRole('link', { name: 'Manage members' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/manage');
  });

  test('does not render manage link without manageHref', () => {
    render(<RoleRow name="Viewers" members={[]} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  test('forwardRef points to the root div', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<RoleRow ref={ref} name="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// ─── RuntimeRow ──────────────────────────────────────────────────────────────

describe('RuntimeRow', () => {
  test('online: renders status tag with done tone and CPU/MEM values', () => {
    render(
      <RuntimeRow name="runner-east-01" status="online" cpu={42} memory={61} />,
    );
    expect(screen.getByText('runner-east-01')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
    expect(screen.getByText('CPU 42%')).toBeInTheDocument();
    expect(screen.getByText('MEM 61%')).toBeInTheDocument();
  });

  test('offline: opacity-70 class applied and shows dashes for CPU/MEM', () => {
    const { container } = render(
      <RuntimeRow name="runner-asia-03" status="offline" cpu={50} memory={60} />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toMatch(/opacity-70/);
    expect(screen.getByText('CPU –')).toBeInTheDocument();
    expect(screen.getByText('MEM –')).toBeInTheDocument();
  });

  test('renders engine chip when provided', () => {
    render(<RuntimeRow name="runner" status="idle" engine="bun 1.2" />);
    expect(screen.getByText('bun 1.2')).toBeInTheDocument();
  });

  test('renders leases count when provided', () => {
    render(<RuntimeRow name="runner" status="online" leases={6} />);
    expect(screen.getByText('6 leases')).toBeInTheDocument();
  });

  test('forwardRef points to the root div', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<RuntimeRow ref={ref} name="runner" status="online" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// ─── RiskRow ─────────────────────────────────────────────────────────────────

describe('RiskRow', () => {
  test('renders message content', () => {
    render(<RiskRow message="Missing billing method." />);
    expect(screen.getByText('Missing billing method.')).toBeInTheDocument();
  });

  test('actionHref renders a Link with arrow', () => {
    render(
      <RiskRow message="Add billing." actionLabel="Add billing" actionHref="/billing" />,
    );
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link.textContent).toContain('→');
  });

  test('onAction renders a button that fires on click', async () => {
    const onAction = vi.fn();
    render(
      <RiskRow message="CPU high." actionLabel="View nodes" onAction={onAction} />,
    );
    const btn = screen.getByRole('button', { name: /View nodes/ });
    await userEvent.click(btn);
    expect(onAction).toHaveBeenCalledOnce();
  });

  test('no action rendered when neither actionHref nor onAction provided', () => {
    render(<RiskRow message="Informational only." />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('forwardRef points to the root div', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<RiskRow ref={ref} message="ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
