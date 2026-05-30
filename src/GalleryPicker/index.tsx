"use client";
import React from "react";
import FilePicker, { FilePickerError, FilePickerProps } from "../FilePicker";
import Alert, { AlertProps } from "../Alert";
import Box from "../Box";
import Button from "../Button";
import IconButton from "../IconButton";
import Stack from "../Stack";
import Text from "../Text";
import AddPhotoAlternateOutlined from "@xanui/icons/AddPhotoAlternateOutlined";
import DeleteOutline from "@xanui/icons/DeleteOutline";
import {
  Tag,
  TagComponentType,
  TagProps,
  useBreakpointProps,
  useBreakpointPropsType,
} from "@xanui/core";

const FileCard = ({
  file,
  onRemove,
}: {
  file: File | string;
  onRemove: () => void;
}) => {
  const url = typeof file === "string" ? file : URL.createObjectURL(file);

  return (
    <Box
      width={100}
      height={100}
      border="1px solid"
      borderColor="default.divider"
      radius={1}
      overflow="hidden"
      position="relative"
    >
      <IconButton
        size={25}
        color="danger"
        sx={{
          position: "absolute",
          top: 2,
          right: 2,
        }}
        onClick={onRemove}
      >
        <DeleteOutline />
      </IconButton>
      <Box
        component="img"
        src={url}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

export type GalleryPickerProps<T extends TagComponentType = "div"> = Omit<
  TagProps<T>,
  "children"
> & {
  title?: useBreakpointPropsType<string>;
  subtitle?: useBreakpointPropsType<string>;
  icon?: useBreakpointPropsType<React.ReactNode>;
  value?: (File | string)[] | null;
  maxFileSize?: number; // in kb
  maxFileLimits?: number;
  onSelect?: (files: File[], oldFiles: (File | string)[] | null) => void;
  onDelete?: (file: File | string) => void;
  onChange?: (files: (File | string)[] | null) => void;
  onError?: (error: FilePickerError) => void;

  slotProps?: {
    alert?: Omit<AlertProps, "children" | "variant" | "color" | "icon">;
    filePicker?: Omit<FilePickerProps, "multiple" | "accept" | "onChange">;
    content?: Omit<TagProps, "children">;
  };
};

const GalleryPicker = React.forwardRef(
  <T extends TagComponentType = "div">(
    {
      title,
      subtitle,
      icon,
      value,
      maxFileLimits,
      maxFileSize,
      onSelect,
      onDelete,
      onChange,
      onError,
      slotProps,
      ...props
    }: GalleryPickerProps,
    ref: React.Ref<T>,
  ) => {
    const bp: any = useBreakpointProps({
      title,
      subtitle,
      icon,
    });

    title = bp.title;
    subtitle = bp.subtitle;
    icon = bp.icon;

    const [error, setError] = React.useState<FilePickerError | null>(null);
    maxFileLimits ??= 10;
    const filePickerProps = {
      ...slotProps?.filePicker,
      multiple: true,
      accept: ["image/*"],
      maxFileSize: maxFileSize ?? 5 * 1024, // 5MB
      maxFileLimits,
      onChange: (_files: File[] | null) => {
        let all = [...(value || []), ...(_files || [])];
        if (all.length > maxFileLimits) {
          setError({
            message: `You can upload maximum ${maxFileLimits} files.`,
            file: null as any,
          });
          setTimeout(() => setError(null), 4000);
          all = all.slice(0, 10);
        }
        if (onSelect && _files) onSelect(_files, value || []);
        onChange && onChange(all);
      },
      onError: (err: FilePickerError) => {
        setError(err);
        onError && onError(err);
        setTimeout(() => setError(null), 4000);
      },
    };

    if (value && value.length > 0) {
      return (
        <Stack gap={2}>
          {error && (
            <Alert
              variant={"fill"}
              color="danger"
              mb={2}
              icon={
                <Box component={"img"} src={URL.createObjectURL(error.file)} />
              }
            >
              {error.message}
            </Alert>
          )}
          <Stack direction="row" gap={1} flexWrap="wrap">
            {value.map((file, index) => (
              <FileCard
                key={index}
                file={file}
                onRemove={() => {
                  const newFiles = value.filter((_, i) => i !== index);
                  onDelete && onDelete(file);
                  onChange && onChange(newFiles.length > 0 ? newFiles : null);
                }}
              />
            ))}
            <Stack
              width={100}
              height={100}
              bgcolor="default.base"
              radius={1}
              alignItems="center"
              overflow={"hidden"}
              border="1px solid"
              borderColor="default.divider"
            >
              <FilePicker
                {...filePickerProps}
                alignItems="center"
                justifyContent="center"
                width={"100%"}
                flex={1}
                cursor={"pointer"}
                borderBottom={"1px solid"}
                borderColor="default.divider"
                sx={{
                  "& svg": {
                    opacity: 0.6,
                  },
                  "&:hover svg": {
                    opacity: 1,
                  },
                }}
              >
                <AddPhotoAlternateOutlined
                  fontSize={28}
                  color="default.muted"
                />
              </FilePicker>
              <Button
                size="sm"
                variant={"text"}
                onClick={() => onChange && onChange(null)}
                sx={{
                  height: 28,
                }}
              >
                CLEAR
              </Button>
            </Stack>
          </Stack>
        </Stack>
      );
    }
    return (
      <Tag
        {...props}
        baseClass="gallery-picker"
        ref={ref}
        sxr={{
          display: "flex",
        }}
      >
        {error && (
          <Alert
            {...slotProps?.alert}
            variant={"fill"}
            color="danger"
            mb={2}
            icon={
              <Box component={"img"} src={URL.createObjectURL(error.file)} />
            }
          >
            {error.message}
          </Alert>
        )}
        <FilePicker
          {...filePickerProps}
          width="100%"
          border="1px dashed"
          borderColor="default.divider"
          radius={2}
          alignItems="center"
          justifyContent="center"
        >
          <Tag
            {...slotProps?.content}
            baseClass="gallery-picker-content"
            sxr={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 4,
            }}
          >
            <Tag mb={2}>
              {(icon as any) || (
                <AddPhotoAlternateOutlined
                  fontSize={38}
                  color="default.muted"
                />
              )}
            </Tag>
            <Text>
              {(title as any) || "Drag & drop images here or click to upload."}
            </Text>
            <Text variant="sm" color="default.muted">
              {(subtitle as any) ||
                `Images only · Max ${filePickerProps.maxFileSize / 1024}MB each · Up to ${filePickerProps.maxFileLimits} files.`}
            </Text>
          </Tag>
        </FilePicker>
      </Tag>
    );
  },
);

export default GalleryPicker;
