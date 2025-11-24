# NoSSR
Defers rendering of children until client-side to avoid SSR mismatches.

## Import
```tsx
import { NoSSR } from '@xanui/ui';
```

## Usage
```tsx
<NoSSR>
  <HeavyClientOnlyComponent />
</NoSSR>
```

## Props
| Name     | Type      | Description                            |
| -------- | --------- | -------------------------------------- |
| fallback | ReactNode | Render while waiting for client mount. |
| children | ReactNode | Client-only content.                   |

## Best Practices
Wrap components relying on browser-only APIs (window, document) to prevent hydration errors.
