# Calendar
Interactive date selection component supporting day/month/year views.

## Import
```tsx
import { Calendar } from '@xanui/ui';
```

## Usage
```tsx
<Calendar value={selected} onChange={setSelected} />
```

### Year / Month navigation
```tsx
<Calendar viewMode="year" onButtonClick={(mode, value) => console.log(mode, value)} />
```

## Props
| Name          | Type                 | Default       | Description                                      |
| ------------- | -------------------- | ------------- | ------------------------------------------------ |
| value         | Date                 | null          | new Date()                                       | Controlled selected date.    |
| onChange      | (date:Date           | null) => void | -                                                | Fires when user picks a day. |
| viewMode      | 'day'                | 'month'       | 'year'                                           | 'day'                        | Initial view mode. Responsive capable. |
| onButtonClick | (mode,value) => void | -             | Called when navigation buttons change view/date. |
| color         | ColorTemplateColors  | 'brand'       | Highlight color.                                 |

## Styling Hooks
Class names prefixed `calender-`:
- `calender-root`
- `calender-header`
- `calender-week-container`
- `calender-day-row`
- `calender-day-button`
- `calender-month-button`
- `calender-year-button`

## Accessibility
- Buttons are focusable; ensure visible focus with theme.
- Provide external label when embedding in forms.

## Best Practices
- Use `value` + `onChange` for controlled mode.
- Use `viewMode` for preset year or month pickers, then drill down.
