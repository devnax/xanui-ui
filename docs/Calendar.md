# Calendar

`Calendar` provides day, month, and year pickers with keyboard-friendly navigation and responsive color styling.

## Basic Example

Embed the calendar in a form and capture the selected date.

```tsx
import { useState } from 'react';
import Calendar from '@xanui/ui/Calendar';

export default function BasicCalendar() {
	const [value, setValue] = useState<Date | null>(new Date());
	return <Calendar value={value} onChange={setValue} />;
}
```

## Props

| Name            | Type                           | Default      | Description                                                                |
| --------------- | ------------------------------ | ------------ | -------------------------------------------------------------------------- |
| `value`         | `Date \| null`                 | uncontrolled | The currently selected date when used in controlled mode.                  |
| `onChange`      | `(date: Date \| null) => void` | internal     | Called when a day is selected; use with `value` for controlled state.      |
| `viewMode`      | `'day' \| 'month' \| 'year'`   | `'day'`      | Determines the initial panel that is shown. Supports responsive objects.   |
| `onButtonClick` | `(mode, value) => void`        | —            | Invoked when navigation buttons switch view or date, useful for analytics. |
| `color`         | `ColorTemplateColors`          | `'brand'`    | Accent color for selected days, months, and years.                         |

## Usage Examples

### Year picker entry point
Start in year view to let people jump directly to a distant year before drilling down to months and days.

```tsx
import Calendar from '@xanui/ui/Calendar';

export default function YearPicker() {
	return (
		<Calendar
			viewMode="year"
			onButtonClick={(mode, date) => console.log('view switched to', mode, date)}
		/>
	);
}
```

### Controlled color theme
Swap palette tokens at breakpoints to ensure contrast in different surfaces.

```tsx
import Calendar from '@xanui/ui/Calendar';

export default function ThemedCalendar({ surface }: { surface: 'light' | 'dark' }) {
	return (
		<Calendar color={surface === 'dark' ? 'default' : 'brand'} />
	);
}
```
