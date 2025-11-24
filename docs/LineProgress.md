# LineProgress

`LineProgress` draws a slim horizontal indicator that can represent exact completion percentages or an ongoing activity.

## Basic Example

Show determinate progress with a thicker track for emphasis.

```tsx
import LineProgress from '@xanui/ui/LineProgress';

export default function BasicLineProgress() {
  return <LineProgress value={45} color="brand" thumbSize={6} />;
}
```

## Props
| Name      | Type                | Default   | Description                                                                                                |
| --------- | ------------------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| value     | number (0-100)      | undefined | Current progress percent. If omitted, indeterminate mode is used. Values >100 are clamped.                 |
| color     | ColorTemplateColors | 'brand'   | Semantic color used for the thumb and track (alpha background). 'default' uses divider / background tones. |
| thumbSize | number              | 4         | Height (thickness) of the progress bar in pixels.                                                          |
| hideTrack | boolean             | false     | If true, hides the track background making only the moving thumb visible.                                  |
| speed     | number (seconds)    | 1         | Duration of one full indeterminate animation cycle (only applies when `value` is undefined).               |
| children  | ReactElement        | -         | Optional custom element (currently unused; reserved for future overlays).                                  |

## Usage Examples

### Indeterminate sweep
Use when total duration is unknown; omit `value` to activate the animated sweep.

```tsx
import LineProgress from '@xanui/ui/LineProgress';

export default function IndeterminateLineProgress() {
  return <LineProgress color="brand" speed={1.4} />;
}
```

### Custom Thickness
Increase visibility for prominent tasks.
```tsx
<LineProgress value={70} thumbSize={10} color="success" />
```
Description: A thicker bar (`thumbSize={10}`) improves prominence for key actions.

### Hidden Track
Only show the active bar motion.
```tsx
<LineProgress hideTrack speed={0.8} />
```
Description: With `hideTrack` the background is transparent; combined with `speed` you can control animation pacing.

### Danger State
Indicates a failure recovery operation.
```tsx
<LineProgress value={25} color="danger" />
```
Description: Using `color="danger"` visually communicates an error-related process (e.g. retry progress).

### Brand Colored Indeterminate (Slow)
```tsx
<LineProgress color="brand" speed={2} />
```
Description: A longer `speed` slows the indeterminate sweep for lengthy operations.
