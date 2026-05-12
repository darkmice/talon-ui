/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Badge } from '@talon-ui/react';

export default function Demo() {
  return (
    <div className="flex items-center gap-tp-4">
      <Badge count={3} />
      <Badge count={12} tone="primary" />
      <Badge count={1} tone="success" />
      <Badge count={42} tone="neutral" />
    </div>
  );
}
