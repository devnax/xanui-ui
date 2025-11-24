# Chip
Compact element to represent an input, attribute, or action.

## Import
```tsx
import { Chip } from '@xanui/ui';
```

## Usage
```tsx
<Chip label="Active" color="success" />
<Chip label="Uploading" startIcon={<IconUpload />} variant="outline" />
```

## Props
| Name        | Type                   | Default      | Description            |
| ----------- | ---------------------- | ------------ | ---------------------- |
| label       | string                 | ReactElement | -                      | Display content. Responsive capable. |
| startIcon   | ReactElement           | -            | Leading icon.          |
| endIcon     | ReactElement           | -            | Trailing icon.         |
| color       | ColorTemplateColors    | 'brand'      | Semantic color.        |
| variant     | ColorTemplateType      | 'fill'       | Styling variant.       |
| corner      | UseCornerTypes         | 'circle'     | Shape / radius preset. |
| size        | 'small'                | 'medium'     | 'large'                | 'medium'                             | Chip height & padding. |
| ...TagProps | Base tag props/events. |

## Sizes
- small: 24px height
- medium: 34px
- large: 38px

## Styling
Class: `.chip`. Use sx or CSS for transitions / spacing.

## Accessibility
Use clear text for `label`; icons alone are insufficient.

## Best Practices
Keep labels short (1-2 words). Combine with filters, selections, or statuses.
