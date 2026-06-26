"use client";
import React from "react";
import {
  Tag,
  TagProps,
  TagComponentType,
  useThemeComponent,
  UseColorTemplateColor,
  UseColorTemplateType,
  useColorTemplate,
  useBreakpointProps,
  useBreakpointPropsType,
} from "@xanui/core";
import useCorner from "../useCorner";

export type IconButtonProps<T extends TagComponentType = "button"> = Omit<
  TagProps<T>,
  "color" | "size"
> & {
  size?: useBreakpointPropsType<number | "xs" | "sm" | "md" | "lg" | "xl">;
  color?: useBreakpointPropsType<UseColorTemplateColor>;
  variant?: useBreakpointPropsType<UseColorTemplateType>;
  corner?: useBreakpointPropsType<"square" | "rounded" | "circle">;
};

const IconButton = React.forwardRef(
  <T extends TagComponentType = "button">(
    { children, ...rest }: IconButtonProps<T>,
    ref: React.Ref<any>,
  ) => {
    rest.sx = (rest as any).sx || {};
    let [{ variant, corner, color, size, ..._props }] = useThemeComponent<any>(
      "IconButton",
      rest,
      {},
    );

    const _p: any = {};
    if (size) _p.size = size;
    if (color) _p.color = color;
    if (variant) _p.variant = variant;
    if (corner) _p.corner = corner;
    const p: any = useBreakpointProps(_p);

    size = p.size ?? "md";
    color = p.color ?? "brand";
    variant = p.variant ?? "text";
    corner = p.corner ?? "circle";

    let template = useColorTemplate(color || "primary", variant || "fill");
    const cornerCss = useCorner(corner);

    const sizes: any = {
      xs: {
        size: 24,
        iconSize: 14,
      },

      sm: {
        size: 30,
        iconSize: 16,
      },

      md: {
        size: 38,
        iconSize: 18,
      },

      lg: {
        size: 46,
        iconSize: 22,
      },

      xl: {
        size: 56,
        iconSize: 26,
      },
    };

    let iconSize: number;

    if (typeof size === "string") {
      const _size = sizes[size] || sizes.md;

      iconSize = _size.iconSize;
      size = _size.size;
    } else {
      iconSize = Math.max(14, size * 0.46);
    }

    return (
      <Tag
        component="button"
        ref={ref}
        {...cornerCss}
        {..._props}
        {...template.main}
        baseClass="icon-button"
        sxr={{
          border: 0,
          radius: size,
          height: size,
          width: size,
          cursor: "pointer",
          fontFamily: "inherit",

          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",

          lineHeight: 1,
          fontSize: iconSize,
          minWidth: size,
          minHeight: size,
          userSelect: "none",
          flexShrink: 0,
          bgcolor: "transparent",

          "& svg": {
            width: "1em",
            height: "1em",
            fontSize: "1em",
            display: "block",
            flexShrink: 0,
          },
        }}
        hover={{
          ...template.hover,
          ...((_props as any)?.hover || {}),
        }}
      >
        {children}
      </Tag>
    );
  },
);

export default IconButton;
