# useCorner

`useCorner` is a tiny helper that translates semantic corner names into the appropriate `radius` value for XanUI components.

## Basic Example

```tsx
import useCorner from '@xanui/ui/useCorner';
import Paper from '@xanui/ui/Paper';

export default function RoundedPanel() {
	const corner = useCorner('rounded');
	return <Paper {...corner}>Content with consistent radii</Paper>;
}
```

## API

| Parameter | Type                                | Default     | Description                                                                     |
| --------- | ----------------------------------- | ----------- | ------------------------------------------------------------------------------- |
| `type`    | `'square' \| 'rounded' \| 'circle'` | `undefined` | Corner preset to convert into a style object. Omitting returns an empty object. |

## Return Value

An object containing a `radius` prop suitable for spreading into any XanUI component (e.g., `{ radius: 1 }`).

## Usage Examples

### Icon button with circle radius

```tsx
import useCorner from '@xanui/ui/useCorner';
import IconButton from '@xanui/ui/IconButton';

export default function CircularAction(props) {
	return <IconButton {...useCorner('circle')} {...props} />;
}
```

### Overriding per state
Choose presets dynamically to keep corners consistent across variants.

```tsx
const corner = useCorner(isCard ? 'rounded' : 'square');
return <Box {...corner}>{children}</Box>;
```
