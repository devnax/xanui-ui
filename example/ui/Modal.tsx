import React, { useState } from 'react'
import Stack from '../../src/Stack'
import Button from '../../src/Button'
import Text from '../../src/Text'
import useModal from '../../src/useModal'
import Modal from '../../src/Modal'
import { Tag } from '@xanui/core'

const Modals = () => {
    const [open, setOpen] = useState(false)
    const modal = useModal(<Stack gap={1} p={2} >
        <Text variant="h6">Modal Header</Text>
        <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, sequi libero reiciendis ipsam aut illo fuga ut nihil iure dolorum quam magni rerum ad fugiat. Nobis sapiente animi eligendi adipisci.
        </Text>
        <Stack
            justifyContent="flex-end"
            direction="row"
            gap={2}
        >
            <Button color="default" onClick={() => modal.close()}>Cancel</Button>
            <Button onClick={() => modal.close()}>Apply</Button>
        </Stack>
    </Stack>)

    return (
        <div>
            <Stack
                pt={40}
                alignItems="center"
                justifyContent="center"
            >
                <Button
                    onClick={(e) => {
                        setOpen(true)
                    }}
                >Open</Button>
                <Button
                    onClick={(e) => {
                        const m = Modal.open(
                            <Stack gap={1} p={2} >
                                <Text variant="h6">Modal Header</Text>
                                <Text>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, sequi libero reiciendis ipsam aut illo fuga ut nihil iure dolorum quam magni rerum ad fugiat. Nobis sapiente animi eligendi adipisci.
                                </Text>
                                <Stack
                                    justifyContent="flex-end"
                                    direction="row"
                                    gap={2}
                                >
                                    <Button color="default" onClick={() => m.close()}>Cancel</Button>
                                    <Button onClick={() => m.close()}>Apply</Button>
                                </Stack>
                            </Stack>)
                    }}
                >Action Modal</Button>
            </Stack>
            <Modal open={open} onClickOutside={() => setOpen(false)}>
                <Stack gap={1} p={2} >
                    <Text variant="h6">Modal Header</Text>
                    <Text>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, sequi libero reiciendis ipsam aut illo fuga ut nihil iure dolorum quam magni rerum ad fugiat. Nobis sapiente animi eligendi adipisci.
                    </Text>
                    <Stack
                        justifyContent="flex-end"
                        direction="row"
                        gap={2}
                    >
                        <Button color="default" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={() => setOpen(false)}>Apply</Button>
                    </Stack>
                </Stack>
            </Modal>
        </div>
    )
}

export default Modals