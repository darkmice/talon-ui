/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Button, Input, Tag, Avatar } from '../index.js';

const runAxe = async (node: Element) => {
  const axe = (globalThis as { __runAxe: typeof import('axe-core') }).__runAxe;
  return axe.run(node, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
  });
};

describe('a11y smoke (axe-core)', () => {
  test('Button has zero a11y violations', async () => {
    const { container } = render(<Button>Save</Button>);
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });

  test('Input has zero a11y violations', async () => {
    const { container } = render(
      <label>
        <span style={{ display: 'none' }}>Username</span>
        <Input placeholder="Username" />
      </label>,
    );
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });

  test('Tag has zero a11y violations', async () => {
    const { container } = render(<Tag tone="done">Online</Tag>);
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });

  test('Avatar has zero a11y violations', async () => {
    const { container } = render(<Avatar alt="Ada Lovelace" fallback="AL" />);
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });
});
