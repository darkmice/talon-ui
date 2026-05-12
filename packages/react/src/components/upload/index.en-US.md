---
title: Upload
nav: Components
group: Forms
order: 22
---

# Upload

Drag-and-drop file uploader with progress / cancel / retry / delete. `Upload` is a dashed drop zone plus a file list. It manages an internal `UploadFile[]` state (or you can control it) and can drive uploads through an `onUpload` async hook.

## Basic

<code src="./demos/basic.tsx"></code>

## With upload progress

<code src="./demos/progress.tsx"></code>

Try naming a file like `fail.txt` to see the error path.

## Inside a Form

<code src="./demos/form.tsx"></code>

## API

<API id="Upload"></API>

## Don't

- Don't use `Upload` for image previews without a thumbnail extension — Phase 1 ships text-only entries.
- Don't pair an external file picker with `Upload` — the component already owns input + drop interaction.
