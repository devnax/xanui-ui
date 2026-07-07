# useContextMenu

A hook that builds a right-click (`contextmenu`) handler which renders a `Menu` at the cursor position.

## Import

```tsx
import { useContextMenu } from "@xanui/ui";
```

## Overview

Unlike a typical hover/click menu, a context menu has no persistent DOM target to anchor to — it should appear wherever the user right-clicked. `useContextMenu` solves this by rendering (via `@xanui/core`'s `Renderar`, outside the normal React tree) a zero-size positioning `Tag` at the click's page coordinates, and targeting this package's `Menu` component at that `Tag`. Attach the returned handler to any element's `onContextMenu`.

The returned handler also exposes a `.close()` method to programmatically dismiss the menu, and it prevents the browser's native context menu by default (`e.preventDefault()`).

## Props / Signature

```tsx
const useContextMenu: (props: MenuProps) => {
  (e: React.MouseEvent<TagComponentType, MouseEvent>): void;
  close: () => void;
}
```

`useContextMenu` accepts the same `MenuProps` as the `Menu` component (`children`, `placement`, `variant`, `duration`, `onEnter`/`onEntered`/`onExit`/`onExited`, `onClickOutside`, `slotProps`, `zIndex` — see `Menu`'s own docs), except `target` is managed internally and cannot be passed.

| Parameter / Return | Type | Description |
|---|---|---|
| `props` | `MenuProps` | Menu configuration — most notably `children` (the menu content to render) and `onClickOutside` (called, in addition to closing the menu, when the user clicks outside it). |
| **Returns** | `(e: React.MouseEvent) => void` with an attached `.close: () => void` | An event handler suitable for `onContextMenu`. Calling `.close()` force-unmounts the currently-open context menu instance. |

## Examples

Right-click context menu on a list row:

```tsx
import { useContextMenu, ListItem, Option } from "@xanui/ui";

const Row = ({ item }: { item: Item }) => {
  const onContextMenu = useContextMenu({
    placement: "bottom-left",
    children: (
      <>
        <Option onClick={() => rename(item)}>Rename</Option>
        <Option onClick={() => remove(item)}>Delete</Option>
      </>
    ),
  });

  return <ListItem onContextMenu={onContextMenu}>{item.name}</ListItem>;
};
```

Closing the menu programmatically after an action, and reacting to outside clicks:

```tsx
import { useContextMenu } from "@xanui/ui";

const onContextMenu = useContextMenu({
  children: <MenuContents />,
  onClickOutside: () => console.log("dismissed by outside click"),
});

const handleAction = () => {
  doSomething();
  onContextMenu.close();
};

<div onContextMenu={onContextMenu}>Right-click me</div>;
```

## Notes

- Public API — exported as `useContextMenu` from `@xanui/ui`.
- Each right-click renders a fresh instance via `Renderar.render(Comp, { x, y, open: true })`; a subsequent right-click elsewhere re-renders/repositions it (new `Comp` render call), it does not reuse the previous instance's position state.
- The positioning anchor is a `0x0` `Tag` fixed at `top: e.pageY, left: e.pageX` with an extremely high `zIndex` (`99999999999999`), which `Menu` then positions its content relative to using `placement`.
- Built on this package's `Menu` component, so it inherits `Menu`'s viewport-clamping/placement-fallback behavior.
