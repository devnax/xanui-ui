"use client";
import { ReactNode } from "react";
// import useModal, { UseModalProps } from "../useModal";
import { Renderar, Tag, TagProps } from "@xanui/core";
import Layer, { ActionLayerChildren, LayerProps } from "../Layer";

export type ModalProps = Omit<LayerProps, "slotProps"> & {
   children: ReactNode;
   size?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | number;
   slotProps?: {
      layer?: LayerProps['slotProps'];
      root?: Omit<TagProps<'div'>, "children">
   }
}


const Modal = (props: ModalProps) => {
   let sizes: any = {
      xs: 420,
      sm: 760,
      md: 990,
      lg: 1120,
      xl: 1300,
      full: "100%"
   }
   let { children, onOpen, size, slotProps, ...layerProps } = props || {}
   size = size ?? "xs"
   slotProps = slotProps || {} as any
   const root: any = slotProps?.root || {}

   return (
      <Layer
         {...layerProps}
         slotProps={{
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
         }}
      >
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
            {children}
         </Tag>
      </Layer>
   )
}

Modal.open = (Children: ActionLayerChildren, props?: Omit<ModalProps, 'children' | "open">) => {
   const InstanceModal = ({ children, ...props }: ModalProps) => <Modal {...props} >{children}</Modal>;
   const m = Renderar.render(InstanceModal as any, {
      open: true,
      children: typeof Children === "function" ? <Children
         open={() => m.updateProps({ open: true })}
         close={() => m.updateProps({ open: false })}
      /> : Children,
      ...props,
      onClickOutside: () => {
         if (props?.onClickOutside) {
            props.onClickOutside()
         } else {
            m.updateProps({ open: false })
         }
      },
      onClosed: () => {
         m.unrender()
         if (props?.onClosed) {
            props.onClosed()
         }
      }
   })

   return {
      open: () => {
         m.updateProps({ open: true })
      },
      close: () => {
         m.updateProps({ open: false })
      },
   }
};


export default Modal;