/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Share2, Link2, UserPlus, MoreHorizontal } from 'lucide-react';
import { Menu, MenuTrigger, MenuContent, MenuItem, MenuSub, MenuSubTrigger, MenuSubContent, MenuSeparator, Button } from '@talon-ui/react';

export default function Demo() {
  return (
    <Menu>
      <MenuTrigger asChild><Button variant="ghost" iconOnly aria-label="More"><MoreHorizontal className="size-4" /></Button></MenuTrigger>
      <MenuContent>
        <MenuItem>Open</MenuItem>
        <MenuSub>
          <MenuSubTrigger icon={<Share2 className="size-4" />}>Share</MenuSubTrigger>
          <MenuSubContent>
            <MenuItem icon={<Link2 className="size-4" />}>Copy link</MenuItem>
            <MenuItem icon={<UserPlus className="size-4" />}>Invite people</MenuItem>
          </MenuSubContent>
        </MenuSub>
        <MenuSeparator />
        <MenuItem tone="danger">Archive</MenuItem>
      </MenuContent>
    </Menu>
  );
}
