# Form
Layout and state helper for grouping input elements.

## Import
```tsx
import { Form } from '@xanui/ui';
```

## Usage
```tsx
<Form onSubmit={handleSubmit} spacing={2}>
  <Input name="email" />
  <Button type="submit">Submit</Button>
</Form>
```

## Props (summary)
| Name      | Type               | Description                 |
| --------- | ------------------ | --------------------------- |
| onSubmit  | (e) => void        | Submit handler.             |
| spacing   | number             | Gap between child controls. |
| direction | 'row'              | 'column'                    | Layout axis. |
| validate  | (values) => errors | Custom validation.          |

## Best Practices
Use browser validation where possible; enhance with custom validation only when needed.
