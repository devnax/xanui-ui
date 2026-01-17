"use client";

import { UseColorTemplateColor, UseColorTemplateType, Transition, useBreakpointPropsType, Renderar } from "@xanui/core";
import React, { ReactElement } from "react";
import Alert, { AlertProps } from "../Alert";
import Scrollbar from "../Scrollbar";

type PlacementType = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"

export type UseToastProps = {
    title?: useBreakpointPropsType<string | ReactElement>;
    content?: AlertProps['children'];
    variant?: useBreakpointPropsType<UseColorTemplateType>;
    color?: useBreakpointPropsType<UseColorTemplateColor>;
    icon?: useBreakpointPropsType<"info" | "warning" | "success" | "error" | false | ReactElement>;
    placement?: PlacementType;
    closeable?: useBreakpointPropsType<boolean>;
    autoColose?: boolean;
    autoColoseDelay?: number;
    pauseOnHover?: boolean;
}


const formatPacement = (placement: PlacementType) => {
    let sx: any = {}
    let transition: any = ""
    switch (placement) {
        case "top-left":
            sx = {
                top: 0,
                left: 0
            }
            transition = "fadeRight"
            break;
        case "top-right":
            sx = {
                top: 0,
                right: 0
            }
            transition = "fadeLeft"
            break;
        case "top-center":
            sx = {
                top: 0,
                left: "50%",
                transform: "translateX(-50%)"
            }
            transition = "fadeDown"
            break;
        case "bottom-right":
            sx = {
                bottom: 0,
                right: 0
            }
            transition = "fadeLeft"
            break;
        case "bottom-left":
            sx = {
                bottom: 0,
                left: 0
            }
            transition = "fadeRight"
            break;
        case "bottom-center":
            sx = {
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)"
            }
            transition = "fadeUp"
            break;
    }
    return { sx, transition }
}

const ToastView = (props: UseToastProps & { onClosed: () => void }) => {
    const [open, setOpen] = React.useState(true)
    const [timer, setTimer] = React.useState<any>(null)
    const {
        placement = "bottom-right",
        content,
        closeable,
        onClosed,
        autoColose = true,
        pauseOnHover = true,
        autoColoseDelay = 6000,
        ...rest
    } = props || {}

    const { transition } = formatPacement(placement)

    return (<Transition
        open={open}
        variant={transition}
        onClosed={() => {
            onClosed()
        }}
        onOpened={() => {
            if (autoColose) {
                setTimer(setTimeout(() => {
                    setOpen(false)
                }, autoColoseDelay))
            }
        }}
    >
        <Alert
            variant="fill"
            color="brand"
            {...rest as any}
            mode="item"
            mb={1}
            onMouseEnter={() => {
                (autoColose && pauseOnHover) && clearTimeout(timer)
            }}
            onMouseLeave={() => {
                if (autoColose && pauseOnHover) {
                    setTimer(setTimeout(() => {
                        setOpen(false)
                    }, autoColoseDelay))
                }
            }}
            onClose={closeable ? () => setOpen(false) : undefined}
        >{content}</Alert>
    </Transition>)
}

const State: Record<PlacementType, UseToastProps[]> = {
    // "top-left": [],
    // "top-center": [],
    // "top-right": [],
    // "bottom-left": [],
    // "bottom-center": [],
    // "bottom-right": []
} as any

const RenderToasts = () => {
    let views = []

    for (let placement in State) {
        const items = (State as any)[placement]
        const { sx } = formatPacement(placement as any)
        if (!items.length) continue;
        views.push(
            <Scrollbar
                key={`toast-render-${placement}`}
                overflow="hidden"
                p={1}
                sx={{
                    position: "fixed",
                    zIndex: 99999999,
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "column",
                    width: 280,
                    height: "auto",
                    maxHeight: "100vh",
                    ...sx
                }}
            >

                {items.map((itemprops: UseToastProps, index: number) => {
                    return (
                        <ToastView
                            key={`toast-view-${index}`}
                            {...itemprops}
                            onClosed={() => {
                                let _items = items.splice(index, 1)
                                if (!_items.length) {
                                    delete (State as any)[placement]
                                } else {
                                    (State as any)[placement] = _items
                                }
                                if (!Object.keys(State).length) {
                                    Renderar.unrender(RenderToasts)
                                }
                            }}
                        />
                    )
                })}
            </Scrollbar >
        )
    }

    return views
}

const Toast = (props?: UseToastProps['content'] | UseToastProps) => {
    props = React.isValidElement(props) ? { content: props } : props
    let { placement = "bottom-right" } = (props || {}) as UseToastProps

    if (Object.keys(State).length) {
        if (!State[placement]) State[placement] = []
        State[placement].push(props as any)
        Renderar.updateProps(RenderToasts, {})
    } else {
        if (!State[placement]) State[placement] = []
        State[placement].push(props as any)
        Renderar.render(RenderToasts)
    }
}

export default Toast;