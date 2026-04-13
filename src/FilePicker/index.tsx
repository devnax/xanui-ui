"use client"
import { Tag, TagComponentType, TagProps, useBreakpointProps, useBreakpointPropsType } from '@xanui/core';
import React from 'react';

export type FilePickerError = { message: string, file: File }

export type FilePickerProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, 'accept' | "onChange" | "onError" | "multiple"> & {
   children?: React.ReactNode;
   multiple?: boolean;
   accept?: string[] //  ['.png', '.jpg'] or ['image/*']
   maxFileSize?: number; // in kb
   maxFileLimits?: number;
   action?: useBreakpointPropsType<"click" | "drop" | "both">;
   onChange?: (files: File[]) => void;
   onDragOver?: (e: React.DragEvent) => void;
   onDragLeave?: (e: React.DragEvent) => void;
   onError?: (error: FilePickerError) => void;
};


const FilePicker = <T extends TagComponentType = "div">({ children, multiple, action, accept, maxFileLimits, maxFileSize, onChange, onDragOver, onDragLeave, onError, ...props }: FilePickerProps<T>, ref: React.Ref<T>) => {

   const bp: any = useBreakpointProps({ action })
   action = bp.action ?? "both"
   const _props: any = {}

   const handleFiles = (files: FileList) => {
      const fileArray = Array.from(files);

      // multiple
      if (!multiple && fileArray.length > 1) {
         onError && onError({
            message: "Multiple file upload is not allowed.",
            file: fileArray[1]
         });
         return;
      }

      // limit
      if (maxFileLimits && fileArray.length > maxFileLimits) {
         onError && onError({
            message: `File limit exceeded. Maximum allowed is ${maxFileLimits}.`,
            file: fileArray[maxFileLimits]
         });
         return;
      }

      // accept
      if (accept && accept.length > 0) {
         for (const file of fileArray) {
            const isAccepted = accept.some((type) => {
               if (type === '*/*') return true;
               if (type.endsWith('/*')) {
                  const mainType = type.split('/')[0];
                  return file.type.startsWith(mainType + '/');
               }
               return file.name.endsWith(type);
            });
            if (!isAccepted) {
               onError && onError({
                  message: `File type not accepted: ${file.name}`,
                  file
               });
               return;
            }
         }
      }

      // size
      if (maxFileSize) {
         for (const file of fileArray) {
            if (file.size > maxFileSize * 1024) {
               onError && onError({
                  message: `File size exceeds the limit of ${maxFileSize} KB: ${file.name}`,
                  file
               });
               return;
            }
         }
      }
      onChange && onChange(fileArray);
   }


   const clickProps = {
      onClick: () => {
         const input = document.createElement('input');
         input.type = 'file';
         if (multiple) {
            input.multiple = true;
         }
         if (accept && accept.length > 0) {
            input.accept = accept.join(',');
         }
         input.onchange = (e: any) => {
            handleFiles(e.target.files);
         };
         input.click();
      }
   }

   const dropProps = {
      onDragOver: (e: React.DragEvent) => {
         e.preventDefault();
         onDragOver && onDragOver(e);
      },
      onDragLeave: (e: React.DragEvent) => {
         e.preventDefault();
         onDragLeave && onDragLeave(e);
      },
      onDrop: (e: React.DragEvent) => {
         e.preventDefault();
         handleFiles(e.dataTransfer.files);
         onDragLeave && onDragLeave(e);
      }
   }

   switch (action) {
      case "click":
         Object.assign(_props, clickProps);
         break;
      case "drop":
         Object.assign(_props, dropProps);
         break;
      case "both":
         Object.assign(_props, { ...clickProps, ...dropProps });
         break;
   }

   return (
      <Tag
         {...props}
         {..._props}
         baseClass='file-picker'
         ref={ref}
      >
         {children}
      </Tag>
   )
}

export default React.forwardRef(FilePicker);