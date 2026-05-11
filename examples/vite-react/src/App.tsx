/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cn } from '@talon-ui/react';

export default function App() {
  return (
    <main className={cn('mx-auto max-w-2xl p-tp-8 space-y-tp-4')}>
      <h1 className="text-h1">@talon-ui/react · smoke test</h1>
      <p className="text-body text-text-secondary">
        If you see this rendered with Inter + tokenised spacing, the foundation works.
      </p>
      <button
        type="button"
        className={cn(
          'inline-flex h-control-md items-center rounded-md bg-primary-500 px-tp-4 text-text-on-primary',
          'transition duration-fast ease-tp hover:bg-primary-600 focus-visible:tp-focus-ring',
        )}
      >
        Smoke test
      </button>
    </main>
  );
}
