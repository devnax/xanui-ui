# AvatarBox

A simple row layout pairing an `Avatar` with a title and subtitle — a common "user identity" cell for lists, tables, and headers.

## Overview

`AvatarBox` is a thin composition of `Avatar` + two `Text` elements inside a flex row `Tag`. It has no theming hook (`useThemeComponent`) and no responsive props of its own — it's intentionally minimal, deferring all real styling flexibility to its `slotProps`.

## Import

```tsx
import { AvatarBox } from "@xanui/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | — | Image URL passed to the inner `Avatar`. |
| `title` | `string` | — | Primary text line; only rendered if truthy. |
| `subtitle` | `string` | — | Secondary text line (`text.secondary` color); only rendered if truthy. |

`AvatarBoxProps` does **not** extend `TagProps` directly — the root element's styling is customized entirely through `slotProps.root` (see Slots below), not top-level spacing/color props.

## Slots

| Slot | Target | Notes |
|---|---|---|
| `root` | The outer `Tag` (flex row, `gap: 1.5`) | `TagProps`. |
| `avatar` | The inner `Avatar` | `Omit<AvatarProps, "src">` — size defaults to `40`, `flex: "0 0 auto"`. |
| `title` | The title `Text` | `TagProps`; only applied when `title` is set. |
| `subtitle` | The subtitle `Text` | `TagProps`; only applied when `subtitle` is set. |

## Examples

### Basic usage

```tsx
import { AvatarBox } from "@xanui/ui";

<AvatarBox
  src="/images/user-7.jpg"
  title="Alex Rivera"
  subtitle="alex@company.com"
/>
```

### Customizing the avatar size and root spacing via slots

```tsx
import { AvatarBox } from "@xanui/ui";

<AvatarBox
  title="Priya Sharma"
  subtitle="Product Designer"
  slotProps={{
    root: { gap: 2, p: 1 },
    avatar: { size: 56 },
    title: { fontWeight: 600 },
  }}
/>
```

## Notes

- Since no `src` requires an image, `Avatar`'s own fallback (initial letter / person icon) applies automatically when `src` is omitted.
- Related components: [`Avatar`](./Avatar.md), [`AvatarPicker`](./AvatarPicker.md).
