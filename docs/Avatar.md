# Avatar

A circular user image with automatic fallback to an initial letter or a person icon when no image is available or the image fails to load.

## Import

```tsx
import { Avatar } from "@xanui/ui";
```

## Overview

`Avatar` renders an `<img>` (via `Tag component="img"`) when `src` is set and hasn't failed to load. If `src` is empty, or the image errors, it falls back to a centered `<div>` showing (in priority order) the first letter of `alt`, then `children`, then a `PersonIcon`. It registers with `useThemeComponent("Avatar", ...)` (no defaults besides `size`) and supports `skeleton` for loading placeholders. `size` accepts a responsive value and drives width/height/border-radius/font-size together.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `useBreakpointPropsType<number>` | `36` | Diameter in pixels; also used for `radius`, `fontSize` (`size/3*2`), and the skeleton's `height`/`width`. |
| `skeleton` | `boolean` | — | Renders a circular `Skeleton` (`animation="wave"`) sized to `size` instead of the avatar. |
| `src` | `string` | — | Image URL. Inherited via `TagProps` but destructured explicitly to drive fallback logic. |
| `alt` | `string` | — | Alt text; also used as the fallback initial (first character, upper-cased) when the image is unavailable. |
| `children` | `ReactNode` | — | Fallback content shown if there's no `src`/it failed and no `alt` is set (before defaulting to a `PersonIcon`). |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Slots

| Slot | Target | Notes |
|---|---|---|
| `skeleton` | The `Skeleton` rendered when `skeleton` is true | Excludes `height`, `width`, `loading`, `children` (managed internally). |

## Examples

### Basic usage

```tsx
import { Avatar } from "@xanui/ui";

<Avatar src="/images/user-42.jpg" alt="Jane Doe" />
```

### Fallback states, custom size, and skeleton loading

```tsx
import { Avatar } from "@xanui/ui";

// No image available — shows the initial "J"
<Avatar alt="Jane Doe" size={64} />;

// No src and no alt — shows the default person icon
<Avatar size={48} />;

// Loading placeholder
<Avatar skeleton size={48} />;
```

## Notes

- Component name registered with `useThemeComponent`: `"Avatar"`.
- Broken image URLs are detected via the native `onError` event, which flips an internal `faild` flag and switches to the fallback render on the next render.
- Related components: [`AvatarBox`](./AvatarBox.md), [`AvatarPicker`](./AvatarPicker.md).
