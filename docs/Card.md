# Card

A simple bordered or filled container for grouping related content.

## Import

```tsx
import { Card } from "@xanui/ui";
```

## Overview

`Card` is a thin wrapper around `Tag` that lays its children out in a vertical flex column with `gap`, rounded corners, and `overflow: hidden`, plus either a filled or outlined background depending on `variant`. It's registered with `useThemeComponent("Card", ...)` (no library defaults beyond the component's own `variant` fallback of `"fill"`). `variant` accepts a responsive breakpoint object.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"outline" \| "fill" \| false` | `"fill"` | `"fill"` gives a `paper.primary` background; `"outline"` gives a 1px `divider.primary` border and no background fill; `false` disables both (no border, no background — just the layout). |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { Card, Text } from "@xanui/ui";

<Card>
  <Text fontWeight="bold">Card title</Text>
  <Text color="text.secondary">Some supporting content inside a card.</Text>
</Card>
```

### Outline variant / no variant

```tsx
import { Card, Text } from "@xanui/ui";

<Card variant="outline" p={2}>
  <Text>Outlined card with custom padding.</Text>
</Card>

<Card variant={false} p={0}>
  <Text>Unstyled layout container — no border or background.</Text>
</Card>
```

## Notes

- Padding, gap, and radius come from `sxr` (lowest priority), so they can be overridden via `sx`/`sxr` props or component-level style props.
- `variant` supports responsive breakpoint objects, e.g. `variant={{ xs: "fill", md: "outline" }}`.
