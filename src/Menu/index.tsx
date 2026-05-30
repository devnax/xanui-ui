"use client";
import { ReactNode, useEffect, useState, useRef } from "react";
import {
  Tag,
  TagProps,
  useBreakpointProps,
  useBreakpointPropsType,
  useThemeComponent,
  TransitionProps,
  Transition,
} from "@xanui/core";
import Portal, { PortalProps } from "../Portal";
import ClickOutside, { ClickOutsideProps } from "../ClickOutside";

export type PlacementTypes =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "right"
  | "right-top"
  | "right-bottom"
  | "left"
  | "left-top"
  | "left-bottom";

export type MenuProps = {
  children?: ReactNode;
  target?: HTMLElement;
  placement?: useBreakpointPropsType<PlacementTypes>;
  zIndex?: number;

  variant?: TransitionProps["variant"];
  duration?: TransitionProps["duration"];
  onEnter?: TransitionProps["onEnter"];
  onEntered?: TransitionProps["onEntered"];
  onExit?: TransitionProps["onExit"];
  onExited?: TransitionProps["onExited"];

  onClickOutside?: (e: MouseEvent) => void;

  slotProps?: {
    transition?: Omit<TransitionProps, "open">;
    portal?: Omit<PortalProps, "children">;
    content?: Omit<TagProps<"div">, "children">;
    clickOutSide?: Omit<ClickOutsideProps, "children">;
  };
};

const placements: PlacementTypes[] = [
  "top",
  "top-left",
  "top-right",
  "bottom",
  "bottom-left",
  "bottom-right",
  "right",
  "right-top",
  "right-bottom",
  "left",
  "left-top",
  "left-bottom",
];

const getTransformOrigin = (placement: PlacementTypes) => {
  switch (placement) {
    case "top":
      return "bottom";
    case "top-left":
      return "bottom left";
    case "top-right":
      return "bottom right";
    case "bottom":
      return "top";
    case "bottom-left":
      return "top left";
    case "bottom-right":
      return "top right";
    case "left":
      return "right";
    case "left-top":
      return "top right";
    case "left-bottom":
      return "bottom right";
    case "right":
      return "left";
    case "right-top":
      return "top left";
    case "right-bottom":
      return "bottom left";
    default:
      return "top";
  }
};

const clampToViewport = (menu: HTMLElement, top: number, left: number) => {
  const { width, height } = menu.getBoundingClientRect();

  const clampedTop = Math.max(0, Math.min(top, window.innerHeight - height));
  const clampedLeft = Math.max(0, Math.min(left, window.innerWidth - width));

  return { top: clampedTop, left: clampedLeft };
};

// Compute coordinates for each placement
const computePosition = (
  placement: PlacementTypes,
  menu: HTMLElement,
  target: HTMLElement,
) => {
  const { width: mw, height: mh } = menu.getBoundingClientRect();
  const {
    top: tt,
    left: tl,
    bottom: tb,
    right: tr,
    width: tw,
    height: th,
  } = target.getBoundingClientRect();

  const positions: Record<PlacementTypes, { top: number; left: number }> = {
    "bottom-left": { top: tb, left: tl },
    "bottom-right": { top: tb, left: tr - mw },
    bottom: { top: tb, left: tl + (tw - mw) / 2 },

    "top-left": { top: tt - mh, left: tl },
    "top-right": { top: tt - mh, left: tr - mw },
    top: { top: tt - mh, left: tl + (tw - mw) / 2 },

    left: { top: tt + (th - mh) / 2, left: tl - mw },
    "left-top": { top: tt, left: tl - mw },
    "left-bottom": { top: tb - mh, left: tl - mw },

    right: { top: tt + (th - mh) / 2, left: tr },
    "right-top": { top: tt, left: tr },
    "right-bottom": { top: tb - mh, left: tr },
  };

  return positions[placement];
};

// Check if menu is off-screen
const isOffScreen = (menu: HTMLElement) => {
  const { x, y, width, height } = menu.getBoundingClientRect();
  return (
    x < 0 ||
    y < 0 ||
    x + width > window.innerWidth ||
    y + height > window.innerHeight
  );
};

const placeMenu = (
  placement: PlacementTypes,
  menu: HTMLElement,
  target: HTMLElement,
) => {
  let finalPlacement = placement;

  let pos = computePosition(placement, menu, target);
  let clamped = clampToViewport(menu, pos.top, pos.left);

  menu.style.top = clamped.top + "px";
  menu.style.left = clamped.left + "px";

  // Try better placements
  if (isOffScreen(menu)) {
    for (const p of placements) {
      const fallbackPos = computePosition(p, menu, target);
      const fallbackClamped = clampToViewport(
        menu,
        fallbackPos.top,
        fallbackPos.left,
      );

      menu.style.top = fallbackClamped.top + "px";
      menu.style.left = fallbackClamped.left + "px";

      if (!isOffScreen(menu)) {
        finalPlacement = p;
        break;
      }
    }
  }

  return finalPlacement;
};

const Menu = ({ children, target, ...props }: MenuProps) => {
  let [
    {
      onClickOutside,
      variant,
      duration,
      onEnter,
      onEntered,
      onExit,
      onExited,
      placement,
      zIndex,
      slotProps,
    },
  ] = useThemeComponent<any>("Menu", props, {});
  const _p: any = {};
  if (placement) _p.placement = placement;
  const p: any = useBreakpointProps(_p);
  placement = p.placement || "bottom-left";

  const isOpen = Boolean(target);
  const [closed, setClosed] = useState(!isOpen);
  const [placed, setPlaced] = useState<PlacementTypes>(placement);
  const menuRef = useRef<HTMLDivElement>(null);

  // Open/close effect
  useEffect(() => {
    if (closed && isOpen) setClosed(false);
  }, [isOpen]);

  useEffect(() => {
    if (!closed && target && menuRef.current) {
      const updatePosition = () => {
        if (menuRef.current && target) {
          requestAnimationFrame(() => {
            const p = placeMenu(placement!, menuRef.current as any, target);
            setPlaced(p);
          });
        }
      };

      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);

      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition, true);
      };
    }
    return;
  }, [closed, target, placement]);

  if (closed) return null;

  return (
    <Portal {...slotProps?.portal}>
      <ClickOutside
        {...slotProps?.clickOutSide}
        onClickOutside={(e: MouseEvent) => {
          if (target?.contains(e.target as any)) return;
          if (e.target !== target) {
            onClickOutside && onClickOutside(e);
          }
        }}
        ref={menuRef}
        sx={{
          position: "fixed",
          zIndex: 1500 + (zIndex || 0),
          ...slotProps?.clickOutSide?.sx,
        }}
      >
        <Transition
          duration={duration ?? 200}
          easing="fast"
          variant={variant ?? "grow"}
          {...slotProps?.transition}
          open={isOpen}
          onEnter={onEnter}
          onEntered={onEntered}
          onExit={onExit}
          onExited={() => {
            setClosed(true);
            onExited && onExited();
          }}
        >
          <Tag
            baseClass="menu-content"
            {...slotProps?.content}
            sxr={{
              overflow: "hidden",
              bgcolor: "default.base",
              shadow: 2,
              radius: 1,
              transformOrigin: getTransformOrigin(placed),
              ...slotProps?.content?.sx,
            }}
          >
            {children}
          </Tag>
        </Transition>
      </ClickOutside>
    </Portal>
  );
};

export default Menu;
