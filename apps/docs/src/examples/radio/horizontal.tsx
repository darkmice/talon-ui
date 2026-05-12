/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { RadioGroup, RadioGroupItem, Text } from '@talon-ui/react';

export default function Demo() {
  return (
    <RadioGroup orientation="horizontal" defaultValue="md">
      {(['sm', 'md', 'lg'] as const).map((opt) => (
        <label key={opt} className="inline-flex items-center gap-tp-2 cursor-pointer">
          <RadioGroupItem value={opt} />
          <Text>{opt}</Text>
        </label>
      ))}
    </RadioGroup>
  );
}
