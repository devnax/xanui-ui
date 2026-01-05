
import React, { ReactElement } from 'react'
import { Tag, TagProps, TagComponentType, useInterface, useBreakpointProps, useBreakpointPropsType } from '@xanui/core'
import Text from '../Text';
import { useListContext } from '../List/ListContext';


export type ListItemProps<T extends TagComponentType = "li"> = TagProps<T> & {
    selected?: boolean;
    subtitle?: useBreakpointPropsType<string | ReactElement>;
    startIcon?: useBreakpointPropsType<ReactElement>;
    endIcon?: useBreakpointPropsType<ReactElement>;
    size?: useBreakpointPropsType<"small" | "medium" | "large">;
}

const ListItem = React.forwardRef(<T extends TagComponentType = "li">({ children, startIcon, endIcon, subtitle, size, ...rest }: ListItemProps<T>, ref: React.Ref<any>) => {
    let [{ selected, ...props }] = useInterface<any>("ListItem", rest, {})
    const _p: any = {}
    if (subtitle) _p.subtitle = subtitle
    if (startIcon) _p.startIcon = startIcon
    if (endIcon) _p.endIcon = endIcon
    if (size) _p.size = size
    const p: any = useBreakpointProps(_p)
    const ctx = useListContext()

    subtitle = p.subtitle
    startIcon = p.startIcon
    endIcon = p.endIcon
    size = p.size ?? ctx?.size ?? "medium"

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

    return (
        <Tag
            component='li'
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
                ...sizes[size as any]
            }}
            baseClass='list-item'
            classNames={[{ "list-item-selected": selected as boolean }, ...(props.classNames || [])]}
            ref={ref}
        >
            {startIcon && <Tag mr={1} component="span" display="inline-block" className='list-item-icon'>{startIcon as any}</Tag>}
            <Tag flex={1}>
                <Text
                    variant="text"
                    className='list-item-text'
                    component={typeof children === "string" || typeof children === "number" ? "p" : "div"}
                >
                    {children}
                </Text>
                {
                    subtitle && <Text
                        variant="text"
                        fontSize="button"
                        className='list-item-subtitle'
                        component={typeof subtitle === "string" || typeof subtitle === "number" ? "p" : "div"}
                    >{subtitle as any}</Text>
                }
            </Tag>
            {endIcon && <Tag ml={1} component="span" display="inline-block" className='list-item-icon'>{endIcon as any}</Tag>}
        </Tag>
    )
})

ListItem.displayName = "ListItem"

export default ListItem