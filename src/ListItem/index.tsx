"use client"
import React, { ReactElement } from 'react'
import { Tag, TagProps, TagComponentType, useInterface, useBreakpointProps, useBreakpointPropsType, useColorTemplate } from '@xanui/core'
import Text, { TextProps } from '../Text';
import { useListContext } from '../List/ListContext';


export type ListItemProps<T extends TagComponentType = "li"> = TagProps<T> & {
    selected?: boolean;
    subtitle?: useBreakpointPropsType<string | ReactElement>;
    startIcon?: useBreakpointPropsType<ReactElement>;
    endIcon?: useBreakpointPropsType<ReactElement>;
    size?: useBreakpointPropsType<"small" | "medium" | "large">;

    slotProps?: {
        content: Omit<TextProps, "children">;
        startIcon: Omit<TagProps, "children">;
        endIcon: Omit<TagProps, "children">;
        subtititle: Omit<TextProps, "children">;
    }
}

const ListItem = React.forwardRef(<T extends TagComponentType = "li">({ children, startIcon, endIcon, subtitle, slotProps, ...rest }: ListItemProps<T>, ref: React.Ref<any>) => {
    let [{ selected, ...props }] = useInterface<any>("ListItem", rest, {})
    const _p: any = {}
    if (subtitle) _p.subtitle = subtitle
    if (startIcon) _p.startIcon = startIcon
    if (endIcon) _p.endIcon = endIcon
    const p: any = useBreakpointProps(_p)
    const listProps = useListContext()
    const template = useColorTemplate(listProps.color, listProps.variant)
    const defaultTemplate = useColorTemplate("default", "text")
    const hoverTemplate = useColorTemplate('default', "soft")

    subtitle = p.subtitle
    startIcon = p.startIcon
    endIcon = p.endIcon
    const size = listProps?.size

    let sizes: any = {
        small: {
            fontSize: "button",
            py: 0.5,
            px: 1,
            minHeight: 32,
        },
        medium: {
            fontSize: "text",
            py: 1,
            px: 1.5,
            minHeight: 40,
        },
        large: {
            fontSize: "h6",
            py: 1.5,
            px: 2,
            minHeight: 48,
        }
    }

    const hoversx = {
        ...hoverTemplate.primary,
        "& .list-item-icon": {
            color: hoverTemplate.primary.color
        },
        "& .list-item-text": {
            color: hoverTemplate.primary.color
        },
        "& .list-item-subtitle": {
            color: hoverTemplate.primary.color
        }
    }

    let sx = {
        item: selected ? template.primary : defaultTemplate.primary,
        text: {
            color: selected ? template.primary.color : defaultTemplate.primary.color
        }
    }

    return (
        <Tag
            component='li'
            {...listProps?.listItem}
            {...props}
            sxr={{
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                userSelect: "none",
                cursor: "pointer",
                lineHeight: 1.4,
                whiteSpace: "nowrap",
                flexShrink: "0",
                ...sx.item,
                ...sizes[size as any],
                border: 0,
                "&:hover:not(.list-item-selected)": hoversx
            }}
            baseClass='list-item'
            classNames={[{ "list-item-selected": selected as boolean }, ...(props.classNames || [])]}
            ref={ref}
        >
            {startIcon && <Tag
                {...slotProps?.startIcon}
                component="span"
                baseClass='list-item-icon'
                sxr={{
                    ...sx.text,
                    mr: 1,
                    display: "inline-block"
                }}
            >{startIcon as any}</Tag>}
            <Tag flex={1}>
                <Text
                    {...slotProps?.content}
                    variant="text"
                    className='list-item-text'
                    component={typeof children === "string" || typeof children === "number" ? "p" : "div"}
                    sx={sx.text}
                >
                    {children}
                </Text>
                {
                    subtitle && <Text
                        {...slotProps?.subtititle}
                        variant="text"
                        fontSize="button"
                        className='list-item-subtitle'
                        component={typeof subtitle === "string" || typeof subtitle === "number" ? "p" : "div"}
                        sx={sx.text}
                    >{subtitle as any}</Text>
                }
            </Tag>
            {endIcon && <Tag
                {...slotProps?.endIcon}
                component="span"
                baseClass='list-item-icon'
                sxr={{
                    ml: 1,
                    display: "inline-block"
                }}
            >{endIcon as any}</Tag>}
        </Tag>
    )
})

export default ListItem