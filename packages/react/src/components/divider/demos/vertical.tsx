/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Divider } from '@talon-ui/react';

export default function Demo() {
  return (
    <div className="flex items-center gap-tp-2 text-body">
      <span>Edit</span>
      <Divider orientation="vertical" />
      <span>Duplicate</span>
      <Divider orientation="vertical" />
      <span>Delete</span>
    </div>
  );
}
