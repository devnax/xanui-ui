# Scrollbar
Custom styled scroll container with consistent cross-browser appearance.

## Import
```tsx
import { Scrollbar } from '@xanui/ui';
```

## Usage
```tsx
<Scrollbar height={300}>
  <LongContent />
</Scrollbar>
```

## Props (summary)
| Name      | Type      | Description         |
| --------- | --------- | ------------------- |
| height    | number    | string              | Fixed height or responsive. |
| width     | number    | string              | Optional width.             |
| children  | ReactNode | Scrollable content. |
| hideTrack | boolean   | Hide track visuals. |

## Best Practices
Avoid nesting many scrollbars; prefer page scroll for large content.
