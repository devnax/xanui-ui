# Select

`Select` composes `Input`, `Menu`, and `Option` components to build an accessible dropdown picker with customizable slots.

## Basic Example

```tsx
import { useState } from 'react';
import Select from '@xanui/ui/Select';
import Option from '@xanui/ui/Option';

export default function BasicSelect() {
    const [language, setLanguage] = useState('en');

    return (
        <Select value={language} onChange={setLanguage} placeholder="Choose language">
            <Option value="en">English</Option>
            <Option value="es">Spanish</Option>
            <Option value="fr">French</Option>
        </Select>
    );
}
```

## Props

| Name              | Type                                                       | Default   | Description                                     |
| ----------------- | ---------------------------------------------------------- | --------- | ----------------------------------------------- |
| `value`           | `string \| number`                                         | —         | Currently selected option value.                |
| `onChange`        | `(value: string \| number) => void`                        | —         | Called when an option is chosen.                |
| `children`        | `ReactElement<OptionProps> \| ReactElement<OptionProps>[]` | —         | `Option` nodes rendered inside the dropdown.    |
| `placeholder`     | `string`                                                   | —         | Text shown when no value is selected.           |
| `color`           | `ColorTemplateColors`                                      | `'brand'` | Accent color applied to the input and list.     |
| `variant`         | `ColorTemplateType`                                        | `'fill'`  | Input variant; `alpha` is normalized to `fill`. |
| `slotProps.menu`  | `MenuProps` (except `children`, `target`)                  | —         | Overrides passed to the popover menu.           |
| `slotProps.input` | `InputProps` (except `value`, `onChange`)                  | —         | Customize the trigger input.                    |
| `slotProps.list`  | `ListProps`                                                | —         | Additional props for the internal list.         |

## Usage Examples

### Select with icons
Leverage `Option` start icons to display context such as country flags.

```tsx
import { useState } from 'react';
import Select from '@xanui/ui/Select';
import Option from '@xanui/ui/Option';
import UsaFlag from '@xanui/icons/FlagUs';

export default function FlagSelect() {
    const [country, setCountry] = useState('us');

    return (
        <Select value={country} onChange={setCountry} placeholder="Country">
            <Option value="us" startIcon={<UsaFlag />}>United States</Option>
            <Option value="ca">Canada</Option>
            <Option value="mx">Mexico</Option>
        </Select>
    );
}
```

### Customized menu and list
Use `slotProps` to control menu width, elevation, or list padding.

```tsx
import Select from '@xanui/ui/Select';
import Option from '@xanui/ui/Option';

export default function DenseSelect() {
    return (
        <Select
            placeholder="Team"
            slotProps={{
                input: { variant: 'outline' },
                menu: { placement: 'bottom-start' },
                list: { gap: 0.25, px: 1 },
            }}
        >
            <Option value="design">Design</Option>
            <Option value="product">Product</Option>
            <Option value="engineering">Engineering</Option>
        </Select>
    );
}
```