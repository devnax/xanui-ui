# Text

`Text` maps theme typography variants (`text`, `small`, `button`, `h1`…`h6`) to styled semantic elements. All responsive style props from `Tag` are available.

## Basic Example

```tsx
import Text from '@xanui/ui/Text';

export default function HeadingBlock() {
	return (
		<>
			<Text variant="h2">Dashboard</Text>
			<Text variant="small" color="text.secondary">
				Track the latest performance metrics in one place.
			</Text>
		</>
	);
}
```

## Props

| Name        | Type                                                                            | Default         | Description                                                                           |
| ----------- | ------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------- |
| `variant`   | `'text' \| 'small' \| 'button' \| 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'text'`        | Typography preset controlling font size, line height, and weight.                     |
| `component` | `TagComponentType`                                                              | matches variant | Override the underlying element (e.g., render `span` while using `variant="button"`). |
| `children`  | `ReactNode`                                                                     | —               | Text content.                                                                         |
| `...rest`   | `TagProps`                                                                      | —               | Color, spacing, display, and HTML attributes.                                         |

## Usage Examples

### Responsive typography
Use breakpoint props to change the variant on larger screens.

```tsx
import Text from '@xanui/ui/Text';

export default function ResponsiveTitle() {
	return <Text variant={{ xs: 'h4', md: 'h2' }}>Insights</Text>;
}
```

### Inline text element
Render inline text while preserving the theme style tokens.

```tsx
import Text from '@xanui/ui/Text';

export default function LabelText() {
	return (
		<Text component="span" variant="button" color="text.secondary">
			Required
		</Text>
	);
}
```
