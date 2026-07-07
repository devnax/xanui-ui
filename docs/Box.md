# Box

The most minimal building block in `@xanui/ui` — a plain `Tag` wrapper with no additional props or behavior.

## Import

```tsx
import { Box } from "@xanui/ui";
```

## Overview

`Box` adds nothing beyond `Tag` itself besides a `baseClass="box"` hook and `ref` forwarding. Use it as a generic styled container wherever you'd reach for a `<div>` but want the full `Tag`/`TagProps` styling API (spacing shorthands, color tokens, `sx`/`sxr`, responsive props, etc.).

## Props

`BoxProps<T>` is exactly `TagProps<T>` — it introduces no props of its own.

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { Box } from "@xanui/ui";

<Box p={2} bgcolor="surface.primary" radius="md">
  Plain container content
</Box>
```

### As a different element, with responsive width and hover styling

```tsx
import { Box } from "@xanui/ui";

<Box
  component="section"
  width={{ xs: "100%", md: "50%" }}
  p={{ xs: 1, md: 3 }}
  hover={{ bgcolor: "surface.secondary" }}
>
  Responsive section
</Box>
```

## Notes

- `Box` is the simplest way to opt into the `Tag` styling API without any component-specific behavior — see [Core Concepts](./core-concepts.md) for the full prop surface it inherits.
- Does not use `useThemeComponent`, so there is no global theme override hook specific to `Box` beyond whatever `Tag`/`ThemeProvider` itself provides.
