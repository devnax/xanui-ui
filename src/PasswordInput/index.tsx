"use client";
import Visibility from "@xanui/icons/Visibility";
import VisibilityOff from "@xanui/icons/VisibilityOff";
import IconButton from "../IconButton";
import Input from "../Input";
import { InputProps } from "../Input";
import React, { forwardRef } from "react";

export type PasswordInputProps = InputProps & {
  placeholder?: string;
  defaultShow?: boolean;
};

const PasswordInput = forwardRef(
  ({ defaultShow, ...props }: PasswordInputProps, ref: React.Ref<"input">) => {
    const [show, setShow] = React.useState(defaultShow ?? false);

    return (
      <Input
        ref={ref}
        variant="outline"
        placeholder="Password"
        {...props}
        type={show ? "text" : "password"}
        endIcon={
          <IconButton
            variant="text"
            color="default"
            size="sm"
            onClick={() => {
              setShow((p) => !p);
            }}
          >
            {show ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        }
      />
    );
  },
);

export default PasswordInput;
