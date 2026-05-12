/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { Upload, type UploadFile } from '@talon-ui/react';

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function Demo() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  return (
    <Upload
      value={files}
      onValueChange={setFiles}
      maxFiles={3}
      onUpload={async (file) => {
        await sleep(800);
        if (file.name.toLowerCase().includes('fail')) throw new Error('Server rejected the file.');
        return { url: `https://cdn.example.com/${file.name}` };
      }}
    />
  );
}
