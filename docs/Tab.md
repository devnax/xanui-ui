# Tab

`Tab` is a styled `Button` instance meant to live inside `Tabs`. It carries a `value` prop used by the parent to manage selection.

## Basic Example

```tsx
import { useState } from 'react';
import Tabs from '@xanui/ui/Tabs';
import Tab from '@xanui/ui/Tab';

export default function BasicTabs() {
	const [value, setValue] = useState('profile');

	return (
		<Tabs value={value} onChange={setValue}>
			<Tab value="profile">Profile</Tab>
			<Tab value="settings">Settings</Tab>
			<Tab value="billing">Billing</Tab>
		</Tabs>
	);
}
```

## Props

| Name                    | Type                     | Default   | Description                                                                |
| ----------------------- | ------------------------ | --------- | -------------------------------------------------------------------------- |
| `value`                 | `string \| number`       | —         | Identifier reported to `Tabs` when clicked.                                |
| `selected`              | `boolean`                | `false`   | Highlights the tab without relying on `Tabs`. Useful for standalone usage. |
| `disabled`              | `boolean`                | `false`   | Prevents focus and click interactions.                                     |
| `variant`               | `ButtonProps['variant']` | `'text'`  | Visual style inherited from `Button`.                                      |
| `color`                 | `ColorTemplateColors`    | `'brand'` | Accent color for borders and text.                                         |
| `startIcon` / `endIcon` | `ReactElement`           | —         | Icons rendered beside the label.                                           |
| `children`              | `ReactNode`              | —         | Tab label contents.                                                        |
| `...rest`               | `ButtonProps`            | —         | Any button attribute (size, spacing, etc.).                                |

## Usage Examples

### Tabs with badges
Combine icons and supplementary text inside each tab.

```tsx
import { useState } from 'react';
import Tabs from '@xanui/ui/Tabs';
import Tab from '@xanui/ui/Tab';
import Badge from '@xanui/ui/Badge';

export default function NotificationTabs() {
	const [value, setValue] = useState('inbox');

	return (
		<Tabs value={value} onChange={setValue}>
			<Tab value="inbox">
				Inbox <Badge color="error">3</Badge>
			</Tab>
			<Tab value="mentions">Mentions</Tab>
		</Tabs>
	);
}
```

### Standalone tab button
Use `Tab` outside of `Tabs` when you simply want the same styling but manual control.

```tsx
import Tab from '@xanui/ui/Tab';

export default function StandaloneTab() {
	return <Tab selected color="success">Manual selection</Tab>;
}
```
