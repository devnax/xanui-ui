# Toast
Transient notification messages for system or user feedback.

## Import
```tsx
import { Toast } from '@xanui/ui';
```

## Usage
```tsx
Toast.show({ title:'Saved', message:'Profile updated', color:'success' });
```

## Props (imperative options)
| Name     | Type                | Description             |
| -------- | ------------------- | ----------------------- |
| title    | string              | Heading text.           |
| message  | string              | ReactNode               | Body content. |
| color    | ColorTemplateColors | Semantic color.         |
| variant  | ColorTemplateType   | Styling variant.        |
| duration | number              | Auto-hide ms.           |
| action   | ReactNode           | Optional action button. |

## Best Practices
Keep toasts brief; avoid stacking many persistent messages.
