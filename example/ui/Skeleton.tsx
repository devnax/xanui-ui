import React from 'react'
import Skeleton from '../../src/Skeleton'
import Stack from '../../src/Stack'
import Section from '../Layout/Section'

const Skeletons = () => {

   return (
      <Stack>
         <Section title="Basic">
            <Stack p={2} gap={2} borderColor='divider' radius={1} overflow="hidden" maxWidth={600}>
               <Skeleton animation={"wave"} color="default" height={16} radius={2} loading={true} >
                  <Stack p={2} gap={1}>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ut minus sunt quas culpa ratione dicta hic harum dolorem deserunt unde exercitationem debitis impedit, a, quod asperiores officiis vitae at.
                  </Stack>
               </Skeleton>
               <Skeleton loading={true} height={20} width="80%" />
               <Skeleton loading={true} height={20} width="60%" />
               <Skeleton loading={true} height={20} width="90%" />
            </Stack>
         </Section>

      </Stack>
   )
}

export default Skeletons