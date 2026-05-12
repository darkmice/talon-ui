/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { Checkbox, Text } from '@talon-ui/react';

export default function Demo() {
  const [v, setV] = useState(false);
  return (
    <label className="inline-flex items-center gap-tp-2 cursor-pointer">
      <Checkbox checked={v} onCheckedChange={(c) => setV(c === true)} />
      <Text>Receive email notifications</Text>
    </label>
  );
}
