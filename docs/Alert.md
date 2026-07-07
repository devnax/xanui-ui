# Alert

An inline banner for status messages (info, warning, success, danger), plus a static `Alert.confirm(...)` helper that renders a confirmation modal on demand.

## Import

```tsx
import { Alert } from "@xanui/ui";
```

## Overview

`Alert` uses `useColorTemplate(color, variant)` to derive its background/text colors and registers with `useThemeComponent("Alert", ...)` with default `{ variant: "fill" }`. `title`, `variant`, `icon`, `color`, and `direction` all accept responsive values. Passing a recognized `icon` keyword (or relying on the `color` fallback) renders a matching icon (`info`/`warning`/`success`/`danger`); pass `icon={false}` to suppress it, or a custom `ReactElement`. Passing `onClose` renders a close `IconButton` in the top-right corner.

`Alert.confirm(props)` is a static method that imperatively renders a `Modal` containing an `Alert` with Cancel/OK buttons (via `@xanui/core`'s `Renderar.render`), useful for confirmation dialogs without manually managing mount state.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `useBreakpointPropsType<string \| ReactElement>` | — | Optional heading shown above the children. Strings render via `Text`; elements render as-is. |
| `direction` | `useBreakpointPropsType<"row" \| "column">` | `"row"` | `"row"` places the icon beside the content (left-aligned text); `"column"` stacks icon above content (centered text). |
| `variant` | `useBreakpointPropsType<UseColorTemplateType>` | `"fill"` | Passed to `useColorTemplate` — `"fill"`, `"outline"`, `"ghost"`, or `"text"`. |
| `color` | `useBreakpointPropsType<UseColorTemplateColor>` | `"default"` | Semantic color (`"info"`, `"warning"`, `"success"`, `"danger"`, `"brand"`, `"accent"`, or `"default"`). |
| `icon` | `useBreakpointPropsType<"info" \| "warning" \| "success" \| "error" \| false \| ReactElement>` | falls back to an icon matching `color` if recognized, otherwise none | Note: the internal icon map only has keys `info`/`warning`/`success`/`danger` — passing `"error"` will not match unless `color` is `"danger"`. |
| `onClose` | `React.DOMAttributes["onClick"]` | — | When provided, renders a close button; called on click. |

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` (`title`, `direction` are omitted/overridden from the base `TagProps`) — see [Core Concepts](./core-concepts.md).

### `Alert.confirm(props)`

Static helper — takes `ConfirmAlertProps` (all `AlertProps` except `children`/`onClose`/`variant`/`size`, minus `open`/`loading` which are managed internally):

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `string \| ReactElement` | — | Body content of the confirmation alert. |
| `size` | `useBreakpointPropsType<"xs"\|"sm"\|"md"\|"lg"\|"xl"\|number>` | `"md"` | Modal width; named sizes map to `280/320/400/520/640` px. |
| `closeButton` | `boolean` | — | Show the `Alert`'s own close (X) button, wired to `onCancel`. |
| `clickOutsideToClose` | `boolean` | — | Clicking outside the modal triggers `onCancel` (ignored while `loading`). |
| `okButtonText` | `string` | `"OK"` | Confirm button label. |
| `cancelButtonText` | `string` | `"Close"` | Cancel button label. |
| `hideOkButton` | `boolean` | `false` | Hide the OK button. |
| `hideCancelButton` | `boolean` | `false` | Hide the Cancel button. |
| `buttonPlacement` | `"start" \| "end" \| "between" \| "full"` | `"end"` | Layout of the action buttons row; `"full"` stretches both buttons equally. |
| `variant` | `"text" \| "fill"` | `"text"` | Alert/button variant (color logic adapts: `color: "default"` forces OK to `brand`/Cancel to `default` with `variant: "text"`). |
| `onConfirm` | `() => Promise<void> \| void` | — | Called on OK click; while pending, `loading` is set true and buttons disable. |
| `onCancel` | `() => Promise<void> \| void` | — | Called on Cancel click or outside-click-to-close. |
| `transition` | `TransitionVariantTypes` | `"zoom"` | Modal transition variant. |
| `blurMode` | `ModalProps["blurMode"]` | `"transparent"` | Passed to the underlying `Modal`. |
| `slotProps.modal` | `Omit<ModalProps, "open"\|"children">` | — | Extra props for the underlying `Modal`. |
| `slotProps.okButton` | `Omit<ButtonProps, "children">` | — | Extra props for the OK `Button`. |
| `slotProps.closeButton` | `Omit<ButtonProps, "children">` | — | Extra props for the Cancel `Button`. |

## Examples

### Basic usage

```tsx
import { Alert } from "@xanui/ui";

<Alert color="success" icon="success" title="Payment received">
  Your invoice #1042 has been paid in full.
</Alert>
```

### Dismissible, column layout, with `Alert.confirm`

```tsx
import { Alert } from "@xanui/ui";

// Inline dismissible alert
<Alert
  color="warning"
  icon="warning"
  direction="column"
  title="Storage almost full"
  onClose={() => console.log("dismissed")}
>
  You are using 92% of your available storage.
</Alert>;

// Imperative confirmation dialog
function deleteAccount() {
  Alert.confirm({
    color: "danger",
    title: "Delete account?",
    content: "This action cannot be undone.",
    okButtonText: "Delete",
    onConfirm: async () => {
      await fetch("/api/account", { method: "DELETE" });
    },
  });
}
```

## Notes

- Uses `useColorTemplate` for its `color`/`variant` styling — see [Core Concepts](./core-concepts.md).
- `Alert.confirm` relies on `@xanui/core`'s `Renderar.render` to mount/unmount imperatively; it wires its own `onExited` into `slotProps.modal.onExited` to clean up after the exit transition, chaining any `onExited` you pass in.
- Related components: [`Modal`](./Modal.md), [`Button`](./Button.md), `IconButton`.
