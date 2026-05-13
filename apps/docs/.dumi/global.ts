/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

// Load the compiled tokens + Tailwind utilities so demos render with the
// real Talon Pilot visual style. The file is built by packages/react's
// build-css step and contains:
//   1) :root token CSS variables (light + dark via [data-theme="dark"])
//   2) the full Tailwind utility output used by every component
import '../../../packages/react/dist/styles.css';
import './site-overrides.css';

if (typeof document !== 'undefined') {
  const root = document.documentElement;

  const syncTheme = () => {
    const prefers = root.getAttribute('data-prefers-color');

    if (prefers === 'light' || prefers === 'dark') {
      root.setAttribute('data-theme', prefers);
    } else {
      root.removeAttribute('data-theme');
    }
  };

  syncTheme();

  new MutationObserver(syncTheme).observe(root, {
    attributes: true,
    attributeFilter: ['data-prefers-color'],
  });
}
