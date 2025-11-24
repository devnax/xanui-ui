# CalendarInput
Input field combined with an inline popup Calendar for picking dates.

## Import
```tsx
import { CalendarInput } from '@xanui/ui'; // Component file exports default CalenderInput
```

## Usage
```tsx
const [date,setDate] = useState<Date|null>(null);
<CalendarInput value={date} onChange={setDate} placeholder="Select date" />
```

### Clearable
Automatically shows a clear icon when `value` set.

## Props
| Name               | Type                                             | Description                         |
| ------------------ | ------------------------------------------------ | ----------------------------------- |
| value              | Date                                             | null                                | Current selected date. |
| onChange           | (date:Date                                       | null) => void                       | Change handler.        |
| getInputValue      | (date) => string                                 | Custom formatter for input display. |
| slotProps.calender | CalendarProps                                    | Pass-through to inner Calendar.     |
| slotProps.menu     | MenuProps                                        | Customize popup Menu.               |
| ...InputProps      | Base input styling/behavior (readOnly enforced). |

## Behavior
- Clicking input toggles calendar popup.
- Selecting date closes popup and calls `onChange`.
- Clear icon resets to null.

## Accessibility
- Provide `aria-label` via Input props if no visible label.

## Best Practices
- Pair with form label.
- Use `getInputValue` for locale formatting.
