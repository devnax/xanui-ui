# Chip

A compact label pill, optionally with a leading/trailing icon, built on `useColorTemplate` and `useCorner`.

## Import

```tsx
import { Chip } from "@xanui/ui";
```

## Overview

`Chip` renders an inline-flex `Tag` sized by a `size` scale, colored via `useColorTemplate(color, variant)`, and corner-shaped via `useCorner(corner)` (from `"square" | "rounded" | "circle"`). The label is wrapped in its own inner `Tag` (`slotProps.label`) so its color/overflow can be styled independently of icons. It's registered with `useThemeComponent("Chip", ...)`. All visual props accept responsive breakpoint objects.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `useBreakpointPropsType<string \| ReactElement>` | — | The chip's text/content. |
| `startIcon` | `useBreakpointPropsType<ReactElement>` | — | Icon rendered before the label. |
| `endIcon` | `useBreakpointPropsType<ReactElement>` | — | Icon rendered after the label. |
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"brand"` | Passed to `useColorTemplate` to derive background/text color. |
| `variant` | `useBreakpointPropsType<UseColorTemplateType>` | `"fill"` | Passed to `useColorTemplate` (`"fill" \| "outline" \| "ghost" \| "text"`). |
| `corner` | `useBreakpointPropsType<UseCornerTypes>` | `"circle"` | Corner shape: `"square"` (radius 0), `"rounded"` (radius 1), or `"circle"` (radius 100, pill shape). |
| `size` | `useBreakpointPropsType<"xs" \| "sm" \| "md" \| "lg" \| "xl">` | `"md"` | Controls height, gap, horizontal padding, and font size (`xs`=20px height … `xl`=48px height). |
| `slotProps` | `{ label?: Omit<TagProps<"div">, "children"> }` | — | Extra props forwarded to the inner label `Tag`. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md). Note `color`, `children`, and `size` are omitted from the base type and re-declared as above (`label` is used in place of `children`).

## Examples

### Basic usage

```tsx
import { Chip } from "@xanui/ui";

<Chip label="Default" />
```

### Variants, colors, sizes, and icons

```tsx
import { Chip } from "@xanui/ui";
import CheckIcon from "@xanui/icons/Check";
import CloseIcon from "@xanui/icons/Close";

<>
  <Chip label="Success" color="success" variant="fill" />
  <Chip label="Outline" color="brand" variant="outline" corner="rounded" />
  <Chip label="Ghost" color="accent" variant="ghost" size="lg" />
  <Chip
    label="Removable"
    color="danger"
    startIcon={<CheckIcon fontSize={16} />}
    endIcon={<CloseIcon fontSize={16} />}
  />
</>
```

## Slots

`slotProps` accepts:

| Slot | Applies to | Notes |
|---|---|---|
| `label` | The inner label `Tag` wrapping the `label` content | Useful for overriding text overflow behavior or applying extra styles to just the text/label element, without affecting icons. |

## Notes

- `color` defaults to `"brand"` and `variant` to `"fill"` when not provided, even though `color`/`variant` are optional in the type.
- The label's text color is forced via `` template.main.color + "!important" ``, so overriding text color through `slotProps.label` requires an equally-specific override (or the `!` important-suffix convention from [Core Concepts](./core-concepts.md)).
- Related: [Badge](./Badge.md) for status dots/counts, [Button](./Button.md) for interactive pill-shaped actions.
