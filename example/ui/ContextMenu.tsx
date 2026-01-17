import Stack from '../../src/Stack'
import useContextMenu from '../../src/useContextMenu';
import List from '../../src/List';
import ListItem from '../../src/ListItem';
const Accordions = () => {
    const onContextMenu = useContextMenu({
        children: (
            <List>
                <ListItem onClick={() => onContextMenu.close()}>Hello</ListItem>
                <ListItem>World</ListItem>
            </List>
        )
    })

    return (
        <Stack
            height={200}
            bgcolor={"brand.primary"}
            color="brand.text"
            radius={2}
            p={2}
            alignItems={"center"}
            justifyContent={"center"}
            onContextMenu={onContextMenu}
        >
            click right button to show context menu

        </Stack>
    )
}

export default Accordions