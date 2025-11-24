# ViewBox
Flexible container with optional start/end/overlay content regions.

## Import
```tsx
import { ViewBox } from '@xanui/ui';
```

## Usage
```tsx
<ViewBox startContent={<Header />} endContent={<Footer />} height={400}>
  <MainContent />
</ViewBox>
```

## Props (summary)
| Name           | Type      | Description                            |
| -------------- | --------- | -------------------------------------- |
| startContent   | ReactNode | Content rendered before main children. |
| endContent     | ReactNode | Content rendered after main children.  |
| overlayContent | ReactNode | Absolutely positioned overlay.         |
| height         | number    | string                                 | Fixed height. |
| width          | number    | string                                 | Fixed width.  |
| scroll         | boolean   | Enable internal scrolling.             |

## Best Practices
Use for panels needing header/footer with auto content scroll.
