"use client";
import React, { ReactElement, useId } from "react";
import {
  Tag,
  UseColorTemplateColor,
  useThemeComponent,
  useBreakpointProps,
  useBreakpointPropsType,
} from "@xanui/core";

export type CircleProgressProps = {
  children?: ReactElement;
  color?: useBreakpointPropsType<UseColorTemplateColor>;
  trackColor?: useBreakpointPropsType<UseColorTemplateColor>;
  thumbColor?: useBreakpointPropsType<UseColorTemplateColor>;
  size?: useBreakpointPropsType<number | "xs" | "sm" | "md" | "lg" | "xl">;
  thumbSize?: useBreakpointPropsType<number>;
  trackSize?: useBreakpointPropsType<number>;
  value?: useBreakpointPropsType<number>;
  hideTrack?: useBreakpointPropsType<boolean>;
  showPercentage?: useBreakpointPropsType<boolean>;
  speed?: useBreakpointPropsType<number>;
};

const CircleProgress = React.forwardRef(
  ({ children, ...props }: CircleProgressProps, ref: React.Ref<any>) => {
    let [
      {
        color,
        trackColor,
        thumbColor,
        size,
        value,
        thumbSize,
        hideTrack,
        trackSize,
        showPercentage,
        speed,
      },
    ] = useThemeComponent<any>("CircleProgress", props, {});
    const _p: any = {};
    if (color) _p.color = color;
    if (trackColor) _p.trackColor = trackColor;
    if (thumbColor) _p.thumbColor = thumbColor;
    if (size) _p.size = size;
    if (thumbSize) _p.thumbSize = thumbSize;
    if (trackSize) _p.trackSize = trackSize;
    if (value) _p.value = value;
    if (hideTrack) _p.hideTrack = hideTrack;
    if (showPercentage) _p.showPercentage = showPercentage;
    if (speed) _p.speed = speed;
    const p: any = useBreakpointProps(_p);

    color = p.color ?? "primary";
    trackColor = p.trackColor;
    thumbColor = p.thumbColor;
    size = p.size ?? "md";
    value = p.value;
    hideTrack = p.hideTrack;
    showPercentage = p.showPercentage;
    speed = p.speed ?? 1.5;

    if (trackColor === "default") {
      trackColor = "default.divider";
    }

    if (thumbColor === "default") {
      thumbColor = "default.contrast";
    }

    let sizes: any = {
      xs: 18,
      sm: 24,
      md: 34,
      lg: 44,
      xl: 56,
    };

    if (typeof size === "string" && sizes[size]) {
      size = sizes[size];
    }

    thumbSize = p.thumbSize ?? Math.max(2, size * 0.12);
    trackSize = p.trackSize ?? thumbSize;

    let isVal = typeof value === "number";
    const animrotate = "anim" + useId().replace(":", "");
    const animdash = "anim" + useId().replace(":", "");
    if (isVal && (value as number) > 100) value = 100;
    const radius = 20;
    const circumference = radius * 2 * Math.PI;
    const percent = circumference - ((value || 0) / 100) * circumference;

    if (showPercentage && !children) {
      children = (
        <Tag
          sxr={{
            color: color === "default" ? "default.contrast" : `${color}.base`,
            fontSize: Math.max(10, size * 0.24),
            fontWeight: 500,
            lineHeight: 1,
          }}
        >
          {value}%
        </Tag>
      );
    }

    return (
      <Tag
        baseClass="circle-progress"
        sxr={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          "& svg[class='circle-progress-svg']": {
            zIndex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transform: isVal ? "rotate(-90deg)" : "none",
            transformOrigin: isVal ? "center" : "initial",
            animation: isVal
              ? "none"
              : `${animrotate} ${speed}s linear infinite`,
            [`@keyframes ${animrotate}`]: {
              "100%": {
                transform: "rotate(360deg)",
              },
            },
            "& circle.circle-progress-thumb": {
              strokeDasharray: circumference,
              strokeDashoffset: percent,
              stroke:
                thumbColor ||
                (color === "default" ? `default.contrast` : `${color}.base`),
              fill: "none",
              strokeWidth: thumbSize,
              strokeLinecap: "round",
              animation: isVal
                ? "none"
                : `${animdash} ${speed}s ease-in-out infinite`,
              [`@keyframes ${animdash}`]: {
                "0%": { strokeDasharray: "1, 150", strokeDashoffset: 0 },
                "50%": { strokeDasharray: "90, 150", strokeDashoffset: -35 },
                "100%": { strokeDasharray: "90, 150", strokeDashoffset: -124 },
              },
            },
            "& circle.circle-progress-track": {
              fill: "none",
              stroke: trackColor || `default.divider`,
              strokeWidth: trackSize ?? thumbSize,
            },
          },
          width: size,
          height: size,
          position: "relative",
        }}
        ref={ref}
      >
        <svg viewBox="0 0 50 50" className="circle-progress-svg">
          {!hideTrack && (
            <circle
              className="circle-progress-track"
              cx="25"
              cy="25"
              r={radius}
            />
          )}
          <circle
            className="circle-progress-thumb"
            cx="25"
            cy="25"
            r={radius}
          />
        </svg>
        {!!children && (
          <Tag
            baseClass="circle-progress-content"
            sxr={{
              zIndex: 2,
              width: size - thumbSize,
              height: size - thumbSize,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "& *": {
                maxWidth: size - (thumbSize + 8),
                maxHeight: size - (thumbSize + 8),
              },
            }}
          >
            {children}
          </Tag>
        )}
      </Tag>
    );
  },
);

export default CircleProgress;
