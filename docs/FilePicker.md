# FilePicker

A headless-ish file-selection wrapper — turns any content into a click-to-browse and/or drag-and-drop file input.

## Import

```tsx
import { FilePicker } from "@xanui/ui";
```

## Overview

`FilePicker` renders its `children` inside a `Tag` and attaches file-selection behavior to it: depending on `action`, clicking opens the native OS file dialog, dropping files fires drag/drop handlers, or both. It validates selected/dropped files against `multiple`, `accept`, `maxFileLimits`, and `maxFileSize` before calling `onChange`; the first validation failure calls `onError` and skips `onChange` entirely (validations run in order: multiple → limit → accept → size). There is no visual chrome of its own — style it like any `Tag` (borders, dashed outlines, icons as children, etc.), which is what [`GalleryPicker`](./GalleryPicker.md) does on top of it.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Content rendered inside the pickable area (icons, text, etc.). |
| `multiple` | `boolean` | `false` | Allow selecting/dropping more than one file. If `false` and more than one file is provided, `onError` fires and nothing is emitted. |
| `accept` | `string[]` | — | Accepted file types, e.g. `['.png', '.jpg']` or `['image/*']`. Also sets the native input's `accept` attribute for click-based selection. |
| `maxFileSize` | `number` | — | Max size per file, **in KB**. |
| `maxFileLimits` | `number` | — | Max number of files allowed in a single selection/drop. |
| `action` | `useBreakpointPropsType<"click" \| "drop" \| "both">` | `"both"` | Which interaction(s) trigger file selection. |
| `onChange` | `(files: File[]) => void` | — | Called with the validated file list. |
| `onDragOver` | `(e: React.DragEvent) => void` | — | Called on drag-over (in addition to internal `preventDefault`). |
| `onDragLeave` | `(e: React.DragEvent) => void` | — | Called on drag-leave, and also after a drop completes. |
| `onError` | `(error: FilePickerError) => void` | — | Called when validation fails. `FilePickerError` is `{ message: string, file: File }`. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` (`accept`, `onChange`, `onError`, `multiple` are omitted from the inherited `TagProps` in favor of `FilePicker`'s own typed versions) — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage (click to browse)

```tsx
import { FilePicker } from "@xanui/ui";

<FilePicker
  action="click"
  accept={["image/*"]}
  onChange={(files) => console.log(files)}
  onError={(err) => console.error(err.message)}
  p={4}
  border="1px dashed"
  borderColor="divider.primary"
  radius={2}
  cursor="pointer"
>
  Click to choose an image
</FilePicker>
```

### Drag-and-drop, multiple files, with limits

```tsx
import { FilePicker } from "@xanui/ui";

<FilePicker
  action="drop"
  multiple
  maxFileLimits={5}
  maxFileSize={2048} // 2MB per file
  onChange={(files) => console.log(`${files.length} files dropped`)}
  onDragOver={() => console.log("dragging over")}
  onError={(err) => alert(err.message)}
  p={6}
  border="1px dashed"
  borderColor="brand.primary"
>
  Drag files here
</FilePicker>
```

## Notes

- Validation order matters: a `multiple` violation is reported before file-count limits, which are reported before `accept` mismatches, which are reported before `maxFileSize` — only the *first* failing file/rule triggers `onError`, and `onChange` is not called at all in that pass.
- `accept` entries ending in `/*` (e.g. `"image/*"`) match on MIME type prefix; other entries are matched against the file name's suffix (e.g. `.png`).
- [`GalleryPicker`](./GalleryPicker.md) is a ready-made image-upload UI built on top of `FilePicker`.
