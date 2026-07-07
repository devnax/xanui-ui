# Form

A styled `<form>` wrapper with basic built-in submit handling.

## Import

```tsx
import { Form } from "@xanui/ui";
```

## Overview

`Form` renders a `Tag` with `component="form"` and applies default styling (background, padding, `maxWidth: 400`, rounded corners). On submit, it prevents the default page reload, reads the form's `FormData`, and logs each field's key/value to the console. It also walks its children and, for any direct child element that has a `name` prop, clones it with a computed `value` (read from `FormData`) and an `onChange` that logs the field's current value — this is exploratory/debug behavior rather than a full controlled-form implementation.

## Props

`FormProps<T>` currently adds no props beyond `TagProps<T>` (default `T = "form"`).

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { Form, Input, Button } from "@xanui/ui";

<Form>
  <Input name="email" placeholder="Email" />
  <Button type="submit">Submit</Button>
</Form>
```

### Overriding default styling

```tsx
import { Form, Input, Button } from "@xanui/ui";

<Form maxWidth={600} bgcolor="paper.primary" p={4} radius={2}>
  <Input name="username" placeholder="Username" />
  <Input name="password" type="password" placeholder="Password" />
  <Button type="submit">Log in</Button>
</Form>
```

## Notes

- **Gotcha:** on submit, `Form` only logs field values to the console (`console.log(key + ": " + value)`) — it does not call an `onSubmit` prop with the parsed data, post to a URL, or expose form state to the consumer. If you need real form-state management or submission handling, wrap fields yourself and manage `onSubmit`/`onChange` at the field level rather than relying on `Form`'s built-in behavior.
- The child-cloning logic that injects `value`/`onChange` only inspects **direct** children with a `name` prop (recursing into `children.props.children`) — it will not find named fields nested inside other non-form wrapper components unless those wrappers pass `children` straight through.
- Default styling (`bgcolor: "default"`, `p: 2`, `maxWidth: 400`, `radius: 1`) is applied via `sxr` and can be overridden by passing your own values.
- `ref` (if provided) is attached to the underlying `<form>` element.
