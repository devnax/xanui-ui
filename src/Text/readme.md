# Text
Typographic element supporting semantic variants.

## Import
```tsx
import { Text } from '@xanui/ui';
```

## Usage
```tsx
<Text variant="h2">Dashboard</Text>
<Text variant="small" color="text.secondary">Helper info.</Text>
```

## Variants
- text, small, button, h1-h6
Sets font size, line height, weight via theme mappings.

## Props
| Name        | Type                           | Default | Description        |
| ----------- | ------------------------------ | ------- | ------------------ |
| variant     | listed above                   | 'text'  | Typography preset. |
| ...TagProps | Standard tag styling & events. |

## Best Practices
Use heading hierarchy (h1>h2>...) for accessibility & SEO.
