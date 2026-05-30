import React from "react";
import Stack from "../../src/Stack";
import ButtonGroup from "../../src/ButtonGroup";
import Button from "../../src/Button";
import Section from "../Layout/Section";
import NextIcon from "@xanui/icons/ArrowForward";
import PrevIcon from "@xanui/icons/ArrowBack";

const ButtonGroups = () => {
  return (
    <Stack>
      <Section title="Basic" gap={2} direction="row">
        <ButtonGroup color="default" size="sm">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </ButtonGroup>
        <ButtonGroup color="default" variant="ghost" size="sm">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </ButtonGroup>
      </Section>
      <Section title="Basic" gap={2} direction="row">
        <div>
          <ButtonGroup color="success" variant="fill" size="sm">
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        </div>
        <ButtonGroup color="danger" variant="ghost">
          <Button>
            <PrevIcon />
          </Button>
          <Button>1</Button>
          <Button>2</Button>
          <Button>
            <NextIcon />
          </Button>
        </ButtonGroup>
        <ButtonGroup color="warning" variant="ghost" size="lg">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </ButtonGroup>
      </Section>
    </Stack>
  );
};

export default ButtonGroups;
