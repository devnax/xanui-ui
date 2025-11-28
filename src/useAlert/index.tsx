
import { Tag, TransitionVariantTypes } from "@xanui/core"
import Button, { ButtonProps } from "../Button";
import useModal, { UseModalOption } from "../useModal";
import Alert, { AlertProps } from "../Alert";
import React from "react";

export type UseAlertContentProps = {
    open: () => void;
    close: () => void;
    loading: (is: boolean) => void;
    isLoading: () => boolean;
}

export type UseAlertContent = React.ReactElement | ((props: UseAlertContentProps) => React.ReactElement)

export type UseAlerOption = Omit<AlertProps, 'children' | 'onClose' | 'variant' | "size"> & {
    content: string | UseAlertContent,
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
    transition?: TransitionVariantTypes;
    blurMode?: UseModalOption['blurMode'];
    slotProps?: {
        modal?: UseModalOption['slotProps']
        okButton?: Omit<ButtonProps, "children">;
        closeButton?: Omit<ButtonProps, "children">;
    }
}


const useAlert = (option: UseAlerOption) => {
    const [loading, setLoading] = React.useState(false)
    let {
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
    } = option

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

    const modal = useModal(<Alert
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
        {typeof content === "function" ? content({
            open: () => modal.open(),
            close: () => modal.close(),
            loading: (is: boolean) => setLoading(is),
            isLoading: () => loading
        }) : content}
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
                    setLoading(true)
                    onCancel && await onCancel()
                    setLoading(false)
                    modal.close()
                }}
            >{cancelButtonText || "Close"}</Button>}
            <Button
                loading={loading}
                color={okcolor}
                variant="fill"
                {...slotProps?.okButton}

                onClick={async () => {
                    setLoading(true)
                    onConfirm && await onConfirm()
                    setLoading(false)
                    modal.close()
                }}
            >{okButtonText || "OK"}</Button>
        </Tag>
    </Alert>, {
        ...slotProps?.modal,
        size: sizes[size] || size,
        blur: 40,
        blurMode: blurMode || "transparent",
        transition: transition || "zoom",
        onClickOutside: async () => {
            if (clickOutsideToClose && !loading) {
                setLoading(true)
                onCancel && await onCancel()
                setLoading(false)
                modal.close()
            }
        }
    })

    return {
        ...modal,
        loading: (is: boolean) => setLoading(is),
        isLoading: () => loading
    }
}

export default useAlert