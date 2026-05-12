/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import {
  Select, SelectTrigger, SelectValue, SelectContent,
  SelectItem, SelectGroup, SelectLabel, SelectSeparator,
} from '@talon-ui/react';

export default function Demo() {
  return (
    <div className="max-w-xs">
      <Select defaultValue="us">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Americas</SelectLabel>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="br">Brazil</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Asia / Pacific</SelectLabel>
            <SelectItem value="cn">China</SelectItem>
            <SelectItem value="jp">Japan</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectItem value="delete" tone="danger">Delete region</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
