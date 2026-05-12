/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Avatar, AvatarGroup } from '@talon-ui/react';

export default function Demo() {
  return (
    <AvatarGroup max={3}>
      <Avatar fallback="AL" />
      <Avatar fallback="BR" />
      <Avatar fallback="CD" />
      <Avatar fallback="EF" />
      <Avatar fallback="GH" />
    </AvatarGroup>
  );
}
