/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { Pagination } from '@talon-ui/react';

export default function Demo() {
  const [page, setPage] = useState(2);
  return (
    <Pagination
      size="sm"
      page={page}
      pageSize={10}
      total={50}
      onChange={(p) => setPage(p)}
      showPageSize={false}
    />
  );
}
