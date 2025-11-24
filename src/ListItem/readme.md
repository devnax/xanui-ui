# ListItem
Singular item container for lists, menus or navigations.

## Import
```tsx
import { ListItem } from '@xanui/ui';
```

## Usage
```tsx
<ListItem selected onClick={...}>Profile</ListItem>
```

## Props (summary)
| Name      | Type                | Description            |
| --------- | ------------------- | ---------------------- |
| selected  | boolean             | Highlight item state.  |
| disabled  | boolean             | Non-interactive state. |
| startIcon | ReactElement        | Leading icon.          |
| endIcon   | ReactElement        | Trailing icon.         |
| color     | ColorTemplateColors | Color scheme.          |

## Best Practices
Use concise labels; include icons for quick scanning only when helpful.
