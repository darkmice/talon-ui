/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { Tag } from '@talon-ui/react';

export default function Demo() {
  const [tags, setTags] = useState(['react', 'typescript', 'tailwind', 'astro']);
  return (
    <div className="flex flex-wrap gap-tp-2">
      {tags.map((t) => (
        <Tag key={t} removable onRemove={() => setTags(tags.filter((x) => x !== t))}>
          {t}
        </Tag>
      ))}
    </div>
  );
}
