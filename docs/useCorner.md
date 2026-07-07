# useCorner

A tiny helper that maps a named corner style (`"square" | "rounded" | "circle"`) to a `radius` style object.

## Import

```tsx
import { useCorner } from "@xanui/ui";
```

> Note: `useCorner` is re-exported from the package root as a **named** export (`export { default as useCorner } from "./useCorner"`), even though the source file itself uses a default export. Import it as `import { useCorner } from "@xanui/ui"`.

## Overview

Several components (`IconButton`, `Chip`) expose a `corner` prop with friendly names instead of raw radius numbers. `useCorner` centralizes the mapping from those names to the `radius` value consumed by `Tag`'s theme-aware radius scale, so the mapping stays consistent across components.

## Props / Signature

```tsx
type UseCornerTypes = "square" | "rounded" | "circle";
const useCorner: (type?: UseCornerTypes) => object;
```

| Parameter / Return | Type | Description |
|---|---|---|
| `type` | `UseCornerTypes` (`"square" \| "rounded" \| "circle"`), optional | The desired corner style. `"square"` → `{ radius: 0 }`; `"rounded"` → `{ radius: 1 }`; `"circle"` → `{ radius: 100 }`. Any other value (including `undefined` or an unrecognized string) falls through to the default case. |
| **Returns** | `object` | A style object to spread onto a `Tag`/component, e.g. `{ radius: 1 }`. Returns `{}` (no override) when `type` doesn't match one of the three known values. |

## Examples

Using it directly to compute a radius style object:

```tsx
import { useCorner } from "@xanui/ui";
import { Tag } from "@xanui/core";

const cornerCss = useCorner("circle"); // { radius: 100 }

<Tag {...cornerCss} bgcolor="brand.primary" width={40} height={40} />;
```

How it's used internally by `IconButton`/`Chip` to implement their own `corner` prop:

```tsx
// simplified excerpt from IconButton
const cornerCss = useCorner(corner); // corner: "square" | "rounded" | "circle"
return <Tag {...cornerCss} {...rest} />;
```

## Notes

- Public API — exported as `useCorner` (named export) from `@xanui/ui`.
- Despite the `use` prefix, it is a plain synchronous function with no React hook calls internally (no state/effects) — it's safe to call conditionally or outside a component if needed.
- Consumed today by `IconButton` and `Chip`'s `corner` props; reach for it when building a new component that wants the same square/rounded/circle vocabulary instead of a raw numeric `radius`.
