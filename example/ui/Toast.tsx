import React from 'react'
import Stack from '../../src/Stack'
import Button from '../../src/Button'
import Toast from '../../src/Toast'
import Section from '../Layout/Section'
import useToast from '../../useToast'

const Toasts = () => {
    const [open, setOpen] = React.useState(false)
    // const toast = useToast({
    //     title: "Hello World",
    //     content: "This is a toast message",
    //     placement: "bottom-right",
    //     color: "success",
    //     closeable: true
    // })
    // const toast1 = useToast({
    //     title: "Hello World",
    //     content: "This is a toast message",
    //     placement: "bottom-right",
    //     color: "success",
    //     closeable: true
    // })
    return (
        <Stack>
            <Section title="Basic" flexRow gap={2}>
                <Button onClick={() => {
                    Toast({
                        title: "New Toast",
                        content: "This is another toast message",
                        closeable: true,
                        color: "info",
                        placement: "top-center"
                    })
                    Toast({
                        title: "New Toast",
                        content: "This is another toast message",
                        closeable: true,
                        color: "warning",
                        placement: "bottom-left"
                    })
                }}>Toggle</Button>
                {/* <Button onClick={() => toast.show()}>Open</Button> */}
            </Section>
        </Stack>
    )
}

export default Toasts