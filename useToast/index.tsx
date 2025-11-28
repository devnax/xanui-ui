import { appRootElement, ColorTemplateColors, ColorTemplateType, Tag, Transition, useBreakpointPropsType, usePortal } from "@xanui/core";
import { ReactElement, useId, useState } from "react";
import { AlertProps } from "../src/Alert";
import Alert from "../src/Alert";
import Scrollbar from "../src/Scrollbar";

type PlacementType = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"

export type useToastContentProps = {
   show: () => string;
   hide: () => void;
}

export type UseTastContent = string | ReactElement | ((props: useToastContentProps) => ReactElement)

export type UseToastProps = {
   title?: useBreakpointPropsType<string | ReactElement>;
   content?: AlertProps['children'];
   variant?: useBreakpointPropsType<ColorTemplateType>;
   color?: useBreakpointPropsType<ColorTemplateColors>;
   icon?: useBreakpointPropsType<"info" | "warning" | "success" | "error" | false | ReactElement>;
   placement?: PlacementType;
   closeable?: useBreakpointPropsType<boolean>;
}


const useToast = (props?: UseToastProps) => {
   let { placement = "bottom-right", content, closeable, ...rest } = props || {}
   let sxr: any = {}
   let transition: any = ""
   switch (placement) {
      case "top-left":
         sxr = {
            top: 0,
            left: 0
         }
         transition = "fadeRight"
         break;
      case "top-right":
         sxr = {
            top: 0,
            right: 0
         }
         transition = "fadeLeft"
         break;
      case "top-center":
         sxr = {
            top: 0,
            left: "50%",
            transform: "translateX(-50%)"
         }
         transition = "fadeDown"
         break;
      case "bottom-right":
         sxr = {
            bottom: 0,
            right: 0
         }
         transition = "fadeLeft"
         break;
      case "bottom-left":
         sxr = {
            bottom: 0,
            left: 0
         }
         transition = "fadeRight"
         break;
      case "bottom-center":
         sxr = {
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)"
         }
         transition = "fadeUp"
         break;
   }

   const appRootELe = document.body
   let hasConELe = document.querySelector(`[data-xui-toast-container="${placement}"]`)
   let containerEle = hasConELe
   if (!containerEle) {
      containerEle = document.createElement("div")
      containerEle.setAttribute("data-xui-toast-container", placement)
      appRootELe.appendChild(containerEle)
   }

   const id = `xui-toast-list-${placement}`

   const containerPortal = usePortal(<Tag
      sxr={{
         position: "fixed",
         zIndex: 99999999,
         display: "flex",
         gap: 2,
         flexDirection: "column",
         maxHeight: "100%",
         width: 320,
         bgcolor: "yellow",
         ...sxr
      }}
   >
      <Scrollbar
         p={1}
         overflow="hidden"
         id={id}
      >

      </Scrollbar>
   </Tag>, { autoMount: !Boolean(hasConELe), container: containerEle as HTMLElement })
   closeable ??= true
   const [open, setOpen] = useState(true)
   const [timer, setTimer] = useState<any>(null)

   const portal = usePortal(<Transition
      key={id}
      open={open}
      variant={transition}
      onOpen={() => {

      }}
      onClosed={() => {
         portal.unmount()
         clearTimeout(timer)

         // unmount the container if there are no more toasts
         setTimeout(() => {
            const toastListEle = document.getElementById(id)

            if (toastListEle && !toastListEle.children.length) {
               containerPortal.unmount()
            }
         }, 300);
      }}
      onOpened={() => {
         setTimer(setTimeout(() => {
            setOpen(false)
         }, 6000))
      }}
   >
      <Alert
         shadow={2}
         variant="fill"
         color="brand"
         {...rest as any}
         mode="item"
         mb={1.5}
         onMouseEnter={() => {
            clearTimeout(timer)
         }}
         onMouseLeave={() => {
            setTimer(setTimeout(() => {
               setOpen(false)
            }, 6000))
         }}
         onClose={closeable ? () => {
            setOpen(false)
         } : undefined}
      >{content}</Alert>
   </Transition>, { container: document.getElementById(id) as HTMLElement })

   return {
      show: () => {
         portal.mount()
         setOpen(true)
      },
      hide: () => {
         setOpen(false)
      }
   };
}

export default useToast;