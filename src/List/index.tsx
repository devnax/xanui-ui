
import React from 'react'
import { Tag, TagProps, TagComponentType, useInterface, useColorTemplate, useBreakpointProps, useBreakpointPropsType, ThemeColor, UseColorTemplateType } from '@xanui/core'


export type ListProps<T extends TagComponentType = "ul"> = Omit<TagProps<T>, 'color'> & {
    color?: useBreakpointPropsType<keyof ThemeColor>;
    variant?: useBreakpointPropsType<UseColorTemplateType>;
    hoverColor?: useBreakpointPropsType<keyof ThemeColor>;
    hoverVariant?: useBreakpointPropsType<UseColorTemplateType>;
}

const List = React.forwardRef(<T extends TagComponentType = "ul">({ children, ...rest }: ListProps<T>, ref: React.Ref<any>) => {
    let [{ sx, color, variant, hoverColor, hoverVariant, ...props }] = useInterface<any>("List", rest, {})
    const _p: any = {}
    if (color) _p.color = color
    if (variant) _p.variant = variant
    if (hoverColor) _p.hoverColor = hoverColor
    if (hoverVariant) _p.hoverVariant = hoverVariant
    const p: any = useBreakpointProps(_p)

    color = p.color ?? "common"
    variant = p.variant ?? "fill"
    hoverColor = p.hoverColor ?? "brand"
    hoverVariant = p.hoverVariant ?? "alpha"

    const template: any = useColorTemplate(color, variant)
    const hoverTemplate: any = useColorTemplate(hoverColor, hoverVariant)
    delete template.hover
    delete hoverTemplate.hover

    let sxOutline: any = {}
    if (hoverVariant == 'outline' || variant === 'outline') {
        sxOutline = {
            "& .xui-list-item": {
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
                    color: `${color}.text.secondary`
                },
                "& .list-item-text": {
                    color: `${color}.text.primary`
                },
                "& .list-item-subtitle": {
                    color: `${color}.text.secondary`
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
                        color: hoverTemplate.color
                    },
                },
                "& .xui-list-item.list-item-selected": {
                    ...hoverTemplate,
                    "& .list-item-icon": {
                        color: hoverTemplate.color
                    },
                    "& .list-item-text": {
                        color: hoverTemplate.color
                    },
                    "& .list-item-subtitle": {
                        color: hoverTemplate.color
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