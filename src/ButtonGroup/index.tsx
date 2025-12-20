
import React, { ReactElement, Children, cloneElement } from 'react';
import { Tag, TagProps, TagComponentType, useInterface, UseColorTemplateColor, UseColorTemplateType, useBreakpointPropsType, useBreakpointProps } from '@xanui/core';
import { ButtonProps } from '../Button';

export type ButtonGroupProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, 'children' | "size"> & {
    children?: ReactElement<ButtonProps> | ReactElement<ButtonProps>[];
    color?: useBreakpointPropsType<UseColorTemplateColor>;
    variant?: useBreakpointPropsType<UseColorTemplateType>;
    size?: useBreakpointPropsType<"small" | "medium" | "large">;
}

const ButtonGroup = React.forwardRef(<T extends TagComponentType = "div">({ children, ...rest }: ButtonGroupProps<T>, ref: React.Ref<any>) => {
    let [{ color, variant, size, ...props }] = useInterface<any>("ButtonGroup", rest, {
        size: "medium",
        variant: "outline",
        color: "default"
    })
    const _p: any = {}
    if (color) _p.color = color
    const p: any = useBreakpointProps(_p)
    color = p.color

    const sizes: any = {
        small: {
            height: 40,
        },
        medium: {
            height: 46,
        },
        large: {
            height: 52,
        }
    }

    let borderColor = color === 'default' ? 'divider.secondary' : `${color}.secondary`

    return (
        <Tag
            {...props}
            {...sizes[size]}
            sxr={{
                display: "inline-flex",
                flexWrap: "nowrap",
                overflow: "hidden",
                radius: 1,
                border: "1px solid",
                borderColor: borderColor,
                '& button, & button:hover': {
                    borderRight: "1px solid",
                    borderColor: borderColor
                },
                "& button:last-child, & button:last-child:hover": {
                    borderRight: "none"
                }
            }}
            baseClass='button-group'
            ref={ref}
        >
            {Children.map(children, (child: any) => {
                return cloneElement(child, {
                    flex: "0 0 auto",
                    color,
                    variant,
                    size,
                    corner: "squar",
                })
            })}
        </Tag>
    )
})

export default ButtonGroup


