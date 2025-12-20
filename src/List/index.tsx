
import React from 'react'
import { Tag, TagProps, TagComponentType, useInterface, useColorTemplate, UseColorTemplateType, UseColorTemplateColor, useBreakpointProps, useBreakpointPropsType } from '@xanui/core'


export type ListProps<T extends TagComponentType = "ul"> = Omit<TagProps<T>, 'color'> & {
    color?: useBreakpointPropsType<UseColorTemplateColor>;
    variant?: useBreakpointPropsType<UseColorTemplateType>;
    hoverColor?: useBreakpointPropsType<UseColorTemplateColor>;
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

    color = p.color ?? "brand"
    variant = p.variant ?? "fill"
    hoverColor = p.hoverColor ?? "default"
    hoverVariant = p.hoverVariant ?? "soft"

    const template = useColorTemplate(color, variant)
    const hoverTemplate = useColorTemplate(hoverColor, hoverVariant)

    let sxOutline: any = {}
    if (hoverVariant == 'outline' || variant === 'outline') {
        sxOutline = {
            "& .list-item": {
                border: "1px solid",
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
                    ...hoverTemplate.primary,
                    "& .list-item-icon": {
                        color: hoverTemplate.primary.color
                    },
                    "& .list-item-text": {
                        color: hoverTemplate.primary.color
                    },
                    "& .list-item-subtitle": {
                        color: hoverColor === 'default' ? "text.secondary" : hoverTemplate.primary.color
                    },
                },
                "& .xui-list-item.list-item-selected": {
                    ...template.primary,
                    "& .list-item-icon": {
                        color: template.primary.color
                    },
                    "& .list-item-text": {
                        color: template.primary.color
                    },
                    "& .list-item-subtitle": {
                        color: template.primary.color
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