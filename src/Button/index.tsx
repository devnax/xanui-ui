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
import CircleProgress, { CircleProgressProps } from "../CircleProgress";
import Skeleton, { SkeletonProps } from "../Skeleton";

export type ButtonProps<T extends TagComponentType = "button"> = Omit<
  TagProps<T>,
  "color" | "size" | "direction"
> & {
  startIcon?: useBreakpointPropsType<ReactElement>;
  endIcon?: useBreakpointPropsType<ReactElement>;
  color?: useBreakpointPropsType<UseColorTemplateColor>;
  variant?: useBreakpointPropsType<UseColorTemplateType>;
  corner?: useBreakpointPropsType<"square" | "rounded" | "circle">;
  size?: useBreakpointPropsType<"xs" | "sm" | "md" | "lg" | "xl">;
  direction?: useBreakpointPropsType<"row" | "column">;
  loading?: boolean;
  skeleton?: boolean;
  slotProps?: {
    loading?: Omit<CircleProgressProps, "color" | "hideTrack" | "size">;
    skeleton?: Omit<SkeletonProps, "height" | "width" | "loading" | "children">;
  };
};

const Button = React.forwardRef(
  <T extends TagComponentType = "button">(
    { children, skeleton, ...rest }: ButtonProps<T>,
    ref: React.Ref<any>,
  ) => {
    let [
      {
        variant,
        startIcon,
        endIcon,
        color,
        corner,
        size,
        loading,
        direction,
        slotProps,
        disabled,
        ..._props
      },
    ] = useThemeComponent<any>("Button", rest, {
      variant: "fill",
      color: "primary",
      corner: "rounded",
      size: "md",
    });

    const _p: any = {};
    if (startIcon) _p.startIcon = startIcon;
    if (endIcon) _p.endIcon = endIcon;
    if (color) _p.color = color;
    if (variant) _p.variant = variant;
    if (corner) _p.corner = corner;
    if (size) _p.size = size;
    if (direction) _p.direction = direction;
    const p: any = useBreakpointProps(_p);

    startIcon = p.startIcon;
    endIcon = p.endIcon;
    color = p.color;
    variant = p.variant;
    corner = p.corner;
    size = p.size;
    direction = p.direction || "row";

    const template = useColorTemplate(color, variant);

    const sizes: any = {
      xs: {
        height: 30,
        px: startIcon || endIcon ? 0.75 : 1,
        gap: 0.25,
        fontSize: "xs",
        fontWeight: 500,
      },

      sm: {
        height: 36,
        px: startIcon || endIcon ? 1 : 1.5,
        gap: 0.5,
        fontSize: "xs",
      },

      md: {
        height: 44,
        px: startIcon || endIcon ? 1.5 : 2,
        gap: 1,
        fontSize: "sm",
      },

      lg: {
        height: 52,
        px: startIcon || endIcon ? 2 : 3,
        gap: 1,
        fontSize: "md",
      },

      xl: {
        height: 60,
        px: startIcon || endIcon ? 2.5 : 4,
        gap: 1.25,
        fontSize: "lg",
      },
    };

    const progressSizes: any = {
      xs: 16,
      sm: 20,
      md: 25,
      lg: 30,
      xl: 36,
    };

    const icon_sizes: any = {
      xs: "lg",
      sm: "xl",
      md: "h5",
      lg: "h4",
      xl: "h3",
    };

    const radiuses: any = {
      xs: 0.6,
      sm: 0.8,
      md: 1,
      lg: 1,
      xl: 1.2,
    };

    let radius: any = 0;
    if (corner === "rounded") {
      radius = radiuses[size];
    } else if (corner === "circle") {
      radius = "100%";
    }

    let _size = sizes[size as any] || {};
    if (direction === "column") {
      delete _size.height;
      _size.gap = 0.5;
      _size.py = 1;
    }

    if (skeleton) {
      return (
        <Skeleton
          {...slotProps?.skeleton}
          height={_size.height}
          animation={"wave"}
          sx={{
            ...slotProps?.skeleton?.sx,
            ..._size,
            radius,
          }}
        />
      );
    }

    return (
      <Tag
        component="button"
        baseClass="button"
        {..._props}
        sxr={{
          flexShrink: "0",
          whiteSpace: "nowrap",
          cursor: "pointer",
          display: "flex",
          textTransform: "uppercase",
          flexDirection: direction,
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          userSelect: "none",
          fontWeight: 500,
          radius,
          "&:active": {
            transform: variant !== "text" ? "scale(0.99)" : undefined,
          },
          ..._size,
          ...template.main,
        }}
        hover={{
          ...template.hover,
          ...((_props as any)?.hover || {}),
        }}
        disabled={disabled ?? loading ?? false}
        ref={ref}
      >
        {loading && (
          <Tag
            baseClass="button-loading-container"
            sxr={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircleProgress
              {...slotProps?.loading}
              color={color === "default" ? `primary` : "default"}
              size={progressSizes[size]}
              className="button-loading-progress"
            />
          </Tag>
        )}
        {startIcon && (
          <Tag
            baseClass="button-start-icon"
            component="span"
            sxr={{
              fontSize: icon_sizes[size],
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
          >
            {startIcon}
          </Tag>
        )}
        {children}
        {endIcon && (
          <Tag
            baseClass="button-end-icon"
            component="span"
            sxr={{
              fontSize: icon_sizes[size],
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
          >
            {endIcon}
          </Tag>
        )}
      </Tag>
    );
  },
);

export default Button;
