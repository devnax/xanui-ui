"use client";
import React from "react";
import {
  Tag,
  TagProps,
  TagComponentType,
  UseColorTemplateColor,
  useThemeComponent,
  useColorTemplate,
  UseColorTemplateType,
  useBreakpointProps,
  useBreakpointPropsType,
} from "@xanui/core";
import Scrollbar from "../Scrollbar";

export type TableProps<T extends TagComponentType = "table"> = Omit<
  TagProps<T>,
  "color" | "size"
> & {
  evenColor?: useBreakpointPropsType<boolean>;
  size?: useBreakpointPropsType<"xs" | "sm" | "md" | "lg" | "xl" | number>;
  color?: useBreakpointPropsType<UseColorTemplateColor>;
  variant?: useBreakpointPropsType<Omit<UseColorTemplateType, "outline">>;
  borderType?: useBreakpointPropsType<"box" | "line" | "none">;
};

const Table = React.forwardRef(
  <T extends TagComponentType = "table">(
    { children, ...props }: TableProps<T>,
    ref: React.Ref<any>,
  ) => {
    let [{ evenColor, size, color, variant, borderType, ...rest }] =
      useThemeComponent<any>("Table", props, {});
    const _p: any = {};
    if (evenColor) _p.evenColor = evenColor;
    if (size) _p.size = size;
    if (color) _p.color = color;
    if (variant) _p.variant = variant;
    if (borderType) _p.borderType = borderType;
    const p: any = useBreakpointProps(_p);
    evenColor = p.evenColor;
    size = p.size ?? "md";
    color = p.color ?? "default";
    variant = p.variant ?? "fill";
    borderType = p.borderType ?? "line";

    const main = useColorTemplate(color, variant);
    const ghost = useColorTemplate(color, "ghost");

    let sx: any = {};
    if (evenColor) {
      sx = {
        "& tbody tr:nth-child(even)": {
          bgcolor: ghost.main.bgcolor,
        },
      };
    }
    if (borderType === "box") {
      sx = {
        ...sx,
        "& tr:last-child td": {
          borderBottom: 0,
        },
        "& tr:first-child th": {
          borderTop: 0,
        },
        "& tr td:first-child, & tr th:first-child": {
          borderLeft: 0,
        },
        "& tr td:last-child, & tr th:last-child": {
          borderRight: 0,
        },
      };
    }
    const sizes: any = {
      xs: 0.4,
      sm: 0.6,
      md: 1,
      lg: 1.4,
      xl: 1.6,
    };

    const _size = typeof size === "string" ? (sizes[size] ?? sizes.md) : size;
    let border: any = {
      line: {
        borderBottom: "1px solid",
        borderColor: "divider.primary",
      },
      box: {
        border: "1px solid",
        borderColor: "divider.primary",
      },
      none: {},
    };

    return (
      <Scrollbar
        style={{
          overflowY: "hidden",
        }}
      >
        <Tag
          {...rest}
          baseClass="table"
          sxr={{
            color: "text.primary",
            fontSize: "text",
            width: "100%",
            "& thead, & tfoot": {
              bgcolor: main.main.bgcolor,
              "& th": {
                color: main.main.color,
              },
            },
            "& td, & th": {
              p: _size,
              ...border[borderType],
            },
            "& tr:last-child td": {
              borderBottom: 0,
            },
            "& tr:first-child th": {
              borderTop: 0,
            },
            "& tbody tr:hover": {
              bgcolor: ghost.main.bgcolor,
            },
            ...sx,
            ...((rest as any).sx || {}),
          }}
          component="table"
          ref={ref}
        >
          {children}
        </Tag>
      </Scrollbar>
    );
  },
);

export default Table;
