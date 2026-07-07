# Radio

A radio-button control, implemented as a thin wrapper around [`Checkbox`](./Checkbox.md) with radio-styled icons and `type="radio"`.

## Import

```tsx
import { Radio } from "@xanui/ui";
```

## Overview

`Radio` reuses `Checkbox`'s entire implementation and prop surface (`RadioProps` is a direct type alias of `CheckboxProps`) — it only swaps the default `checkIcon`/`uncheckIcon` for filled/unfilled circle icons, forces the underlying hidden native input's `type` to `"radio"`, and adds a `"radio"` entry to `classNames`. Because it delegates entirely to `Checkbox`, it shares the same rendering model: a visible `Tag` showing the current icon plus a visually-hidden (`display: none`) native `<input>` for accessibility/form semantics, and the same theme lookup (`useThemeComponent("Radio", ...)`).

Note that `Radio` does not implement radio-group "only one selected" semantics itself — like `Checkbox`, it is a controlled/uncontrolled boolean `checked` toggle. Building an actual mutually-exclusive radio group means managing the shared selected-value state yourself and passing `checked`/`onChange` to each `Radio` (see example below).

## Props

`Radio` accepts every prop `Checkbox` accepts (`RadioProps = CheckboxProps`):

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | internal `useState` (`false`) | Controlled checked state. If omitted, the component manages its own state internally. |
| `checkIcon` | `useBreakpointPropsType<ReactElement>` | filled circle icon (`RadioButtonChecked`) | Icon shown when checked. |
| `uncheckIcon` | `useBreakpointPropsType<ReactElement>` | empty circle icon (`RadioButtonUnchecked`) | Icon shown when unchecked. |
| `indeterminate` | `useBreakpointPropsType<boolean>` | `undefined` | Forces `checked` visual state and swaps in an indeterminate icon (inherited from `Checkbox`; unusual for a radio but supported since props pass through). |
| `size` | `useBreakpointPropsType<number \| "xs" \| "sm" \| "md" \| "lg" \| "xl">` | `"md"` (28px) | Icon/hit-area size. Named sizes map to `18/22/28/32/36` px. |
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"brand"` | Color token applied to the icon when checked (`{color}.primary`). |
| `onChange` | `(e: { target: { checked: boolean } }) => void` | toggles internal state | Change handler; receives a minimal synthetic-like event object, not a real `ChangeEvent`. |
| `disabled` | `boolean` | — | Disables the click handler (inherited via `TagProps<"input">`). |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage (uncontrolled)

```tsx
import { Radio } from "@xanui/ui";

<Radio />
```

### Controlled radio group

```tsx
import { Radio, Stack, Text } from "@xanui/ui";
import { useState } from "react";

const [selected, setSelected] = useState("a");

<Stack direction="row" gap={2}>
  {["a", "b", "c"].map((option) => (
    <Stack key={option} direction="row" alignItems="center" gap={1}>
      <Radio
        checked={selected === option}
        onChange={() => setSelected(option)}
      />
      <Text>Option {option.toUpperCase()}</Text>
    </Stack>
  ))}
</Stack>
```

### Size and color

```tsx
import { Radio } from "@xanui/ui";

<Radio size="lg" color="success" checked />
```

## Notes

- `Radio` is implemented entirely on top of [`Checkbox`](./Checkbox.md) — read that doc for the full underlying behavior (icon rendering, hidden native input, sizing table).
- The registered theme name is `"Radio"` (via `useThemeComponent`), distinct from `"Checkbox"`, so themes can restyle them independently even though they share code.
- There is no built-in `RadioGroup`; compose mutual exclusivity yourself as shown above.
