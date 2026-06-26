import React from "react";
import ViewBox from "../../src/ViewBox";
import Text from "../../src/Text";
import Stack from "../../src/Stack";

const Viewboxes = () => {
  return (
    <Stack gap={2}>
      <ViewBox
        border="1px solid"
        borderColor="divider.primary"
        borderRadius={1}
        overflow="hidden"
        height={300}
        horizental
        startContent={<Stack bgcolor="default.primary" width={60}></Stack>}
        endContent={<Stack bgcolor="default.primary" width={60}></Stack>}
      >
        <Text variant="h1">Hello World</Text>
      </ViewBox>
      <ViewBox
        border="1px solid"
        borderColor="divider.primary"
        borderRadius={1}
        overflow="hidden"
        height={300}
        startContent={<Stack bgcolor="default.primary" height={60}></Stack>}
        endContent={<Stack bgcolor="default.primary" height={60}></Stack>}
      >
        <Text>Hello World</Text>
      </ViewBox>
      <ViewBox
        border="1px solid"
        borderColor="divider.primary"
        borderRadius={1}
        overflow="hidden"
        height={300}
        startContent={<Stack bgcolor="default.primary" height={60}></Stack>}
        endContent={<Stack bgcolor="default.primary" height={60}></Stack>}
      >
        <Text>Hello World</Text>
      </ViewBox>
      <ViewBox
        border="1px solid"
        borderColor="divider.primary"
        borderRadius={1}
        overflow="hidden"
        height={300}
        startContent={<Stack bgcolor="default.primary" height={60}></Stack>}
        endContent={<Stack bgcolor="default.primary" height={60}></Stack>}
      >
        <Text>Hello World</Text>
      </ViewBox>
      <ViewBox
        border="1px solid"
        borderColor="divider.primary"
        borderRadius={1}
        overflow="hidden"
        height={300}
        startContent={<Stack bgcolor="default.primary" height={60}></Stack>}
        endContent={<Stack bgcolor="default.primary" height={60}></Stack>}
      >
        <Text>Hello World</Text>
      </ViewBox>
      <ViewBox
        border="1px solid"
        borderColor="divider.primary"
        borderRadius={1}
        overflow="hidden"
        height={300}
        startContent={<Stack bgcolor="default.primary" height={60}></Stack>}
        endContent={<Stack bgcolor="default.primary" height={60}></Stack>}
      >
        <Text>Hello World</Text>
      </ViewBox>
      <ViewBox
        border="1px solid"
        borderColor="divider.primary"
        borderRadius={1}
        overflow="hidden"
        height={300}
        startContent={<Stack bgcolor="default.primary" height={60}></Stack>}
        endContent={<Stack bgcolor="default.primary" height={60}></Stack>}
      >
        <Text>Hello World</Text>
      </ViewBox>
    </Stack>
  );
};

export default Viewboxes;
