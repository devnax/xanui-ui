import React from 'react';
import { Tag, TagProps, TagComponentType } from '@xanui/core';

export type SkeletonProps<T extends TagComponentType = "div"> = TagProps<T> & {
   animation?: 'pulse' | 'wave' | 'none';
   loading?: boolean;
}

const Skeleton = React.forwardRef(<T extends TagComponentType = "div">({ children, loading, color, animation, ...props }: SkeletonProps<T>, ref: React.Ref<any>) => {

   if (!children) loading = true

   if (loading) {
      animation ??= 'pulse'
      color ??= "default"
      let sxr: any = {}
      switch (animation) {
         case 'pulse':
            sxr = {
               bgcolor: "divider.primary",
               width: "100%",
               animation: 'skpulse 1.5s infinite',
               "@keyframes skpulse": {
                  '0%, 100%': {
                     opacity: 1,
                  },
                  '50%': {
                     opacity: 0.4,
                  },
               }
            }
            break;
         case 'wave':
            sxr = {
               position: 'relative',
               overflow: 'hidden',
               bgcolor: "divider.primary",
               "&::after": {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: "0%",
                  width: '100%',
                  height: '100%',
                  animation: 'skwave 2s infinite',
                  background: `linear-gradient(90deg, transparent 0%, var(--color-divider-secondary) 50%, transparent 100%)`,
               },
               "@keyframes skwave": {
                  '0%': { left: '-100%' },
                  '100%': { left: '100%' }
               }
            }
            break;
      }
      return (
         <Tag
            {...props}
            baseClass='skeleton'
            ref={ref}
            sxr={sxr}
         />
      )
   }

   return children
})

export default Skeleton

