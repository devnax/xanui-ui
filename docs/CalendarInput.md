# CalendarInput

A text `Input` that opens a `Calendar` in a popover `Menu` for picking a date.

## Import

```tsx
import { CalendarInput } from "@xanui/ui";
```

## Overview

`CalendarInput` composes three other library components internally: an `Input` (read-only, with a calendar start icon and a clear button in `endIcon` when a value is set), a `Menu` anchored to the input (opened on focus), and a [Calendar](./Calendar.md) rendered inside the menu, wrapped in [ClickOutside](./ClickOutside.md) so clicking away closes it. Selecting a day calls the consumer's `onChange` and closes the menu. It's registered with `useThemeComponent("CanlendarInput", ...)` — note this theme key is a **typo in the source** (`"CanlendarInput"`, not `"CalendarInput"`).

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `Date \| null` | — | The selected date, displayed via `getInputValue` or `toLocaleDateString("en-US")`. |
| `onChange` | `(date: Date \| null) => void` | — | Called when a date is picked in the popup calendar, or when the clear button is clicked (with `null`). |
| `getInputValue` | `(value?: Date \| null) => string` | falls back to `value.toLocaleDateString("en-US")` (or `""`) | Customize the text shown in the input for a given date value. |
| `slotProps` | `{ input?: InputProps["slotProps"]; calender?: CalendarProps; menu?: MenuProps }` | — | Extra props passed to the internal `Input`'s slots, the `Calendar`, and the `Menu` respectively. Note the `calender` key is spelled without an `a` (matches the `Calendar` component's internal naming quirk). |

`CalendarInput`'s prop type extends `InputProps` (minus `value`, `onChange`, `slotProps`, which it re-types above), so any other `Input` prop (e.g. `placeholder`, `disabled`, `label`) is also accepted and forwarded.

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { CalendarInput } from "@xanui/ui";
import { useState } from "react";

const [date, setDate] = useState<Date | null>(null);

<CalendarInput value={date} onChange={setDate} placeholder="Select a date" />
```

### Custom display format and slot overrides

```tsx
import { CalendarInput } from "@xanui/ui";
import { useState } from "react";

const [date, setDate] = useState<Date | null>(new Date());

<CalendarInput
  value={date}
  onChange={setDate}
  getInputValue={(d) => (d ? d.toISOString().slice(0, 10) : "No date")}
  slotProps={{
    calender: { color: "accent", viewMode: "month" },
    menu: { placement: "bottom-right" },
  }}
/>
```

## Slots

`slotProps` accepts:

| Slot | Applies to | Notes |
|---|---|---|
| `input` | The internal `Input`'s own `slotProps` | For reaching further-nested Input sub-slots. |
| `calender` | The internal `Calendar` | Accepts any `CalendarProps` (e.g. `color`, `viewMode`, `onButtonClick`). |
| `menu` | The internal `Menu` | Accepts any `MenuProps` (e.g. `placement`, `bgcolor`). Defaults to `placement="bottom-left"` and `bgcolor="transparent"` unless overridden. |

## Notes

- The input is `readOnly` — text cannot be typed directly; the value is only changed by picking a date in the calendar or clicking the clear icon.
- Opening/closing is driven by focusing the input (toggles the `Menu`'s `target`) and by `ClickOutside` on the popover content.
- See [Calendar](./Calendar.md) and [ClickOutside](./ClickOutside.md) for the components it composes.
