"use client"
import React, { useRef } from 'react'
import Input, { InputProps } from '../Input'
import UnfoldMore from '@xanui/icons/UnfoldMore'
import { useMergeRefs } from '@xanui/core'

export type InputNumberProps = Omit<InputProps, "value"> & {
   value?: number | "";
}

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>((props, ref) => {
   const inputRef = useRef<any>(null)
   const mergeRef = useMergeRefs(inputRef, ref)
   const isNumeric = props.value === undefined || props.value === '' || !isNaN(Number(props.value));
   const errorProps: Partial<InputProps> = {};
   if (!isNumeric) {
      errorProps.error = true;
      errorProps.helperText = "Value must be numeric";
   }

   return (
      <Input
         {...props}
         {...errorProps}
         ref={mergeRef}
         endIcon={<UnfoldMore />}
         value={props.value ?? "" as any}
         onKeyDown={(e: any) => {
            props.onKeyDown?.(e);
            if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
            e.preventDefault();
            const current = parseFloat(props.value as any) || 0;
            e.target.value = e.key === 'ArrowUp' ? current + 1 : current - 1 as any
            props?.onChange && props?.onChange(e)

         }}
         onBlur={(e) => {
            const raw = e.target.value
            if (raw === "" || raw === ".") return
            const num = parseFloat(raw)
            if (!Number.isNaN(num)) {
               props?.onChange?.({
                  ...e,
                  target: { ...e.target, value: num },
               } as any)
            }
         }}

         onChange={(e) => {
            let value = e.target.value
            if (value === "") {
               props?.onChange?.(e)
               return
            }

            if (!/^\d*\.?\d*$/.test(value)) return

            if (value === ".") value = "0."
            const nextEvent = {
               ...e,
               target: {
                  ...e.target,
                  value,
               },
            }

            props?.onChange?.(nextEvent as any)
         }}

      />
   );
});

export default InputNumber;
