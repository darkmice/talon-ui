/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@talon-ui/react';

export default function Demo() {
  const [v, setV] = useState<string>();
  return (
    <div className="max-w-xs">
      <Select value={v} onValueChange={setV}>
        <SelectTrigger>
          <SelectValue placeholder="Choose a framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="svelte">Svelte</SelectItem>
          <SelectItem value="solid">Solid</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
