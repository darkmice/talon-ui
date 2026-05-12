/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { NumberInput } from '@talon-ui/react';

export default function Demo() {
  const [v, setV] = useState(8);
  return (
    <div className="max-w-xs">
      <NumberInput value={v} onValueChange={setV} min={0} max={20} step={1} />
    </div>
  );
}
