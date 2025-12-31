"use client";
import { ReactNode, useEffect, useState, useRef } from "react";
import { Tag, TagProps, useBreakpointProps, useBreakpointPropsType, useInterface, TransitionProps, Transition } from "@xanui/core";
import Portal, { PortalProps } from "../Portal";
import ClickOutside from "../ClickOutside";

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
    onClickOutside?: (e: MouseEvent) => void;
    slotProps?: {
        transition?: Omit<TransitionProps, "open">;
        portal?: Omit<PortalProps, "children">;
        content?: Omit<TagProps<"div">, "children">;
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

// Compute coordinates for each placement
const computePosition = (
    placement: PlacementTypes,
    menu: HTMLElement,
    target: HTMLElement
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
    return x < 0 || y < 0 || x + width > window.innerWidth || y + height > window.innerHeight;
};

// Try to place menu and fallback if off-screen
const placeMenu = (placement: PlacementTypes, menu: HTMLElement, target: HTMLElement) => {
    let pos = computePosition(placement, menu, target);
    menu.style.top = pos.top + "px";
    menu.style.left = pos.left + "px";

    if (isOffScreen(menu)) {
        for (const p of placements) {
            const fallbackPos = computePosition(p, menu, target);
            menu.style.top = fallbackPos.top + "px";
            menu.style.left = fallbackPos.left + "px";
            if (!isOffScreen(menu)) return p;
        }
    }
    return placement;
};

const Menu = ({ children, target, ...props }: MenuProps) => {
    let [{ onClickOutside, placement, zIndex, slotProps }] = useInterface<any>("Menu", props, {});
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
        return
    }, [closed, target, placement]);


    if (closed) return null;

    return (
        <Portal {...slotProps?.portal}>
            <ClickOutside
                onClickOutside={(e: MouseEvent) => {
                    if (e.target !== target) {
                        onClickOutside && onClickOutside(e);
                    }
                }}
                ref={menuRef}
                sx={{ position: "fixed", zIndex: 1500 + (zIndex || 0) }}
            >
                <Transition
                    duration={200}
                    easing="fast"
                    variant="grow"
                    {...slotProps?.transition}
                    open={isOpen}
                    onClosed={() => {
                        setClosed(true);
                        slotProps?.transition?.onClosed?.();
                    }}
                >
                    <Tag
                        baseClass="menu-content"
                        {...slotProps?.content}
                        sxr={{
                            overflow: "hidden",
                            bgcolor: "background.primary",
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
