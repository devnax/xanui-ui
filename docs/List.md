# List

An unstyled `<ul>` container that provides shared color/variant/size context to its `ListItem` children.

## Import

```tsx
import { List } from "@xanui/ui";
```

## Overview

`List` renders a `Tag` as a `<ul>` with list styling stripped (`listStyle: none`, `p: 0`, `m: 0`) and publishes a `ListContext` (color, variant, size, and a shared `listItem` slot override) that every descendant `ListItem` (and `Option`, which wraps `ListItem`) reads via `useListContext`. This lets you set selection/appearance once on the list instead of repeating `color`/`size` on every item. It uses `useThemeComponent("List", ...)` so themes can globally set defaults for all `List` instances, and `useBreakpointProps` so `color`, `variant`, and `size` all accept responsive breakpoint objects.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"brand"` | Color passed down via context, used by child `ListItem`s to derive selected/hover styling. |
| `variant` | `useBreakpointPropsType<Omit<UseColorTemplateType, "outline">>` | `"fill"` | Color-template variant (`"fill" \| "ghost" \| "text"`) used for selected/hover item styling. |
| `size` | `useBreakpointPropsType<"xs" \| "sm" \| "md" \| "lg" \| "xl">` | `"md"` | Size passed down via context; controls each `ListItem`'s padding/min-height/font-size. |
| `slotProps.listItem` | `Omit<ListItemProps, "children">` | — | Props merged onto every child `ListItem` (via context) as a shared default — individual items still override or extend it via their own props. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md). Note `color` and `size` are re-typed here (omitted from the base `TagProps` and redeclared as above).

## Examples

### Basic usage

```tsx
import { List, ListItem } from "@xanui/ui";

<List>
  <ListItem>Inbox</ListItem>
  <ListItem selected>Sent</ListItem>
  <ListItem>Drafts</ListItem>
</List>
```

### Custom color, variant, size, and shared item props

```tsx
import { List, ListItem } from "@xanui/ui";

<List color="accent" variant="ghost" size="lg" slotProps={{ listItem: { radius: "md" } }}>
  <ListItem startIcon={<HomeIcon />}>Home</ListItem>
  <ListItem startIcon={<SettingsIcon />} selected>
    Settings
  </ListItem>
</List>
```

## Slots

| Slot | Applies to | Purpose |
|---|---|---|
| `listItem` | Every descendant `ListItem` (via `ListContext`) | Default props (e.g. `radius`, `sx`) applied to all items in the list without repeating them per item. |

## Notes

- Reads/writes `src/List/ListContext.ts` — `ListItem` (and `Option`) call `useListContext()` and will throw/behave oddly if rendered outside a `List` (context value is `null` by default).
- See [ListItem](./ListItem.md) for how `color`/`variant`/`size` are consumed, and [Option](./Option.md) for the `Select`-integrated variant of `ListItem`.
