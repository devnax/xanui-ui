"use client";

import useLayer, { UseLayerProps } from "../useLayer";
import { Tag, TagProps } from '@xanui/core'

export type UseModalProps = Omit<UseLayerProps, "slotProps"> & {
   size?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | number;
   slotProps?: {
      layer?: UseLayerProps['slotProps'];
      root?: Omit<TagProps<'div'>, "children">
   }
}

export type UseModalChildren = React.ReactElement | ((props: UseModalReturn) => React.ReactElement)

export type UseModalReturn = {
   open: () => void;
   close: () => void;
}

const useModal = (children: UseModalChildren, props?: UseModalProps) => {

   let sizes: any = {
      xs: 420,
      sm: 760,
      md: 990,
      lg: 1120,
      xl: 1300,
      full: "100%"
   }
   let { size, slotProps, ...useLayerProps } = props || {}
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
      ...useLayerProps,
      onClickOutside: () => {
         if (props?.onClickOutside) {
            props.onClickOutside()
         } else {
            layer.close()
         }
      },
      slotProps: {
         ...slotProps?.layer,
         clickOutside: {
            maxWidth: sizes[size as any] || size,
            width: "100%",
            ...slotProps?.layer?.clickOutside,
         },
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