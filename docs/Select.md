# Select

A dropdown select control built from [`Input`](./Input.md) (as the closed/trigger field), [`Menu`](./Menu.md) (as the popover), and [`List`](./List.md) + [`Option`](./Option.md) (as the option list).

## Import

```tsx
import { Select } from "@xanui/ui";
```

## Overview

`Select` composes existing components rather than reimplementing a dropdown from scratch: it renders a read-only `Input` as the visible field (clicking it opens/closes an internal `Menu` anchored to that `Input`'s DOM node), and the `Menu`'s content is a `List` containing whatever `Option` children you pass as `children`. Selection state is communicated from `Option` up to `Select` through **React context** (`SelectContext`, exported from `src/Select/context.tsx`) rather than prop drilling: each `Option` reads `value`/`onChange` from `useSelectContext()`, and clicking an `Option` calls that context's `onChange(optionProps)` with the clicked option's own props (including its `children`/label and `startIcon`), which `Select` uses both to call the consumer's `onChange(value)` and to update what the closed `Input` displays (`selectOptionProps.children` as the input's `value`, and `selectOptionProps.startIcon` as its `startIcon`). This means `Option`'s rendered label doubles as the closed-field display text.

`SelectProps` extends `InputProps` (omitting `onChange`, `value`, `children`, `slotProps`, since those are redefined with `Select`-specific shapes), so most `Input` styling props (`color`, `variant`, `size`, error state, icons, etc.) apply directly to the visible field.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Controlled selected value, matched against each `Option`'s `value` (compared via `.toString()`). |
| `onChange` | `(value: string) => void` | — | Called with the selected option's `value` when an option is clicked. |
| `children` | `ReactElement<OptionProps> \| ReactElement<OptionProps>[]` | — | **Required.** One or more `Option` elements. |
| `disableArrow` | `boolean` | — | Hides the built-in up/down chevron icon shown in the field's `endIcon`. |
| `error` | *(inherited from `InputProps`)* | — | Passed straight through to the internal `Input`. |
| `helperText` | *(inherited from `InputProps`)* | — | Passed straight through to the internal `Input`. |
| `startIcon` / `endIcon` | *(inherited from `InputProps`)* | — | `startIcon` is overridden by the selected option's own `startIcon` when one is selected; `endIcon` is rendered alongside the chevron. |
| `name` | *(inherited from `InputProps`)* | — | Passed straight through to the internal `Input`. |
| `color` | *(inherited from `InputProps`)* | `"brand"` | Passed to the internal `Input` and `List`. |
| `variant` | *(inherited from `InputProps`)* | `"fill"` | Passed to the internal `Input` (a `"ghost"` variant is coerced to `"fill"` for the field) and `List` (an `"outline"` variant is coerced to `"fill"` for the list). |
| `size` | *(inherited from `InputProps`)* | `"md"` | Passed to both the internal `Input` and `List`. |
| `refs` | `{ input?: Ref; menu?: Ref; list?: Ref }` | — | Escape hatch to grab refs to the internal `Input`, `Menu`, and `List`. |
| `slotProps` | see [Slots](#slots) below | — | Per-part prop overrides. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` (through `InputProps`) — see [Core Concepts](./core-concepts.md).

## Slots

`slotProps` lets you pass extra props into the three internal parts:

| Slot | Type | Controls |
|---|---|---|
| `input` | `Omit<InputProps, "onChange" \| "value">` | The closed/trigger `Input` field. |
| `menu` | `Omit<MenuProps, "children" \| "target">` | The popover `Menu` (e.g. `placement`, transitions, `slotProps.content` for width/positioning). |
| `list` | `Omit<ListProps, "children">` | The `List` wrapping the `Option`s inside the menu. |

## Examples

### Basic usage

```tsx
import { Select, Option } from "@xanui/ui";
import { useState } from "react";

const [value, setValue] = useState("apple");

<Select value={value} onChange={setValue}>
  <Option value="apple">Apple</Option>
  <Option value="banana">Banana</Option>
  <Option value="cherry">Cherry</Option>
</Select>
```

### With icons, color, and slot overrides

```tsx
import { Select, Option } from "@xanui/ui";
import { useState } from "react";

const [value, setValue] = useState<string | undefined>();

<Select
  value={value}
  onChange={setValue}
  color="success"
  variant="outline"
  size="lg"
  disableArrow
  slotProps={{
    menu: { placement: "bottom-right" },
    list: { maxHeight: 240 },
  }}
>
  <Option value="us" startIcon={<span>🇺🇸</span>}>United States</Option>
  <Option value="fr" startIcon={<span>🇫🇷</span>}>France</Option>
</Select>
```

## Notes

- `Select` renders its options into a `List` inside a `Menu` that's positioned with `placement="bottom-left"` and matched to the field's width (`conRef.current.clientWidth`) by default.
- Selection plumbing is context-based: [`Option`](./Option.md) must be rendered as a descendant so it can call `useSelectContext()` — do not render `Option` outside of a `Select`.
- The list's `maxHeight` defaults to `window.innerHeight - 50` (client-side) so long option lists scroll instead of overflowing the viewport.
- The registered theme name is `"Select"` via `useThemeComponent`.
