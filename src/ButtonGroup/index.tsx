"use client";
import React, { ReactElement, Children, cloneElement } from "react";
import {
  Tag,
  TagProps,
  TagComponentType,
  useThemeComponent,
  UseColorTemplateColor,
  UseColorTemplateType,
  useBreakpointPropsType,
  useBreakpointProps,
} from "@xanui/core";
import { ButtonProps } from "../Button";

export type ButtonGroupProps<T extends TagComponentType = "div"> = Omit<
  TagProps<T>,
  "children" | "size"
> & {
  children?: ReactElement<ButtonProps> | ReactElement<ButtonProps>[];
  color?: useBreakpointPropsType<UseColorTemplateColor>;
  variant?: useBreakpointPropsType<UseColorTemplateType>;
  size?: useBreakpointPropsType<"xs" | "sm" | "md" | "lg" | "xl">;
};

const ButtonGroup = React.forwardRef(
  <T extends TagComponentType = "div">(
    { children, ...rest }: ButtonGroupProps<T>,
    ref: React.Ref<any>,
  ) => {
    let [{ color, variant, size, ...props }] = useThemeComponent<any>(
      "ButtonGroup",
      rest,
      {
        size: "xs",
        variant: "outline",
        color: "default",
      },
    );
    const _p: any = {};
    if (color) _p.color = color;

    const p: any = useBreakpointProps(_p);
    color = p.color;
    if (size) _p.size = size;
    if (variant) _p.variant = variant;

    size = p.size ?? "md";
    variant = p.variant ?? "outline";
    color = p.color ?? "default";

    const sizes: any = {
      xs: {
        height: 30,
      },

      sm: {
        height: 38,
      },

      md: {
        height: 46,
      },

      lg: {
        height: 52,
      },

      xl: {
        height: 60,
      },
    };

    let borderColor = `${color}.divider`;

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
          "& > button, & > button:hover": {
            border: 0,
            borderRight: "1px solid",
            borderColor: borderColor,
          },
          "& > button:last-child, & > button:last-child:hover": {
            borderRight: "none",
          },
        }}
        baseClass="button-group"
        ref={ref}
      >
        {Children.map(children, (child: any) => {
          return cloneElement(child, {
            flex: "0 0 auto",
            minWidth: 0,
            color,
            variant,
            size,
            corner: "square",
          });
        })}
      </Tag>
    );
  },
);

export default ButtonGroup;
