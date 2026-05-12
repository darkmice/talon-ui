/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { Pagination, Text } from '@talon-ui/react';

export default function Demo() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  return (
    <div className="space-y-tp-2">
      <Pagination
        page={page}
        pageSize={size}
        total={235}
        onChange={(p, s) => {
          setPage(p);
          setSize(s);
        }}
      />
      <Text variant="caption" tone="secondary">
        Page {page} · {size} / page
      </Text>
    </div>
  );
}
