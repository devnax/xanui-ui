# useBlurCss

A small hook that returns either a `backdrop-filter: blur(...)` style object or a translucent-background fallback, depending on browser support.

> **This is an internal utility and is not currently exported from the `@xanui/ui` package root.** It's used internally by `Layer` but is not part of the public API today.

## Import

```tsx
// Not exported from "@xanui/ui" — internal relative import only:
import useBlurCss from "../useBlurCss";
```

## Overview

Backdrop blur (`backdrop-filter`) isn't supported in every environment (e.g. during SSR there is no `window`, and some browsers lack the CSS feature entirely). `useBlurCss` centralizes that check: given a blur intensity and an explicit mode, it returns a ready-to-spread style object — either `{ backdropFilter: "blur(Npx)" }` or a fallback translucent background (`{ bgcolor: "paper.ghost.primary" }`) — memoized on the `blur` value.

## Props / Signature

```tsx
const useBlurCss = (blur: number, mode?: "transparent" | "blur") => object
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `blur` | `number` | — | Blur intensity, used as `(blur / 100) * 10` px in the `backdropFilter` value. Also the `useMemo` dependency. |
| `mode` | `"transparent" \| "blur"` | — | If `"transparent"`, always returns the translucent-background fallback, skipping the backdrop-filter feature check entirely. |
| **Returns** | `{ backdropFilter: string }` \| `{ bgcolor: "paper.ghost.primary" }` | | A style object to spread onto a `Tag`/component. Falls back to the translucent background when: `mode === "transparent"`, running on the server (`typeof window === "undefined"`), or the browser doesn't support the `backdropFilter` CSS property. |

## Examples

Basic usage inside a custom overlay component:

```tsx
import useBlurCss from "../useBlurCss";
import { Tag } from "@xanui/core";

const Overlay = ({ blur = 40 }: { blur?: number }) => {
  const blurCss = useBlurCss(blur);
  return <Tag position="fixed" inset={0} {...blurCss} />;
};
```

Forcing the non-blur fallback (as `Layer` does via its `blurMode` prop):

```tsx
import useBlurCss from "../useBlurCss";

const blurCss = blur ? useBlurCss(blur, blurMode) : {};
// blurMode === "transparent" -> always { bgcolor: "paper.ghost.primary" }
// blurMode === "blur" (or undefined) -> backdrop-filter blur, if supported
```

## Notes

- Internal-only: not exported from `src/index.tsx`. Currently only consumed by `src/Layer/index.tsx` (`Layer`'s `blur`/`blurMode` props).
- The feature-detection result is cached at module scope (`_d`, a single detached `<div>`'s `.style`), so the DOM probe only happens once per session, not per call.
- Calling this hook conditionally (`blur ? useBlurCss(...) : {}`, as `Layer` does) violates the Rules of Hooks if `blur`'s truthiness can change between renders of the same component instance — be aware of this if reusing the pattern.
