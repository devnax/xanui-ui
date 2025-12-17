
import React from 'react';
import { Tag, TagProps, TagComponentType, useBreakpointProps, useBreakpointPropsType, ThemeColor } from '@xanui/core';


export type DividerProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, "color"> & {
    direction?: useBreakpointPropsType<"verticle" | "horizental">;
    color?: useBreakpointPropsType<keyof ThemeColor>;
    size?: useBreakpointPropsType<number>;
}

const Divider = React.forwardRef(<T extends TagComponentType = "div">({ children, direction, color, size, ...rest }: DividerProps<T>, ref: React.Ref<any>) => {
    const _p: any = {}
    if (direction) _p.direction = direction
    if (color) _p.color = color
    if (size) _p.size = size
    const p: any = useBreakpointProps(_p)
    direction = p.direction ?? "horizental"
    color = p.color ?? "surface.secondary"
    size = p.size ?? 1

    let isHori = direction === 'horizental'

    return (
        <Tag
            {...rest}
            baseClass='divider'
            sxr={{
                width: isHori ? "100%" : size,
                height: isHori ? size : "100%",
                bgcolor: color,
            }}
            ref={ref}
        >{children}</Tag>
    )
})

export default Divider

