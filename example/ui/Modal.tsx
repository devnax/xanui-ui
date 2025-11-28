import React, { useState } from 'react'
import Stack from '../../src/Stack'
import Button from '../../src/Button'
import Text from '../../src/Text'
import useModal from '../../src/useModal'

const Modals = () => {
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
                        modal.open()
                    }}
                >Open</Button>
            </Stack>

        </div>
    )
}

export default Modals