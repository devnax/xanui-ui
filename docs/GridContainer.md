# GridContainer

A flex-based row container that pairs with [`GridItem`](./GridItem.md) to build a simple 12-column responsive grid.

## Import

```tsx
import { GridContainer } from "@xanui/ui";
```

## Overview

`GridContainer` is a thin wrapper around `Tag` that forces `display: flex`, `flex-direction: row`, `flex-wrap: wrap`, and `width: 100%`. It has no props of its own beyond `TagProps` — it exists purely to set up the flex-wrap context that [`GridItem`](./GridItem.md) children rely on for their column widths. Use it as the outer element of a grid layout; each direct child is typically a `GridItem`.

## Props

`GridContainer` defines no props beyond what it inherits.

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { GridContainer, GridItem } from "@xanui/ui";

<GridContainer gap={2}>
  <GridItem xs={12} md={6}>Column A</GridItem>
  <GridItem xs={12} md={6}>Column B</GridItem>
</GridContainer>
```

### Three-column layout with spacing

```tsx
import { GridContainer, GridItem } from "@xanui/ui";

<GridContainer gap={1.5} p={2}>
  <GridItem xs={12} sm={6} lg={4}>Card 1</GridItem>
  <GridItem xs={12} sm={6} lg={4}>Card 2</GridItem>
  <GridItem xs={12} sm={12} lg={4}>Card 3</GridItem>
</GridContainer>
```

## Notes

- Renders `baseClass="grid-container"` on its root `Tag`, useful as a CSS/theming hook.
- Always used together with [`GridItem`](./GridItem.md) — `GridContainer` sets up the wrapping flex row, and `GridItem` children declare their column span per breakpoint.
- Because it's `flex-wrap: wrap` rather than CSS Grid, gaps between rows/columns should be set via the `gap` prop (inherited from `Tag`) rather than a CSS `grid-gap`.
