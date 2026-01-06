"use client"
import React from 'react'
import Input, { InputProps } from '../Input'
import UnfoldMore from '@xanui/icons/UnfoldMore'

export type InputNumberProps = InputProps

const InputNumber = React.forwardRef((props: InputNumberProps, ref: React.Ref<any>) => {
   const isNumeric = !isNaN(Number(props.value));

   let p: any = {}
   if (!isNumeric) {
      p.error = true;
      p.helperText = "Value must be numeric";
   }

   return (
      <Input
         {...props}
         {...p}
         ref={ref}
         endIcon={<UnfoldMore />}
         onKeyDown={(e: any) => {
            props.onKeyDown && props.onKeyDown(e);
            if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
            e.preventDefault();
            let val = parseInt(props.value || '0');
            val = e.key === 'ArrowUp' ? val + 1 : val - 1;
            e.target.value = String(val);
            props.onChange && props.onChange(e);
         }}
         value={props.value}
         onChange={e => {
            e.target.value = e.target.value.replace(/\D/g, '')
            props.onChange && props.onChange(e);
         }}
      />
   )
})

export default InputNumber
