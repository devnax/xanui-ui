# CalendarInput

`CalendarInput` blends the styled `Input` component with a popover calendar so users can pick dates without typing. A built-in clear icon appears whenever a date is selected so people can reset the field with a single tap.

## Basic Example

Keep the selected date in state and display a formatted value inside the readonly field.

```tsx
import { useState } from 'react';
import CalendarInput from '@xanui/ui/CalendarInput';

export default function BasicCalendarInput() {
	const [date, setDate] = useState<Date | null>(null);
	return (
		<CalendarInput
			value={date}
			onChange={setDate}
			placeholder="Pick a date"
		/>
	);
}
```

## Props

| Name                                 | Type                              | Default       | Description                                                    |
| ------------------------------------ | --------------------------------- | ------------- | -------------------------------------------------------------- |
| `value`                              | `Date \| null`                    | uncontrolled  | Current date displayed in the input.                           |
| `onChange`                           | `(date: Date \| null) => void`    | —             | Called when the user selects or clears a date.                 |
| `getInputValue`                      | `(date?: Date \| null) => string` | locale string | Formats the readonly text shown in the field.                  |
| `slotProps.input`                    | `InputProps['slotProps']`         | —             | Tweak any of the nested input slots (container, icons, etc.).  |
| `slotProps.calender`                 | `CalendarProps`                   | —             | Pass configuration down to the embedded `Calendar`.            |
| `slotProps.menu`                     | `MenuProps`                       | —             | Customize the popup menu container (placement, offsets, etc.). |
| `placeholder` and other `InputProps` | —                                 | —             | All other props are forwarded to the base `Input`.             |

## Usage Examples

### Custom display formatting
Translate the selected date into a human-friendly string using `getInputValue`.

```tsx
import { useState } from 'react';
import CalendarInput from '@xanui/ui/CalendarInput';

const formatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' });

export default function FriendlyCalendarInput() {
	const [value, setValue] = useState<Date | null>(null);
	return (
		<CalendarInput
			value={value}
			onChange={setValue}
			getInputValue={(date) => (date ? formatter.format(date) : '')}
		/>
	);
}
```

### Embedding a custom calendar configuration
Use `slotProps.calender` to start the popup in year view or change the accent color.

```tsx
import { useState } from 'react';
import CalendarInput from '@xanui/ui/CalendarInput';

export default function AdvancedCalendarInput() {
	const [value, setValue] = useState<Date | null>(new Date());
	return (
		<CalendarInput
			value={value}
			onChange={setValue}
			slotProps={{ calender: { viewMode: 'year', color: 'success' } }}
		/>
	);
}
```

### Custom clear affordance
Replace the trailing reset icon through `slotProps.input.endIcon` when you need additional copy or helper actions.

```tsx
import { useState } from 'react';
import CalendarInput from '@xanui/ui/CalendarInput';

export default function CustomClearCalendar() {
	const [value, setValue] = useState<Date | null>(null);
	return (
		<CalendarInput
			value={value}
			onChange={setValue}
			slotProps={{
				input: {
					endIcon: value ? <span role="button">Reset</span> : undefined,
				},
			}}
		/>
	);
}
```
```
