"use client"
import React from 'react'
import Input, { InputProps } from '../Input'
import UnfoldMore from '@xanui/icons/UnfoldMore'

export type InputNumberProps = Omit<InputProps, "value"> & {
   value?: number | string; // allow string so typing "." works
}

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>((props, ref) => {
   // Check if current value is numeric
   const isNumeric = props.value === undefined || props.value === '' || !isNaN(Number(props.value));

   const errorProps: Partial<InputProps> = {};
   if (!isNumeric) {
      errorProps.error = true;
      errorProps.helperText = "Value must be numeric";
   }

   // Handle arrow up/down for increment/decrement
   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      props.onKeyDown?.(e);

      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;

      e.preventDefault();
      const current = parseFloat(props.value as any) || 0;
      const newVal = e.key === 'ArrowUp' ? current + 1 : current - 1;

      if (ref && 'current' in ref && ref.current) {
         ref.current.value = String(newVal);
      }

      // Trigger onChange manually
      const syntheticEvent = {
         ...e,
         target: {
            ...e.target,
            value: String(newVal),
         }
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      props.onChange?.(syntheticEvent);
   };

   // Handle input change with float support
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value;

      // Remove invalid characters except digits and dot
      val = val.replace(/[^0-9.]/g, '');

      // Only allow one dot
      const parts = val.split('.');
      if (parts.length > 2) {
         val = parts[0] + '.' + parts.slice(1).join('');
      }

      // Keep trailing dot while typing
      e.target.value = val;

      props.onChange?.(e);
   };

   return (
      <Input
         {...props}
         {...errorProps}
         ref={ref}
         endIcon={<UnfoldMore />}
         onKeyDown={handleKeyDown as any}
         onChange={handleChange as any}
         value={props.value ?? "" as any}
      />
   );
});

export default InputNumber;
