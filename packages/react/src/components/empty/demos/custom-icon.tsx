/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Search } from 'lucide-react';
import { Empty } from '@talon-ui/react';

export default function Demo() {
  return (
    <Empty
      icon={<Search aria-hidden />}
      title="No results"
      description="Try different keywords or remove filters."
    />
  );
}
