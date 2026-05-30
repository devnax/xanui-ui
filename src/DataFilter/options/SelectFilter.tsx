"use client";

import React from "react";
import { DataFilterSelect } from "../types";
import Menu from "../../Menu";
import List from "../../List";
import ListItem from "../../ListItem";
import Checkbox from "../../Checkbox";
import IconButton from "../../IconButton";
import Stack from "../../Stack";
import Text from "../../Text";
import Close from "@xanui/icons/Close";
import Add from "@xanui/icons/Add";
import ClearAll from "@xanui/icons/ClearAll";
import Chip from "../../Chip";

type Props = {
  option: DataFilterSelect;
  value: string | null;
  onChange: (value: string | null) => void;
};

const SelectFilter = ({ option, onChange, value }: Props) => {
  const ref: any = React.useRef(null);
  const [target, setTarget] = React.useState<HTMLElement | undefined>();
  return (
    <Stack width={"100%"} bgcolor="default.base" p={1} radius={1}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={"space-between"}
        gap={0.5}
        mb={value ? 0.5 : 0}
      >
        <Text>{option.label}</Text>
        <Stack direction="row" gap={0.5}>
          <IconButton
            size="sm"
            variant="ghost"
            color={"default"}
            onClick={(e: any) => {
              setTarget(e.currentTarget);
            }}
          >
            <Add />
          </IconButton>
          {!!value && (
            <IconButton
              size="sm"
              variant="ghost"
              color={"danger"}
              onClick={() => {
                onChange(null);
              }}
            >
              <ClearAll />
            </IconButton>
          )}
        </Stack>
      </Stack>
      <Stack direction="row" gap={0.5} flexWrap="wrap">
        {!!value && (
          <Chip
            size="sm"
            color="default"
            label={value}
            endIcon={
              <IconButton
                size={16}
                variant={"text"}
                color="default"
                onClick={() => {
                  onChange(null);
                }}
              >
                <Close />
              </IconButton>
            }
          />
        )}
      </Stack>
      <Menu
        target={target}
        onClickOutside={() => setTarget(undefined)}
        placement={"bottom-right"}
      >
        <List width={ref?.current?.offsetWidth || 200} size="sm">
          {option.options.map((opt, index) => (
            <ListItem
              key={index}
              startIcon={<Checkbox checked={value === opt.value} />}
              onClick={() => {
                onChange(opt.value);
              }}
            >
              {opt.label}
            </ListItem>
          ))}
        </List>
      </Menu>
    </Stack>
  );
};

export default SelectFilter;
