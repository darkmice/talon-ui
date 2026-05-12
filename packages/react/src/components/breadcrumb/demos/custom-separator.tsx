/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { ChevronRight } from 'lucide-react';
import { Breadcrumb } from '@talon-ui/react';

export default function Demo() {
  return (
    <Breadcrumb
      size="md"
      separator={<ChevronRight className="size-3 text-text-tertiary" aria-hidden />}
      items={[
        { label: 'Home', href: '/' },
        { label: 'Library', href: '/library' },
        { label: 'Data' },
      ]}
    />
  );
}
