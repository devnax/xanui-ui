# NoSSR

Renders its children only after mounting on the client, suppressing server-side rendering of the wrapped content.

## Import

```tsx
import { NoSSR } from "@xanui/ui";
```

## Overview

`NoSSR` is a minimal client-only gate: it tracks an `isClient` state that starts `false` and flips to `true` inside a `useEffect` (which never runs during SSR or static rendering). Until then, it renders `null`; once mounted in the browser, it renders `children` as-is. Use it to wrap content that depends on browser-only APIs (e.g. `window`, `document`, non-SSR-safe third-party widgets) or that would otherwise cause a hydration mismatch between server and client output.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Content to render only after the component has mounted on the client. |

`NoSSR` does not extend `TagProps` — it renders no DOM element of its own, only its `children` (or `null`), so it does not accept any `Tag`/`Box` styling props.

## Examples

### Basic usage

```tsx
import { NoSSR } from "@xanui/ui";

<NoSSR>
  <div>{window.innerWidth}px wide</div>
</NoSSR>
```

### Wrapping a browser-only widget

```tsx
import { NoSSR } from "@xanui/ui";
import SomeBrowserOnlyChart from "./SomeBrowserOnlyChart";

function Dashboard() {
  return (
    <NoSSR>
      <SomeBrowserOnlyChart />
    </NoSSR>
  );
}
```

## Notes

- There is a brief flash of "nothing" on first client render before the effect fires — if that causes layout shift, reserve space (e.g. a fixed-height wrapper) around `NoSSR`.
- Does not accept `fallback`/placeholder content — it renders strictly `null` until mounted, then `children`. Wrap it yourself if you need a loading placeholder in the interim.
- Purely a behavioral component (no `Tag`, no theming, no `slotProps`) — the simplest component in the library.
