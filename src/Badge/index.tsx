import React, { ReactElement } from 'react';
import { Tag, TagProps, TagComponentType, Transition, useInterface, UseColorTemplateColor, useColorTemplate, useBreakpointPropsType, useBreakpointProps, TransitionProps } from '@xanui/core';

export type BadgeProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, "baseClass" | "content"> & {
    content?: useBreakpointPropsType<number | ReactElement>;
    color?: useBreakpointPropsType<UseColorTemplateColor>;
    placement?: useBreakpointPropsType<"left-top" | "left-bottom" | "right-top" | "right-bottom">;
    visible?: useBreakpointPropsType<boolean>;
    disableTransition?: boolean;
    disableSpace?: boolean;
    slotProps?: {
        transition?: Omit<TransitionProps, "open">;
        content?: Omit<TagProps<"span">, "children">;
    },
    refs?: {
        content?: React.Ref<any>;
        transition?: React.Ref<any>;
    };
}

const Badge = React.forwardRef(<T extends TagComponentType = "div">({ children, content, refs, ...rest }: BadgeProps<T>, ref: React.Ref<any>) => {
    let [{ color, placement, visible, slotProps, disableTransition, disableSpace, ...props }] = useInterface<any>("Badge", rest, {})
    color ??= "danger"
    visible ??= true
    placement ??= "right-top"
    disableTransition ??= false
    disableSpace ??= false

    const _p: any = {}

    _p.content = content
    _p.color = color
    _p.placement = placement
    _p.visible = visible
    _p.disableTransition = disableTransition ?? false

    const p: any = useBreakpointProps(_p)

    content = p.content
    color = p.color
    placement = p.placement
    visible = p.visible
    disableTransition = p.disableTransition

    const isReactElement = React.isValidElement(content);

    let template: any = useColorTemplate(color, "fill")
    let _css: any = {
        position: "absolute",
    }

    let translate = ''

    switch (placement) {
        case "right-top":
            _css.top = 0;
            _css.right = 0;
            if (!disableSpace) {
                translate = "translate(50%, -50%)";
            }
            break;
        case "right-bottom":
            _css.bottom = 0;
            _css.right = 0;
            if (!disableSpace) {
                translate = "translate(50%, 50%)";
            }
            break;
        case "left-top":
            _css.top = 0;
            _css.left = 0;
            if (!disableSpace) {
                translate = "translate(-50%, -50%)";
            }
            break;
        case "left-bottom":
            _css.bottom = 0;
            _css.left = 0;
            if (!disableSpace) {
                translate = "translate(-50%, 50%)";
            }
            break;
    }

    if (disableTransition) {
        _css.transform = translate
    }

    if (!isReactElement) {
        if (content !== undefined) {
            _css.minWidth = 16
            _css.height = 16
            _css.p = .8
            _css.px = .4
        } else {
            _css.width = 8
            _css.height = 8
        }
    } else {
        template = {}
    }

    const _badge = <Tag
        {...slotProps?.content}
        ref={refs?.content}
        component='span'
        baseClass='badge-content'
        sxr={{
            position: "absolute",
            zIndex: 1,
            radius: 2,
            display: 'flex',
            justifyContent: "center",
            alignItems: 'center',
            fontWeight: 500,
            fontSize: 11,
            userSelect: "none",
            pointerEvents: "none",
            lineHeight: 1,
        }}
        {...template.primary}
        {..._css}
    >
        {typeof content === 'number' ? (content >= 100 ? "99+" : content) : content}
    </Tag>

    return (
        <Tag
            {...props}
            position="relative"
            display="inline-block"
            baseClass='badge'
            ref={ref}
        >
            {
                !disableTransition ? (<Transition
                    open={content !== undefined && visible}
                    {...slotProps?.transition}
                    variant={() => {
                        return {
                            from: {
                                opacity: 0,
                                transform: `scale(0) ${translate}`.trim(),
                            },
                            to: {
                                opacity: 1,
                                transform: `scale(1) ${translate}`.trim(),
                            },
                        }
                    }}
                    ref={refs?.transition}
                >
                    {_badge}
                </Transition>) : <>{(content !== undefined && visible) && _badge}</>
            }

            {children}
        </Tag>
    )
})

export default Badge

