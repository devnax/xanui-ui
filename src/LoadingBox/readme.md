# LoadingBox
Container that overlays a loading indicator over its children.

## Import
```tsx
import { LoadingBox } from '@xanui/ui';
```

## Usage
```tsx
<LoadingBox loading>
  <Content />
</LoadingBox>
```

## Props (summary)
| Name     | Type      | Description               |
| -------- | --------- | ------------------------- |
| loading  | boolean   | Show spinner overlay.     |
| message  | string    | Optional loading message. |
| children | ReactNode | Underlying content.       |

## Best Practices
Only block interactions when absolutely necessary; consider skeletons for rich content.
