# LoadingBox

`LoadingBox` wraps any content and overlays a translucent panel with a circular progress indicator while loading is true.

## Basic Example

```tsx
import LoadingBox from '@xanui/ui/LoadingBox';

export default function BasicLoadingBox() {
  return (
    <LoadingBox loading sxr={{ width: 240, height: 120, border: '1px solid', borderColor: 'divider' }}>
      Content loads here
    </LoadingBox>
  );
}
```

## Props

| Name                       | Type                  | Default   | Description                                                            |
| -------------------------- | --------------------- | --------- | ---------------------------------------------------------------------- |
| `loading`                  | `boolean`             | `false`   | When true, shows the overlay and disables the child content.           |
| `color`                    | `ColorTemplateColors` | `'brand'` | Color passed to the spinner.                                           |
| `slotProps.CircleProgress` | `CircleProgressProps` | —         | Customize the internal `CircleProgress` instance (size, speed, etc.).  |
| `children`                 | `ReactNode`           | —         | The underlying content that should remain visible beneath the overlay. |

## Usage Examples

### Async card placeholder
Wrap cards to block interactions while data is fetched.

```tsx
import { useState, useEffect } from 'react';
import LoadingBox from '@xanui/ui/LoadingBox';

export default function AsyncCard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <LoadingBox loading={loading}>
      <p>Loaded content</p>
    </LoadingBox>
  );
}
```

### Custom spinner size and color
Pass spinner props via `slotProps.CircleProgress` to match your brand.

```tsx
import LoadingBox from '@xanui/ui/LoadingBox';

export default function CustomSpinnerBox() {
  return (
    <LoadingBox
      loading
      color="success"
      slotProps={{ CircleProgress: { size: 40, hideTrack: true } }}
    >
      Saving changes…
    </LoadingBox>
  );
}
```
