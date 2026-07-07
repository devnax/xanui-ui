# GalleryPicker

A ready-made multi-image upload widget: empty-state dropzone, thumbnail grid once files exist, per-file delete, and inline error alerts.

## Import

```tsx
import { GalleryPicker } from "@xanui/ui";
```

## Overview

`GalleryPicker` is built on top of [`FilePicker`](./FilePicker.md) (locked to `multiple` + `accept: ["image/*"]`) and renders one of two layouts depending on whether `value` has items: an empty-state dropzone with icon/title/subtitle, or a wrapping grid of `FileCard` thumbnails (each with a delete button) plus a small "add more" tile and a "CLEAR" button. It accepts both `File` objects and plain string URLs in `value`, so it can display already-uploaded images (as URL strings) alongside newly-picked local files. Validation errors (bad type, too large, over the file limit) surface as a temporary `Alert` (auto-dismisses after 4 seconds).

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `useBreakpointPropsType<string>` | `"Drag & drop images here or click to upload."` | Empty-state heading. |
| `subtitle` | `useBreakpointPropsType<string>` | `"Images only · Max {N}MB each · Up to {N} files."` | Empty-state subheading; auto-generated from `maxFileSize`/`maxFileLimits` if not provided. |
| `icon` | `useBreakpointPropsType<React.ReactNode>` | `<AddPhotoAlternateOutlined />` | Empty-state icon. |
| `value` | `(File \| string)[] \| null` | — | Current files (as `File` objects and/or URL strings). Controlled — `GalleryPicker` does not track its own list. |
| `maxFileSize` | `number` | `5 * 1024` (5MB, in KB) | Max size per file. |
| `maxFileLimits` | `number` | `10` | Max total number of files allowed. |
| `onSelect` | `(files: File[], oldFiles: (File \| string)[] \| null) => void` | — | Called with just the newly-picked files (plus the previous `value`) whenever new files are added. |
| `onDelete` | `(file: File \| string) => void` | — | Called when a single thumbnail's delete button is clicked. |
| `onChange` | `(files: (File \| string)[] \| null) => void` | — | Called with the full updated list (or `null` when cleared/emptied) — this is what drives the controlled `value`. |
| `onError` | `(error: FilePickerError) => void` | — | Called on validation failure (type/size) or when the file-count limit is exceeded. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` (`children` is omitted — content is fully managed internally) — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage (controlled)

```tsx
import { useState } from "react";
import { GalleryPicker } from "@xanui/ui";

function Example() {
  const [files, setFiles] = useState<(File | string)[] | null>(null);

  return (
    <GalleryPicker
      value={files}
      maxFileLimits={6}
      maxFileSize={3 * 1024} // 3MB
      onChange={setFiles}
      onError={(err) => console.error(err.message)}
    />
  );
}
```

### Pre-populated with existing (uploaded) image URLs

```tsx
import { useState } from "react";
import { GalleryPicker } from "@xanui/ui";

function Example() {
  const [files, setFiles] = useState<(File | string)[] | null>([
    "https://example.com/photo-1.jpg",
    "https://example.com/photo-2.jpg",
  ]);

  return (
    <GalleryPicker
      value={files}
      title="Product photos"
      subtitle="First image is used as the cover."
      onChange={setFiles}
      onDelete={(file) => console.log("removed", file)}
    />
  );
}
```

## Slots

| Slot | Target | Notes |
|---|---|---|
| `alert` | The error `Alert` shown on the empty-state layout | Excludes `children`, `variant`, `color`, `icon` (fixed to a danger fill alert with the offending file as its icon). Note: only applied in the empty-state branch, not the populated-grid branch. |
| `filePicker` | The internal `FilePicker` (both empty-state and "add more" tile) | Excludes `multiple`, `accept`, `onChange` (these are fixed internally). |
| `content` | The `Tag` wrapping the empty-state icon/title/subtitle | Excludes `children`. |

## Notes

- `value` is fully controlled — `GalleryPicker` never mutates it internally; every interaction (add, delete, clear) calls `onChange` with a new array (or `null`) for you to store.
- If adding new files would exceed `maxFileLimits`, `GalleryPicker` shows an error *and* still truncates the combined list to 10 items (`all.slice(0, 10)`) rather than to the configured `maxFileLimits` — this is a hardcoded `10` in the current source, worth being aware of if you set a custom `maxFileLimits`.
- Uses `URL.createObjectURL(file)` to preview local `File` objects; remember these object URLs are not automatically revoked.
- Built on [`FilePicker`](./FilePicker.md), `Alert`, `Box`, `Button`, `IconButton`, `Stack`, and `Text`.
