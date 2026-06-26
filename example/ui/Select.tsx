import React, { useState } from "react";
import Stack from "../../src/Stack";
import Select from "../../src/Select";
import Option from "../../src/Option";
import Home from "@xanui/icons/Home";
import Add from "@xanui/icons/Add";

const SelectMenu = () => {
  const [value, setValue] = useState<any>("homess");
  return (
    <div>
      <Stack pt={4} alignItems="center" justifyContent="center">
        <Select
          value={value}
          startIcon={<Home />}
          onChange={(val) => {
            setValue(val);
          }}
        >
          <Option value="homess" startIcon={<Add />}>
            Home
          </Option>
          <Option value="About">About</Option>
          <Option value="Services">Services</Option>
          <Option value="Contact">Contact</Option>
        </Select>
      </Stack>
    </div>
  );
};

export default SelectMenu;
