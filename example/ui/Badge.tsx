import React from 'react'
import Box from '../../src/Box'
import Stack from '../../src/Stack'
import Badge from '../../src/Badge'
import IconButton from '../../src/IconButton'
import Button from '../../src/Button'
import UserIcon from '@xanui/icons/People'
import Section from '../Layout/Section'
import { CameraAlt } from '@xanui/icons'

const Badges = () => {
    const [visible, setVisible] = React.useState(true);
    return (
        <Stack>
            <Section title="Basic" flexRow gap={2}>
                <Box>
                    <Badge content={2} placement={"left-top"} disableTransition>
                        <IconButton>
                            <UserIcon />
                        </IconButton>
                    </Badge>
                </Box>
                <Box>
                    <Button>
                        <Badge content={2} placement={"right-bottom"} disableTransition>
                            <UserIcon />
                        </Badge>
                    </Button>
                </Box>
                <Box>
                    {/* <Badge>
                        <IconButton variant='soft'>
                            <UserIcon />
                        </IconButton>
                    </Badge> */}
                </Box>
                <Badge
                    visible={visible}
                    onClick={() => setVisible(!visible)}
                    // disableTransition
                    placement={"left-bottom"}
                    content={<IconButton
                        color="default"
                    >
                        <CameraAlt />
                    </IconButton>}
                >
                    <Stack width={120} height={120} bgcolor="background.primary" border="1px dashed" borderColor="divider" radius={10}></Stack>
                </Badge>
                <Badge
                    visible={visible}
                    onClick={() => setVisible(!visible)}
                    disableTransition
                    placement={"right-bottom"}
                    content={<IconButton
                        color="default"
                    >
                        <CameraAlt />
                    </IconButton>}
                >
                    <Stack width={120} height={120} bgcolor="background.primary" border="1px dashed" borderColor="divider" radius={10}></Stack>
                </Badge>
                <Badge
                    disableTransition
                    content={2200}
                >
                    <Stack width={120} height={120} bgcolor="background.primary" border="1px dashed" borderColor="divider" ></Stack>
                </Badge>
            </Section>
        </Stack>
    )
}

export default Badges