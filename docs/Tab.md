# Tab

A single selectable tab button, meant to be used exclusively as a child of [`Tabs`](./Tabs.md).

## Import

```tsx
import { Tab } from "@xanui/ui";
```

## Overview

`Tab` is a thin wrapper around [`Button`](./Button.md) that reads its shared state from `Tabs` via context (`useTabs()`, from `../Tabs/context`) rather than props: it throws if rendered outside a `<Tabs>` ("Tabs component must be used within a `<Tabs>`."). It compares its own `value` against the parent `Tabs`' current `value` to determine `isSelected`, derives its displayed `color` from the parent's `color` when selected (`"default"` otherwise), and applies a selected-state text-color override when the parent's `variant` is `"fill"` (white/contrast text via `{color}.contrast`). Clicking a `Tab` calls the parent `Tabs`' `onChange(value, e)` — `Tab` itself holds no selection state. It also has an effect that re-fires `onChange` when the parent's `variant`/`color` changes while this tab is already the selected one (keeping the parent's selection-driven side effects, such as an indicator position, in sync). It always renders with `Button`'s `variant="text"`.

Only `Tab`'s own props are documented here — see [Tabs](./Tabs.md) for the parent container's props (`value`, `onChange`, `variant`, `color`, `indicatorSize`, etc.).

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string \| number` | — | This tab's identity, compared against the parent `Tabs`' `value` to determine selection, and passed to `Tabs`' `onChange` when clicked. |
| `children` | *(inherited from `ButtonProps`)* | — | Tab label content. |

`TabProps<T> = ButtonProps<T> & { value?: string | number }` — so `Tab` also accepts every [`Button`](./Button.md) prop (`size`, `startIcon`, `endIcon`, `disabled`, `loading`, etc.), though `color` and `variant` are effectively controlled by the parent `Tabs` context rather than meant to be set directly.

Also accepts all standard `Tag`/`Box` props (spacing, color, layout, `sx`/`sxr`, `hover`, responsive breakpoint objects, etc.) via `TagProps` (through `ButtonProps`) — see [Core Concepts](./core-concepts.md).

## Examples

### Basic usage

```tsx
import { Tabs, Tab } from "@xanui/ui";
import { useState } from "react";

const [value, setValue] = useState("profile");

<Tabs value={value} onChange={(v) => setValue(v as string)}>
  <Tab value="profile">Profile</Tab>
  <Tab value="settings">Settings</Tab>
  <Tab value="billing">Billing</Tab>
</Tabs>
```

### With icons, disabled tab, and a fill variant

```tsx
import { Tabs, Tab } from "@xanui/ui";
import { useState } from "react";
import HomeIcon from "@xanui/icons/Home";
import SettingsIcon from "@xanui/icons/Settings";

const [value, setValue] = useState("home");

<Tabs value={value} onChange={(v) => setValue(v as string)} variant="fill" color="brand">
  <Tab value="home" startIcon={<HomeIcon />}>Home</Tab>
  <Tab value="settings" startIcon={<SettingsIcon />}>Settings</Tab>
  <Tab value="archived" disabled>Archived</Tab>
</Tabs>
```

## Notes

- `Tab` must be a descendant of [`Tabs`](./Tabs.md) — it reads `value`, `onChange`, `variant`, and `color` from `Tabs`' context (`TabContext`) and throws an error otherwise.
- Rendered internally as a `Button` with `variant="text"` and a `"tab"` entry added to `classNames`, so `Button`-level theming (via `useThemeComponent("Button", ...)`) also cascades through, in addition to `Tab`'s own registered theme name (`"Tab"`).
- Selection styling (which color/variant a selected vs. unselected tab shows) is driven entirely by the parent `Tabs`, not by props you set on an individual `Tab` — see [Tabs](./Tabs.md) for `variant`/`color`/`indicatorSize` options.
