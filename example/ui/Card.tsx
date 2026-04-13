import React from 'react'
import Card from '../../src/Card'
import Image from '../../src/Image'
import Stack from '../../src/Stack'
import GridContainer from '../../src/GridContainer'
import GridItem from '../../src/GridItem'
import Text from '../../src/Text'
import Button from '../../src/Button'

const Cards = () => {
   return (
      <Stack>
         <GridContainer spacing={1}>
            <GridItem xs={6} sm={6} md={4} lg={3} xl={2}>
               <Card variant="outlined" p={0}>
                  <Image
                     src="https://picsum.photos/id/1015/600/400"
                     alt="Random Image"
                     radius={1}
                  />
                  <Stack px={1}>
                     <Text variant="h6">
                        Electronic Gadget
                     </Text>
                     <Text variant="text" color="text.secondary" lineHeight={1.3}>
                        This is a description of the electronic gadget. It has many features and is very useful for daily tasks.
                     </Text>
                     <Stack flexRow gap={1} mt={1}>
                        <Text variant="text" color="primary">
                           $199.99
                        </Text>
                        <Text variant="text" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                           $249.99
                        </Text>
                     </Stack>
                     <Stack flexRow gap={1} mt={2}>
                        <Button variant="fill" size="small">
                           Add to Cart
                        </Button>
                        <Button variant="outline" size="small">
                           View
                        </Button>
                     </Stack>
                  </Stack>
               </Card>
            </GridItem>
            <GridItem xs={6} sm={6} md={4} lg={3} xl={2}>
               <Card p={0}>
                  <Image
                     src="https://picsum.photos/id/1016/600/400"
                     alt="Random Image"
                     radius={1}
                  />
                  <Text variant="h6">
                     Home Appliance
                  </Text>
                  <Text variant="text" color="text.secondary" lineHeight={1.3}>
                     This is a description of the home appliance. It is designed to make your life easier and more comfortable.
                  </Text>
                  <Stack flexRow gap={1} mt={1}>
                     <Text variant="text" color="primary">
                        $89.99
                     </Text>
                     <Text variant="text" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                        $129.99
                     </Text>
                  </Stack>
                  <Stack flexRow gap={1} mt={2}>
                     <Button variant="fill" size="small">
                        Add to Cart
                     </Button>
                     <Button variant="outline" size="small">
                        View
                     </Button>
                  </Stack>
               </Card>
            </GridItem>
         </GridContainer>
      </Stack>
   )
}

export default Cards
