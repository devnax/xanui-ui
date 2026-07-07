# Checkbox

A styled checkbox built on a hidden native `<input type="checkbox">`, with custom check/uncheck/indeterminate icons.

## Import

```tsx
import { Checkbox } from "@xanui/ui";
```

## Overview

`Checkbox` renders a visible clickable icon `Tag` (showing a checked, unchecked, or indeterminate icon) alongside a visually-hidden (`display: none!important`) native `<input type="checkbox">` that mirrors the `checked` state for form semantics/accessibility. If `onChange` isn't provided, the component manages its own internal boolean state so it works uncontrolled out of the box. It's registered with `useThemeComponent("Checkbox", ...)`. All visual props accept responsive breakpoint objects.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | internal state (starts `false`) | Controlled checked state. If omitted, the component tracks its own state and toggles it on click. |
| `onChange` | inherited `onChange` handler (called with `{ target: { checked } }`) | toggles internal state | Called on click with a synthetic-like event exposing `target.checked`. |
| `indeterminate` | `useBreakpointPropsType<boolean>` | — | When `true`, forces the checked visual state and swaps in the indeterminate icon, overriding `checkIcon`. |
| `checkIcon` | `useBreakpointPropsType<ReactElement>` | `<CheckIcon />` (or the indeterminate icon if `indeterminate`) | Icon shown when checked. |
| `uncheckIcon` | `useBreakpointPropsType<ReactElement>` | `<UnCheckIcon />` | Icon shown when unchecked. |
| `size` | `useBreakpointPropsType<number \| "xs" \| "sm" \| "md" \| "lg" \| "xl">` | `"md"` (28px) | Icon/box size in px, or one of the named sizes (`xs`=18, `sm`=22, `md`=28, `lg`=32, `xl`=36). |
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"brand"` | Icon color when checked (`` `${color}.primary` ``); unchecked color is always `text.secondary`. |
| `disabled` | inherited from `TagProps<"input">` | — | When `true`, clicking the visible icon is a no-op (the `onClick` handler returns early). |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps<"input">` — see [Core Concepts](./core-concepts.md). Note `color`, `size`, `component`, `type`, and `checked` are omitted from the base type and re-declared as above.

## Examples

### Basic usage (uncontrolled)

```tsx
import { Checkbox } from "@xanui/ui";

<Checkbox />
```

### Controlled, custom color/size, and indeterminate

```tsx
import { Checkbox, Stack } from "@xanui/ui";
import { useState } from "react";

const [checked, setChecked] = useState(false);

<Stack gap={1}>
  <Checkbox
    checked={checked}
    color="success"
    size="lg"
    onChange={(e: any) => setChecked(e.target.checked)}
  />
  <Checkbox indeterminate color="warning" />
</Stack>
```

## Notes

- The hidden `<input type="checkbox">` is `readOnly` and only reflects `checked` — actual toggling logic lives in the visible icon `Tag`'s `onClick`, not native input change events.
- `disabled` blocks the click handler but is not otherwise reflected visually beyond whatever comes through `sx`/inherited `Tag` styling.
- Related: [Radio](./Radio.md), [Switch](./Switch.md) for other boolean/selection inputs.
