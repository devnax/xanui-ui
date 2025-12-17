# CircleProgress

`CircleProgress` renders a circular loader that can run indeterminately or display an exact percentage with optional inline content.

## Basic Example

Determinate loader showing the current percent in the center.

```tsx
import CircleProgress from '@xanui/ui/CircleProgress';

export default function BasicCircleProgress() {
	return <CircleProgress value={72} size={64} showPercentage />;
}
```

## Props

| Name             | Type                                       | Default     | Description                                                            |
| ---------------- | ------------------------------------------ | ----------- | ---------------------------------------------------------------------- |
| `value`          | `number`                                   | undefined   | Percentage (0–100). When omitted, the loader animates indeterminately. |
| `size`           | `number \| 'small' \| 'medium' \| 'large'` | `'medium'`  | Outer diameter of the progress indicator.                              |
| `thumbSize`      | `number`                                   | `4`         | Stroke width of the active progress arc.                               |
| `trackSize`      | `number`                                   | `thumbSize` | Stroke width of the background track.                                  |
| `color`          | `ColorTemplateColors`                      | `'brand'`   | Accent color for the thumb arc.                                        |
| `trackColor`     | `ColorTemplateColors`                      | derived     | Color token used for the background circle.                            |
| `thumbColor`     | `ColorTemplateColors`                      | derived     | Override the actual stroke color.                                      |
| `hideTrack`      | `boolean`                                  | `false`     | Removes the background circle, leaving only the animated arc.          |
| `showPercentage` | `boolean`                                  | `false`     | Renders the numeric percentage when no children are provided.          |
| `children`       | `ReactElement`                             | —           | Custom content centered inside the loader.                             |
| `speed`          | `number`                                   | `1.3`       | Duration (seconds) of the indeterminate animation cycle.               |

## Usage Examples

### Custom track and thumb colors
Mix different palette tokens to ensure readability on colored backgrounds.

```tsx
import CircleProgress from '@xanui/ui/CircleProgress';

export default function ContrastCircleProgress() {
	return (
		<CircleProgress
			value={45}
			size={80}
			color="warning"
			trackColor="common.secondary"
			thumbColor="warning"
		/>
	);
}
```

### Indeterminate loader with icon content
Drop any element inside the loader to reinforce context while it animates endlessly.

```tsx
import CircleProgress from '@xanui/ui/CircleProgress';
import CloudIcon from '@xanui/icons/CloudUpload';

export default function UploadingIndicator() {
	return (
		<CircleProgress size={72} hideTrack>
			<CloudIcon />
		</CircleProgress>
	);
}
```
