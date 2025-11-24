
# Radio

`Radio` wraps the `Checkbox` component with radio-specific defaults (circular icons, `type="radio"`) while keeping the same flexible prop surface.

## Basic Example

```tsx
import { useState } from 'react';
import Radio from '@xanui/ui/Radio';

const options = [
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms' },
];

export default function BasicRadioGroup() {
    const [value, setValue] = useState('email');

    return (
        <div>
            {options.map((option) => (
                <label key={option.value} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Radio
                        name="notification"
                        checked={value === option.value}
                        onChange={() => setValue(option.value)}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
}
```

## Props

`Radio` accepts every `Checkbox` prop plus native radio input attributes.

| Name                        | Type                                       | Default              | Description                                                        |
| --------------------------- | ------------------------------------------ | -------------------- | ------------------------------------------------------------------ |
| `checked`                   | `boolean`                                  | uncontrolled         | Controls whether the radio is selected.                            |
| `onChange`                  | `() => void`                               | toggle internal      | Triggered when the radio is activated.                             |
| `name`                      | `string`                                   | —                    | Link multiple radios together for mutual exclusivity.              |
| `value`                     | `string \| number`                         | —                    | Payload submitted with the radio input.                            |
| `size`                      | `number \| 'small' \| 'medium' \| 'large'` | `'medium'`           | Icon size and interactive area.                                    |
| `color`                     | `ColorTemplateColors`                      | `'brand'`            | Accent color when checked.                                         |
| `checkIcon` / `uncheckIcon` | `ReactElement`                             | Material radio icons | Custom artwork for checked and unchecked states.                   |
| `disabled`                  | `boolean`                                  | `false`              | Prevents selection and dims styling.                               |
| `...rest`                   | `TagProps<'input'>`                        | —                    | Additional native input props (aria attributes, data props, etc.). |

## Usage Examples

### Horizontal radio group
Lay radios inline with a shared `name` attribute.

```tsx
import Radio from '@xanui/ui/Radio';

export default function ShippingSpeed({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    const speeds = ['standard', 'express', 'overnight'];

    return (
        <div style={{ display: 'flex', gap: 24 }}>
            {speeds.map((speed) => (
                <label key={speed} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Radio name="shipping" checked={value === speed} onChange={() => onChange(speed)} />
                    {speed}
                </label>
            ))}
        </div>
    );
}
```

### Custom icons and responsive size
Pass breakpoint-aware props to resize radios or switch their icons.

```tsx
import Radio from '@xanui/ui/Radio';
import RadioChecked from '@xanui/icons/RadioButtonChecked';
import RadioOutline from '@xanui/icons/RadioButtonUnchecked';

export default function CustomRadio() {
    return (
        <Radio
            size={{ xs: 'small', md: 32 }}
            color="success"
            checkIcon={<RadioChecked />}
            uncheckIcon={<RadioOutline />}
            checked
        />
    );
}
```

