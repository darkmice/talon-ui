/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { MoreHorizontal } from 'lucide-react';
import { Menu, MenuTrigger, MenuContent, MenuItem, MenuSeparator, Button } from '@talon-ui/react';

export default function Demo() {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="ghost" iconOnly aria-label="More"><MoreHorizontal className="size-4" /></Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem onSelect={() => alert('Edit')}>Edit</MenuItem>
        <MenuItem onSelect={() => alert('Duplicate')}>Duplicate</MenuItem>
        <MenuSeparator />
        <MenuItem tone="danger" onSelect={() => alert('Delete')}>Delete</MenuItem>
      </MenuContent>
    </Menu>
  );
}
