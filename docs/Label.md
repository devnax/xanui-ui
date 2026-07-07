# Label

A styled `<label>` element rendered through `Tag`.

## Import

```tsx
import { Label } from "@xanui/ui";
```

## Overview

`Label` is a minimal wrapper that forces `component="label"` and applies default typography/layout (`inline-flex` with a small gap, `text.primary` color, medium font weight, pointer cursor, no text selection) so labels are visually consistent across the library. It has no props of its own beyond `TagProps<"label">`. It's used internally by [`Input`](./Input.md) (and other form components) to render their `label` prop, but can also be used standalone.

## Props

`Label` defines no props of its own beyond the standard `TagProps<"label">` it inherits.

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { Label } from "@xanui/ui";

<Label htmlFor="email">Email address</Label>
```

### With an icon and custom color

```tsx
import { Label } from "@xanui/ui";
import Info from "@xanui/icons/Info";

<Label color="text.secondary">
  <Info />
  Optional field
</Label>
```

## Notes

- Renders `baseClass="label"` on the root `Tag`, useful as a CSS/theming hook.
- Used internally by [`Input`](./Input.md) to render its `label` prop (via `slotProps.label` / `refs.label`).
