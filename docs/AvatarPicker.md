# AvatarPicker

An `Avatar` with a badge-mounted upload/remove control for picking (and previewing) a profile image file.

## Import

```tsx
import { AvatarPicker } from "@xanui/ui";
```

## Overview

`AvatarPicker` wraps an `Avatar` in a `Badge` whose content is an `IconButton` that either opens a native `<input type="file">` (when no value is set) or clears the current value (when one is set). Selecting a `File` generates an object URL preview via `URL.createObjectURL` (revoked on cleanup); a `string` value is treated as a URL and shown directly. If the selected file exceeds `maxSize`, the file is rejected and a `Menu` bubble with an error message is shown near the button for 3 seconds instead. Loading state renders the `Avatar`'s built-in `skeleton` placeholder. Registers with `useThemeComponent("AvaterPicker", ...)` — note the misspelling ("Avater") in the theme key, inherited from the source.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `File \| string \| null` | — | Current selection: a `File` (local pick, shown via object URL), a `string` URL, or `null`/absent. |
| `defaultPreview` | `useBreakpointPropsType<string>` (via theme defaults) | — | Fallback image URL used when `preview` is empty. |
| `maxSize` | `number` | `2048` (i.e. 2MB, since compared in KB) | Maximum accepted file size, **in KB**. |
| `changeIcon` | `React.ReactNode` | `<CameraAltOutlined />` | Icon shown on the badge button when no value is set. |
| `loading` | `boolean` | — | Shows the `Avatar`'s skeleton placeholder. |
| `avatarSize` | `useBreakpointPropsType<number>` | `100` | Diameter passed to the inner `Avatar`. |
| `onChange` | `(file: File \| string \| null) => void` | — | Called with the new file/URL on selection, or `null` on removal. |
| `onDelete` | `(file: File \| string) => void` | — | Called (in addition to `onChange(null)`) when the remove button is clicked while a value exists. |
| `onSelect` | `(file: File \| string) => void` | — | Called (in addition to `onChange`) when a new file is chosen and passes the size check. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md). Note: `bgcolor` is handled specially — it's forwarded to the inner `Avatar` (overridden to `danger.ghost` while an oversized-file error is showing).

## Examples

### Basic usage

```tsx
import { useState } from "react";
import { AvatarPicker } from "@xanui/ui";

function ProfilePhoto() {
  const [avatar, setAvatar] = useState<File | string | null>(null);

  return <AvatarPicker value={avatar} onChange={setAvatar} />;
}
```

### Custom size, max file size, and delete handling

```tsx
import { useState } from "react";
import { AvatarPicker } from "@xanui/ui";

function ProfilePhoto() {
  const [avatar, setAvatar] = useState<File | string | null>(
    "/images/current-avatar.jpg",
  );

  return (
    <AvatarPicker
      value={avatar}
      avatarSize={140}
      maxSize={500} // 500 KB limit
      onChange={setAvatar}
      onDelete={() => console.log("removed avatar")}
      onSelect={(file) => console.log("selected", file)}
    />
  );
}
```

## Slots

| Slot | Target | Notes |
|---|---|---|
| `Avatar` (`avatar`) | The inner `Avatar` | `Omit<AvatarProps, "src" \| "size">`. |
| `badge` | The wrapping `Badge` | `Omit<BadgeProps, "placement" \| "content">`. |
| `menu` | The oversized-file error `Menu` | `Omit<MenuProps, "target" \| "onClickOutside">`. |

## Notes

- The `useThemeComponent` registration key is `"AvaterPicker"` (a typo carried over from the source) rather than `"AvatarPicker"` — if you register theme-level defaults for this component, use that exact (misspelled) key.
- Related components: [`Avatar`](./Avatar.md), [`Badge`](./Badge.md), [`AvatarBox`](./AvatarBox.md).
