import * as React from 'react';
import DarkModeIcon from '@xanui/icons/DarkMode';
import LightModeIcon from '@xanui/icons/LightMode';
import Stack from '../../src/Stack'
import ViewBox from '../../src/ViewBox'
import IconButton from '../../src/IconButton'
import Text from '../../src/Text'
import List from '../../src/List'
import ListItem from '../../src/ListItem'
import menu from './menus'
import CheckIcon from '@xanui/icons/CheckCircle'
import { AppRoot, createTheme, Transition, useTheme } from '@xanui/core';
import { AuthProvider } from './AuthProvider';

const lightTheme = createTheme("light", {})
const darkTheme = createTheme("dark", {}, 'dark')

const ThemeBox = () => {
    const theme = useTheme()
    return (
        <Stack>
            <IconButton
                onClick={() => {
                    theme.change(theme.name === 'light' ? darkTheme : lightTheme)
                }}
            >
                {theme.name === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
        </Stack>
    )
}

// const Detector = () => {
//     const lorem = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex non perspiciatis ipsam quis vel impedit, adipisci eligendi id eaque deleniti autem culpa nostrum quo optio fuga sint eum? Delectus, libero?'
//     const [content, setContent] = React.useState(lorem)
//     const ref = React.useRef<HTMLElement>(null)

//     React.useEffect(() => {
//         const el = ref.current as HTMLElement
//         const rect = el.getBoundingClientRect()
//         console.log(rect);

//         const observer = new ResizeObserver((entries) => {

//             for (const entry of entries) {
//                 const { width, height } = entry.contentRect;

//                 console.log(entry.contentRect);

//                 // your logic here
//             }
//         });

//         observer.observe(el);
//     }, [])

//     return (
//         <div>
//             <div ref={ref}>
//                 {content}
//             </div>
//             <button
//                 onClick={() => {
//                     setContent(content + lorem)
//                 }}
//             >Add</button>
//         </div>
//     )
// }

const Layout = () => {
    const [, dispatch] = React.useState(0)
    const currentMenuIndex = parseInt(localStorage.getItem("currentMenuIndex") || "0")
    const currentMenu = menu[currentMenuIndex]
    const Render: any = currentMenu?.render || (() => <></>)
    const [theme, setTheme] = React.useState(darkTheme)


    React.useEffect(() => {
        const ele = document.getElementById(`menu-${currentMenuIndex}`)
        if (ele) {
            ele.scrollIntoView()
        }
    }, [])

    return (
        <AuthProvider value={{ auth: "nax" }}>
            <AppRoot
                theme={theme}
                onThemeChange={t => setTheme(t)}
            >
                <Stack height="100vh" flexRow bgcolor="background.primary">
                    <ViewBox
                        width={250}
                        height="100%"
                        bgcolor="background.secondary"
                        endContent={<ThemeBox />}
                    >
                        <Text p={1} variant='text' fontWeight={600} mb={2} color="text.primary">Components</Text>
                        <List p={1} variant="fill" >
                            {
                                menu.map((m, idx) => <ListItem
                                    key={m.label}
                                    // id={`menu-${idx}`}
                                    onClick={() => {
                                        localStorage.setItem("currentMenuIndex", idx.toString())
                                        dispatch(Math.random())
                                    }}
                                    selected={currentMenuIndex === idx}
                                    endIcon={<CheckIcon color={m.done ? "success" : "success.soft"} fontSize={20} />}
                                >
                                    {m.label}
                                </ListItem>)
                            }
                        </List>
                    </ViewBox>
                    <Stack flex={1} height="100%" p={2} overflow="auto">
                        {/* <Transition
                            variant="zoom"
                            open={true}
                            duration={2000}
                            initialTransition
                            exitOnUnmount
                        >
                            <div>
                                Nice
                            </div>
                        </Transition> */}
                        <Render />
                    </Stack>
                </Stack>
            </AppRoot>
        </AuthProvider>
    );
};

export default Layout