/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Input } from '@talon-ui/react';

export default function Demo() {
  return (
    <div className="flex flex-col gap-tp-3">
      <Input prefix={<span className="text-text-tertiary">@</span>} placeholder="username" />
      <Input suffix={<span className="text-text-tertiary">.com</span>} placeholder="domain" />
    </div>
  );
}
