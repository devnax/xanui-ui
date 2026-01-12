
import React from 'react'
import { Tag, TagProps, TagComponentType, useInterface, useColorTemplate, UseColorTemplateType, UseColorTemplateColor, useBreakpointProps, useBreakpointPropsType } from '@xanui/core'
import { ListContext } from './ListContext';

export type ListProps<T extends TagComponentType = "ul"> = Omit<TagProps<T>, 'color' | "size"> & {
    color?: useBreakpointPropsType<UseColorTemplateColor>;
    variant?: Omit<useBreakpointPropsType<UseColorTemplateType>, "outline">;
    size?: useBreakpointPropsType<"small" | "medium" | "large">;
}


const List = React.forwardRef(<T extends TagComponentType = "ul">({ children, ...rest }: ListProps<T>, ref: React.Ref<any>) => {
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

    const template = useColorTemplate(color, variant)
    const defaultTemplate = useColorTemplate("default", "text")
    const hoverTemplate = useColorTemplate('default', "soft")


    return (
        <ListContext.Provider value={{ size }}>
            <Tag
                component='ul'
                {...props}
                baseClass='list'
                sxr={{
                    listStyle: "none",
                    p: 0,
                    m: 0,
                    "& .list-item-icon": {
                        color: "text.secondary"
                    },
                    "& .list-item-text": {
                        color: "text.primary"
                    },
                    "& .list-item-subtitle": {
                        color: "text.secondary"
                    },

                    "& .xui-list-item": {
                        ...defaultTemplate.primary,
                        "& .list-item-icon": {
                            color: defaultTemplate.primary.color
                        },
                        "& .list-item-text": {
                            color: defaultTemplate.primary.color
                        },
                        "& .list-item-subtitle": {
                            color: hoverColor === 'default' ? "text.secondary" : defaultTemplate.primary.color
                        },

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
                            color: hoverTemplate.primary.color
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
                        border: "0"
                    },
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