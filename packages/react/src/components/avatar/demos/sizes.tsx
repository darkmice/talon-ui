/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Avatar } from '@talon-ui/react';

export default function Demo() {
  return (
    <div className="flex items-center gap-tp-3">
      <Avatar size="sm" fallback="SM" />
      <Avatar size="md" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
    </div>
  );
}
