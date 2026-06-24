"use client";
import { ReactElement, useEffect, useRef, useState } from "react";
import {
  Tag,
  useBreakpointProps,
  useBreakpointPropsType,
  UseColorTemplateColor,
  useThemeComponent,
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
  thumbContent?: (props: { value: number }) => ReactElement;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  thumbSize?: number;
};

const RangeSlider = (props: RangeSliderProps) => {
  const { value, defaultValue, onChange, disabled, ...rest } = props;

  // interface system
  let [
    {
      color,
      min = 0,
      max = 100,
      step = 1,
      thumbContent,
      thumbSize = 16,
      size = "sm",
    },
  ] = useThemeComponent<any>("RangeSlider", rest, {});

  const bp: any = useBreakpointProps({
    color,
    size,
  });
  color = bp.color ?? "primary";
  size = bp.size;

  const sizesSX: any = {
    xs: {
      track: 2,
      thumb: 8,
    },
    sm: {
      track: 4,
      thumb: 14,
    },
    md: {
      track: 8,
      thumb: 18,
    },
    lg: {
      track: 12,
      thumb: 24,
    },
    xl: {
      track: 16,
      thumb: 32,
    },
  };

  const _size = sizesSX[size];

  if (thumbSize) {
    _size.thumb = thumbSize;
  }

  if (disabled) {
    color = "divider.primary";
  }

  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState<number[]>(() => {
    if (value !== undefined) return Array.isArray(value) ? value : [value];
    if (defaultValue !== undefined)
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
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
        display: "flex",
        alignItems: "center",
        ...(disabled ? { cursor: "not-allowed" } : {}),
      }}
    >
      {/* Track */}
      <Tag
        sxr={{
          position: "absolute",
          width: "100%",
          height: _size.track,
          bgcolor: "divider.primary",
          radius: `${_size.track}px`,
        }}
      />

      <Tag
        sxr={{
          position: "absolute",
          height: _size.track,
          bgcolor: color,
          radius: `${_size.track}px`,
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
              width: _size.thumb,
              height: _size.thumb,
              radius: `${_size.thumb}px`,
              bgcolor: color,
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
          >
            {thumbContent ? thumbContent({ value: percent }) : ""}
          </Tag>
        );
      })}
    </Tag>
  );
};

export default RangeSlider;
