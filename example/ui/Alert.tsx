import React from 'react'
import Alert from '../../src/Alert'
import Stack from '../../src/Stack'
import Text from '../../src/Text'
import Button from '../../src/Button'
import useAlert from '../../src/useAlert'

const Alerts = () => {

    const alert = useAlert({
        color: "danger",
        title: "Alert from useAlert Hook",
        okButtonText: "Agree",
        buttonPlacement: "full",
        content: <>
            This is alert content from useAlert hook. you can use this hook to show alert modals in your application.
        </>,
        onConfirm: () => {
            console.log("Alert confirmed")
        }
    })

    return (
        <Stack gap={1}>
            <Button
                onClick={() => {
                    alert.open()
                }}>Open</Button>
            <Alert
                width={300}
                direction="column"
                color="warning"
                variant='alpha'
                title="Warning"
            >
                <Stack
                    gap={2}
                >
                    <Text color="inherit" fontSize="inherit">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.</Text>
                </Stack>
            </Alert>
            <Alert
                title="Information"
                variant='alpha'
                color="danger"
                onClose={() => { }}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam modi dolores, nobis praesentium maxime pariatur, alias aliquam facilis asperiores ratione tenetur fugit laborum doloribus repellat sequi dolorum porro necessitatibus impedit.
            </Alert>
            <Alert
                title="Warning"
                color="warning"
            >
                You have know some thing before continue
            </Alert>
            <Alert
                color="success"
            >
                Your proccess has been success. now you can enjoy
            </Alert>
            <Alert
                title="Information"
                color="brand"
            >
                Your proccess has been success. now you can enjoy
            </Alert>
        </Stack>
    )
}


export default Alerts