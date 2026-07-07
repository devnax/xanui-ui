# Skeleton

A loading placeholder block with `pulse` or `wave` animation, or a pass-through wrapper that renders its real `children` once loaded.

## Import

```tsx
import { Skeleton } from "@xanui/ui";
```

## Overview

`Skeleton` is the placeholder primitive referenced throughout `@xanui/ui`'s "Skeleton loading" convention (see [Core Concepts](./core-concepts.md)). It has a dual mode driven by `children` and `loading`: if there are **no** `children` at all, it always renders as a loading placeholder (regardless of `loading`); if `children` is provided, it renders the placeholder only while `loading` is `true`, and renders `children` directly (unwrapped) once `loading` is falsy. This makes it convenient both as a standalone shimmering block (`<Skeleton width={200} height={20} />`) and as an inline wrapper around real content (`<Skeleton loading={isLoading}><Text>{data}</Text></Skeleton>`).

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `loading` | `boolean` | `true` if no `children` | Whether to show the placeholder instead of `children`. |
| `animation` | `"pulse" \| "wave" \| "none"` | `"pulse"` | Placeholder animation style. `"pulse"` fades opacity in/out; `"wave"` sweeps a gradient highlight across the block; `"none"` renders a static block with no animation defined. |
| `color` | *(inherited `TagProps` color, but defaulted here)* | `"default"` | When loading, the block's background is `paper.primary` regardless of this prop in the current source — `color` is accepted/defaulted but not otherwise consumed in the placeholder styles. |
| `children` | `ReactNode` | — | Real content to render once not loading. If omitted, the component always shows the placeholder. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md). Use `width`/`height` (or `radius` overrides via `sx`) to size the placeholder block.

## Examples

### Basic usage (standalone placeholder)

```tsx
import { Skeleton } from "@xanui/ui";

<Skeleton width={240} height={16} />
<Skeleton width={240} height={16} mt={1} animation="wave" />
```

### Wrapping real content while loading

```tsx
import { Skeleton, Text } from "@xanui/ui";
import { useEffect, useState } from "react";

const [data, setData] = useState<string>();
useEffect(() => {
  fetchData().then(setData);
}, []);

<Skeleton loading={!data} width={200} height={20}>
  <Text>{data}</Text>
</Skeleton>
```

### Composing a card skeleton

```tsx
import { Skeleton, Stack } from "@xanui/ui";

<Stack gap={1}>
  <Skeleton width={64} height={64} sx={{ borderRadius: "50%" }} />
  <Skeleton width="80%" height={14} />
  <Skeleton width="60%" height={14} />
</Stack>
```

## Notes

- `baseClass="skeleton"` is applied for theming/CSS hooks.
- Default corner radius while loading is a theme spacing-scale `radius: 1` — override via `sx={{ borderRadius: ... }}` for pill/circle shapes as shown above.
- Many other components in the library (per [Core Concepts](./core-concepts.md)) accept their own `skeleton` prop and render a `Skeleton`-shaped placeholder matching their own sizing internally, rather than requiring you to wrap them manually.
