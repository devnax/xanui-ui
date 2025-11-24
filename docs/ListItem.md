# ListItem

`ListItem` is the building block for navigation lists, menus, and dropdowns, supporting icons, subtitles, and selection states.

## Basic Example

```tsx
import List from '@xanui/ui/List';
import ListItem from '@xanui/ui/ListItem';

export default function BasicListItem() {
	return (
		<List>
			<ListItem selected>Profile</ListItem>
			<ListItem>Notifications</ListItem>
		</List>
	);
}
```

## Props

| Name                    | Type                     | Default | Description                                                               |
| ----------------------- | ------------------------ | ------- | ------------------------------------------------------------------------- |
| `selected`              | `boolean`                | `false` | Adds the `list-item-selected` class for styled states from parent `List`. |
| `subtitle`              | `string \| ReactElement` | —       | Secondary line displayed beneath the main label.                          |
| `startIcon` / `endIcon` | `ReactElement`           | —       | Icons rendered before or after the text.                                  |
| `component`             | `TagComponentType`       | `'li'`  | Change the root element (e.g., `'button'`).                               |

## Usage Examples

### Items with subtitles
Provide additional context such as email addresses or metadata.

```tsx
import List from '@xanui/ui/List';
import ListItem from '@xanui/ui/ListItem';

export default function SubtitleList() {
	return (
		<List>
			<ListItem subtitle="Signed in as nora@acme.com">Nora Wilson</ListItem>
			<ListItem subtitle="Owner">Acme Inc.</ListItem>
		</List>
	);
}
```

### Icon actions
Add leading/trailing icons for navigation or quick actions.

```tsx
import List from '@xanui/ui/List';
import ListItem from '@xanui/ui/ListItem';
import SettingsIcon from '@xanui/icons/Settings';
import ChevronRight from '@xanui/icons/ChevronRight';

export default function IconList() {
	return (
		<List>
			<ListItem startIcon={<SettingsIcon />} endIcon={<ChevronRight />}>Settings</ListItem>
		</List>
	);
}
```
