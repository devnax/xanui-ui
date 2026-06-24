"use client";
import React from "react";
import {
  Tag,
  TagProps,
  TagComponentType,
  useBreakpointProps,
  useThemeComponent,
} from "@xanui/core";

export type CardProps<T extends TagComponentType = "div"> = TagProps<T> & {
  variant?: "outline" | "fill" | false;
};

const Card = React.forwardRef(
  <T extends TagComponentType = "div">(
    { children, ...rest }: CardProps<T>,
    ref: React.Ref<any>,
  ) => {
    let [{ variant, ...props }] = useThemeComponent<any>("Card", rest, {});

    const _p: any = {};
    if (variant !== undefined) _p.variant = variant;
    const p: any = useBreakpointProps(_p);
    variant = p.variant ?? "fill";

    const variantSx: any = {
      outline: {
        border: "1px solid",
        borderColor: "divider.primary",
      },
      fill: {
        bgcolor: "paper.primary",
      },
    };

    return (
      <Tag
        {...props}
        baseClass="card"
        ref={ref}
        sxr={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          radius: 1,
          overflow: "hidden",
          p: 1,
          ...(variant ? variantSx[variant] : {}),
        }}
      >
        {children}
      </Tag>
    );
  },
);

export default Card;
