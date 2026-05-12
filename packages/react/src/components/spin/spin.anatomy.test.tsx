/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Spin } from './spin.js';

describe('Spin anatomy', () => {
  test('default: Loader2 SVG has animate-spin text-primary-500 size-5', () => {
    const { container } = render(<Spin />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    const cls = svg!.getAttribute('class') ?? '';
    expect(cls).toMatch(/animate-spin/);
    expect(cls).toMatch(/text-primary-500/);
    expect(cls).toMatch(/size-5/);
  });

  test('with children: outer is relative inline-block; overlay is absolute inset-0 flex items-center justify-center', () => {
    const { container } = render(
      <Spin spinning>
        <span>child</span>
      </Spin>,
    );
    const outer = container.firstElementChild as HTMLElement;
    expect(outer.className).toMatch(/relative/);
    expect(outer.className).toMatch(/inline-block/);

    const overlay = outer.querySelector('.absolute') as HTMLElement;
    expect(overlay).toBeInTheDocument();
    expect(overlay.className).toMatch(/inset-0/);
    expect(overlay.className).toMatch(/flex/);
    expect(overlay.className).toMatch(/items-center/);
    expect(overlay.className).toMatch(/justify-center/);
  });
});
