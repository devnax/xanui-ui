"use client";
import { Tag, TagProps, useBreakpointProps, useColorTemplate, useInterface, useBreakpointPropsType, Renderar, UseColorTemplateType, UseColorTemplateColor, UseTransitionVariantTypes } from "@xanui/core"
import React, { isValidElement, ReactElement } from "react"
import Text from "../Text"
import InfoIcon from '@xanui/icons/Info';
import WarningIcon from '@xanui/icons/Warning';
import SuccessIcon from '@xanui/icons/CheckCircle';
import ErrorIcon from '@xanui/icons/Cancel';
import IconClose from '@xanui/icons/Close';
import IconButton from "../IconButton";
import Modal, { ModalProps } from "../Modal";
import Button, { ButtonProps } from "../Button";

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

export type ConfirmAlertProps = Omit<AlertProps, 'children' | 'onClose' | 'variant' | "size"> & {
    open: boolean;
    loading: boolean;
    content: string | ReactElement,
    size?: "small" | "medium" | "large" | number;
    closeButton?: boolean;
    clickOutsideToClose?: boolean;
    okButtonText?: string;
    cancelButtonText?: string;
    hideOkButton?: boolean;
    hideCancelButton?: boolean;
    buttonPlacement?: "start" | "end" | "between" | "full";
    variant?: "text" | "fill"
    onConfirm?: () => Promise<void> | void;
    onCancel?: () => Promise<void> | void;
    transition?: UseTransitionVariantTypes;
    blurMode?: ModalProps['blurMode'];
    slotProps?: {
        modal?: Omit<ModalProps, 'open' | "children">;
        okButton?: Omit<ButtonProps, "children">;
        closeButton?: Omit<ButtonProps, "children">;
    }
}


const ConfirmAlert = (props: ConfirmAlertProps) => {
    let {
        open,
        loading,
        content,
        size,
        color,
        direction,
        variant,
        closeButton,
        clickOutsideToClose,
        okButtonText,
        cancelButtonText,
        hideOkButton,
        hideCancelButton,
        buttonPlacement,
        onConfirm,
        onCancel,
        transition,
        blurMode,
        slotProps,
        ...rest
    } = props

    hideOkButton ??= false
    hideCancelButton ??= false

    size ??= "small"
    color ??= 'default'
    variant ??= "text"
    direction ??= "column"
    buttonPlacement ??= "end"
    let sx: any = {};

    switch (buttonPlacement) {
        case "start":
            sx.justifyContent = 'flex-start'
            break;
        case "end":
            sx.justifyContent = 'flex-end'
            break;
        case "between":
            sx.justifyContent = 'space-between'
            break;
        case "full":
            sx = {
                "& button": {
                    flex: 1
                }
            }
            break;
    }

    let sizes: any = {
        small: 320,
        medium: 400,
        large: 600
    }

    let okcolor = color
    let closecolor = color
    if (color === 'default') {
        okcolor = 'brand'
        closecolor = 'default'
        variant = 'text'
    } else {
        if (variant === 'fill') {
            okcolor = 'default'
            closecolor = 'default'
        } else {
            okcolor = color
            closecolor = 'default'
        }
    }

    return (<Modal
        open={open}
        {...slotProps?.modal}
        size={sizes[size] || size}
        blur={40}
        blurMode={blurMode || "transparent"}
        transition={transition || "zoom"}
        onClickOutside={async () => {
            if (clickOutsideToClose && !loading) {
                onCancel && await onCancel()
            }
        }}
    >
        <Alert
            direction={direction}
            sx={{
                px: 2,
                py: 1,
                pt: direction === 'row' ? 1 : 2
            }}
            color={color}
            variant={variant}
            onClose={closeButton ? close : undefined}
            {...rest}
        >
            {content}
            <Tag
                sxr={{
                    display: "flex",
                    gap: 1,
                    pt: 4,
                    flexDirection: "row",
                    ...sx,
                }}
            >
                {!hideCancelButton && <Button
                    disabled={loading}
                    color={closecolor}
                    variant="fill"
                    {...slotProps?.closeButton}
                    onClick={async () => {
                        onCancel && await onCancel()
                    }}
                >{cancelButtonText || "Close"}</Button>}
                <Button
                    loading={loading}
                    color={okcolor}
                    variant="fill"
                    {...slotProps?.okButton}

                    onClick={async () => {
                        onConfirm && await onConfirm()
                    }}
                >{okButtonText || "OK"}</Button>
            </Tag>
        </Alert>
    </Modal>)
}


Alert.confirm = ({ onConfirm, onCancel, ...props }: Omit<ConfirmAlertProps, "open" | "loading">) => {
    const confirm = Renderar.render(ConfirmAlert as any, {
        ...props,
        open: true,
        loading: false,
        onConfirm: async () => {
            if (onConfirm) {
                confirm.updateProps({ loading: true })
                if (onConfirm) await onConfirm()
                confirm.updateProps({ open: false, loading: false })
            } else {
                confirm.updateProps({ open: false })
            }
        },
        onCancel: async () => {
            if (onCancel) {
                confirm.updateProps({ loading: true })
                await onCancel()
                confirm.updateProps({ open: false, loading: false })
            } else {
                confirm.updateProps({ open: false })
            }
        },
        slotProps: {
            ...props.slotProps,
            modal: {
                ...props.slotProps?.modal,
                onClosed: () => {
                    confirm.unrender()
                    if (props?.slotProps?.modal?.onClosed) {
                        props.slotProps?.modal?.onClosed()
                    }
                },
            }
        },
    })
}

export default Alert