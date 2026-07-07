# InputNumber

A numeric variant of [`Input`](./Input.md) that restricts typed characters to digits/decimal point and supports arrow-key increment/decrement.

## Import

```tsx
import { InputNumber } from "@xanui/ui";
```

## Overview

`InputNumber` renders an `Input` under the hood, passing through nearly all the same props (`Omit<InputProps, "value">`) while overriding `value` to be `number | ""`. Its `onChange` filters the raw text against `/^\d*\.?\d*$/` (digits with at most one decimal point) before calling the consumer's `onChange`, and a leading `.` is normalized to `"0."`. Pressing `ArrowUp`/`ArrowDown` increments/decrements the current value by 1 and calls `onChange` directly. On blur, the raw string is parsed with `parseFloat` and, if valid, `onChange` is called again with the coerced numeric value. If the incoming `value` isn't numeric (and isn't empty), the component forces `error` and a `"Value must be numeric"` `helperText` onto the underlying `Input`. It always sets `autoCorrect="no"`, `autoComplete="no"`, and `autoCapitalize="no"` (overriding any values passed in).

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number \| ""` | — | Controlled numeric value (overrides `Input`'s `string` typed `value`). |
| `disableArrow` | `boolean` | `false` | Hides the built-in up/down (`UnfoldMore`) icon rendered as part of `endIcon`. |

All other props are inherited unchanged from [`Input`](./Input.md) (`label`, `size`, `color`, `variant`, `error`, `helperText`, `startIcon`, `endIcon`, `multiline`, `fullWidth`, `slotProps`, `refs`, etc.) — see that doc for the full list.

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { useState } from "react";
import { InputNumber } from "@xanui/ui";

function Example() {
  const [value, setValue] = useState<number | "">(0);
  return (
    <InputNumber
      label="Quantity"
      value={value}
      onChange={(e) => setValue(e.target.value as any)}
    />
  );
}
```

### Without the up/down arrow icon, with a custom end icon

```tsx
import { InputNumber } from "@xanui/ui";
import Percent from "@xanui/icons/Percent";

<InputNumber
  label="Discount"
  value={discount}
  onChange={(e) => setDiscount(e.target.value as any)}
  disableArrow
  endIcon={<Percent />}
  size="sm"
  fullWidth
/>
```

## Notes

- The end icon slot always renders the `UnfoldMore` icon (from `@xanui/icons`) first, followed by any `endIcon` you pass, unless `disableArrow` is set.
- Arrow-key increment/decrement (`ArrowUp`/`ArrowDown`) calls `onChange` with a synthetic event whose `target.value` is the new number — treat it the same as a native change event.
- `autoCorrect`, `autoComplete`, and `autoCapitalize` are hard-coded to `"no"` and cannot be overridden through props.
- See [`Input`](./Input.md) for the full underlying prop set, slots, and styling behavior.
