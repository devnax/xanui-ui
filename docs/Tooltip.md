# Tooltip

Wraps a single child element and shows a floating `Menu`-based label near it on hover, after an optional delay.

## Import

```tsx
import { Tooltip } from "@xanui/ui";
```

## Overview

`Tooltip` clones its single child element to attach `onMouseEnter`/`onMouseLeave` handlers, and renders a `Menu` targeting that child, containing the tooltip's `title`. It does not manage its own positioning or transition logic — both are delegated entirely to `Menu` (which itself uses `@xanui/core`'s `Transition`/`Portal`). A hover delay (debounce) is supported so tooltips don't flash on quick mouse-overs.

`Tooltip` requires exactly one child element (a single `ReactElement`, not an array/fragment) — it throws if given anything else.

## Props / Signature

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactElement` | — | **Required.** The single element to attach hover behavior to. Its `onMouseEnter`/`onMouseLeave` are overridden (cloned in, replacing any existing handlers). |
| `title` | `useBreakpointPropsType<string \| ReactElement>` | — | Tooltip content. If a `ReactElement` is passed, it's rendered as-is; otherwise it's wrapped in a `Text` component. |
| `placement` | `MenuProps["placement"]` (`"top" \| "top-left" \| "top-right" \| "bottom" \| "bottom-left" \| "bottom-right" \| "right" \| "right-top" \| "right-bottom" \| "left" \| "left-top" \| "left-bottom"`) | `"bottom"` | Forwarded to the internal `Menu`. |
| `delay` | `useBreakpointPropsType<number \| false>` | `400` | Milliseconds to wait after `onMouseEnter` before showing the tooltip. Pass `false` (falsy) to show instantly. If the mouse leaves before the delay elapses, the pending timer is cleared and the tooltip never shows. |
| `slotProps.title` | `Omit<TextProps, "children">` | — | Extra props for the internal `Text` used to render a string `title` (ignored if `title` is already a `ReactElement`). |
| `slotProps.menu` | `Omit<MenuProps, "target" \| "children" \| "placement">` | — | Extra props for the internal `Menu` (e.g. `duration`, `variant`, `zIndex`, `onClickOutside`). Its `slotProps.content` is merged with Tooltip's own default content styling (`p: 0.5`, `shadow: "xs"`, `bgcolor: "paper.primary"`). |

`Tooltip` itself does not extend `TagProps` — it renders no `Tag` of its own; see [Core Concepts](./core-concepts.md) for the `Menu`/`Transition` machinery it relies on.

## Examples

Basic text tooltip:

```tsx
import { Tooltip, IconButton } from "@xanui/ui";
import InfoIcon from "@xanui/icons/Info";

<Tooltip title="More information">
  <IconButton>
    <InfoIcon />
  </IconButton>
</Tooltip>
```

Custom placement, no delay, and a rich `ReactElement` title:

```tsx
import { Tooltip, Button, Text } from "@xanui/ui";

<Tooltip
  placement="right"
  delay={false}
  title={<Text sx={{ fontWeight: 600 }}>Delete this item permanently</Text>}
  slotProps={{ menu: { zIndex: 10 } }}
>
  <Button color="danger">Delete</Button>
</Tooltip>
```

## Notes

- Public API — exported as `Tooltip` from `@xanui/ui`.
- Built on this package's `Menu` component (positioning, portal, click-outside, transition) and `Text` (for plain-string titles).
- Passing multiple children or an array as `children` throws `"Invalid children in Tooltip"`.
- There is no `disableHoverListener`/controlled-open equivalent — visibility is entirely driven by hover state.
