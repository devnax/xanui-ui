# Tooltip
Small popup for contextual hints on hover/focus.

## Import
```tsx
import { Tooltip } from '@xanui/ui';
```

## Usage
```tsx
<Tooltip title="Delete">
  <IconButton><TrashIcon /></IconButton>
</Tooltip>
```

## Props
| Name      | Type                   | Default                     | Description                       |
| --------- | ---------------------- | --------------------------- | --------------------------------- |
| title     | string                 | -                           | Display text. Breakpoint capable. |
| color     | ColorTemplateColors    | 'default'                   | Color scheme.                     |
| variant   | ColorTemplateType      | 'fill'                      | Visual style.                     |
| placement | MenuProps['placement'] | 'bottom'                    | Position relative to target.      |
| children  | ReactElement           | Single interactive element. |

## Best Practices
Do not place critical info only in tooltips; ensure keyboard accessibility.
