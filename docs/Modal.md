# Modal

`Modal` displays centered dialogs with backdrop blur and responsive max-width presets. Use it for confirmations, forms, and focused interactions.

## Basic Example

```tsx
import { useState } from 'react';
import Modal from '@xanui/ui/Modal';

export default function BasicModal() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<button onClick={() => setOpen(true)}>Open modal</button>
			<Modal open={open} onClickOutside={() => setOpen(false)} size="sm">
				<div style={{ padding: 24 }}>
					<h2>Invite teammate</h2>
					<p>Send an invite link via email.</p>
				</div>
			</Modal>
		</>
	);
}
```

## Props

| Name                                                         | Type                                                            | Default | Description                             |
| ------------------------------------------------------------ | --------------------------------------------------------------- | ------- | --------------------------------------- |
| `open`                                                       | `boolean`                                                       | `false` | Controls visibility of the modal.       |
| `size`                                                       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'fullWidth' \| number` | `'xs'`  | Determines the max width of the dialog. |
| `slotProps.modal`                                            | `TagProps<'div'>`                                               | —       | Style overrides for the dialog surface. |
| `slotProps.root`, `slotProps.transition`, `slotProps.portal` | `LayerProps['slotProps']`                                       | —       | Pass-through to the underlying `Layer`. |
| `children`                                                   | `ReactNode`                                                     | —       | Content rendered inside the dialog.     |

## Usage Examples

### Imperative modal launchers
Open dialogs from anywhere without local state using `Modal.open` and `Modal.close`.

```tsx
import Modal from '@xanui/ui/Modal';

export function showSettings() {
	Modal.open('settings', <div style={{ padding: 24 }}>Settings form</div>, { size: 'md' });
}

export function hideSettings() {
	Modal.close('settings');
}
```

### Full-width responsive layout
Switch to `fullWidth` on small screens and keep a fixed width on desktops.

```tsx
import Modal from '@xanui/ui/Modal';

export default function ResponsiveModal({ open, onClose }) {
	return (
		<Modal
			open={open}
			onClickOutside={onClose}
			size={{ xs: 'fullWidth', md: 'md' }}
			slotProps={{ modal: { sx: { p: 4 } } }}
		>
			<p>Responsive modal body</p>
		</Modal>
	);
}
```
