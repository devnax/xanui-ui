# GridItem

A 12-column-based flex item, meant to be used as a direct child of [`GridContainer`](./GridContainer.md).

## Import

```tsx
import { GridItem } from "@xanui/ui";
```

## Overview

`GridItem` converts `xs`/`sm`/`md`/`lg`/`xl` column-count props (out of a 12-column grid) into percentage `maxWidth`/`flexBasis` values, keyed by breakpoint, and sets `flexGrow: 0` so the item doesn't stretch beyond its declared width. Each breakpoint prop is independent — if you set `xs={12}` and `md={6}`, the item is full-width below the `md` breakpoint and half-width at `md` and above. Breakpoints you don't specify are simply omitted from the resulting width object, so the item falls back to its natural/`auto` sizing at those sizes.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `xs` | `number` | — | Column span (out of 12) at the `xs` breakpoint and above (mobile-first), computed as `(100 / 12) * xs` percent. |
| `sm` | `number` | — | Column span (out of 12) at the `sm` breakpoint and above. |
| `md` | `number` | — | Column span (out of 12) at the `md` breakpoint and above. |
| `lg` | `number` | — | Column span (out of 12) at the `lg` breakpoint and above. |
| `xl` | `number` | — | Column span (out of 12) at the `xl` breakpoint and above. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { GridContainer, GridItem } from "@xanui/ui";

<GridContainer>
  <GridItem xs={12} md={4}>Sidebar</GridItem>
  <GridItem xs={12} md={8}>Main content</GridItem>
</GridContainer>
```

### Responsive column spans across breakpoints

```tsx
import { GridContainer, GridItem } from "@xanui/ui";

<GridContainer gap={1}>
  <GridItem xs={12} sm={6} md={4} lg={3}>Item 1</GridItem>
  <GridItem xs={12} sm={6} md={4} lg={3}>Item 2</GridItem>
  <GridItem xs={12} sm={6} md={4} lg={3}>Item 3</GridItem>
  <GridItem xs={12} sm={6} md={4} lg={3}>Item 4</GridItem>
</GridContainer>
```

## Notes

- Renders `baseClass="grid-item"` on its root `Tag`.
- Must be used inside [`GridContainer`](./GridContainer.md) (or another `display: flex; flex-wrap: wrap` ancestor) for the percentage widths to behave as a grid.
- The column-span props (`xs`, `sm`, ...) here are plain numbers (1–12), unlike the `useBreakpointPropsType<T>` object form documented in [Core Concepts](./core-concepts.md) — each breakpoint is its own individual prop rather than a single responsive object.
