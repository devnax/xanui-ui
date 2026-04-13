"use client";
import { useEffect, useRef, useState } from "react";
import {
   Tag,
   useBreakpointProps,
   useBreakpointPropsType,
   UseColorTemplateColor,
   useInterface,
} from "@xanui/core";

export type RangeSliderValue = number | number[];

export type RangeSliderProps = {
   color?: useBreakpointPropsType<UseColorTemplateColor>;
   min?: number;
   max?: number;
   step?: number;
   value?: RangeSliderValue;
   defaultValue?: RangeSliderValue;
   onChange?: (value: RangeSliderValue) => void;
   disabled?: boolean;
};

const RangeSlider = (props: RangeSliderProps) => {
   const { value, defaultValue, onChange, disabled, ...rest } = props;

   // interface system
   let [{ color, min = 0, max = 100, step = 1 }] = useInterface<any>(
      "RangeSlider",
      rest,
      {}
   );

   const bp: any = useBreakpointProps({
      color,
   });
   color = bp.color;

   const isControlled = value !== undefined;

   const [internalValue, setInternalValue] = useState<number[]>(() => {
      if (value !== undefined) return Array.isArray(value) ? value : [value];
      if (defaultValue !== undefined)
         return Array.isArray(defaultValue)
            ? defaultValue
            : [defaultValue];
      return [min];
   });

   // sync controlled
   useEffect(() => {
      if (isControlled) {
         setInternalValue(Array.isArray(value) ? value : [value!]);
      }
   }, [value, isControlled]);

   const containerRef = useRef<HTMLDivElement | null>(null);
   const isDownRef = useRef(false);
   const activeHandleRef = useRef<number | null>(null);

   const updateValue = (index: number, clientX: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      let p = (clientX - rect.left) / rect.width;
      p = Math.max(0, Math.min(1, p));

      const raw = min + p * (max - min);
      const stepped = Math.round((raw - min) / step) * step + min;

      const next = [...internalValue];
      next[index] = Math.min(max, Math.max(min, stepped));

      if (!isControlled) {
         setInternalValue(next);
      }

      onChange?.(next.length === 1 ? next[0] : next);
   };

   // global drag system
   useEffect(() => {
      const handleMove = (e: MouseEvent) => {
         if (!isDownRef.current || activeHandleRef.current === null) return;
         updateValue(activeHandleRef.current, e.clientX);
      };

      const handleUp = () => {
         isDownRef.current = false;
         activeHandleRef.current = null;
      };

      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleUp);

      return () => {
         window.removeEventListener("mousemove", handleMove);
         window.removeEventListener("mouseup", handleUp);
      };
   });

   const sorted = [...internalValue].sort((a, b) => a - b);

   const startValue = sorted.length === 1 ? min : sorted[0];
   const endValue = sorted[sorted.length - 1];

   const startPercent = ((startValue - min) / (max - min)) * 100;
   const endPercent = ((endValue - min) / (max - min)) * 100;

   return (
      <Tag
         ref={containerRef}
         onClick={(e: any) => {
            if (disabled) return;

            const rect = e.currentTarget.getBoundingClientRect();
            const p = (e.clientX - rect.left) / rect.width;
            const raw = min + p * (max - min);
            const stepped = Math.round((raw - min) / step) * step + min;

            let closestIndex = 0;
            let minDist = Math.abs(internalValue[0] - stepped);

            for (let i = 1; i < internalValue.length; i++) {
               const d = Math.abs(internalValue[i] - stepped);
               if (d < minDist) {
                  minDist = d;
                  closestIndex = i;
               }
            }

            updateValue(closestIndex, e.clientX);
         }}
         sxr={{
            position: "relative",
            width: "100%",
            height: 24,
            display: "flex",
            alignItems: "center",
            ...(disabled
               ? { opacity: 0.5, cursor: "not-allowed" }
               : { cursor: "initial" }),
         }}
      >
         {/* Track */}
         <Tag
            sxr={{
               position: "absolute",
               width: "100%",
               height: 4,
               bgcolor: "background.secondary",
               radius: 2,
            }}
         />

         {/* Filled */}
         <Tag
            sxr={{
               position: "absolute",
               height: 4,
               bgcolor: color || "brand.primary",
               radius: 2,
               left: `${startPercent}%`,
               width: `${endPercent - startPercent}%`,
            }}
         />

         {internalValue.map((v, i) => {
            const percent = ((v - min) / (max - min)) * 100;

            return (
               <Tag
                  key={i}
                  sxr={{
                     position: "absolute",
                     width: 16,
                     height: 16,
                     bgcolor: "background.primary",
                     radius: 1,
                     border: "2px solid",
                     borderColor: color || "brand.primary",
                     left: `${percent}%`,
                     transform: "translateX(-50%)",
                     cursor: disabled ? "not-allowed" : "initial",
                  }}
                  onMouseDown={(e) => {
                     if (disabled) return;
                     e.preventDefault();
                     isDownRef.current = true;
                     activeHandleRef.current = i;
                  }}
               />
            );
         })}
      </Tag>
   );
};

export default RangeSlider;