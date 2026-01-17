"use client";
import { Tag, TagProps, useBreakpointProps, useColorTemplate, useInterface, useBreakpointPropsType, Renderar, UseColorTemplateType, UseColorTemplateColor } from "@xanui/core"
import React, { isValidElement, ReactElement, useEffect, useRef } from "react"
import Text from "../Text"
import InfoIcon from '@xanui/icons/Info';
import WarningIcon from '@xanui/icons/Warning';
import SuccessIcon from '@xanui/icons/CheckCircle';
import ErrorIcon from '@xanui/icons/Cancel';
import IconClose from '@xanui/icons/Close';
import IconButton from "../IconButton";
import useAlert, { UseAlerProps } from "../useAlert";


export type AlertProps = Omit<TagProps<"div">, "content" | "title" | "direction"> & {
    title?: useBreakpointPropsType<string | ReactElement>;
    direction?: useBreakpointPropsType<"row" | "column">;
    variant?: useBreakpointPropsType<UseColorTemplateType>;
    color?: useBreakpointPropsType<UseColorTemplateColor>;
    icon?: useBreakpointPropsType<"info" | "warning" | "success" | "error" | false | ReactElement>;
    onClose?: React.DOMAttributes<"button">['onClick'];
}

export type AlertMesssageType = string | ReactElement | AlertProps

const Alert = ({ children, ...rest }: AlertProps) => {
    let [{
        title,
        variant,
        icon,
        color,
        direction,
        slotProps,
        onClose,
        ..._props
    }] = useInterface<any>("Alert", rest, {
        variant: "fill"
    })
    color ??= "default"
    direction ??= "row"

    const _p: any = {}
    if (title) _p.title = title
    if (variant) _p.variant = variant
    if (icon) _p.icon = icon
    if (color) _p.color = color
    if (direction) _p.direction = direction

    const p: any = useBreakpointProps(_p)

    title = p.title
    variant = p.variant
    icon = p.icon
    color = p.color
    direction = p.direction

    let isRow = direction === 'row'


    const template = useColorTemplate(color, variant)

    let iconsx = {
        fontSize: isRow ? 22 : 40,
        color: color === 'default' ? "text.primary" : template.primary.color
    }

    const icons: any = {
        "info": <InfoIcon sx={iconsx} />,
        "warning": <WarningIcon sx={iconsx} />,
        "success": <SuccessIcon sx={iconsx} />,
        "danger": <ErrorIcon sx={iconsx} />
    }

    let _icon = icons[icon] || icons[color]

    return (
        <Tag
            {..._props}
            baseClass="alert"
            sxr={{
                justifyContent: "flex-start",
                position: "relative",
                radius: 1,
                px: isRow ? (_icon ? .5 : 2) : 3,
                py: isRow ? .5 : 3,
                flexDirection: "column",
                display: 'flex',
                ..._props?.sx
            }}
            {...template.primary}
        >
            {
                onClose && <IconButton
                    color={color}
                    variant={variant === 'fill' ? "fill" : "text"}
                    size={25}
                    sx={{
                        position: "absolute",
                        top: 5,
                        right: 5
                    }}
                    onClick={onClose}
                    className="alert-close-button"
                >
                    <IconClose fontSize={18} />
                </IconButton>
            }
            <Tag
                sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: direction,
                    alignItems: isRow ? "flex-start" : "center"
                }}
                baseClass="alert-container"
            >
                {
                    _icon && <Tag
                        baseClass="alert-icon"
                        sxr={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: isRow ? .5 : 0,
                            "& svg": {
                                color: template.primary.color
                            }
                        }}
                    >
                        {_icon}
                    </Tag>
                }
                <Tag
                    baseClass="alert-content"
                    sxr={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        color: template.primary.color,
                        textAlign: isRow ? "left" : "center",
                        gap: isRow ? 0 : 1
                    }}
                >
                    {title && <>
                        {
                            isValidElement(title) ? <Tag className="alert-title">{title}</Tag> : <Text
                                className="alert-titles"
                                variant="text"
                                sx={{
                                    fontWeight: 500,
                                    color: template.primary.color
                                }}
                            >{title}</Text>
                        }
                    </>}
                    <Tag
                        sxr={{
                            font: "button",
                        }}
                    >
                        {children}
                    </Tag>
                </Tag>
            </Tag>
        </Tag>
    )
}

const ActionAlert = (props: UseAlerProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const alert = useAlert({
        ...props,
        slotProps: {
            ...props.slotProps,
            modal: {
                ...props.slotProps?.modal,
                slotProps: {
                    ...props.slotProps?.modal?.slotProps,
                    layer: {
                        ...props.slotProps?.modal?.slotProps?.layer,
                        portal: {
                            ...props.slotProps?.modal?.slotProps?.layer?.portal,
                            container: ref.current || undefined
                        }
                    }
                }
            }
        }
    })

    useEffect(() => {
        if (props.open) {
            alert.open()
        } else {
            alert.close()
        }
    }, [props.open])
    return <Tag ref={ref}></Tag>
}

Alert.confirm = (props: UseAlerProps) => {
    const a = Renderar.render(ActionAlert as any, {
        open: true,
        ...props,
        slotProps: {
            ...props.slotProps,
            modal: {
                ...props.slotProps?.modal,
                onClosed: () => {
                    a.unrender()
                    if (props?.slotProps?.modal?.onClosed) {
                        props.slotProps?.modal?.onClosed()
                    }
                },
            }
        },
    })

    return {
        open: () => {
            a.updateProps({ open: true })
        },
        close: () => {
            a.updateProps({ open: false })
        },
    }
}

export default Alert