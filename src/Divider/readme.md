# Divider
Visual separator for content groups horizontally or vertically.

## Import
```tsx
import { Divider } from '@xanui/ui';
```

## Usage
```tsx
<Divider />
<Divider direction="verticle" size={2} />
```

## Props
| Name      | Type                | Default    | Description                                         |
| --------- | ------------------- | ---------- | --------------------------------------------------- |
| direction | 'horizental'        | 'verticle' | 'horizental'                                        | Orientation. |
| color     | ColorTemplateColors | 'default'  | Color selection; default uses background.secondary. |
| size      | number              | 1          | Thickness or length depending on orientation.       |

## Styling
Class: `.divider`.

## Best Practices
Use sparingly to avoid visual clutter; prefer spacing for separation when possible.
