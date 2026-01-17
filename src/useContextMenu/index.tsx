import { Renderar, Tag, TagComponentType } from "@xanui/core"
import { useEffect, useRef, useState } from "react"
import Menu, { MenuProps } from "../Menu"


const useContextMenu = ({ children, onClosed, onClickOutside, ...props }: MenuProps) => {

   const Comp = ({ x, y }: any) => {
      const ref = useRef(null)
      const [target, setTarget] = useState<any>()

      useEffect(() => {
         setTarget(ref.current)
         return () => {
            Renderar.unrender(Comp)
         }
      }, [])

      return (
         <>
            <Tag
               baseClass="context-menu-target"
               ref={ref}
               position={"fixed"}
               top={y}
               left={x}
               zIndex={99999999999999}
               bgcolor="background.primary"
               height={0}
               width={0}
            />
            <Menu
               {...props}
               target={target!}
               onClickOutside={(e) => {
                  Renderar.unrender(Comp)
                  onClickOutside && onClickOutside(e)
               }}
            >
               {children}
            </Menu>
         </>
      )
   }

   const onContextMenu = (e: React.MouseEvent<TagComponentType, MouseEvent>) => {
      e.preventDefault()
      Renderar.render(Comp, {
         x: e.pageX,
         y: e.pageY,
         open: true,
      })
   }

   onContextMenu.close = () => {
      Renderar.unrender(Comp)
   }

   return onContextMenu
}

export default useContextMenu