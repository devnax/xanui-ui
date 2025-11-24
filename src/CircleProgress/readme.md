# CircleProgress
Circular progress indicator for determinate or indeterminate loading.

## Import
```tsx
import { CircleProgress } from '@xanui/ui';
```

## Usage
```tsx
<CircleProgress value={70} size={64} color="brand" />
<CircleProgress variant="indeterminate" />
```

## Props (summary)
| Name      | Type                | Description                              |
| --------- | ------------------- | ---------------------------------------- |
| value     | number              | Percentage (0-100) for determinate mode. |
| size      | number              | Diameter in px.                          |
| thickness | number              | Stroke width.                            |
| color     | ColorTemplateColors | Semantic color.                          |
| variant   | 'fill'              | 'outline'                                | 'indeterminate' | Style / behavior. |

## Accessibility
Provide `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for determinate usage.

## Best Practices
- Use determinate when exact progress known.
- Avoid showing for very short operations (< 1s).
