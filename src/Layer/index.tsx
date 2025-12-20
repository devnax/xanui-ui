import { ReactNode, useEffect, useState } from 'react'
import { Tag, TagProps, useBreakpointProps, useBreakpointPropsType, useInterface, TransitionProps, Transition } from "@xanui/core"
import useBlurCss from '../useBlurCss';
import { Renderar } from "@xanui/core";
import ClickOutside, { ClickOutsideProps } from '../ClickOutside';

export type LayerProps = {
    open: boolean;
    children: ReactNode;
    transition?: TransitionProps['variant'];
    zIndex?: number;
    blur?: useBreakpointPropsType<number>
    blurMode?: useBreakpointPropsType<"blur" | "transparent">
    onClickOutside?: () => void;
    onOpen?: Function;
    onOpened?: Function;
    onClose?: Function;
    onClosed?: Function;
    slotProps?: {
        root?: Omit<TagProps<"div">, "children">;
        transition?: Omit<TransitionProps, "children" | "open" | "variant" | "onClose" | "onClosed" | "onOpen" | "onOpened">;
        content?: Omit<TagProps<"div">, "children">;
        clickOutside?: Omit<ClickOutsideProps, "children">;
    }
}

const Layer = ({ children, open, ...props }: LayerProps) => {
    let [{
        onClickOutside,
        placement,
        transition,
        zIndex,
        blur,
        blurMode,
        onOpen,
        onOpened,
        onClose,
        onClosed,
        slotProps
    }] = useInterface<any>("Layer", props, {})

    const _p: any = {}
    if (blur) _p.blur = blur
    if (blurMode) _p.blurMode = blurMode
    const p: any = useBreakpointProps(_p)

    blur = p.blur
    blurMode = p.blurMode

    const [closed, setClosed] = useState(!open)
    placement = placement || "bottom-left"
    const blurCss = blur ? useBlurCss(blur, blurMode) : {}

    useEffect(() => {
        if (closed && open) {
            setClosed(false)
        }
    }, [open])

    if (closed) return <></>
    let duration = slotProps?.transition?.duration || 300
    let delay = slotProps?.transition?.delay || 0

    return (
        <Transition
            duration={duration}
            delay={delay}
            easing="easeOut"
            variant={"fade"}
            open={open}
        >
            <Tag
                baseClass="layer"
                {...slotProps?.root}
                sxr={{
                    ...slotProps?.root?.sx,
                    position: "fixed",
                    zIndex: 1500 + (zIndex || 0),
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    ...blurCss
                }}
            >
                <ClickOutside
                    {...slotProps?.clickOutside}
                    onClickOutside={onClickOutside || (() => { })}
                >
                    <Transition
                        duration={duration}
                        delay={delay}
                        easing="easeOut"
                        variant={transition || "zoomOver"}
                        {...slotProps?.transition}
                        open={open}
                        onOpen={onOpen}
                        onOpened={onOpened}
                        onClose={onClose}
                        onClosed={() => {
                            setClosed(true)
                            onClosed && onClosed()
                        }}
                    >
                        {children}
                    </Transition>
                </ClickOutside>
            </Tag>
        </Transition>
    )
}


Layer.open = (children: LayerProps['children'], props?: Partial<Omit<LayerProps, 'children'>>) => {
    const l = Renderar.render(Layer as any, {
        open: true,
        ...props,
        children,
        onClosed: () => {
            Renderar.unrender(Layer as any)
            if (props?.onClosed) {
                props.onClosed()
            }
        }
    })
    return {
        open: () => {
            l.updateProps({ open: true })
        },
        close: () => {
            l.updateProps({ open: false })
        },
    }
}
Layer.close = () => {
    Renderar.unrender(Layer as any)
}
export default Layer