# CircleProgress

A circular progress indicator — determinate (with a `value`) or indeterminate (spinning) — with an optional centered label.

## Import

```tsx
import { CircleProgress } from "@xanui/ui";
```

## Overview

`CircleProgress` draws two concentric SVG `<circle>`s: a track and a thumb, using `strokeDasharray`/`strokeDashoffset` to represent progress. When `value` is a number, it renders a determinate arc (rotated -90deg so 0% starts at 12 o'clock) with no animation. When `value` is omitted, it renders an indeterminate spinner using CSS keyframe animations (rotation + dash animation), each with a per-instance-unique keyframe name generated from `useId()`. If `showPercentage` is true and no `children` are passed, it auto-renders a `{value}%` label in the center. It's registered with `useThemeComponent("CircleProgress", ...)`. All props accept responsive breakpoint objects.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactElement` | — | Custom content centered inside the ring (e.g. an icon or custom label). Takes precedence over the auto-generated percentage label. |
| `value` | `useBreakpointPropsType<number>` | `undefined` (indeterminate/spinning mode) | Progress percentage (0–100, clamped to a max of 100). Providing any number switches to determinate mode. |
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"brand"` | Used for the auto-generated percentage label's text color, and as a fallback for `thumbColor` (`` `${color}.primary` ``, or `text.primary` when `color="default"`). |
| `trackColor` | `useBreakpointPropsType<UseColorTemplateColor>` | `divider.primary` | Color of the background track circle. `"default"` maps to `divider.primary`; any other value maps to `` `${trackColor}.primary` ``. |
| `thumbColor` | `useBreakpointPropsType<UseColorTemplateColor>` | derived from `color` | Color of the progress arc/thumb. `"default"` maps to `text.primary`; any other value maps to `` `${thumbColor}.primary` ``. |
| `size` | `useBreakpointPropsType<number \| "xs" \| "sm" \| "md" \| "lg" \| "xl">` | `"md"` (34px) | Overall diameter in px, or a named size (`xs`=18, `sm`=24, `md`=34, `lg`=44, `xl`=56). |
| `thumbSize` | `useBreakpointPropsType<number>` | `Math.max(2, size * 0.12)` | Stroke width of the progress arc. |
| `trackSize` | `useBreakpointPropsType<number>` | same as `thumbSize` | Stroke width of the background track. |
| `hideTrack` | `useBreakpointPropsType<boolean>` | `false` | When `true`, omits the background track circle entirely. |
| `showPercentage` | `useBreakpointPropsType<boolean>` | `false` | When `true` and no `children` is supplied, renders `{value}%` centered inside the ring. |
| `speed` | `useBreakpointPropsType<number>` | `1.5` | Animation duration in seconds for the indeterminate spin/dash keyframes (ignored in determinate mode). |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md). Note: `CircleProgressProps` is a plain object type (not extending `TagProps<T>` generically), though the root element is a `Tag` and does forward a `ref`.

## Examples

### Indeterminate (spinner)

```tsx
import { CircleProgress } from "@xanui/ui";

<CircleProgress color="brand" size="md" />
```

### Determinate with percentage label

```tsx
import { CircleProgress } from "@xanui/ui";

<CircleProgress value={72} showPercentage size="lg" color="success" />
```

### Custom centered content, track/thumb colors

```tsx
import { CircleProgress } from "@xanui/ui";
import CheckIcon from "@xanui/icons/Check";

<CircleProgress
  value={100}
  size={64}
  thumbColor="success"
  trackColor="default"
  hideTrack={false}
>
  <CheckIcon fontSize={24} />
</CircleProgress>
```

## Notes

- Passing `value` switches the component from an animated indeterminate spinner to a static determinate arc — the two modes use different CSS animation states (`isVal` internally).
- `showPercentage` only takes effect when `children` is not provided; explicit `children` always wins.
- Related: [LineProgress](./LineProgress.md) for a linear progress bar equivalent.
