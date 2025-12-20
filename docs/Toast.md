# Toast

`Toast` exposes an imperative `open` helper that shows transient `Alert` messages in configurable corners of the viewport. Toasts automatically dismiss after 6 seconds but pause when hovered.

## Basic Example

```tsx
import Toast from '@xanui/ui/Toast';
import Button from '@xanui/ui/Button';

export default function SaveButton() {
	const handleSave = () => {
		// perform action...
		Toast.open({
			title: 'Profile saved',
			content: 'Your changes are now live.',
			color: 'success',
		});
	};

	return <Button onClick={handleSave}>Save changes</Button>;
}
```

## Options

| Name        | Type                                                                                              | Default          | Description                                           |
| ----------- | ------------------------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------- |
| `title`     | `string \| ReactElement`                                                                          | —                | Heading rendered inside the toast alert.              |
| `content`   | `ReactNode`                                                                                       | —                | Body copy or JSX.                                     |
| `color`     | `UseColorTemplateColor`                                                                           | `'brand'`        | Color palette applied to the alert.                   |
| `variant`   | `UseColorTemplateType`                                                                            | `'fill'`         | Alert variant (fill, outline, alpha, etc.).           |
| `icon`      | `'info' \| 'warning' \| 'success' \| 'error' \| false \| ReactElement`                            | `'info'`         | Icon displayed at the start of the alert.             |
| `placement` | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'bottom-right'` | Screen corner where the toast stack appears.          |
| `closeable` | `boolean`                                                                                         | `true`           | Enables the close icon and click-to-dismiss behavior. |

## Usage Examples

### Queue multiple placements
Differentiate success and error stacks by using specific `placement` values.

```tsx
Toast.open({
	title: 'Connected',
	content: 'Realtime socket ready.',
	color: 'success',
	placement: 'top-right',
});

Toast.open({
	title: 'Sync failed',
	content: 'Retry in a few seconds.',
	color: 'error',
	placement: 'bottom-left',
});
```

### Custom alert props
Pass any `Alert` prop such as `mode="item"`, `shadow`, or custom icons.

```tsx
Toast.open({
	title: 'Warning',
	content: 'Storage is almost full.',
	color: 'warning',
	variant: 'outline',
	icon: false,
	closeable: false,
});
```
