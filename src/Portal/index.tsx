"use client";
import React, { useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom';
import { useTheme, ThemeProvider } from '@xanui/core';
export type PortalProps = {
    children?: React.ReactNode;
    appendTo?: HTMLElement;
    container?: HTMLElement;
}

const Portal = ({ children, appendTo, container }: PortalProps) => {
    const theme = useTheme()
    appendTo = appendTo || document.body

    const c = useMemo(() => {
        let _con: HTMLElement = container || document.createElement("div");
        appendTo.appendChild(_con);
        _con.className = "xui-portal"
        return _con
    }, [])

    useEffect(() => {
        return () => {
            (appendTo as any).removeChild(c);
        }
    }, [])

    return ReactDOM.createPortal(
        <ThemeProvider theme={theme.name}>
            {children}
        </ThemeProvider>,
        c,
    );
}

export default Portal