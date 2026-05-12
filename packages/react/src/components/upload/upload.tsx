/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef, useCallback, useRef, useState } from 'react';
import { UploadCloud, X, RotateCcw, Trash2 } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { uploadDropzoneVariants } from './upload.variants.js';
import type { UploadFile, UploadProps } from './upload.types.js';

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  return `${(n / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

let __id = 0;
const newId = () => `u${Date.now()}-${__id++}`;

export const Upload = forwardRef<HTMLDivElement, UploadProps>(function Upload(
  {
    value,
    defaultValue,
    onValueChange,
    accept,
    multiple = true,
    maxFiles,
    maxSize,
    disabled,
    className,
    dropzoneClassName,
    onUpload,
    onRemove,
    onRetry,
    hideList,
    prompt = 'Click or drag files to upload',
    hint = 'Up to 10 MB each',
    ...rest
  },
  ref,
) {
  const ctrl = value !== undefined;
  const [internal, setInternal] = useState<UploadFile[]>(defaultValue ?? []);
  const list = ctrl ? value! : internal;

  const setList = useCallback(
    (next: UploadFile[]) => {
      if (!ctrl) setInternal(next);
      onValueChange?.(next);
    },
    [ctrl, onValueChange],
  );

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const pushFiles = useCallback(
    (incoming: FileList | File[]) => {
      const arr = Array.from(incoming);
      const filtered = arr.filter((f) => !maxSize || f.size <= maxSize);
      const allowed = (() => {
        if (!maxFiles) return filtered;
        const remaining = maxFiles - list.length;
        return remaining > 0 ? filtered.slice(0, remaining) : [];
      })();
      const records: UploadFile[] = allowed.map((file) => ({
        id: newId(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: onUpload ? 'uploading' : 'pending',
        file,
      }));
      const next = [...list, ...records];
      setList(next);
      if (onUpload) {
        records.forEach(async (rec) => {
          try {
            const { url } = await onUpload(rec.file!);
            setList(next.map((r) => (r.id === rec.id ? { ...r, status: 'success', url, progress: 100 } : r)));
          } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : 'Upload failed';
            setList(next.map((r) => (r.id === rec.id ? { ...r, status: 'error', error: msg } : r)));
          }
        });
      }
    },
    [list, onUpload, maxFiles, maxSize, setList],
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) pushFiles(files);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    pushFiles(e.dataTransfer.files);
  };

  return (
    <div ref={ref} className={cn('space-y-tp-3', className)} {...rest}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          uploadDropzoneVariants({ dragging, disabled: disabled || undefined }),
          dropzoneClassName,
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInput}
          disabled={disabled}
          className="sr-only"
        />
        <UploadCloud className="size-6 text-text-tertiary" aria-hidden />
        <p className="text-body text-text-primary mt-tp-2">{prompt}</p>
        <p className="text-caption text-text-tertiary mt-tp-1">{hint}</p>
      </div>

      {!hideList && list.length > 0 && (
        <ul className="space-y-tp-1" aria-label="Uploaded files">
          {list.map((f) => (
            <li
              key={f.id}
              data-status={f.status}
              className="flex items-center gap-tp-2 p-tp-2 rounded-sm border border-border bg-bg-surface"
            >
              <UploadCloud className="size-4 text-text-tertiary" aria-hidden />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-tp-2">
                  <span className="truncate text-body text-text-primary">{f.name}</span>
                  <span className="text-caption text-text-tertiary tp-nums">{formatBytes(f.size)}</span>
                </div>
                {f.status === 'error' && (
                  <p className="text-caption text-[#C8322B] mt-tp-1">{f.error}</p>
                )}
                {f.status === 'uploading' && (
                  <div className="mt-tp-1 h-1 rounded-pill bg-bg-subtle overflow-hidden">
                    <div
                      className="h-full bg-primary-500 transition-[width]"
                      style={{ width: `${f.progress ?? 30}%` }}
                    />
                  </div>
                )}
                {f.status === 'success' && f.url && (
                  <a
                    href={f.url}
                    className="text-caption text-text-link mt-tp-1 inline-block hover:underline"
                  >
                    {f.url}
                  </a>
                )}
              </div>
              <div className="flex items-center gap-tp-1">
                {f.status === 'uploading' && (
                  <button
                    type="button"
                    aria-label={`Cancel ${f.name}`}
                    onClick={() => {
                      setList(list.filter((r) => r.id !== f.id));
                      onRemove?.(f.id);
                    }}
                    className="text-text-secondary hover:text-text-primary"
                  >
                    <X className="size-4" />
                  </button>
                )}
                {f.status === 'error' && (
                  <button
                    type="button"
                    aria-label={`Retry ${f.name}`}
                    onClick={() => onRetry?.(f.id)}
                    className="text-text-secondary hover:text-text-primary"
                  >
                    <RotateCcw className="size-4" />
                  </button>
                )}
                <button
                  type="button"
                  aria-label={`Delete ${f.name}`}
                  onClick={() => {
                    setList(list.filter((r) => r.id !== f.id));
                    onRemove?.(f.id);
                  }}
                  className="text-text-secondary hover:text-[#C8322B]"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

Upload.displayName = 'Upload';
