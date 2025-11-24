# useCorner
Hook returning corner radius styles based on semantic presets.

## Import
```tsx
import useCorner from '@xanui/ui/useCorner';
```

## Usage
```tsx
const corner = useCorner('circle');
<Tag {...corner}>Content</Tag>
```

## Presets
- none
- sm
- md
- lg
- xl
- circle (full)

## Return Value
Object containing radius related sx ready to spread.

## Best Practices
Prefer semantic corner presets for consistent design across components.
