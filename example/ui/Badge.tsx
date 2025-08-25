import React from 'react'
import Stack from '../../src/Stack'
import Badge from '../../src/Badge'
import IconButton from '../../src/IconButton'
import UserIcon from '@xanui/icons/People'
import Section from '../Layout/Section'

const Badges = () => {
    return (
        <Stack>
            <Section title="Basic" flexRow gap={2}>
                <Badge content={23} >
                    <IconButton>
                        <UserIcon />
                    </IconButton>
                </Badge>
                <Badge>
                    <IconButton variant='alpha'>
                        <UserIcon />
                    </IconButton>
                </Badge>
            </Section>
        </Stack>
    )
}

export default Badges