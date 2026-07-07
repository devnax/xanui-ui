# Divider

A thin line for visually separating content, horizontal or vertical.

## Import

```tsx
import { Divider } from "@xanui/ui";
```

## Overview

`Divider` renders a `Tag` sized as a thin bar: full width and a fixed `height` (in horizontal mode) or full height and a fixed `width` (in vertical mode), colored using the theme's divider/variant color tokens. All three of its own props (`direction`, `color`, `size`) accept responsive breakpoint objects. Note that `Divider` omits the base `color` prop from `TagProps` and replaces it with its own more specific `UseColorTemplateColor`-typed `color`.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `direction` | `useBreakpointPropsType<"verticle" \| "horizental">` | `"horizental"` | Orientation of the divider. **Note the source's non-standard spelling** — use `"verticle"` and `"horizental"`, not `"vertical"`/`"horizontal"`. |
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"default"` | Color token for the line. `"default"` resolves to `divider.primary`; any other value resolves to `{color}.primary`. |
| `size` | `useBreakpointPropsType<number>` | `1` | Thickness of the line in pixels (used as `height` when horizontal, `width` when vertical). |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md) (note: the inherited `color` prop is overridden as described above).

## Examples

### Basic usage (horizontal, default)

```tsx
import { Divider, Stack } from "@xanui/ui";

<Stack gap={2}>
  <p>Section one</p>
  <Divider />
  <p>Section two</p>
</Stack>
```

### Vertical divider with color and custom thickness

```tsx
import { Divider, Stack } from "@xanui/ui";

<Stack direction="row" alignItems="center" height={40} gap={2}>
  <span>Left</span>
  <Divider direction="verticle" color="brand" size={2} />
  <span>Right</span>
</Stack>
```

## Notes

- The `direction` values are spelled `"verticle"` and `"horizental"` in the current source (not the standard English spellings) — this is likely a typo but must be used as-is for the prop to take effect.
- `baseClass="divider"` is applied for theming/CSS hooks.
