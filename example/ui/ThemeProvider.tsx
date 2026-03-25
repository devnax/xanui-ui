import React from 'react'
import Stack from '../../src/Stack'
import Lists from './List'
import Accodiond from './Accordion'
import Section from '../Layout/Section'
import { createTheme, ThemeProvider } from '@xanui/core'

const lightTheme = createTheme("light", {})
const darkTheme = createTheme("dark", {}, 'dark')

const ThemeProviders = () => {
    return (
        <Stack
            gap={2}
            m={2}
        >
            <Section
                title="List"
                flexRow
                gap={2}
                bgcolor="background.secondary"
                p={2}
                radius={2}
            >
                <Section title="Light Theme">
                    <ThemeProvider
                        theme={lightTheme}
                        p={1}
                        radius={1}
                    >
                        <Lists />
                    </ThemeProvider>
                </Section>
                <Section title="Dark Theme">
                    <ThemeProvider
                        theme={darkTheme}
                        p={1}
                        radius={1}
                    >
                        <Lists />
                    </ThemeProvider>
                </Section>
            </Section>
            {/* 
            <Section
                title="Accodiond"
                flexRow
                gap={2}
                bgcolor="background.secondary"
                p={2}
                radius={2}
            >
                <Section title="Light Theme">
                    <ThemeProvider
                        theme="light"
                        p={1}
                        radius={1}
                    >
                        <Accodiond />
                    </ThemeProvider>
                </Section>
                <Section title="Dark Theme">
                    <ThemeProvider
                        theme="dark"
                        p={1}
                        radius={1}
                    >
                        <Accodiond />
                    </ThemeProvider>
                </Section>
            </Section> */}
        </Stack>
    )
}

export default ThemeProviders