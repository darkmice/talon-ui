/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { Upload, type UploadFile } from '@talon-ui/react';

export default function Demo() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  return (
    <Upload value={files} onValueChange={setFiles} accept=".png,.jpg,.pdf" maxFiles={5} />
  );
}
