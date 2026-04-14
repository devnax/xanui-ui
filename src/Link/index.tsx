"use client";
import React, { useMemo } from "react";
import { Tag, TagProps, TagComponentType } from "@xanui/core";

export type LinkProps<T extends TagComponentType = "a"> = Omit<TagProps<T>, "component"> & {
    component?: TagComponentType;

    href?: string;
    target?: React.HTMLAttributeAnchorTarget;
    rel?: string;

    underline?: "none" | "hover" | "always";
    external?: boolean;

    isActive?: boolean;
    isDisabled?: boolean;
};

const Link = React.forwardRef(<T extends TagComponentType = "a">({ children, component, href, target, rel, underline = "hover", external, isActive, isDisabled, ...props }: LinkProps<T>, ref: React.Ref<any>) => {
    const Component = component || "a";

    const isExternal = useMemo(() => {
        if (external !== undefined) return external;
        if (!href) return false;
        return /^https?:\/\//.test(href);
    }, [external, href]);

    const computedRel = useMemo(() => {
        if (isExternal && target === "_blank") {
            return rel || "noopener noreferrer";
        }
        return rel;
    }, [isExternal, target, rel]);

    return (
        <Tag
            {...props}
            ref={ref}
            component={Component}
            href={href}
            target={isExternal ? "_blank" : target}
            rel={computedRel}
            aria-disabled={isDisabled || undefined}
            baseClass="link"
            data-active={isActive || undefined}
            data-disabled={isDisabled || undefined}
            sxr={{
                textDecoration: underline === "always" ? "underline" : "none",
                cursor: isDisabled ? "not-allowed" : "pointer",
                opacity: isDisabled ? 0.6 : 1,
                "&:hover": {
                    textDecoration:
                        underline === "hover" ? "underline" : undefined,
                },
                "&:focus-visible": {
                    outline: "2px solid var(--color-primary)",
                    outlineOffset: "2px",
                },
            }}
        >
            {children}
        </Tag>
    );
}
);

Link.displayName = "Link";

export default Link;