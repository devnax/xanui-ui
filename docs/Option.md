# Option

A `ListItem` variant used inside `Select` to represent one selectable value.

## Import

```tsx
import { Option } from "@xanui/ui";
```

## Overview

`Option` wraps [`ListItem`](./ListItem.md), adding a required `value` and reading the enclosing `Select`'s context (`useSelectContext` from `../Select/context`) to determine whether it's the currently `selected` item (by string-comparing `value` to the context's `value`) and to call the `Select`'s `onChange` handler on click, passing `{ value, children, ...props }`. Because it renders a `ListItem`, it must be used inside a [`List`](./List.md) (which a `Select`'s dropdown typically provides), and inherits all of `ListItem`'s color/size/icon/subtitle behavior.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | **Required.** The option's value; compared (via `.toString()`) against the parent `Select`'s current value to determine `selected` state, and passed to `Select`'s `onChange`. |
| `children` | `string` | — | **Required.** The option's visible label (note: typed as `string`, not general `ReactNode`, unlike `ListItem`'s `children`). |

`Option` extends `Omit<ListItemProps, "children">` (with `children` re-typed to `string`), so it also accepts every `ListItem` prop (`subtitle`, `startIcon`, `endIcon`, `size`, `slotProps`, `selected` is overridden internally) plus all `TagProps` — see [ListItem](./ListItem.md) and [Core Concepts](./core-concepts.md).

## Examples

### Basic usage inside a Select

```tsx
import { Select, Option } from "@xanui/ui";
import { useState } from "react";

function Example() {
  const [value, setValue] = useState("apple");
  return (
    <Select value={value} onChange={(opt) => setValue(opt.value)}>
      <Option value="apple">Apple</Option>
      <Option value="banana">Banana</Option>
      <Option value="cherry">Cherry</Option>
    </Select>
  );
}
```

### Options with icons and subtitles

```tsx
import { Select, Option } from "@xanui/ui";

<Select value={value} onChange={(opt) => setValue(opt.value)}>
  <Option value="free" subtitle="Basic features">
    Free plan
  </Option>
  <Option value="pro" subtitle="Everything, unlimited" startIcon={<StarIcon />}>
    Pro plan
  </Option>
</Select>
```

## Notes

- Not meant to be used standalone — it depends on `Select`'s context provider (`useSelectContext`) which throws if the context is missing entirely (though the default context value from `Select/context.tsx` is `{ value: undefined, onChange: undefined }`, so rendering outside a `Select` won't crash immediately, but clicks will be no-ops since `onChange` is undefined).
- `selected` is computed automatically (string-compared value) and cannot be manually overridden — it's always overwritten by the internal comparison, even if you pass `selected` yourself.
- See [ListItem](./ListItem.md) for the full set of inherited visual props, and [List](./List.md) for the context that supplies size/color/variant.
