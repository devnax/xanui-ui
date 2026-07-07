# Calendar

A self-contained date picker with day/month/year views.

## Import

```tsx
import { Calendar } from "@xanui/ui";
```

## Overview

`Calendar` renders a `ViewBox` with a header (month/year label, reset-to-today button, prev/month/next arrows) and a body that switches between three internal views: a day grid, a month grid, and a scrollable year list. Clicking the header label toggles between the day view and the year view. It's registered with `useThemeComponent("Calender", ...)` — note the **misspelled theme name** (`"Calender"`, not `"Calendar"`) baked into the source, relevant only if you're targeting it via a theme's component-transform registry. `color` accepts a responsive breakpoint object.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `Date \| null` | internally-managed `Date` (today) | The selected date. If provided (and is a `Date`), the component is effectively controlled for selection highlighting. |
| `onChange` | `(date: Date \| null) => void` | — | Called when a day is clicked, or when the reset-to-today button is clicked. If omitted, the component tracks selection internally via its own state. |
| `viewMode` | `useBreakpointPropsType<"year" \| "month" \| "day">` | `"day"` | Initial view shown (uncontrolled after mount — internal `useState` seeded from this prop). |
| `onButtonClick` | `(mode: CalendarProps["viewMode"], value: CalendarProps["value"]) => void` | — | Called whenever the user navigates via year/month/day selection buttons, with the resulting mode and value. |
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"brand"` | Color used to highlight the selected day/month/year. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md). Note: `Calendar`'s own prop type (`CalendarProps`) is a plain object, not `TagProps<T>` extended directly — it does not forward arbitrary `Tag` props itself, since it renders a fixed internal layout (`ViewBox` / `Stack` / `IconButton` / `Button`).

## Examples

### Basic usage

```tsx
import { Calendar } from "@xanui/ui";
import { useState } from "react";

const [date, setDate] = useState<Date | null>(new Date());

<Calendar value={date} onChange={setDate} />
```

### Starting in year view, custom color, tracking navigation

```tsx
import { Calendar } from "@xanui/ui";

<Calendar
  color="accent"
  viewMode="year"
  onChange={(date) => console.log("selected:", date)}
  onButtonClick={(mode, value) => console.log("navigated to", mode, value)}
/>
```

## Notes

- `Calendar` is the engine behind [CalendarInput](./CalendarInput.md), which pairs it with an `Input` and a `Menu` popover.
- The width of the rendered box is fixed at `32 * 7 + 16` px (7 day columns of 32px buttons), so it does not stretch to fill a flexible container.
- The theme registration key is `"Calender"` (sic), and `CalendarInput`'s is `"CanlendarInput"` (sic) — both appear to be source typos worth knowing if you rely on `useThemeComponent`-based theme overrides.
