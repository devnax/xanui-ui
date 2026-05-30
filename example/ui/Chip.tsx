import React, { useState } from "react";
import Stack from "../../src/Stack";
import Chip from "../../src/Chip";
import IconButton from "../../src/IconButton";
import Section from "../Layout/Section";
import HomeIcon from "@xanui/icons/Home";
import CloseIcon from "@xanui/icons/Close";

const ChipBox = ({ color }: any) => {
  return (
    <Section title={color} gap={2} flexRow alignItems="center">
      <Chip size="sm" color={color} variant="fill" label="Active" />
      <Chip size="md" color={color} variant="outline" label="Deactive" />
      <Chip size="lg" color={color} variant="ghost" label="Panding" />
      <Chip color={color} variant="text" label="Processing" />
    </Section>
  );
};

const Chips = () => {
  const [value, setValue] = useState("A");
  return (
    <Stack gap={3}>
      <ChipBox color="default" />
      <ChipBox color="primary" />
      <ChipBox color="accent" />
      <ChipBox color="success" />
      <ChipBox color="warning" />
      <ChipBox color="danger" />
      <Section title={"Sizes"} gap={2} flexRow alignItems="center">
        <Chip
          startIcon={<HomeIcon fontSize={16} />}
          size="sm"
          variant="fill"
          label="Hello"
        />
        <Chip
          size="md"
          variant="outline"
          label="Hello"
          startIcon={
            <IconButton variant="fill" size={22}>
              <CloseIcon />
            </IconButton>
          }
          endIcon={
            <IconButton variant="fill" size={22}>
              <CloseIcon />
            </IconButton>
          }
          corner={"rounded"}
        />
        <Chip
          size="lg"
          variant="ghost"
          label="This is a chip box"
          startIcon={
            <IconButton variant="fill" size={22}>
              <CloseIcon />
            </IconButton>
          }
          endIcon={
            <IconButton variant="fill" size={22}>
              <CloseIcon />
            </IconButton>
          }
        />
      </Section>
    </Stack>
  );
};

export default Chips;
