"use client"
import React from 'react';
import { Tag, TagProps, TagComponentType, useBreakpointProps, useInterface } from '@xanui/core';

export type CardProps<T extends TagComponentType = "div"> = TagProps<T> & {
   variant?: 'elevated' | 'outlined' | 'filled';
}

const Card = React.forwardRef(<T extends TagComponentType = "div">({ children, ...rest }: CardProps<T>, ref: React.Ref<any>) => {

   let [{
      variant,
      ...props
   }] = useInterface<any>('Card', rest, {})

   const _p: any = {}
   if (variant) _p.variant = variant
   const p: any = useBreakpointProps(_p)
   variant = p.variant ?? "elevated";

   const variantSx: any = {
      elevated: {
         shadow: 1,
      },
      outlined: {
         border: '1px solid',
         borderColor: 'divider',
      },
      filled: {
         bgcolor: 'background.secondary',
      },
   }

   return (
      <Tag
         {...props}
         baseClass='card'
         ref={ref}
         sxr={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            radius: 1,
            overflow: 'hidden',
            p: 1,
            ...variantSx[variant],
         }}
      >{children}</Tag>
   )
})

export default Card

