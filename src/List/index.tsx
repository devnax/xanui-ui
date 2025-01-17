'use client'
import React, { forwardRef } from 'react'
import { Tag, TagProps, TagComponentType, useInterface, useColorTemplate, ColorTemplateType, ColorTemplateColors, useBreakpointProps, useBreakpointPropsType } from '@xanui/core'


export type ListProps<T extends TagComponentType = "ul"> = Omit<TagProps<T>, 'color'> & {
    color?: useBreakpointPropsType<ColorTemplateColors>;
    variant?: useBreakpointPropsType<ColorTemplateType>;
    hoverColor?: useBreakpointPropsType<ColorTemplateColors>;
    hoverVariant?: useBreakpointPropsType<ColorTemplateType>;
}

const List = React.forwardRef(<T extends TagComponentType = "ul">({ children, ...rest }: ListProps<T>, ref: React.Ref<any>) => {
    let [{ sx, color, variant, hoverColor, hoverVariant, ...props }] = useInterface<any>("List", rest, {})
    const _p: any = {}
    if (color) _p.color = color
    if (variant) _p.variant = variant
    if (hoverColor) _p.hoverColor = hoverColor
    if (hoverVariant) _p.hoverVariant = hoverVariant
    const p: any = useBreakpointProps(_p)

    color = p.color ?? "brand"
    variant = p.variant ?? "fill"
    hoverColor = p.hoverColor ?? "default"
    hoverVariant = p.hoverVariant ?? "alpha"

    const template = { ...useColorTemplate(color, variant) }
    const hoverTemplate = { ...useColorTemplate(hoverColor, hoverVariant) }
    delete template.hover
    delete hoverTemplate.hover

    let sxOutline: any = {}
    if (hoverVariant == 'outline' || variant === 'outline') {
        sxOutline = {
            "& .list-item": {
                border: 1,
                borderColor: "transparent"
            }
        }
    }

    return (
        <Tag
            component='ul'
            {...props}
            baseClass='list'
            sxr={{
                listStyle: "none",
                p: 0,
                m: 0,
                ...sxOutline,
                "& .list-item-icon": {
                    color: "text.secondary"
                },
                "& .list-item-text": {
                    color: "text.primary"
                },
                "& .list-item-subtitle": {
                    color: "text.secondary"
                },
                "& .xui-list-item:not(.list-item-selected):hover": {
                    ...hoverTemplate,
                    "& .list-item-icon": {
                        color: hoverTemplate.color
                    },
                    "& .list-item-text": {
                        color: hoverTemplate.color
                    },
                    "& .list-item-subtitle": {
                        color: hoverColor === 'default' ? "text.secondary" : hoverTemplate.color
                    },
                },
                "& .xui-list-item.list-item-selected": {
                    ...template,
                    "& .list-item-icon": {
                        color: template.color
                    },
                    "& .list-item-text": {
                        color: template.color
                    },
                    "& .list-item-subtitle": {
                        color: template.color
                    },
                },
                ...(sx || {} as any)
            }}
            ref={ref}
        >
            {children}
        </Tag>
    )
})

export default List