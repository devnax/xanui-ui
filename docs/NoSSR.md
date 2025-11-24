# NoSSR

`NoSSR` delays rendering of its children until the component mounts on the client, helping avoid hydration mismatches caused by browser-only APIs.

## Basic Example

```tsx
import NoSSR from '@xanui/ui/NoSSR';

export default function ClientOnlyChart() {
  return (
    <NoSSR>
      <div id="chart-root" />
    </NoSSR>
  );
}
```

## Props

| Name       | Type        | Default | Description                                                     |
| ---------- | ----------- | ------- | --------------------------------------------------------------- |
| `children` | `ReactNode` | —       | Content rendered only after the component mounts on the client. |

## Usage Examples

### Wrap browser-dependent widgets
Prevent hydration errors when a widget uses `window` or `document`.

```tsx
import NoSSR from '@xanui/ui/NoSSR';
import MapWidget from './MapWidget';

export default function MapSection() {
  return (
    <NoSSR>
      <MapWidget />
    </NoSSR>
  );
}
```

### Lazy load analytics
Delay analytics widgets until after mount without touching SSR output.

```tsx
import NoSSR from '@xanui/ui/NoSSR';

export default function AnalyticsPanel() {
  return (
    <NoSSR>
      <script src="/analytics.js" />
    </NoSSR>
  );
}
```
