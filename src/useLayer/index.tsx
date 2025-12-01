import { usePortal } from "@xanui/core"
import { useState } from "react"
import Layer, { LayerProps } from "../Layer"
import { UsePortalOptions } from "@xanui/core/hooks/usePortal"

export type UseLayerProps = Omit<LayerProps, "open" | "children" | "slotProps"> & {
   slotProps?: LayerProps["slotProps"] & {
      portal?: UsePortalOptions
   }
}

export type UseLayerReturn = {
   open: () => void;
   close: () => void;
}

export type UseLayerChildren = React.ReactElement | ((props: UseLayerReturn) => React.ReactElement)

const useLayer = (children: UseLayerChildren, props?: UseLayerProps): UseLayerReturn => {
   const [open, setOpen] = useState(false)
   const portalProps = props?.slotProps?.portal || {}
   const portal = usePortal(<Layer
      blur={20}
      {...props}
      open={open}
      onClosed={() => {
         portal.unmount()
         if (props?.onClosed) {
            props.onClosed()
         }
      }}
      onClickOutside={() => {
         if (props?.onClickOutside) {
            props.onClickOutside()
         } else {
            setOpen(false)
         }
      }}
   >
      {typeof children === "function" ? children({ open: () => setOpen(true), close: () => setOpen(false) }) : children}
   </Layer>, portalProps)

   return {
      open: () => {
         portal.mount()
         setOpen(true)
      },
      close: () => {
         setOpen(false)
      },
   }
}

export default useLayer