/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Pencil, Copy, Trash2, MoreHorizontal } from 'lucide-react';
import { Menu, MenuTrigger, MenuContent, MenuItem, MenuSeparator, MenuLabel, Button } from '@talon-ui/react';

export default function Demo() {
  return (
    <Menu>
      <MenuTrigger asChild><Button variant="secondary" leading={<MoreHorizontal className="size-4" />}>Actions</Button></MenuTrigger>
      <MenuContent>
        <MenuLabel>Item</MenuLabel>
        <MenuItem icon={<Pencil className="size-4" />} shortcut="⌘E">Edit</MenuItem>
        <MenuItem icon={<Copy className="size-4" />} shortcut="⌘D">Duplicate</MenuItem>
        <MenuSeparator />
        <MenuItem icon={<Trash2 className="size-4" />} shortcut="⌫" tone="danger">Delete</MenuItem>
      </MenuContent>
    </Menu>
  );
}
