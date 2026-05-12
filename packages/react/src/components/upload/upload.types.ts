/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { ReactNode } from 'react';

export interface UploadFile {
  id: string;
  name: string;
  size: number;        // bytes
  type?: string;       // mime
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;   // 0..100
  error?: string;
  file?: File;         // raw native (only present when status !== 'success' from server)
  url?: string;        // when uploaded
}

export interface UploadProps {
  // Files state
  value?: UploadFile[];
  defaultValue?: UploadFile[];
  onValueChange?: (files: UploadFile[]) => void;
  // Drop / pick behaviour
  accept?: string;           // standard <input accept>
  multiple?: boolean;        // default true
  maxFiles?: number;
  maxSize?: number;          // bytes
  disabled?: boolean;
  // Customisation
  className?: string;
  dropzoneClassName?: string;
  // Action hooks
  onUpload?: (file: File) => Promise<{ url: string }>; // optional; if set, Upload kicks off uploads and tracks progress
  onRemove?: (id: string) => void; // called when user clicks delete
  onRetry?: (id: string) => void;
  hideList?: boolean;        // render drop zone only
  // Localisation
  prompt?: ReactNode;        // default "Click or drag files to upload"
  hint?: ReactNode;          // default "Up to 10MB each"
}
