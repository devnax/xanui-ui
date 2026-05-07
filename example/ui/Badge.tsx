import React from "react";
import Box from "../../src/Box";
import Stack from "../../src/Stack";
import Badge from "../../src/Badge";
import IconButton from "../../src/IconButton";
import Button from "../../src/Button";
import UserIcon from "@xanui/icons/People";
import Section from "../Layout/Section";

const Badges = () => {
   const [visible, setVisible] = React.useState(true);
   return (
      <Stack>
         <Section title="Basic" flexRow gap={2}>
            <Box>
               <Badge
                  placement={"left-top"}
                  visible
                  color={"danger"}
                  disableTransition
               >
                  <IconButton>
                     <UserIcon />
                  </IconButton>
               </Badge>
            </Box>
            <Box>
               <Button>
                  {/* <Badge content={2} placement={"right-bottom"} disableTransition>
                            <UserIcon />
                        </Badge> */}
               </Button>
            </Box>
            <Box>
               {/* <Badge>
                        <IconButton variant='ghost'>
                            <UserIcon />
                        </IconButton>
                    </Badge> */}
            </Box>
            {/* <Badge
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
                    <Stack width={120} height={120} bgcolor="default.base" border="1px dashed" borderColor='default.divider' radius={10}></Stack>
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
                    <Stack width={120} height={120} bgcolor="default.base" border="1px dashed" borderColor='default.divider' radius={10}></Stack>
                </Badge>
                <Badge
                    disableTransition
                    content={2200}
                >
                    <Stack width={120} height={120} bgcolor="default.base" border="1px dashed" borderColor='default.divider' ></Stack>
                </Badge> */}
         </Section>

         <Section title="Colors" flexRow gap={2}>
            <Badge color="danger" content={1} visible={visible}>
               <IconButton onClick={() => setVisible(!visible)}>
                  <UserIcon />
               </IconButton>
            </Badge>
         </Section>
      </Stack>
   );
};

export default Badges;
