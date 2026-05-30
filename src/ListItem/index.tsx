"use client";
import React, { ReactElement } from "react";
import {
  Tag,
  TagProps,
  TagComponentType,
  useThemeComponent,
  useBreakpointProps,
  useBreakpointPropsType,
  useColorTemplate,
} from "@xanui/core";
import Text, { TextProps } from "../Text";
import { useListContext } from "../List/ListContext";

export type ListItemProps<T extends TagComponentType = "li"> = TagProps<T> & {
  selected?: boolean;
  subtitle?: useBreakpointPropsType<string | ReactElement>;
  startIcon?: useBreakpointPropsType<ReactElement>;
  endIcon?: useBreakpointPropsType<ReactElement>;
  size?: useBreakpointPropsType<"xs" | "sm" | "md" | "lg" | "xl">;

  slotProps?: {
    content: Omit<TextProps, "children">;
    startIcon: Omit<TagProps, "children">;
    endIcon: Omit<TagProps, "children">;
    subtitle: Omit<TextProps, "children">;
  };
};

const ListItem = React.forwardRef(
  <T extends TagComponentType = "li">(
    {
      children,
      startIcon,
      endIcon,
      subtitle,
      slotProps,
      ...rest
    }: ListItemProps<T>,
    ref: React.Ref<any>,
  ) => {
    let [{ selected, ...props }] = useThemeComponent<any>("ListItem", rest, {});
    const _p: any = {};
    if (subtitle) _p.subtitle = subtitle;
    if (startIcon) _p.startIcon = startIcon;
    if (endIcon) _p.endIcon = endIcon;
    const p: any = useBreakpointProps(_p);
    const listProps = useListContext();
    const template = useColorTemplate(listProps.color, listProps.variant);
    const defaultTemplate = useColorTemplate("default", "text");
    const hoverTemplate = useColorTemplate(listProps.color, "ghost");

    subtitle = p.subtitle;
    startIcon = p.startIcon;
    endIcon = p.endIcon;
    const size = listProps?.size;

    let sizes: any = {
      xs: {
        fontSize: "sm",
        py: 0.25,
        px: 0.75,
        minHeight: 28,
      },

      sm: {
        fontSize: "sm",
        py: 0.5,
        px: 1,
        minHeight: 34,
      },

      md: {
        fontSize: "text",
        py: 1,
        px: 1.5,
        minHeight: 42,
      },

      lg: {
        fontSize: "h6",
        py: 1.25,
        px: 2,
        minHeight: 50,
      },

      xl: {
        fontSize: "h5",
        py: 1.5,
        px: 2.5,
        minHeight: 60,
      },
    };

    const _size = sizes[size as any] || sizes.md;

    const hoversx = {
      ...hoverTemplate.main,
      "& .list-item-icon": {
        color: hoverTemplate.main.color,
      },
      "& .list-item-text": {
        color: hoverTemplate.main.color,
      },
      "& .list-item-subtitle": {
        color: hoverTemplate.main.color,
      },
    };

    let sx = {
      item: selected ? template.main : defaultTemplate.main,
      text: {
        color: selected ? template.main.color : defaultTemplate.main.color,
      },
    };

    return (
      <Tag
        component="li"
        {...listProps?.listItem}
        {...props}
        sxr={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          userSelect: "none",
          cursor: "pointer",
          lineHeight: 1.4,
          whiteSpace: "nowrap",
          flexShrink: "0",
          ...sx.item,
          ..._size,
          border: 0,
          "&:hover:not(.list-item-selected)": hoversx,
        }}
        baseClass="list-item"
        classNames={[
          { "list-item-selected": selected as boolean },
          ...(props.classNames || []),
        ]}
        ref={ref}
      >
        {startIcon && (
          <Tag
            {...slotProps?.startIcon}
            component="span"
            baseClass="list-item-icon"
            sxr={{
              fontSize: "h5",
              ...sx.text,
              mr: 1,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {startIcon as any}
          </Tag>
        )}
        <Tag flex={1}>
          <Text
            {...slotProps?.content}
            variant="md"
            className="list-item-text"
            component={
              typeof children === "string" || typeof children === "number"
                ? "p"
                : "div"
            }
            sx={{
              fontSize: _size.fontSize,
              ...sx.text,
            }}
          >
            {children}
          </Text>
          {subtitle && (
            <Text
              {...slotProps?.subtitle}
              variant="md"
              fontSize={"sm"}
              className="list-item-subtitle"
              component={
                typeof subtitle === "string" || typeof subtitle === "number"
                  ? "p"
                  : "div"
              }
              sx={sx.text}
            >
              {subtitle as any}
            </Text>
          )}
        </Tag>
        {endIcon && (
          <Tag
            {...slotProps?.endIcon}
            component="span"
            baseClass="list-item-icon"
            sxr={{
              fontSize: "h5",
              ml: 1,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {endIcon as any}
          </Tag>
        )}
      </Tag>
    );
  },
);

export default ListItem;
