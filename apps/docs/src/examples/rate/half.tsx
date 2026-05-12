/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { Rate, Text } from '@talon-ui/react';

export default function Demo() {
  const [v, setV] = useState(3.5);
  return (
    <div className="space-y-tp-2">
      <Rate value={v} onValueChange={setV} allowHalf />
      <Text variant="caption" tone="secondary">Score: {v}</Text>
    </div>
  );
}
