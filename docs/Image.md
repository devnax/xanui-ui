# Image

A styled `<img>` element rendered through `Tag`, with `object-fit: cover` by default.

## Import

```tsx
import { Image } from "@xanui/ui";
```

## Overview

`Image` is a minimal wrapper: it forces `component="img"`, sets a default `objectFit="cover"` (overridable via `sx`/props since it's spread after the default), and forwards `src`/`alt`. It has no loading, fallback, or lazy-loading logic of its own — it's a styling-consistent way to render images using the same spacing/color/`sx` system as every other `@xanui/ui` component. Because it renders an `<img>`, `children` are not accepted (`Omit<TagProps<T>, "children">`).

## Props

`Image` defines no props of its own beyond the standard `src`/`alt` attributes available through `TagProps<"img">` (`children` is omitted).

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { Image } from "@xanui/ui";

<Image src="/photo.jpg" alt="A scenic photo" width={320} height={200} radius="md" />
```

### Fixed aspect ratio avatar with a custom object-fit

```tsx
import { Image } from "@xanui/ui";

<Image
  src="/avatar.jpg"
  alt="User avatar"
  width={64}
  height={64}
  radius="100%"
  sx={{ objectFit: "contain" }}
/>
```

## Notes

- Renders `baseClass="image"` on the root `<img>` `Tag`.
- `objectFit="cover"` is applied first and can be overridden by passing `objectFit` (or `sx.objectFit`) explicitly, since consumer props spread after the default.
- Does not support `children` — use another container component (e.g. `Layer`, a plain `Tag`, or `Card`) to overlay content on top of an image.
