# Transition

A single-child enter/exit animation wrapper driven by a named variant (fade, slide, zoom, collapse, ...).

> **This is an internal utility and is not currently exported from the `@xanui/ui` package root.** It also is not used anywhere else in this package's source — every component that needs a transition (`Toast`, `Menu`, `Layer`, etc.) imports `Transition` directly from `@xanui/core` instead. `@xanui/core` ships its own, separate `Transition` component with the same variant names and nearly identical logic; `src/Transition/index.tsx` in `@xanui/ui` is a **distinct, parallel re-implementation**, not a wrapper or re-export of the core one. Treat it as dead/unused code unless a future component starts importing it.

## Import

```tsx
// Not exported from "@xanui/ui" — would need an internal/relative import from source, e.g.:
import Transition from "@xanui/ui/src/Transition";
```

## Overview

`Transition` clones its single child element and drives inline style updates on it (via a ref) using `@xanui/core`'s `useTransition` animation hook. The actual `from`/`to`/`onUpdate` values for a given animation are supplied by a "variant" function looked up from `./variants.ts` (e.g. `fade`, `slideUp`, `zoomOver`, `collapseVertical`) by name. It toggles between entering and exiting based on the `open` prop, and exposes lifecycle callbacks (`onEnter`, `onEntered`, `onExit`, `onExited`, `onUpdate`, `onDone`).

Compare to `@xanui/core`'s own `Transition` (used throughout this package, and documented conceptually in [Core Concepts](./core-concepts.md#transitions)) — the two have the same public shape (`open`, `variant`, `easing`, `duration`, etc.) and the same variant name set, but core's variant callbacks additionally receive the element's `DOMRect` and support per-variant `onEntered`/`onExited` callbacks, which this local implementation's variants do not.

## Props / Signature

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `React.ReactElement` | — | **Required.** Exactly one valid element; throws otherwise. Cloned with a merged `ref` so the transition can read/write its DOM node. |
| `open` | `boolean` | — | **Required.** `true` runs the enter animation, `false` runs the exit animation. |
| `variant` | `TransitionVariantTypes` (`keyof typeof variants`, i.e. `"slideDown" \| "slideUp" \| "slideRight" \| "slideLeft" \| "fade" \| "fadeDown" \| "fadeUp" \| "fadeRight" \| "fadeLeft" \| "zoom" \| "zoomOver" \| "grow" \| "collapseVertical" \| "collapseHorizontal"`) | — | **Required.** Selects the animation shape from `variants.ts`. |
| `easing` | `keyof typeof Easing` (from `@xanui/core`: `"default" \| "standard" \| "fast" \| "smooth" \| "linear" \| "bounceBezier" \| "cubicInOut" \| "easeOutBounce" \| "spring"`) | `"default"` | Easing curve name, resolved to a function from `@xanui/core`'s `Easing` map. |
| `duration` | `number` | `450` | Animation duration in ms. |
| `delay` | `number` | — | Delay before the animation starts. |
| `initialTransition` | `boolean` | `true` | If `false`, the very first open/close on mount happens without animation (snaps directly to state); subsequent changes still animate. |
| `exitOnUnmount` | `boolean` | `false` | If `true`, once the exit transition finishes (`status === "exited"`), the component renders nothing (fully unmounts the child) instead of leaving it in its exited visual state. |
| `onEnter` | `() => void` | — | Fired when the enter animation starts. |
| `onEntered` | `() => void` | — | Fired when the enter animation completes. |
| `onExit` | `() => void` | — | Fired when the exit animation starts. |
| `onExited` | `() => void` | — | Fired when the exit animation completes. |
| `onUpdate` | `(value: Record<string, number>, progress: number) => void` | — | Fired on every animation frame with the current interpolated values and 0–1 progress, in addition to the variant's own internal `onUpdate` (which actually paints the style onto the DOM node). |
| `onDone` | `() => void` | — | Fired when either direction's animation finishes. |

Return value: a single cloned React element (the child), or `undefined`/nothing when `exitOnUnmount` is true and the transition has fully exited. `Transition` does not extend `TagProps` — it has no styling props of its own; all visual styling is inline-applied to the child's DOM node by the selected variant.

## Examples

Fade a panel in and out:

```tsx
import Transition from "../Transition"; // internal relative import — see note above
import { useState } from "react";

const [open, setOpen] = useState(false);

<Transition open={open} variant="fade" duration={200}>
  <div>Panel content</div>
</Transition>
```

Slide-collapse with lifecycle callbacks and no animation on first mount:

```tsx
import Transition from "../Transition";

<Transition
  open={expanded}
  variant="collapseVertical"
  easing="smooth"
  initialTransition={false}
  exitOnUnmount
  onExited={() => console.log("fully collapsed")}
>
  <ul>{items}</ul>
</Transition>
```

## Notes

- **Internal-only and effectively unused**: not exported from `src/index.tsx`, and no other component in this package imports it (it's only referenced in a commented-out import inside `src/Layer/index.tsx`). Every real usage in this codebase (`Toast`, `Menu`, `Layer`, etc.) imports `Transition` from `@xanui/core` directly instead.
- If you need enter/exit animation in a new component, prefer `@xanui/core`'s `Transition`/`useTransition` (already documented in [Core Concepts](./core-concepts.md#transitions)) for consistency with the rest of the library, rather than this local copy.
- Variant callbacks live in `src/Transition/variants.ts` and mutate `el.style` directly (`transform`, `opacity`, `maxHeight`, `width`) — they are not themable via color/spacing tokens.
