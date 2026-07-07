# ListItem

A single row within a [`List`](./List.md) — supports selection styling, start/end icons, and an optional subtitle.

## Import

```tsx
import { ListItem } from "@xanui/ui";
```

## Overview

`ListItem` renders a `<li>` `Tag` laid out as a horizontal flex row (icon, text/subtitle column, icon). It reads `color`, `variant`, and `size` from the nearest `List` via `useListContext()` (see [`src/List/ListContext.ts`](./List.md)) to derive its selected-state color (via `useColorTemplate(color, variant)`), hover color (`useColorTemplate(color, "ghost")`), and size-based padding/min-height/font-size. When `selected` is true, the item is styled with the list's color template; otherwise it falls back to a neutral `useColorTemplate("default", "text")` look. It uses `useThemeComponent("ListItem", ...)` for theme-level defaults. [`Option`](./Option.md) is built directly on top of `ListItem` for `Select` integration.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `selected` | `boolean` | — | Applies the list's color template (fill/ghost/text, per the parent `List`'s `variant`) to indicate the active item. |
| `subtitle` | `useBreakpointPropsType<string \| ReactElement>` | — | Optional secondary line rendered below the main content in a smaller `Text`. |
| `startIcon` | `useBreakpointPropsType<ReactElement>` | — | Icon/element rendered before the content. |
| `endIcon` | `useBreakpointPropsType<ReactElement>` | — | Icon/element rendered after the content. |
| `size` | `useBreakpointPropsType<"xs" \| "sm" \| "md" \| "lg" \| "xl">` | inherited from `List` (`"md"` if standalone) | Controls padding, min-height, and font size. Normally set on the parent `List`, not per-item. |
| `slotProps.content` | `Omit<TextProps, "children">` | — | Props for the `Text` wrapping the main children. |
| `slotProps.startIcon` | `Omit<TagProps, "children">` | — | Props for the `Tag` wrapping `startIcon`. |
| `slotProps.endIcon` | `Omit<TagProps, "children">` | — | Props for the `Tag` wrapping `endIcon`. |
| `slotProps.subtitle` | `Omit<TextProps, "children">` | — | Props for the `Text` wrapping `subtitle`. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { List, ListItem } from "@xanui/ui";

<List>
  <ListItem>Overview</ListItem>
  <ListItem selected>Analytics</ListItem>
  <ListItem>Reports</ListItem>
</List>
```

### Icons and subtitle

```tsx
import { List, ListItem } from "@xanui/ui";
import HomeIcon from "./icons/HomeIcon";
import ChevronRightIcon from "./icons/ChevronRightIcon";

<List size="lg">
  <ListItem
    startIcon={<HomeIcon />}
    endIcon={<ChevronRightIcon />}
    subtitle="Your personal dashboard"
    selected
  >
    Home
  </ListItem>
</List>
```

## Notes

- Requires a `size` (and `color`/`variant`) to come from a parent `List` via `useListContext()`; using `ListItem` completely outside of `List` will read a `null` context and can throw when destructuring (`listProps.color`), so always render it inside a `List`.
- `slotProps` on `List` (`slotProps.listItem`) is spread onto each `ListItem` before its own props, so per-item props always take precedence over the list-wide default.
- The main content renders as a `<p>` when `children` is a string/number, otherwise a `<div>`, so block-level custom content is supported without invalid HTML nesting.
- See [List](./List.md) for the color/variant/size context provider, and [Option](./Option.md) for the `Select`-aware wrapper around `ListItem`.
