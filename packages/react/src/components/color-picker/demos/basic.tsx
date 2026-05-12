/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { ColorPicker } from '@talon-ui/react';

export default function Demo() {
  const [v, setV] = useState('#4F60FF');
  return (
    <div className="max-w-xs">
      <ColorPicker value={v} onValueChange={setV} />
    </div>
  );
}
