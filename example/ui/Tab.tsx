import React, { useState } from "react";
import Stack from "../../src/Stack";
import Select from "../../src/Select";
import Option from "../../src/Option";
import Tabs from "../../src/Tabs";
import Tab from "../../src/Tab";
import Checkbox from "../../src/Checkbox";
import HomeIcon from "@xanui/icons/Home";
import Text from "../../src/Text";
import AddShoppingCart from "@xanui/icons/AddShoppingCart";
import Receipt from "@xanui/icons/Receipt";
import People from "@xanui/icons/People";

const TabItem = ({ color, variant, verticle }: any) => {
  const [val, setVal] = useState<string>("Services");
  color ??= "primary";
  variant ??= "end-line";
  return (
    <Stack gap={3} direction="row" alignItems="center">
      <Tabs
        variant={variant}
        color={color}
        radius={1}
        overflow="hidden"
        bgcolor="default.primary"
        p={1}
        value={val}
        onChange={(v: any) => {
          setVal(v);
        }}
      >
        <Tab value="home" startIcon={<HomeIcon />}></Tab>
        <Tab value="about">About, Naxrul Ahmed</Tab>
        <Tab value="Services">Services for your matches</Tab>
        <Tab value="contact">Contact Us</Tab>
        <Tab value="Blogs">Blogs</Tab>
      </Tabs>
    </Stack>
  );
};

const MobileTab = ({ color, variant, verticle }: any) => {
  const [val, setVal] = useState<string>("home");
  color ??= "primary";
  variant ??= "end-line";
  return (
    <Stack gap={3} direction="row" alignItems="center">
      <Tabs
        variant={variant}
        color={color}
        radius={1}
        overflow="hidden"
        bgcolor="default.primary"
        p={1}
        value={val}
        width={400}
        onChange={(v: any) => {
          setVal(v);
        }}
      >
        <Tab flex={1} value="home" startIcon={<HomeIcon />}></Tab>
        <Tab flex={1} value="cart" startIcon={<AddShoppingCart />}></Tab>
        <Tab flex={1} value="order" startIcon={<Receipt />}></Tab>
        <Tab flex={1} value="profile" startIcon={<People />}></Tab>
      </Tabs>
    </Stack>
  );
};

const TabView = () => {
  const [color, setColor] = useState("primary");
  const [variant, setVariant] = useState("start-line");
  const [verticle, setVerticle] = useState(false);
  return (
    <Stack gap={3}>
      <Stack flexRow gap={2}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Checkbox
            checked={verticle}
            onChange={() => {
              setVerticle(!verticle);
            }}
          />
          <Text>Verticle?</Text>
        </Stack>
        <Select value={color} onChange={(v: any) => setColor(v)}>
          <Option value="primary">primary</Option>
          <Option value="accent">accent</Option>
          <Option value="info">info</Option>
          <Option value="success">success</Option>
          <Option value="warning">warning</Option>
          <Option value="danger">danger</Option>
        </Select>
        <Select value={variant} onChange={(v: any) => setVariant(v)}>
          <Option value="start-line">start-line</Option>
          <Option value="end-line">end-line</Option>
          <Option value="fill">fill</Option>
          <Option value="ghost">ghost</Option>
          <Option value="outline">outline</Option>
          <Option value="text">text</Option>
        </Select>
      </Stack>
      <Stack gap={3}>
        <TabItem color={color} variant={variant} verticle={verticle} />
        <MobileTab color={color} variant={variant} verticle={verticle} />
      </Stack>
    </Stack>
  );
};

export default TabView;
