/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Breadcrumb } from '@talon-ui/react';

export default function Demo() {
  return (
    <Breadcrumb
      maxItems={3}
      items={[
        { label: 'Org', href: '/' },
        { label: 'Workspace', href: '/ws' },
        { label: 'Engineering', href: '/ws/eng' },
        { label: 'Projects', href: '/ws/eng/projects' },
        { label: 'Talon UI', href: '/ws/eng/projects/talon-ui' },
        { label: 'Settings' },
      ]}
    />
  );
}
