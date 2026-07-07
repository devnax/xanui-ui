# Tabs

A tab-list container that manages the selected value and an animated sliding indicator behind its `Tab` children.

## Import

```tsx
import { Tabs } from "@xanui/ui";
```

## Overview

`Tabs` is a controlled component: it takes the currently selected `value` and calls `onChange(value, event)` when a child `Tab` is clicked. It provides that state (plus `variant`, `color`, `disableTransition`, `indicatorSize`) to descendants via React context (`TabContext`, from `src/Tabs/context.ts`), which each [Tab](./Tab.md) reads via the `useTabs()` hook to determine whether it's selected and to trigger the shared `onChange`. `Tabs` also renders and animates a single absolutely-positioned indicator element that slides/resizes to the active tab's position using `@xanui/core`'s `animate` helper (a custom eased tween, not CSS transitions), unless `disableTransition` is set. All of `variant`, `color`, `disableTransition`, `disableInitialTransition`, and `indicatorSize` support responsive breakpoint objects.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactElement<TabProps> \| ReactElement<TabProps>[]` | — (required) | One or more `Tab` elements. |
| `value` | `string \| number` | `undefined` | The currently selected tab's `value`. |
| `onChange` | `(value: string \| number, e: React.MouseEvent) => void` | `undefined` | Called when a child `Tab` is activated (clicked, or matched on mount/update — see Notes). |
| `variant` | `useBreakpointPropsType<"start-line" \| "end-line" \| "fill" \| "outline" \| "text" \| "ghost">` | `"end-line"` | Indicator style: `"start-line"`/`"end-line"` draw a thin bar above/below the active tab; `"fill"` fills behind it with `color.primary`; `"outline"` draws a bordered box; `"ghost"` fills with `color.ghost.primary`; `"text"` hides the indicator entirely. |
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"brand"` | Color token used for the indicator (and read by each `Tab` to color its selected label/background). |
| `disableTransition` | `useBreakpointPropsType<boolean>` | `undefined` (animated) | When `true`, the indicator snaps to position/width instantly instead of animating. |
| `disableInitialTransition` | `useBreakpointPropsType<boolean>` | `undefined` | When `true`, the very first indicator placement (on initial mount) has `duration: 0`; subsequent changes still animate normally. |
| `indicatorSize` | `useBreakpointPropsType<number>` | `2` | Thickness (px) of the indicator bar for the `"start-line"`/`"end-line"` variants. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` (`onChange` is omitted/redeclared) — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { useState } from "react";
import { Tabs, Tab } from "@xanui/ui";

function Example() {
  const [value, setValue] = useState("profile");

  return (
    <Tabs value={value} onChange={(v) => setValue(v as string)}>
      <Tab value="profile">Profile</Tab>
      <Tab value="security">Security</Tab>
      <Tab value="billing">Billing</Tab>
    </Tabs>
  );
}
```

### Fill variant with custom color and instant indicator

```tsx
import { useState } from "react";
import { Tabs, Tab } from "@xanui/ui";

function Example() {
  const [value, setValue] = useState(0);

  return (
    <Tabs
      value={value}
      onChange={(v) => setValue(v as number)}
      variant="fill"
      color="accent"
      disableTransition
    >
      <Tab value={0}>Overview</Tab>
      <Tab value={1}>Analytics</Tab>
    </Tabs>
  );
}
```

## Notes

- `Tabs` must wrap one or more [Tab](./Tab.md) elements — each `Tab` calls `useTabs()` (from `src/Tabs/context.ts`) and **throws** `"Tabs component must be used within a <Tabs>."` if rendered outside a `Tabs` ancestor.
- Each `Tab` is itself a styled `Button` (`variant="text"`) that reads `value`, `variant`, `color` from context to decide whether it's selected, and re-fires `onChange` via a `useEffect` matching `value === container.value` whenever `variant`/`color` change (keeps the indicator in sync if theming changes after selection).
- `baseClass` is `"tabs"` on the container and `"tabs-indicator"` on the sliding indicator element — useful theming/styling hooks.
- The indicator is a plain `Tag` positioned with inline styles mutated directly in the `onChange` handler (not React state), driven by `@xanui/core`'s `animate()` tween with a cubic ease-out easing function.
