import React, { ReactElement } from 'react';
import { Tag, TagProps, TagComponentType, useInterface, useColorTemplate, UseColorTemplateColor, UseColorTemplateType, useBreakpointProps, useBreakpointPropsType } from '@xanui/core';
import useCorner, { UseCornerTypes } from '../useCorner'



export type ChipProps<T extends TagComponentType = 'div'> = Omit<TagProps<T>, "color" | "children" | "size"> & {
    label: useBreakpointPropsType<string | ReactElement>;
    startIcon?: useBreakpointPropsType<ReactElement>;
    endIcon?: useBreakpointPropsType<ReactElement>;
    color?: useBreakpointPropsType<UseColorTemplateColor>;
    variant?: useBreakpointPropsType<UseColorTemplateType>;
    corner?: useBreakpointPropsType<UseCornerTypes>;
    size?: useBreakpointPropsType<"small" | "medium" | "large">;
}


const Chip = React.forwardRef(<T extends TagComponentType = 'div'>(props: ChipProps<T>, ref: React.Ref<any>) => {
    let [{ label, variant, startIcon, endIcon, color, corner, size, ...rest }] = useInterface<any>("Chip", props, {})
    const _p: any = {}
    if (label) _p.label = label
    if (startIcon) _p.startIcon = startIcon
    if (endIcon) _p.endIcon = endIcon
    if (color) _p.color = color
    if (variant) _p.variant = variant
    if (corner) _p.corner = corner
    if (size) _p.size = size
    const p: any = useBreakpointProps(_p)

    label = p.label
    startIcon = p.startIcon
    endIcon = p.endIcon
    color = p.color || "brand"
    variant = p.variant || "fill"
    corner = p.corner || "circle"
    size = p.size || "medium"
    rest.sx = (rest as any).sx || {};

    const cornerCss = useCorner(corner)
    const template = useColorTemplate(color, variant)

    const sizes: any = {
        small: {
            height: 24,
            gap: .5,
            px: startIcon || endIcon ? .8 : 1,
            fontSize: "small"
        },
        medium: {
            height: 32,
            gap: 1,
            px: startIcon || endIcon ? .8 : 1.5,
            fontSize: 'button',
        },
        large: {
            height: 40,
            fontSize: 'text',
            gap: 1,
            px: startIcon || endIcon ? .8 : 1.5,
        }
    }

    return (
        <Tag
            {...cornerCss}
            {...template.primary}
            {...(sizes[size as any] || {})}
            {...rest}
            sxr={{
                display: "inline-flex",
                flexDirection: "row",
                alignItems: "center",
                transition: "background .3s",
                overflow: "hidden",

                "&  > *": {
                    flex: "0 0 auto",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                },
            }}
            baseClass='chip'
            ref={ref}
        >
            {startIcon}
            <Tag
                sxr={{
                    alignItems: "center",
                    flexBox: true
                }}
            >{label}</Tag>
            {endIcon}
        </Tag>
    )
})

export default Chip
