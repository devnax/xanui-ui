import { ReactNode, useEffect, useRef } from "react";
import useModal, { UseModalProps } from "../useModal";
import { Renderar, Tag } from "@xanui/core";

export type ModalProps = UseModalProps & {
   children: ReactNode;
   open: boolean;
}

const Modal = ({ children, open, ...props }: ModalProps) => {
   const ref = useRef<HTMLDivElement>(null);

   const modal = useModal(<>{children}</>, {
      ...props,
      onClickOutside: () => {
         if (props?.onClickOutside) {
            props.onClickOutside()
         }
      },
      slotProps: {
         layer: {
            portal: {
               container: ref?.current || undefined
            }
         }
      }
   })

   useEffect(() => {
      if (open) {
         modal.open()
      } else {
         modal.close()
      }
   }, [open])
   return <Tag ref={ref}></Tag>
}

const ActionModal = ({ children, ...props }: ModalProps) => {
   return (
      <Modal {...props}>
         {children}
      </Modal>
   )
}

Modal.open = (children: ModalProps['children'], props?: Omit<ModalProps, 'children'>) => {
   const m = Renderar.render(ActionModal as any, {
      open: true,
      ...props,
      children,
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

Modal.close = () => {
   Renderar.unrender(ActionModal as any)
}

export default Modal;