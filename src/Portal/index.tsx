
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { useTheme, ThemeProvider } from '@xanui/core';
export type PortalProps = {
    children?: React.ReactNode;
    appendTo?: HTMLElement;
    container?: HTMLElement;
}

const Portal = ({ children, appendTo, container }: PortalProps) => {
    const [_container, setContainer] = useState<HTMLElement | undefined>(container)
    const theme = useTheme()

    useEffect(() => {
        appendTo = appendTo || document.body
        let _con: HTMLElement = _container || document.createElement("div");
        appendTo.appendChild(_con);
        _con.className = "xui-portal"
        if (!_container) {
            setContainer(_con)
        }

        return () => {
            (appendTo as any).removeChild(_con);
        }
    }, [])

    if (!_container) return <></>

    return ReactDOM.createPortal(
        <ThemeProvider theme={theme.name}>
            {children}
        </ThemeProvider>,
        _container,
    );
}

export default Portal