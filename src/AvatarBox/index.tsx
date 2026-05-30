"use client";
import React from "react";
import { Tag, TagProps } from "@xanui/core";
import Avatar, { AvatarProps } from "../Avatar";
import Text from "../Text";

export type AvatarBoxProps = {
  src?: string;
  title?: string;
  subtitle?: string;
  slotProps?: {
    root?: TagProps;
    avatar?: Omit<AvatarProps, "src">;
    title?: TagProps;
    subtitle?: TagProps;
  };
};

const AvatarBox = React.forwardRef(
  (
    { src, title, subtitle, slotProps }: AvatarBoxProps,
    ref: React.Ref<any>,
  ) => {
    return (
      <Tag
        {...slotProps?.root}
        baseClass="avatar-box"
        sxr={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
        ref={ref}
      >
        <Avatar size={40} {...slotProps?.avatar} src={src} flex="0 0 auto" />
        <Tag>
          {title && (
            <Text
              {...slotProps?.title}
              fontSize={"sm"}
              classNames="avatar-box-title"
            >
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              fontSize={"sm"}
              color="default.base"
              {...slotProps?.subtitle}
              classNames="avatar-box-subtitle"
            >
              {subtitle}
            </Text>
          )}
        </Tag>
      </Tag>
    );
  },
);

export default AvatarBox;
