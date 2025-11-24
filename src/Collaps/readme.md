# Collaps (Collapse)
Animated show/hide container for vertical content expansion.

## Import
```tsx
import { Collaps } from '@xanui/ui';
```

## Usage
```tsx
<Collaps open={expanded}>
  <Content />
</Collaps>
```

## Props (summary)
| Name     | Type      | Description                 |
| -------- | --------- | --------------------------- |
| open     | boolean   | Whether content is visible. |
| duration | number    | Animation time (ms).        |
| easing   | string    | CSS easing function.        |
| children | ReactNode | Collapsed content.          |

## Accessibility
- Tie state to a toggle button with `aria-expanded`.

## Best Practices
Keep collapsed sections small; avoid nesting collapses deep.
