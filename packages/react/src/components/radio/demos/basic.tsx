/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { RadioGroup, RadioGroupItem, Text } from '@talon-ui/react';

export default function Demo() {
  const [v, setV] = useState('weekly');
  return (
    <RadioGroup value={v} onValueChange={setV}>
      {(['daily', 'weekly', 'monthly'] as const).map((opt) => (
        <label key={opt} className="inline-flex items-center gap-tp-2 cursor-pointer">
          <RadioGroupItem value={opt} />
          <Text>{opt[0].toUpperCase() + opt.slice(1)}</Text>
        </label>
      ))}
    </RadioGroup>
  );
}
