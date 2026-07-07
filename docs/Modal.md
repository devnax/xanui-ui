# Modal

A centered, sized dialog surface built on top of `Layer`, with an imperative `Modal.open()` helper for rendering modals outside of React tree state.

## Import

```tsx
import { Modal } from "@xanui/ui";
```

## Overview

`Modal` renders a `Layer` (full-screen fixed overlay with blur/click-outside/transition support, from `../Layer`) and centers a sized content `Tag` (`bgcolor="surface.primary"`, rounded, shadowed) inside it. `size` maps to a `maxWidth` in pixels (or pass a raw number/`"full"`). Because `Modal` extends `LayerProps` (minus `slotProps`, which is redeclared), it inherits `open`, `blur`/`blurMode`, `onClickOutside`, and the full enter/exit transition callback set (listed in the table below) — see [Core Concepts § Transitions](./core-concepts.md). It also exposes a static `Modal.open(children, props)` that imperatively renders a `Modal` via `@xanui/core`'s `Renderar` (outside your component tree) and returns `{ open, close }` controls — handy for opening a modal from an event handler without hoisting `open` state.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | **Required** (inherited from `Layer`). Whether the modal is visible. |
| `children` | `ReactNode` | — | **Required.** Modal body content. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "full" \| number` | `"xs"` | Maps to a `maxWidth`: `xs`=420, `sm`=760, `md`=990, `lg`=1120, `xl`=1300, `full`="100%". A raw `number` is used as-is as the pixel `maxWidth`. |
| `transition` | `TransitionProps["variant"]` | `"zoomOver"` | Transition variant for the modal content (inherited from `Layer`). |
| `zIndex` | `number` | `0` | Added to the base overlay `z-index` of `1500` (inherited from `Layer`). |
| `blur` | `useBreakpointPropsType<number>` | — | Backdrop blur amount (inherited from `Layer`). |
| `blurMode` | `useBreakpointPropsType<"blur" \| "transparent">` | — | Backdrop treatment mode (inherited from `Layer`). |
| `onClickOutside` | `() => void` | — | Called when clicking outside the modal content (inherited from `Layer`); wires up `ClickOutside` internally when provided. |
| `onEnter` / `onEntered` / `onExit` / `onExited` | `TransitionProps[...]` | — | Transition lifecycle callbacks (inherited from `Layer`). |
| `slotProps.layer` | `LayerProps["slotProps"]` | — | Forwarded to the underlying `Layer` (its own `root`, `transition`, `content`, `clickOutside` slots). `clickOutside.maxWidth`/`width` are pre-set from `size` unless overridden. |
| `slotProps.root` | `Omit<TagProps<"div">, "children">` | — | Props for the modal's own visible content `Tag` (the white/surface box itself, as opposed to the full-screen `Layer` behind it). |

Also accepts all standard `Tag`/`Box` props via the inherited `LayerProps`/`TagProps` chain — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage (controlled)

```tsx
import { Modal, Button, Text } from "@xanui/ui";
import { useState } from "react";

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClickOutside={() => setOpen(false)} onExited={() => {}} size="sm">
        <Text p={3}>Modal content goes here.</Text>
      </Modal>
    </>
  );
}
```

### Imperative usage with `Modal.open`

```tsx
import { Modal, Button, Text } from "@xanui/ui";

function openConfirm() {
  const modal = Modal.open(
    ({ close }) => (
      <>
        <Text p={3}>Are you sure?</Text>
        <Button onClick={() => close()}>Close</Button>
      </>
    ),
    { size: "xs" },
  );
  // modal.open() / modal.close() also available imperatively
}

<Button onClick={openConfirm}>Delete item</Button>;
```

## Slots

| Slot | Applies to | Purpose |
|---|---|---|
| `layer` | The underlying `Layer` | Forwarded wholesale — override `Layer`'s own `root`, `transition`, `content`, or `clickOutside` slots (e.g. to change backdrop styling). |
| `root` | The modal's content box (the sized, surfaced `Tag` inside the layer) | Style the modal box itself — padding, custom `sx`, etc. |

## Notes

- `size` only sets `maxWidth`; the box is always `width: 100%` up to that max, so it shrinks on narrow viewports.
- `Modal.open()` renders through `@xanui/core`'s `Renderar` outside React's normal tree, and auto-unmounts on `onExited` — pass a render-prop `children` (`({ open, close }) => ...`) to get imperative controls inside the modal body too.
- Built on `Layer` (`src/Layer`), which itself composes `Transition`, `ClickOutside`, and a backdrop blur helper — see `Layer`'s own slots for backdrop/content-level overrides.
- See [Menu](./Menu.md) for a non-centered, anchor-positioned popup alternative.
