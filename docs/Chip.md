# Chip

`Chip` highlights short bits of information such as statuses, filters, or user selections while supporting icons and responsive tokens.

## Basic Example

Simple filled chip representing a status tag.

```tsx
import Chip from '@xanui/ui/Chip';

export default function BasicChip() {
	return <Chip label="Active" color="success" />;
}
```

## Props

| Name                    | Type                             | Default    | Description                                  |
| ----------------------- | -------------------------------- | ---------- | -------------------------------------------- |
| `label`                 | `string \| ReactElement`         | —          | Mandatory content displayed inside the chip. |
| `startIcon` / `endIcon` | `ReactElement`                   | —          | Optional icons that flank the label.         |
| `color`                 | `ColorTemplateColors`            | `'brand'`  | Palette token used with the chosen variant.  |
| `variant`               | `ColorTemplateType`              | `'fill'`   | Visual style (fill, outline, alpha, etc.).   |
| `corner`                | `UseCornerTypes`                 | `'circle'` | Border radius preset, e.g., pill or rounded. |
| `size`                  | `'small' \| 'medium' \| 'large'` | `'medium'` | Sets height, padding, and font sizing.       |
| `component`             | `TagComponentType`               | `'div'`    | Change the rendered element for semantics.   |

## Usage Examples

### Outline filter chip
Combine an icon and outline variant to indicate a removable filter.

```tsx
import Chip from '@xanui/ui/Chip';
import CloseIcon from '@xanui/icons/Close';

export default function FilterChip({ onRemove }: { onRemove: () => void }) {
	return (
		<Chip
			label="Marketing"
			variant="outline"
			endIcon={<CloseIcon onClick={onRemove} />}
		/>
	);
}
```

### Responsive chips row
Adjust chip size per breakpoint to keep horizontal space tidy.

```tsx
import Chip from '@xanui/ui/Chip';

export default function ResponsiveChips() {
	const sizes = { xs: 'small', md: 'medium' } as const;
	return (
		<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
			<Chip label="Draft" color="warning" size={sizes} />
			<Chip label="Published" color="success" size={sizes} />
			<Chip label="Archived" color="default" size={sizes} />
		</div>
	);
}
```
