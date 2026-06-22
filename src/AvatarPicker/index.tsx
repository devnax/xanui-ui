"use client";
import CloseOutlined from "@xanui/icons/CloseOutlined";
import CameraAltOutlined from "@xanui/icons/CameraAltOutlined";
import Avatar, { AvatarProps } from "../Avatar";
import Badge, { BadgeProps } from "../Badge";
import IconButton from "../IconButton";
import Menu, { MenuProps } from "../Menu";
import Text from "../Text";
import React from "react";
import {
  Tag,
  TagComponentType,
  TagProps,
  useBreakpointProps,
  useBreakpointPropsType,
  useThemeComponent,
} from "@xanui/core";

export type AvataPickerValue = File | string | null;

export type AvatarPickerProps<T extends TagComponentType = "div"> =
  TagProps<T> & {
    value?: AvataPickerValue;
    defaultPreview?: string;
    maxSize?: number; // in kb
    changeIcon?: React.ReactNode;
    loading?: boolean;
    avatarSize?: useBreakpointPropsType<number>;
    onChange?: (file: AvataPickerValue) => void;
    onDelete?: (file: File | string) => void;
    onSelect?: (file: File | string) => void;
    slotProps?: {
      Avatar?: Omit<AvatarProps, "src" | "size">;
      badge?: Omit<BadgeProps, "placement" | "content">;
      menu?: Omit<MenuProps, "target" | "onClickOutside">;
    };
  };

const AvatarPicker = React.forwardRef(
  <T extends TagComponentType = "div">(
    {
      value,
      maxSize,
      changeIcon,
      onChange,
      onDelete,
      onSelect,
      loading,
      bgcolor,
      ...rest
    }: AvatarPickerProps,
    ref: React.Ref<T>,
  ) => {
    let [{ defaultPreview, avatarSize, slotProps, ...props }]: any =
      useThemeComponent("AvaterPicker", rest, {});

    const _p: any = {};
    if (defaultPreview) _p.defaultPreview = defaultPreview;
    if (avatarSize) _p.avatarSize = avatarSize;
    const bp = useBreakpointProps(_p);
    maxSize = maxSize || 1024 * 2; // default 2MB
    defaultPreview = bp.defaultPreview;
    avatarSize = bp.avatarSize ?? 100;

    const [preview, setPreview] = React.useState<string | undefined>();
    const [target, setTarget] = React.useState<HTMLElement | undefined>();

    React.useEffect(() => {
      if (!value) {
        setPreview(undefined);
        return;
      }
      if (typeof value === "string") {
        setPreview(value);
        return;
      }
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }, [value, onChange]);

    return (
      <Tag
        {...props}
        baseClass="avatar-picker"
        ref={ref}
        sxr={{
          display: "inline-block",
          position: "relative",
        }}
      >
        <Badge
          disableSpace
          disableTransition
          {...slotProps?.badge}
          placement={value ? "right-top" : "right-bottom"}
          content={
            <Tag>
              <IconButton
                color={value ? "danger" : "default"}
                cursor={"pointer"}
                size={value ? 20 : "sm"}
                onClick={(be: any) => {
                  if (value) {
                    onDelete && onDelete(value);
                    onChange && onChange(null);
                    return;
                  }
                  if (target) {
                    setTarget(undefined);
                  }
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e: any) => {
                    const selectedFile = e.target.files[0];
                    if (maxSize && selectedFile.size > maxSize * 1024) {
                      setTarget(be.target);
                      setTimeout(() => {
                        setTarget(undefined);
                      }, 3000);
                      return;
                    }
                    onSelect && onSelect(selectedFile);
                    onChange && onChange(selectedFile);
                  };
                  input.click();
                }}
              >
                {value ? (
                  <CloseOutlined />
                ) : (
                  changeIcon || <CameraAltOutlined />
                )}
              </IconButton>
            </Tag>
          }
        >
          <Avatar
            {...slotProps?.avatar}
            skeleton={loading}
            size={avatarSize}
            src={preview || defaultPreview}
            border={target ? "1px solid" : 0}
            borderColor={target ? "danger.primary" : "transparent"}
            bgcolor={target ? "danger.ghost" : bgcolor}
          />
          <Menu
            {...slotProps?.menu}
            target={target}
            placement={"bottom"}
            onClickOutside={() => setTarget(undefined)}
            slotProps={{
              content: {
                mt: 2,
              },
            }}
          >
            <Text
              bgcolor="danger.primary"
              color="danger.contrast"
              fontSize={"sm"}
              p={1}
              px={2}
              radius={1}
            >
              {`File size exceeds the maximum limit of ${maxSize} KB`}
            </Text>
          </Menu>
        </Badge>
      </Tag>
    );
  },
);

export default AvatarPicker;
