# LineProgress
Horizontal progress bar for tasks and loading states.

## Import
```tsx
import { LineProgress } from '@xanui/ui';
```

## Usage
```tsx
<LineProgress value={45} color="brand" />
<LineProgress variant="indeterminate" />
```

## Props (summary)
| Name    | Type                | Description                  |
| ------- | ------------------- | ---------------------------- |
| value   | number              | Percent 0-100 (determinate). |
| variant | 'fill'              | 'outline'                    | 'indeterminate' | Visual style / behavior. |
| color   | ColorTemplateColors | Track & bar color scheme.    |
| height  | number              | Bar thickness.               |

## Accessibility
Use `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for determinate bars.
