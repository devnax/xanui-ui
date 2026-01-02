"use client";
import React from 'react';
import { Tag, TagProps, TagComponentType, useInterface, UseColorTemplateColor, UseColorTemplateType, useColorTemplate, useBreakpointProps, useBreakpointPropsType } from '@xanui/core';
import useCorner from '../useCorner'


export type IconButtonProps<T extends TagComponentType = 'button'> = Omit<TagProps<T>, "color" | "size"> & {
    size?: useBreakpointPropsType<number | "small" | "medium" | "large">;
    color?: useBreakpointPropsType<UseColorTemplateColor>;
    variant?: useBreakpointPropsType<UseColorTemplateType>;
    corner?: useBreakpointPropsType<"square" | "rounded" | "circle">;
}

const IconButton = React.forwardRef(<T extends TagComponentType = 'button'>({ children, ...rest }: IconButtonProps<T>, ref: React.Ref<any>) => {
    rest.sx = (rest as any).sx || {};
    let [{ variant, corner, color, size, ..._props }] = useInterface<any>("IconButton", rest, {})

    const _p: any = {}
    if (size) _p.size = size
    if (color) _p.color = color
    if (variant) _p.variant = variant
    if (corner) _p.corner = corner
    const p: any = useBreakpointProps(_p)

    size = p.size ?? "medium"
    color = p.color
    variant = p.variant
    corner = p.corner ?? "circle"

    let template = useColorTemplate(color || "brand", variant || "fill")
    const cornerCss = useCorner(corner)

    if (size === 'small') {
        size = 28
    } else if (size === 'medium') {
        size = 34
    } else if (size === 'large') {
        size = 52
    }


    return (
        <Tag
            component='button'
            ref={ref}
            {...cornerCss}
            {..._props}
            {...template.primary}
            baseClass='icon-button'
            sxr={{
                border: 0,
                radius: size,
                height: size,
                width: size,
                cursor: "pointer",
                fontFamily: "inherit",

                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",

                lineHeight: 1,
                fontSize: Math.round((size / 3) * 2),

                bgcolor: "transparent",

                "& svg": {
                    fontSize: Math.round((size / 3) * 1.8),
                    display: "block",
                    width: "1em",
                    height: "1em",
                    flexShrink: 0,
                },

                "& > *": {
                    fontSize: Math.round((size / 3) * 2),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
            }}
            hover={{
                ...template.secondary,
                ...((_props as any)?.hover || {})
            }}
        >
            {children}
        </Tag>
    )
})
// const IconButton = forwardRef(_IconButton) as unknown as typeof _IconButton
export default IconButton
