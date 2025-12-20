
import React, { ReactElement, Children, cloneElement } from 'react';
import { Tag, TagProps, TagComponentType, useInterface, UseColorTemplateColor, UseColorTemplateType, useColorTemplate, useBreakpointPropsType, useBreakpointProps } from '@xanui/core';
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

    const template = useColorTemplate(color, "outline")

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

    return (
        <Tag
            {...props}
            {...sizes[size]}
            sxr={{
                display: "inline-flex",
                overflow: "hidden",
                radius: 1,
                border: 1,
                borderColor: template.primary.borderColor,
                '& button': {
                    borderRight: 1,
                    borderColor: template.primary.borderColor
                },
                // '& button:not(:last-of-type)': {
                //     borderTopRightRadius: 0,
                //     borderBottomRightRadius: 0,
                //     borderRight: 1,
                //     borderColor: template.primary.borderColor
                // },
                // '& button:not(:first-of-type)': {
                //     borderTopLeftRadius: 0,
                //     borderBottomLeftRadius: 0,
                //     borderLeft: 0,
                //     borderColor: template.primary.borderColor
                // }
            }}
            baseClass='button-group'
            ref={ref}
        >
            {Children.map(children, (child: any) => {
                return cloneElement(child, {
                    flex: 1,
                    color,
                    variant,
                    size,
                    corner: "squar",
                    border: 0
                })
            })}
        </Tag>
    )
})

export default ButtonGroup


