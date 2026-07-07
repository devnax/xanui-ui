# PasswordInput

An [`Input`](./core-concepts.md) preconfigured for password entry, with a built-in show/hide toggle icon button.

## Import

```tsx
import { PasswordInput } from "@xanui/ui";
```

## Overview

`PasswordInput` is a thin wrapper around `Input`: it renders an `Input` with `variant="outline"` and `placeholder="Password"` as defaults (both overridable via props), forces `type` to `"password"` or `"text"` based on internal `show` state, and injects an `endIcon` containing an `IconButton` (`variant="text"`, `color="default"`, `size="sm"`) that toggles visibility, showing `@xanui/icons`' `VisibilityOff`/`Visibility` icon accordingly. Because it spreads `{...props}` onto `Input` between the defaults and the forced `type`/`endIcon`, every other `Input` prop (label, error, helperText, size, color, slots, etc.) works exactly as documented for `Input`. Note: passing your own `endIcon` has no effect — it's always overwritten by the internal toggle button.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultShow` | `boolean` | `false` | Initial visibility state (`true` shows plaintext password on first render). Uncontrolled — there is no controlled `show`/`onShowChange` prop; toggling is entirely internal. |
| `placeholder` | `string` | `"Password"` | Overrides the default placeholder text. |

`PasswordInput` extends `InputProps` in full (`value`, `label`, `error`, `helperText`, `size`, `color`, `variant`, `startIcon`, `readOnly`, `slotProps`, `refs`, etc. all pass through to the underlying `Input`), and therefore also all standard `Tag`/`Box` props via `TagProps` — see [Core Concepts](./core-concepts.md). `type` and `endIcon` are accepted by the type but always overridden internally.

## Examples

### Basic usage

```tsx
import { PasswordInput } from "@xanui/ui";

<PasswordInput label="Password" name="password" />
```

### Custom placeholder, default-visible, and validation state

```tsx
import { PasswordInput } from "@xanui/ui";

<PasswordInput
  label="New password"
  placeholder="Enter a strong password"
  defaultShow
  error={password.length < 8}
  helperText={password.length < 8 ? "Must be at least 8 characters" : undefined}
  onChange={(e) => setPassword(e.target.value)}
/>
```

## Notes

- Visibility toggling is uncontrolled internal state (`useState`); there's no way to control it from outside the component.
- `type` and `endIcon` passed in by the caller are silently overwritten — `PasswordInput` always sets `type` from its own `show` state and always supplies its own toggle `endIcon`.
- Relies on `@xanui/icons`' `Visibility`/`VisibilityOff` icons, so `@xanui/icons` must be available as a dependency.
- For everything else (labels, errors, sizing, multiline, slots), see `Input`'s own documented props — `PasswordInput` is a single-purpose specialization, not a fork.
