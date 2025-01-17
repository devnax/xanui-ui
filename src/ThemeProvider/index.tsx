import React from 'react'
import { ThemeProvider as RootThemeProvider, ThemeProviderProps as RootThemeProviderProps } from '@xanui/core'
import { RenderComponents } from './RenderRoot'

export type ThemeProviderProps = RootThemeProviderProps & {

}

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
    return (
        <RootThemeProvider
            {...props}
            renderIsRoot={<>
                {props.renderIsRoot}
                <RenderComponents />
            </>}
        >
            {children}
        </RootThemeProvider>
    )
}

export default ThemeProvider