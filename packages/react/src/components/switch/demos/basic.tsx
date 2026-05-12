/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { Switch, Text } from '@talon-ui/react';

export default function Demo() {
  const [on, setOn] = useState(false);
  return (
    <label className="inline-flex items-center gap-tp-2 cursor-pointer">
      <Switch checked={on} onCheckedChange={setOn} />
      <Text>Enable system notifications</Text>
    </label>
  );
}
