# Menu

A portaled, auto-positioned popup anchored to a target DOM element — the base building block for dropdowns and context menus.

## Import

```tsx
import { Menu } from "@xanui/ui";
```

## Overview

`Menu` is open whenever `target` (an `HTMLElement`, typically from a ref) is truthy — there's no separate `open` boolean. It renders through [`Portal`](./Portal.md) into `document.body`, wraps its content in [`ClickOutside`](./ClickOutside.md) to dismiss on outside clicks, and animates with `@xanui/core`'s `Transition` (`grow` variant by default). On open (and on window `resize`/`scroll`), it measures the `target` and menu element to compute a position for the requested `placement`, clamps it to the viewport, and — if the menu would still render off-screen — automatically tries the other 11 placements until one fits, updating `transformOrigin` to match. Uses `useThemeComponent("Menu", ...)` for theme-level defaults and `useBreakpointProps` so `placement` accepts a responsive object.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `target` | `HTMLElement` | — | Anchor element the menu positions itself against. Menu is open when this is set (truthy), closed when `undefined`. |
| `placement` | `useBreakpointPropsType<PlacementTypes>` | `"bottom-left"` | One of `"top"`, `"top-left"`, `"top-right"`, `"bottom"`, `"bottom-left"`, `"bottom-right"`, `"right"`, `"right-top"`, `"right-bottom"`, `"left"`, `"left-top"`, `"left-bottom"`. Auto-falls back to another placement if the requested one goes off-screen. |
| `zIndex` | `number` | `0` | Added to the base `z-index` of `1500` used for the portaled content. |
| `variant` | `TransitionProps["variant"]` | `"grow"` | Transition animation variant. |
| `duration` | `TransitionProps["duration"]` | `200` | Transition duration (ms). |
| `onEnter` | `TransitionProps["onEnter"]` | — | Called when the enter transition starts. |
| `onEntered` | `TransitionProps["onEntered"]` | — | Called when the enter transition finishes. |
| `onExit` | `TransitionProps["onExit"]` | — | Called when the exit transition starts. |
| `onExited` | `TransitionProps["onExited"]` | — | Called when the exit transition finishes (after this, the menu unmounts internally). |
| `onClickOutside` | `(e: MouseEvent) => void` | — | Called on outside click, except clicks on the `target` element itself (typically flips `target` back to `undefined` to close). |
| `slotProps.transition` | `Omit<TransitionProps, "open">` | — | Extra props for the internal `Transition`. |
| `slotProps.portal` | `Omit<PortalProps, "children">` | — | Extra props for the internal `Portal` (e.g. `appendTo`, `container`). |
| `slotProps.content` | `Omit<TagProps<"div">, "children">` | — | Extra props for the menu's content `Tag` (the visible surface). |
| `slotProps.clickOutSide` | `Omit<ClickOutsideProps, "children">` | — | Extra props for the internal `ClickOutside` wrapper (note the capitalized "Side" in the prop name). |

Also accepts `children: ReactNode`. `Menu` does not extend `TagProps` itself (it's a positioning/behavior wrapper) — style its content via `slotProps.content`.

## Examples

### Basic usage

```tsx
import { Menu, ListItem } from "@xanui/ui";
import { useRef, useState } from "react";

function Example() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [target, setTarget] = useState<HTMLElement | undefined>();

  return (
    <>
      <button ref={btnRef} onClick={() => setTarget(btnRef.current!)}>
        Open menu
      </button>
      <Menu target={target} onClickOutside={() => setTarget(undefined)}>
        <ListItem onClick={() => setTarget(undefined)}>Edit</ListItem>
        <ListItem onClick={() => setTarget(undefined)}>Delete</ListItem>
      </Menu>
    </>
  );
}
```

### Custom placement and transition

```tsx
import { Menu } from "@xanui/ui";

<Menu
  target={anchorEl}
  placement="right-top"
  variant="fadeLeft"
  duration={150}
  onClickOutside={() => setAnchorEl(undefined)}
  slotProps={{ content: { p: 1, minWidth: 200 } }}
>
  {menuContent}
</Menu>
```

## Slots

| Slot | Applies to | Purpose |
|---|---|---|
| `transition` | Internal `Transition` | Override animation config (easing, custom variant, etc.), excluding `open`. |
| `portal` | Internal `Portal` | Control the portal mount target/container. |
| `content` | The visible menu surface `Tag` | Style the popup box (background, shadow, radius, size, padding). |
| `clickOutSide` | Internal `ClickOutside` wrapper | Extra props on the outside-click-detection wrapper (positioning `sx`, etc.). |

## Notes

- There's no `open` prop — visibility is driven entirely by whether `target` is set, which also determines what the menu positions against.
- Renders at `z-index: 1500 + zIndex`, matching the base layer z-index used by [`Layer`](./Modal.md)/[`Modal`](./Modal.md); increase `zIndex` if you need a menu to sit above a modal.
- Content default styling: `bgcolor="surface.primary"`, `shadow="lg"`, `radius={1}`, `overflow: hidden` — override via `slotProps.content`.
- See [ClickOutside](./ClickOutside.md) and [Portal](./Portal.md) for the primitives it composes, and [Core Concepts § Transitions](./core-concepts.md) for available `variant` values.
