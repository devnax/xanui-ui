# Autocomplete

A text input with a dropdown of filtered/async options, supporting single or multiple selection with removable chips.

## Import

```tsx
import { Autocomplete } from "@xanui/ui";
```

## Overview

`Autocomplete` combines `Input` (the text field), `Menu` (the dropdown, anchored to the input via `target`), `List`/`ListItem` (default option rendering), and `Chip` (selected-value tags when `multiple`). Options can be a static array or an async function `(text: string) => Promise<any[]>`; either way, they are (re)loaded 300ms after the input value changes while focused (debounced). In single-select mode, an exact case-insensitive label match auto-selects that option and shows a clear (`X`) button; in `multiple` mode, each selected value renders as a dismissible `Chip` inside the input's `startIcon`, and `Backspace` on an empty input pops the last selected value. A `CircleProgress` spinner replaces the end icon while options are loading.

**Note:** unlike most components in this library, `AutocompleteProps` does **not** extend `TagProps` — it is a plain prop object passed straight through to the internal `Input`, so it does not inherit the general `Tag`/`Box` styling API described in [Core Concepts](./core-concepts.md) (no `sx`, spacing shorthands, etc. at the top level).

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `any[] \| ((text: string) => Promise<any[]>)` | — | Static option list, or an async loader called with the current input text. |
| `getLabel` | `(option: any) => string` | `(o) => o.toString()` | Extracts the display label from an option. |
| `onChange` | `(value: any) => void` | — | Called with the new value: a single option (or `null`), or an array when `multiple`. |
| `value` | `any` | — | Current value — a single option, or an array of options when `multiple`. |
| `multiple` | `boolean` | `false` | Enables multi-select with chip display. |
| `renderOption` | `(option: any, props: any) => ReactElement<ListItemProps>` | default `ListItem` rendering | Custom option renderer; `props.onClick` handles the select/deselect logic for you. |
| `disabled` | `boolean` | — | Passed to the internal `Input`. |
| `name` | `string` | — | Passed to the internal `Input`. |
| `placeholder` | `string` | — | Passed to the internal `Input`. |
| `readOnly` | `boolean` | — | Passed to the internal `Input`. |
| `autoFocus` | `boolean` | — | Passed to the internal `Input`. |
| `autoComplete` | `string` | — | Passed to the internal `Input`. |
| `label` | `useBreakpointPropsType<string>` | — | Passed to the internal `Input`. |
| `onFocus` | `(e: React.FocusEvent<any>) => void` | — | Additional focus handler (internal focus tracking still applies). |
| `onBlur` | `(e: React.FocusEvent<any>) => void` | — | Passed to the internal `Input`. |
| `onInput` | `(e: React.FormEvent<any>) => void` | — | Passed to the internal `Input`. |
| `onKeyDown` | `(e: React.KeyboardEvent<any>) => void` | — | Called before the internal backspace-to-remove-chip logic. |
| `onKeyUp` | `(e: React.KeyboardEvent<any>) => void` | — | Passed to the internal `Input`. |
| `rows` / `minRows` / `maxRows` | `useBreakpointPropsType<number>` | — | Passed to the internal `Input` (for textarea-like sizing). |
| `fullWidth` | `boolean` | — | Passed to the internal `Input`. |
| `startIcon` | `useBreakpointPropsType<ReactElement>` | — | Prepended before any selected-value chips. |
| `endIcon` | `useBreakpointPropsType<ReactElement>` | — | Prepended before the clear button / loading spinner. |
| `iconPlacement` | `useBreakpointPropsType<"start" \| "center" \| "end">` | — | Passed to the internal `Input`. |
| `focused` | `boolean` | — | Passed to the internal `Input` (note: internal focus state also drives menu visibility independently). |
| `color` | `useBreakpointPropsType<Omit<UseColorTemplateColor, "default">>` | — | Passed to the internal `Input`. |
| `variant` | `useBreakpointPropsType<"fill" \| "outline" \| "text">` | — | Passed to the internal `Input`. |
| `error` | `boolean` | — | Passed to the internal `Input`. |
| `helperText` | `useBreakpointPropsType<string>` | — | Passed to the internal `Input`. |

`Autocomplete` does not extend `TagProps` directly — see the Overview note above.

## Examples

### Basic usage (static options)

```tsx
import { useState } from "react";
import { Autocomplete } from "@xanui/ui";

const countries = ["Canada", "Germany", "Japan", "Brazil"];

function CountryPicker() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Autocomplete
      options={countries}
      getLabel={(option) => option}
      value={value}
      onChange={setValue}
      placeholder="Select a country"
    />
  );
}
```

### Multiple selection with async options

```tsx
import { useState } from "react";
import { Autocomplete } from "@xanui/ui";

function UserPicker() {
  const [value, setValue] = useState<any[]>([]);

  return (
    <Autocomplete
      multiple
      value={value}
      onChange={setValue}
      getLabel={(user) => user.name}
      options={async (text) => {
        const res = await fetch(`/api/users?q=${encodeURIComponent(text)}`);
        return res.json();
      }}
      placeholder="Search users..."
    />
  );
}
```

## Notes

- Internally composed from `Input`, `Menu`, `List`, `ListItem`, `Chip`, `IconButton`, and `CircleProgress` — refer to their docs for deeper styling hooks.
- The dropdown `Menu` is anchored to the input via a `ref`, and its content `minWidth` matches the input's rendered width.
- Does not expose a `slotProps` prop for its internal parts — customize option rendering via `renderOption` instead.
