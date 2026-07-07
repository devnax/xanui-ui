# Toast

An imperative, notification-style popup rendered outside the React tree, stacked by placement corner, with auto-close and pause-on-hover behavior.

## Import

```tsx
import { Toast } from "@xanui/ui";
```

## Overview

`Toast` is not a JSX component you render — it's a function you *call* to push a notification onto a shared, module-level render queue (via `@xanui/core`'s `Renderar`). Each call renders (or updates) a `Scrollbar`-wrapped stack fixed to one of six screen corners, and each toast inside that stack is an `Alert` wrapped in `@xanui/core`'s `Transition` component. Multiple toasts at the same `placement` stack together and animate in/out independently. Toasts auto-dismiss after a delay by default, and that timer pauses while the mouse hovers the toast.

Because the content is rendered through `Alert`, `Toast` accepts everything `Alert` accepts (`title`, `icon`, `color`, `variant`, etc.) in addition to its own placement/auto-close options — these are spread onto the internal `Alert` as `rest` props.

## Props / Signature

`Toast` is called as `Toast(content)` or `Toast(props)` — it does not return a React element and has no ref/DOM element of its own.

```tsx
function Toast(props?: UseToastProps['content'] | UseToastProps): void
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `useBreakpointPropsType<string \| ReactElement>` | — | Passed through to the internal `Alert`'s `title`. |
| `content` | `AlertProps['children']` | — | The toast body. If you call `Toast(someReactElement)` directly (instead of a props object), it is treated as shorthand for `{ content: someReactElement }`. |
| `variant` | `useBreakpointPropsType<UseColorTemplateType>` | `"fill"` (Alert default) | Passed through to `Alert`'s `variant` (`"fill" \| "outline" \| "ghost" \| "text"`). |
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"brand"` | Passed through to `Alert`'s `color`. |
| `icon` | `useBreakpointPropsType<"info" \| "warning" \| "success" \| "error" \| false \| ReactElement>` | — | Passed through to `Alert`'s `icon`. |
| `placement` | `"top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right"` | `"bottom-right"` | Which screen corner/edge the toast stacks in. Each placement gets its own animated direction (e.g. `top-center` fades down, `bottom-right` fades in from the left). |
| `closeable` | `useBreakpointPropsType<boolean>` | — | When truthy, shows the `Alert`'s built-in close button, which dismisses the toast immediately. |
| `autoColose` | `boolean` | `true` | Whether the toast auto-dismisses after `autoColoseDelay`. (Note: this is the actual prop name in source — it is misspelled, not "autoClose".) |
| `autoColoseDelay` | `number` | `6000` | Milliseconds before auto-dismiss. |
| `pauseOnHover` | `boolean` | `true` | When `autoColose` is on, hovering the toast clears the pending dismiss timer; leaving re-arms it. |

`Toast` does **not** extend `TagProps` itself (it's not a component) — the underlying `Alert` it renders does; see [Core Concepts](./core-concepts.md).

## Examples

Simple text toast:

```tsx
import { Toast } from "@xanui/ui";

Toast("Saved successfully");
```

Full options with icon, placement, and a persistent (non-auto-closing) closeable toast:

```tsx
import { Toast } from "@xanui/ui";

const handleError = () => {
  Toast({
    title: "Upload failed",
    content: "The file exceeds the 10MB limit.",
    color: "danger",
    icon: "error",
    placement: "top-right",
    closeable: true,
    autoColose: false,
  });
};
```

## Notes

- Public API — exported as `Toast` from `@xanui/ui`.
- Each call to `Toast(...)` adds a new entry to a shared, in-memory `State` map keyed by `placement`; the stack for a given corner un-mounts itself (`Renderar.unrender`) once it's empty.
- Because state is module-level (outside React), `Toast` can be called from anywhere — event handlers, async callbacks, outside components — without needing a provider.
- Internally uses `@xanui/core`'s `Transition` (see [Core Concepts](./core-concepts.md#transitions)) and `Alert`, and this package's `Scrollbar` component for the scrollable stack container.
- `zIndex` for the stack container is hardcoded to `99999999`.
