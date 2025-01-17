import React from 'react'
import Stack from '../../src/Stack'
import Layer from '../../src/Layer'
import Text from '../../src/Text'
import Button from '../../src/Button'
import Section from '../Layout/Section'
import { Transition } from '@xanui/core'

const Content = ({ name }: any) => {
    return (
        <Stack
            bgcolor="brand.primary"
            height={100}
            justifyContent="center"
            alignItems="center"
            width={100}
            radius={2}
        >
        </Stack>
    )
}


const Transitions = () => {
    const [open, setOpen] = React.useState(false)
    return (
        <Section title="Transitions">
            <div>
                <Transition
                    open={open}
                    variant="zoom"
                >
                    <div>
                        <Content />
                    </div>
                </Transition>
            </div>
            {/* <div>
                <Transition
                    open={open}
                    variant="fadeUp"
                >
                    <div>
                        <Content />
                    </div>
                </Transition>
            </div> */}

            {/* <Transition
                in={open}
                type="fade"
            >
                <Content name="grow" />
            </Transition> */}
            {/* <Transition
                in={open}
                type="zoom"
            >
                <Content name="zoom" />
            </Transition> */}
            <Stack>

            </Stack>
            <Button
                onClick={() => {
                    setOpen(!open)
                }}
            >Open</Button>
        </Section>
    )
}

export default Transitions