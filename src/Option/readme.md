# Option
Individual selectable element, commonly used inside Select, Menu or custom lists.

## Import
```tsx
import { Option } from '@xanui/ui';
```

## Usage
```tsx
<Option value="en">English</Option>
```

## Props (summary)
| Name     | Type      | Description            |
| -------- | --------- | ---------------------- |
| value    | any       | Associated value.      |
| selected | boolean   | Highlight state.       |
| disabled | boolean   | Non-interactive state. |
| children | ReactNode | Display label.         |

## Best Practices
Keep labels short; pair with icons only when they add clarity.
