# Option

`Option` is a convenience wrapper around `ListItem` that carries a `value` prop for use in `Select`, dropdown menus, and autocomplete lists.

## Basic Example

```tsx
import Option from '@xanui/ui/Option';

export default function BasicOption() {
	return <Option value="en">English</Option>;
}
```

## Props

| Name                    | Type                     | Default | Description                                   |
| ----------------------- | ------------------------ | ------- | --------------------------------------------- |
| `value`                 | `string \| number`       | —       | Payload returned when the option is selected. |
| `selected`              | `boolean`                | `false` | Highlights the option similar to `ListItem`.  |
| `disabled`              | `boolean`                | `false` | Prevents user interaction.                    |
| `startIcon` / `endIcon` | `ReactElement`           | —       | Icons rendered beside the label.              |
| `subtitle`              | `string \| ReactElement` | —       | Secondary text line.                          |

## Usage Examples

### Options inside a menu
Combine with `Menu`/`Select` to deliver pickers backed by values.

```tsx
import Option from '@xanui/ui/Option';

const languageOptions = [
	{ label: 'English', value: 'en' },
	{ label: 'Spanish', value: 'es' },
];

export default function LanguageList() {
	return languageOptions.map((opt) => (
		<Option key={opt.value} value={opt.value}>
			{opt.label}
		</Option>
	));
}
```

### Icon-enhanced option
Add icons to communicate context such as country flags or actions.

```tsx
import Option from '@xanui/ui/Option';
import CheckIcon from '@xanui/icons/Check';

export default function IconOption() {
	return (
		<Option value="selected" startIcon={<CheckIcon />} selected>
			Selected state
		</Option>
	);
}
```
