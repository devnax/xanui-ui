# Stack

A simple flex-column layout container.

## Import

```tsx
import { Stack } from "@xanui/ui";
```

## Overview

`Stack` is a minimal layout primitive: it renders a `Tag` with `display: flex` and `flexDirection: column` baked in via `sxr` (so it's the lowest-priority style layer — any `flexDirection`/`display` you pass through `sx` or standard `Tag` layout props will override it). It has **no props of its own** beyond what `TagProps` already provides — use the inherited spacing (`gap`, `p`, `m`, ...) and layout props (`alignItems`, `justifyContent`, `flexDirection` to go horizontal, etc.) from `TagProps` to control spacing/alignment between children.

## Props

`Stack` defines no component-specific props (`StackProps<T> = TagProps<T>`).

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage (vertical stack with spacing)

```tsx
import { Stack, Text } from "@xanui/ui";

<Stack gap={2}>
  <Text>First item</Text>
  <Text>Second item</Text>
  <Text>Third item</Text>
</Stack>
```

### Horizontal stack (override direction) with responsive gap

```tsx
import { Stack, Text } from "@xanui/ui";

<Stack
  flexDirection="row"
  alignItems="center"
  gap={{ xs: 1, md: 3 }}
>
  <Text>Left</Text>
  <Text>Right</Text>
</Stack>
```

## Notes

- `baseClass="stack"` is applied for theming/CSS hooks.
- Because the flex styles are set via `sxr` (lowest priority), passing `flexDirection`, `display`, or other conflicting layout props directly (or via `sx`) safely overrides the defaults — this is how you'd turn it into a horizontal stack, as shown above.
- `Stack` does not use `useThemeComponent`, so there's no theme-registered name or default-prop override for it.
