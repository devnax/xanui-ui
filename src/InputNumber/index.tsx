"use client"
import React, { useEffect, useRef, useState } from 'react'
import Input, { InputProps } from '../Input'
import UnfoldMore from '@xanui/icons/UnfoldMore'
import { useMergeRefs } from '@xanui/core'

export type InputNumberProps = Omit<InputProps, "value"> & {
   value?: number; // allow string so typing "." works
}

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>((props, ref) => {
   const [_val, setVal] = useState<string>(props.value as any ?? "")
   const inputRef = useRef<any>(null)
   const mergeRef = useMergeRefs(inputRef, ref)
   useEffect(() => {
      if (inputRef.current && props?.onChange) {
         let valstr = String(_val)
         inputRef.current.value = valstr.includes(".") ? parseFloat(_val) : parseInt(_val)
         const syntheticEvent = {
            target: inputRef.current,
            currentTarget: inputRef.current,
         } as unknown as React.ChangeEvent<HTMLInputElement>;
         props?.onChange(syntheticEvent)
      }
   }, [_val])

   const isNumeric = _val === undefined || _val === '' || !isNaN(Number(_val));
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
         value={_val ?? "" as any}
         onKeyDown={(e: any) => {
            props.onKeyDown?.(e);

            if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;

            e.preventDefault();
            const current = parseFloat(_val as any) || 0;
            setVal(e.key === 'ArrowUp' ? current + 1 : current - 1 as any);
         }}
         onChange={(e) => {
            let val: any = e.target.value.replace(/[^0-9.]/g, '')
            const parts = val.split('.');
            if (parts.length > 2) {
               val = parts[0] + '.' + parts.slice(1).join('')
            }
            setVal(val === "." ? `0.` : val);
         }}
      />
   );
});

export default InputNumber;
