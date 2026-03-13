"use client"
import React from 'react'
import { Tag, TagProps, TagComponentType, useInterface, UseColorTemplateType, UseColorTemplateColor, useBreakpointProps, useBreakpointPropsType } from '@xanui/core'
import { ListContext } from './ListContext';
import { ListItemProps } from '../ListItem';

export type ListProps<T extends TagComponentType = "ul"> = Omit<TagProps<T>, 'color' | "size"> & {
    color?: useBreakpointPropsType<UseColorTemplateColor>;
    variant?: Omit<useBreakpointPropsType<UseColorTemplateType>, "outline">;
    size?: useBreakpointPropsType<"small" | "medium" | "large">;
    slotProps?: {
        listItem?: Omit<ListItemProps, "children">
    }
}


const List = React.forwardRef(<T extends TagComponentType = "ul">({ children, slotProps, ...rest }: ListProps<T>, ref: React.Ref<any>) => {
    let [{ sx, color, variant, hoverColor, hoverVariant, size, ...props }] = useInterface<any>("List", rest, {})
    const _p: any = {}
    if (color) _p.color = color
    if (variant) _p.variant = variant
    if (hoverColor) _p.hoverColor = hoverColor
    if (hoverVariant) _p.hoverVariant = hoverVariant
    if (size) _p.size = size
    const p: any = useBreakpointProps(_p)

    color = p.color ?? "brand"
    variant = p.variant ?? "fill"
    size = p.size ?? "medium"

    return (
        <ListContext.Provider value={{ color, variant, size, listItem: slotProps?.listItem }}>
            <Tag
                component='ul'
                {...props}
                baseClass='list'
                sxr={{
                    listStyle: "none",
                    p: 0,
                    m: 0,
                    ...(sx || {} as any)
                }}
                ref={ref}
            >
                {children}
            </Tag>
        </ListContext.Provider>
    )
})

export default List