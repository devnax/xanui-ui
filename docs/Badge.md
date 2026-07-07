# Badge

Overlays a small status dot, count, or custom element onto a corner of its `children`, with an optional scale/fade-in transition.

## Import

```tsx
import { Badge } from "@xanui/ui";
```

## Overview

`Badge` positions its badge content absolutely at one of four corners of its children, using `useColorTemplate(color, "fill")` for the default (non-element) badge styling. Numeric `content` above 99 is displayed as `"99+"`. When `content` is a `ReactElement`, the built-in color/sizing styles are skipped (`template = {}`) so your custom element renders unstyled by the badge itself. Enter/exit animation is handled via `@xanui/core`'s `Transition` (a scale + translate effect) unless `disableTransition` is set. Registers with `useThemeComponent("Badge", ...)` (no explicit defaults beyond internal fallbacks for `color`, `visible`, `placement`, `disableTransition`).

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `useBreakpointPropsType<number \| string \| ReactElement>` | — | Badge content. If omitted, renders a small dot (8×8) instead of the sized pill. Numbers `>99` render as `"99+"`. |
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"danger"` | Used with `useColorTemplate(color, "fill")` for the badge's background/text — ignored when `content` is a `ReactElement`. |
| `placement` | `useBreakpointPropsType<"left-top" \| "left-bottom" \| "right-top" \| "right-bottom">` | `"right-top"` | Which corner of `children` the badge is anchored to. |
| `visible` | `useBreakpointPropsType<boolean>` | `true` | Controls the `Transition`'s `open` state (only relevant when `disableTransition` is false and `content` is defined). |
| `disableTransition` | `boolean` | `false` | Skips the `Transition` wrapper entirely — badge renders/unmounts immediately. |
| `disableSpace` | `boolean` | `false` | When `false`, the badge is translated 50% outside the corner (straddling the edge); when `true`, it sits flush inside the corner. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` (minus `baseClass` and `content`, which are reserved) — see [Core Concepts](./core-concepts.md).

### `refs`

| Key | Type | Description |
|---|---|---|
| `refs.content` | `React.Ref<any>` | Ref forwarded to the badge content `Tag`. |
| `refs.transition` | `React.Ref<any>` | Ref forwarded to the `Transition` wrapper (unused when `disableTransition` is true). |

## Examples

### Basic usage — notification count

```tsx
import { Badge } from "@xanui/ui";
import { IconButton } from "@xanui/ui";
import BellIcon from "@xanui/icons/Notifications";

<Badge content={5} color="danger">
  <IconButton>
    <BellIcon />
  </IconButton>
</Badge>
```

### Status dot, custom placement, and custom element content

```tsx
import { Badge, Avatar } from "@xanui/ui";

// Online status dot, bottom-right, flush against the avatar
<Badge color="success" placement="right-bottom" disableSpace>
  <Avatar src="/images/user-1.jpg" size={48} />
</Badge>;

// Custom badge element (styling opted out of by Badge itself)
<Badge
  placement="left-top"
  content={
    <span style={{ background: "gold", borderRadius: "50%", padding: 4 }}>
      ★
    </span>
  }
>
  <Avatar src="/images/user-2.jpg" size={48} />
</Badge>;
```

## Slots

| Slot | Target | Notes |
|---|---|---|
| `transition` | The `Transition` wrapper | `Omit<TransitionProps, "open">`; ignored when `disableTransition` is true. |
| `content` | The badge content `Tag` | `Omit<TagProps<"span">, "children">`. |

## Notes

- Related components: [`AvatarPicker`](./AvatarPicker.md) uses `Badge` for its upload/remove control overlay.
- Theming key: `"Badge"` (via `useThemeComponent`).
