
import { Renderar, Tag, TagProps, useBreakpointProps, useBreakpointPropsType } from '@xanui/core';
import Layer, { LayerProps } from '../Layer';
import ClickOutside, { ClickOutsideProps } from '../ClickOutside';


export type DrawerProps = Omit<LayerProps, "transition" | "slotProps"> & {
    placement?: useBreakpointPropsType<"left" | "right" | "bottom" | "top">;
    size?: useBreakpointPropsType<number | "small" | "medium" | "large">;
    onClickOutside?: () => void;
    slotProps?: {
        layer?: Partial<Omit<LayerProps, "children">>
        root?: TagProps<"div">;
        content?: TagProps<"div">;
        clickOutside?: Omit<ClickOutsideProps, "children" | "onClickOutside">;
    }
}

const getVariant = (placement?: any) => {
    switch (placement) {
        case "right":
            return "fadeLeft"
        case "top":
            return "fadeDown"
        case "bottom":
            return "fadeUp"
        default:
            return "fadeRight"
    }
}

const Drawer = ({ children, placement, size, slotProps, onClickOutside, ...layerProps }: DrawerProps) => {
    const _p: any = {}
    if (placement) _p.placement = placement
    if (size) _p.size = size
    const p: any = useBreakpointProps(_p)

    placement = p.placement ?? 'left'
    size = p.size || "medium"

    let isSide = placement === 'left' || placement === 'right'
    let sizes: any = {
        small: 200,
        medium: 300,
        large: 400
    }

    let _size = sizes[size as any] || size

    return (
        <Layer
            {...layerProps}
            {...slotProps?.layer}
            transition={getVariant(placement)}
        >
            <Tag
                {...slotProps?.root}
                baseClass='drawer'
                sxr={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    direction: isSide ? "row" : "column" as any,
                    justifyContent: placement === 'left' || placement === 'top' ? "flex-start" : "flex-end"
                }}
            >
                <ClickOutside {...slotProps?.clickOutside} onClickOutside={onClickOutside || (() => { })}>
                    <Tag
                        sxr={{
                            width: isSide ? _size : "100%",
                            height: isSide ? "100%" : _size,
                            bgcolor: "background.secondary",
                            shadow: 20
                        }}
                        baseClass='drawer-content'
                    >
                        {children}
                    </Tag>
                </ClickOutside>
            </Tag>
        </Layer>
    )
}


Drawer.open = (children: DrawerProps["children"], props?: Omit<DrawerProps, "children" | "open">) => {
    const d = Renderar.render(Drawer as any, {
        open: true,
        ...props,
        children,
        onClosed: () => {
            d.unrender()
        },
        onClickOutside: () => {
            if (props?.onClickOutside) {
                props.onClickOutside()
            } else {
                d.updateProps({ open: false })
            }
        }
    })

    return {
        open: () => {
            d.updateProps({ open: true })
        },
        close: () => {
            d.updateProps({ open: false })
        },
    }
}

Drawer.close = () => {
    Renderar.unrender(Drawer as any)
}

export default Drawer