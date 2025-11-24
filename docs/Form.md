# Form

`Form` is a thin wrapper around the native `<form>` element that keeps the XanUI styling surface and exposes the underlying DOM node via `ref` for custom data handling.

## Basic Example

Group inputs and submit them using the standard form semantics.

```tsx
import Form from '@xanui/ui/Form';
import Input from '@xanui/ui/Input';
import Button from '@xanui/ui/Button';

export default function BasicForm() {
  return (
    <Form sxr={{ p: 3, gap: 2 }}>
      <Input name="email" placeholder="Email address" />
      <Button type="submit">Subscribe</Button>
    </Form>
  );
}
```

## Props

| Name         | Type                         | Default  | Description                                                                       |
| ------------ | ---------------------------- | -------- | --------------------------------------------------------------------------------- |
| `component`  | `TagComponentType`           | `'form'` | Change the underlying element if you need to nest or reuse the styling elsewhere. |
| `children`   | `ReactNode`                  | —        | Inputs, buttons, or any content rendered inside the form.                         |
| `sx` / `sxr` | `CSSObject`                  | —        | Style overrides for layout, spacing, and appearance.                              |
| `ref`        | `React.Ref<HTMLFormElement>` | —        | Access the DOM form to read values via `FormData`.                                |

## Usage Examples

### Reading values via ref
Use a `ref` and the browser `FormData` API to extract submitted values.

```tsx
import { useRef } from 'react';
import Form from '@xanui/ui/Form';
import Input from '@xanui/ui/Input';
import Button from '@xanui/ui/Button';

export default function RefForm() {
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!ref.current) return;
    const data = new FormData(ref.current);
    console.log(Object.fromEntries(data.entries()));
  };

  return (
    <Form ref={ref} onSubmit={handleSubmit}>
      <Input name="firstName" placeholder="First name" />
      <Button type="submit">Save</Button>
    </Form>
  );
}
```

### Custom layout styling
Use flex helpers through `sxr` to create multi-column forms without extra wrappers.

```tsx
import Form from '@xanui/ui/Form';
import Input from '@xanui/ui/Input';

export default function TwoColumnForm() {
  return (
    <Form
      sxr={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 16,
      }}
    >
      <Input name="city" placeholder="City" />
      <Input name="country" placeholder="Country" />
      <Input name="postal" placeholder="Postal code" />
      <Input name="street" placeholder="Street" />
    </Form>
  );
}
```
