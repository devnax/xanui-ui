import { usePortal } from "@xanui/core"
import { useState } from "react"
import Layer, { LayerProps } from "../Layer"

export type UseLayerOption = Omit<LayerProps, "open" | "children"> & {

}

export type UseLayerReturn = {
   open: () => void;
   close: () => void;
}

export type UseLayerChildren = React.ReactElement | ((props: UseLayerReturn) => React.ReactElement)

const useLayer = (children: UseLayerChildren, option?: UseLayerOption): UseLayerReturn => {
   const [open, setOpen] = useState(false)

   usePortal(<Layer
      blur={20}
      {...option}
      open={open}
      onClickOutside={() => {
         if (option?.onClickOutside) {
            option.onClickOutside()
         } else {
            setOpen(false)
         }
      }}
   >
      {typeof children === "function" ? children({ open: () => setOpen(true), close: () => setOpen(false) }) : children}
   </Layer>)

   return {
      open: () => setOpen(true),
      close: () => setOpen(false),
   }
}

export default useLayer