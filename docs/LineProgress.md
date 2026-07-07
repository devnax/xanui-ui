# LineProgress

A thin horizontal progress bar, either determinate (a fixed `value`) or indeterminate (an animated sliding thumb).

## Import

```tsx
import { LineProgress } from "@xanui/ui";
```

## Overview

`LineProgress` renders a track `Tag` containing a colored "thumb" `Tag` (`baseClass="line-progress-thumb"`). When `value` is a number, the thumb width is set directly to `${value}%` (clamped to 100) and the animation is disabled. When `value` is omitted, the thumb runs an infinite CSS keyframe animation (a unique `@keyframes` name per instance, via `useId`) that slides and grows from left to right, giving an indeterminate loading effect. `hideTrack` makes the track background transparent instead of `divider.primary`. Props resolve through `useThemeComponent("LineProgress", props, {})`, and `thumbSize`, `color`, `value`, `hideTrack`, and `speed` all accept responsive breakpoint objects.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactElement` | — | Declared in the type but not rendered anywhere in the component. |
| `thumbSize` | `useBreakpointPropsType<number>` | `4` | Height (in px) of both the track and the thumb. |
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"brand"` | Thumb color (`{color}.primary`, or `text.primary` when `"default"`). |
| `value` | `useBreakpointPropsType<number>` | — | Determinate progress percentage (0–100, values above 100 are clamped). Omit for indeterminate mode. |
| `hideTrack` | `useBreakpointPropsType<boolean>` | `false` | Hides the track background, leaving only the moving thumb visible. |
| `speed` | `useBreakpointPropsType<number>` | `1` | Duration (seconds) of one indeterminate animation cycle; ignored when `value` is set. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Indeterminate loading bar

```tsx
import { LineProgress } from "@xanui/ui";

<LineProgress color="brand" />
```

### Determinate progress with custom thickness and color

```tsx
import { LineProgress } from "@xanui/ui";

<LineProgress value={72} color="success" thumbSize={8} hideTrack />
```

## Notes

- Renders `baseClass="line-progress"` on the track and `baseClass="line-progress-thumb"` on the thumb.
- `children` is accepted in the prop type but has no effect — the component only ever renders its own track/thumb markup.
- Each rendered instance generates its own `@keyframes` name (`line-progress` + a sanitized `useId()`), so multiple indeterminate bars on the same page don't collide.
