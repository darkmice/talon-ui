/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Breadcrumb } from '@talon-ui/react';

export default function Demo() {
  return (
    <Breadcrumb items={[
      { label: 'Workspace', href: '/' },
      { label: 'Projects', href: '/projects' },
      { label: 'Talon UI' },
    ]} />
  );
}
