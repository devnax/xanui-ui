import useLayer, { UseLayerOption } from "../useLayer";
import { Tag, TagProps } from '@xanui/core'

export type UseModalOption = Omit<UseLayerOption, "slotProps"> & {
   size?: "xs" | "sm" | "md" | "lg" | "xl" | "fullWidth" | number;
   slotProps?: {
      layer?: UseLayerOption['slotProps'];
      root?: Omit<TagProps<'div'>, "children">
   }
}

export type UseModalChildren = React.ReactElement | ((props: UseModalReturn) => React.ReactElement)

export type UseModalReturn = {
   open: () => void;
   close: () => void;
}

const useModal = (children: UseModalChildren, option?: UseModalOption) => {

   let sizes: any = {
      xs: 420,
      sm: 760,
      md: 990,
      lg: 1120,
      xl: 1300,
      fullWidth: "100%"
   }
   let { size, slotProps, ...useLayerOption } = option || {}
   size = size ?? "xs"
   slotProps = slotProps || {} as any
   const root: any = slotProps?.root || {}

   const layer = useLayer(() => {
      return (
         <Tag
            {...root}
            sxr={{
               maxWidth: sizes[size as any] || size,
               width: "100%",
               radius: 2,
               bgcolor: "background.primary",
               shadow: 15,
               ...root?.sx
            }}
            baseClass='modal'
         >
            {typeof children === "function" ? children({ open: layer.open, close: layer.close }) : children}
         </Tag>
      )
   }, {
      ...useLayerOption,
      onClickOutside: () => {
         if (option?.onClickOutside) {
            option.onClickOutside()
         } else {
            layer.close()
         }
      },
      slotProps: {
         ...slotProps?.layer,
         root: {
            display: "flex",
            alignItems: 'center',
            justifyContent: "center",
            ...slotProps?.layer?.root,
         }
      }
   })

   return layer
}

export default useModal;