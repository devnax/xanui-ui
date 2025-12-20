# Divider

`Divider` creates a simple horizontal or vertical line to separate content without adding extra markup.

## Basic Example

Break sections with default horizontal and vertical dividers.

```tsx
import Divider from '@xanui/ui/Divider';

export default function BasicDivider() {
	return (
		<div>
			<p>Section A</p>
			<Divider />
			<p>Section B</p>
		</div>
	);
}
```

## Props

| Name        | Type                         | Default        | Description                                                            |
| ----------- | ---------------------------- | -------------- | ---------------------------------------------------------------------- |
| `direction` | `'horizental' \| 'verticle'` | `'horizental'` | Chooses horizontal (full-width) or vertical (full-height) orientation. |
| `color`     | `UseColorTemplateColor`      | `'default'`    | Palette token for the divider stroke.                                  |
| `size`      | `number`                     | `1`            | Thickness of the divider in pixels.                                    |
| `component` | `TagComponentType`           | `'div'`        | Underlying element for the divider.                                    |

## Usage Examples

### Vertical divider between actions
Switch to vertical mode to separate toolbar buttons.

```tsx
import Divider from '@xanui/ui/Divider';
import Button from '@xanui/ui/Button';

export default function Toolbar() {
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
			<Button variant="text">Edit</Button>
			<Divider direction="verticle" size={32} />
			<Button variant="text">Share</Button>
		</div>
	);
}
```

### Responsive thickness
Adjust divider thickness for dense mobile layouts versus spacious desktop views.

```tsx
import Divider from '@xanui/ui/Divider';

export default function ResponsiveDivider() {
	return <Divider size={{ xs: 1, md: 2 }} color="brand" />;
}
```
