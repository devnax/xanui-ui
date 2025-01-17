import React from 'react'
import MetaBox from "../MetaBox"
import Stack from '../../src/Stack'
import List from '../../src/List'
import ListItem from '../../src/ListItem'
import HomeIcon from '@xanui/icons/round/IconHome';
import InfoIcon from '@xanui/icons/round/IconInfo';


const Lists = () => {
    return (
        <Stack>
            <MetaBox title="List">
                <List width={200}>
                    <ListItem
                        startIcon={<HomeIcon />}
                        endIcon={<InfoIcon />}
                        subtitle="Another Item"
                        selected
                    >Home</ListItem>
                    <ListItem
                        startIcon={<HomeIcon />}
                        endIcon={<InfoIcon />}
                        subtitle="Administration"
                    >About</ListItem>
                    <ListItem>Services</ListItem>
                    <ListItem>Contact</ListItem>
                </List>
            </MetaBox>
        </Stack>
    )
}

export default Lists