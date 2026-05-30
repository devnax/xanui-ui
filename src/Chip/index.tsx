"use client";
import React, { ReactElement } from "react";
import {
  Tag,
  TagProps,
  TagComponentType,
  useThemeComponent,
  useColorTemplate,
  UseColorTemplateColor,
  UseColorTemplateType,
  useBreakpointProps,
  useBreakpointPropsType,
} from "@xanui/core";
import useCorner, { UseCornerTypes } from "../useCorner";

export type ChipProps<T extends TagComponentType = "div"> = Omit<
  TagProps<T>,
  "color" | "children" | "size"
> & {
  label: useBreakpointPropsType<string | ReactElement>;
  startIcon?: useBreakpointPropsType<ReactElement>;
  endIcon?: useBreakpointPropsType<ReactElement>;
  color?: useBreakpointPropsType<UseColorTemplateColor>;
  variant?: useBreakpointPropsType<UseColorTemplateType>;
  corner?: useBreakpointPropsType<UseCornerTypes>;
  size?: useBreakpointPropsType<"xs" | "sm" | "md" | "lg" | "xl">;

  slotProps?: {
    label?: Omit<TagProps<"div">, "children">;
  };
};

const Chip = React.forwardRef(
  <T extends TagComponentType = "div">(
    props: ChipProps<T>,
    ref: React.Ref<any>,
  ) => {
    let [
      {
        label,
        variant,
        startIcon,
        endIcon,
        color,
        corner,
        size,
        slotProps,
        ...rest
      },
    ] = useThemeComponent<any>("Chip", props, {});
    const _p: any = {};
    if (label) _p.label = label;
    if (startIcon) _p.startIcon = startIcon;
    if (endIcon) _p.endIcon = endIcon;
    if (color) _p.color = color;
    if (variant) _p.variant = variant;
    if (corner) _p.corner = corner;
    if (size) _p.size = size;
    if (slotProps) _p.slotProps = slotProps;
    const p: any = useBreakpointProps(_p);

    label = p.label;
    startIcon = p.startIcon;
    endIcon = p.endIcon;
    color = p.color || "primary";
    variant = p.variant || "fill";
    corner = p.corner || "circle";
    size = p.size || "md";
    slotProps = p.slotProps;
    rest.sx = (rest as any).sx || {};

    const cornerCss = useCorner(corner);
    const template = useColorTemplate(color, variant);

    const sizes: any = {
      xs: {
        height: 20,
        gap: 0.25,
        px: startIcon || endIcon ? 0.5 : 0.75,
        fontSize: "xs",
      },

      sm: {
        height: 24,
        gap: 0.5,
        px: startIcon || endIcon ? 0.75 : 1,
        fontSize: "xs",
      },

      md: {
        height: 32,
        gap: 0.75,
        px: startIcon || endIcon ? 0.8 : 1.5,
        fontSize: "sm",
      },

      lg: {
        height: 40,
        gap: 1,
        px: startIcon || endIcon ? 1 : 1.75,
        fontSize: "md",
      },

      xl: {
        height: 48,
        gap: 1.25,
        px: startIcon || endIcon ? 1.25 : 2,
        fontSize: "lg",
      },
    };

    const _size = sizes[size as any] || sizes.md;

    return (
      <Tag
        {...cornerCss}
        {...template.main}
        {..._size}
        {...rest}
        sxr={{
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
          transition: "background .3s",
          overflow: "hidden",

          "&  > *": {
            flex: "0 0 auto",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          },
        }}
        baseClass="chip"
        ref={ref}
      >
        {startIcon}
        <Tag
          {...slotProps?.label}
          baseClass="chip-label"
          sxr={{
            alignItems: "center",
            flexBox: true,
            color: template.main.color + "!important",
          }}
        >
          {label}
        </Tag>
        {endIcon}
      </Tag>
    );
  },
);

export default Chip;
