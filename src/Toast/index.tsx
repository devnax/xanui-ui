import { createRoot } from "react-dom/client";
import { appRootElement, UseColorTemplateColor, UseColorTemplateType, Transition, useBreakpointPropsType } from "@xanui/core";
import React, { ReactElement } from "react";
import Alert, { AlertProps } from "../Alert";
import Scrollbar from "../Scrollbar";



type PlacementType = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"

export type useToastContentProps = {
    show: () => string;
    hide: () => void;
}

export type UseTastContent = string | ReactElement | ((props: useToastContentProps) => ReactElement)

export type UseToastProps = {
    title?: useBreakpointPropsType<string | ReactElement>;
    content?: AlertProps['children'];
    variant?: useBreakpointPropsType<UseColorTemplateType>;
    color?: useBreakpointPropsType<UseColorTemplateColor>;
    icon?: useBreakpointPropsType<"info" | "warning" | "success" | "error" | false | ReactElement>;
    placement?: PlacementType;
    closeable?: useBreakpointPropsType<boolean>;
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
    const { placement = "bottom-right", content, closeable, onClosed, ...rest } = props || {}
    const { transition } = formatPacement(placement)

    return (<Transition
        open={open}
        variant={transition}
        onClosed={() => {
            onClosed()
        }}
        onOpened={() => {
            setTimer(setTimeout(() => {
                setOpen(false)
            }, 6000))
        }}
    >
        <Alert
            shadow={2}
            variant="fill"
            color="brand"
            {...rest as any}
            mode="item"
            mb={1}
            onMouseEnter={() => {
                clearTimeout(timer)
            }}
            onMouseLeave={() => {
                setTimer(setTimeout(() => {
                    setOpen(false)
                }, 6000))
            }}
            onClose={closeable ? () => {
                setOpen(false)
            } : undefined}
        >{content}</Alert>
    </Transition>)
}

const Toast = (props?: string | UseToastProps) => {
    if (typeof props === "string") {
        props = { content: props }
    }
    let { placement = "bottom-right", content, closeable, ...rest } = props || {}
    const { sx } = formatPacement(placement)

    const wrapperContainerClassName = `xui-toast-container-${placement}`
    const wrapperClassName = `xui-toast-list-${placement}`
    let wrapperEle = document.querySelector(`.${wrapperContainerClassName}`) as HTMLElement
    if (!wrapperEle) {
        wrapperEle = document.createElement('div')
        wrapperEle.className = wrapperContainerClassName
        const appRoot = appRootElement()
        appRoot.appendChild(wrapperEle)

        const wrapperRoot = createRoot(wrapperEle);
        wrapperRoot.render(<Scrollbar
            p={1}
            overflow="hidden"
            className={wrapperClassName}
            sx={{
                position: "fixed",
                zIndex: 99999999,
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "column",
                width: 320,
                height: "auto",
                maxHeight: "100vh",
                ...sx
            }}
        >

        </Scrollbar>);
    }

    setTimeout(() => {
        const wrapper = document.querySelector(`.${wrapperClassName}`) as HTMLElement;
        const div = document.createElement('div');
        wrapper.appendChild(div);
        const root = createRoot(div);

        root.render(<ToastView
            placement={placement}
            content={content}
            closeable={closeable}
            {...rest}
            onClosed={() => {
                root.unmount();
                wrapper.removeChild(div);
                if (wrapper.children.length === 0) {
                    const container = document.querySelector(`.${wrapperContainerClassName}`) as HTMLElement
                    if (container) {
                        appRootElement().removeChild(container);
                    }
                }
            }}
        />);
    }, 5);

}

export default Toast;