# Input

A themeable text input (or textarea) with an optional label, start/end icons, helper text, and error state.

## Import

```tsx
import { Input } from "@xanui/ui";
```

## Overview

`Input` renders an optional [`Label`](./Label.md), then a bordered container wrapping the actual `<input>` (or `<textarea>` when `multiline` is set) plus optional `startIcon`/`endIcon` and `helperText`. Sizing, color, and border/background are all driven by the `size`, `color`, `variant`, and `error` props — focus and error states change the border color, and `variant="fill"` vs `"outline"` vs `"text"` change the background/border treatment. It's a controlled component (`value` + `onChange`); it does not track its own value internally beyond focus state. Defaults are resolved via `useThemeComponent("Input", props, {})`, so a theme can globally override any of its props. [`InputNumber`](./InputNumber.md) wraps `Input` to add numeric-only parsing and up/down arrow-key increment behavior.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Controlled value. |
| `type` | `TagProps<"input">["type"]` | — | Native `<input>` `type` (ignored when `multiline`). |
| `name` | `string` | — | Native `name` attribute. |
| `placeholder` | `string` | — | Native placeholder. |
| `readOnly` | `boolean` | — | Native `readOnly`. |
| `autoFocus` | `boolean` | — | Focuses the input ~100ms after mount. |
| `autoComplete` | `string` | — | Native `autoComplete`. |
| `label` | `useBreakpointPropsType<string>` | — | Renders a [`Label`](./Label.md) above the input when set. |
| `onFocus` / `onBlur` | `(e: React.FocusEvent<any>) => void` | — | Also drives the internal focus state used for border color (unless `focused` is controlled). |
| `onChange` | `(e: React.ChangeEvent<any>) => void` | — | Fired on native input `change`. |
| `onInput` | `(e: React.FormEvent<any>) => void` | — | Declared in the prop type, but **not wired to the `<input>` element** — see Notes. |
| `onKeyDown` / `onKeyUp` | `(e: React.KeyboardEvent<any>) => void` | — | Forwarded to the native input/textarea. |
| `rows` | `useBreakpointPropsType<number>` | — | Fixed textarea row count (multiline only); overrides the auto-computed row count. |
| `minRows` / `maxRows` | `useBreakpointPropsType<number>` | — | Clamp the auto-computed row count (based on newlines in `value`) when `rows` isn't set. |
| `fullWidth` | `boolean` | — | Root width `100%` instead of `auto`. |
| `startIcon` / `endIcon` | `useBreakpointPropsType<ReactElement>` | — | Icon rendered inside the bordered container, before/after the input. |
| `iconPlacement` | `useBreakpointPropsType<"start" \| "center" \| "end">` | `"center"` (`"end"` if `multiline` and `value` is set) | Vertical alignment of the row containing the icons; forced back to `"center"` whenever `value` is falsy. |
| `focused` | `boolean` | — | Controls the focused visual state externally instead of tracking internal focus. |
| `color` | `useBreakpointPropsType<Omit<UseColorTemplateColor, "default">>` | `"brand"` | Border/accent color used on focus and for the thumb-like accents. |
| `variant` | `useBreakpointPropsType<"fill" \| "outline" \| "text">` | `"fill"` | `fill` = `paper.primary` background, no border unless focused/error; `outline` = transparent background with a visible border; `text` = no border at all. |
| `error` | `boolean` | `false` | Forces danger-colored border/text/helper-text and a danger-tinted background. |
| `helperText` | `useBreakpointPropsType<string>` | — | Text shown below the input container. |
| `multiline` | `boolean` | `false` | Renders a `<textarea>` instead of `<input>`. |
| `size` | `useBreakpointPropsType<"xs" \| "sm" \| "md" \| "lg" \| "xl">` | `"md"` | Controls height, padding, gap, font size, icon size, and border radius together. |
| `refs` | `{ inputRoot?, label?, rootContainer?, input?, helperText? }` | — | Refs to the internal sub-elements (see Slots). |
| `slotProps` | see [Slots](#slots) | — | Extra props merged into internal sub-elements. |

`Input` omits `size`, `color`, and `label` from the inherited `TagProps` and redefines them with the meanings above.

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic controlled usage

```tsx
import { useState } from "react";
import { Input } from "@xanui/ui";

function Example() {
  const [value, setValue] = useState("");
  return (
    <Input
      label="Email"
      placeholder="you@example.com"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

### Icons, error state, and helper text

```tsx
import { Input } from "@xanui/ui";
import Search from "@xanui/icons/Search";

<Input
  label="Username"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  startIcon={<Search />}
  error={!value}
  helperText={!value ? "Username is required" : ""}
  variant="outline"
  size="lg"
  fullWidth
/>
```

### Multiline textarea

```tsx
import { Input } from "@xanui/ui";

<Input
  label="Notes"
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  multiline
  minRows={2}
  maxRows={6}
  fullWidth
/>
```

## Slots

`slotProps` lets you pass extra props into internal sub-parts without forking the component:

| Slot | Controls |
|---|---|
| `label` | The internal [`Label`](./Label.md) rendered when `label` is set. |
| `inputRoot` | The outer `div` wrapping the bordered container and helper text (`baseClass="input-root"`). |
| `rootContainer` | The bordered flex row containing the icons and the actual input (`baseClass="input-root-container"`). |
| `input` | The native `<input>`/`<textarea>` element itself (`baseClass="input"`). |
| `helperText` | The helper text `div` (`baseClass="input-helper-text"`), only rendered when `helperText` is set. |

Matching `refs.inputRoot`, `refs.label`, `refs.rootContainer`, `refs.input`, and `refs.helperText` give direct ref access to the same elements.

## Notes

- Renders `baseClass="input-wrapper"` on the outermost `Tag`, with `input-root`, `input-root-container`, `input`, and `input-helper-text` on the nested parts (useful CSS/theming hooks).
- **`onInput` is declared in `InputProps` but is never destructured or forwarded to the `<input>`/`<textarea>`** — it ends up spread onto the outer wrapper `Tag` via `...rest` instead of the native element, so it will not behave like a real `oninput` handler today.
- There is a source typo: the error-state container background is `"danger.ghost.primry"` (missing the `a` in "primary") rather than `"danger.ghost.primary"` — this likely does not resolve to a real token and may fall back to a default/transparent background when `error` is set with `variant="fill"`.
- The `disabled` prop is destructured but only applied to the inner `rootContainer` `Tag` (`disabled={disabled || false}`), not directly to the native `<input>` element.
- See [`InputNumber`](./InputNumber.md) for a numeric-only variant built on top of `Input`.
