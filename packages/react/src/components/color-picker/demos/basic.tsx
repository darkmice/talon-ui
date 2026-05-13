/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { ColorPicker } from '@talon-ui/react';
import { TalonTokens } from '@talon-ui/tokens';

const DEFAULT_BRAND = TalonTokens.color.primary['500'].value;

export default function Demo() {
  const [v, setV] = useState(DEFAULT_BRAND);
  return (
    <div className="max-w-xs">
      <ColorPicker value={v} onValueChange={setV} />
    </div>
  );
}
