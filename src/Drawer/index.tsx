
import { ReactElement, ReactNode } from 'react';
import { Tag, TagProps, useBreakpointProps, useBreakpointPropsType } from '@xanui/core';
import Layer, { LayerProps } from '../Layer';
import ClickOutside from '../ClickOutside';


export type DrawerChildrenType = ReactNode | ReactElement | string

export type DrawerProps = Omit<TagProps, "children" | "size"> & {
    children?: DrawerChildrenType;
    placement?: useBreakpointPropsType<"left" | "right" | "bottom" | "top">;
    open?: boolean;
    size?: useBreakpointPropsType<number | "small" | "medium" | "large">;
    onClickOutside?: () => void;
    slotProps?: {
        root?: TagProps<"div">;
        layer?: Partial<Omit<LayerProps, 'children' | "transition" | "open">>;
    }
}

const MainView = ({ children, placement, open, size, slotProps, onClickOutside, ...rest }: DrawerProps) => {
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
            {/* <ClickOutside onClickOutside={onClickOutside || (() => { })}> */}
            <Tag
                {...rest}
                sxr={{
                    width: isSide ? _size : "100%",
                    height: isSide ? "100%" : _size,
                    bgcolor: "background.primary",
                    shadow: 10
                }}
                baseClass='drawer-content'
            >
                {children}
            </Tag>
            {/* </ClickOutside> */}
        </Tag>
    )
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

const Drawer = ({ children, open, ...rest }: DrawerProps) => {
    return (
        <Layer
            {...rest?.slotProps?.layer}
            open={open ?? true}
            transition={getVariant(rest.placement)}
        >
            <MainView {...rest} open={true}>{children}</MainView>
        </Layer>
    )
}


Drawer.open = (content: DrawerChildrenType, props?: Omit<DrawerProps, "children" | "open">) => {
    let { placement, slotProps } = props || {}
    placement ??= 'left'
    const l = Layer.open(<MainView
        onClickOutside={() => l.close()}
        {...props}
        open={true}
    >{"content"}</MainView>, {
        ...slotProps?.layer,
        transition: getVariant(placement) as any,
    })

    return l
}

export default Drawer