import React, { useEffect, useRef, useState } from "react";
import Stack from "../../src/Stack";
import Input from "../../src/Input";
import IconButton from "../../src/IconButton";
import InputNumber from "../../src/InputNumber";
import Autocomplete from "../../src/Autocomplete";
import SendIcon from "@xanui/icons/Send";
import SearchIcon from "@xanui/icons/Search";
import Section from "../Layout/Section";
import ListItem from "../../src/ListItem";
import RangeSlider from "../../src/RangeSlider";
import Home from "@xanui/icons/Home";

const Inputs = () => {
  const [v, setV] = useState("");
  const ref = useRef<any>(null);
  const [value, setValue] = useState();
  const [num, setNum] = useState();
  const [range_value, setRangeValue] = useState([20, 80, 90]);

  return (
    <Stack gap={2} width={400}>
      <Section title="Range Slider" gap={2} p={2}>
        <Autocomplete
          options={[123, 235, 345, 456, 567]}
          getLabel={function (option: any): string {
            return option.toString();
          }}
        />
      </Section>

      <Section title="Range Slider" gap={2} p={2}>
        <RangeSlider
          color={"warning"}
          value={range_value}
          onChange={(v: any) => {
            setRangeValue(v);
          }}
          thumbContent={({ value }) => {
            return (
              <Stack transform={`translate(-50%, -25px)`}>
                {parseInt(value as any)}%
              </Stack>
            );
          }}
        />
      </Section>
      <Section title="Autocomplete" gap={2}>
        <Autocomplete
          placeholder="Select option"
          options={async (text: string) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                let opts = [
                  { label: "Apple" },
                  { label: "Banana" },
                  { label: "Cherry" },
                  { label: "Date" },
                  { label: "Elderberry" },
                  { label: "Fig" },
                  { label: "Grape" },
                  { label: "Honeydew" },
                  { label: "Indian Fig" },
                  { label: "Jackfruit" },
                  { label: "Kiwi" },
                  { label: "Lemon" },
                  { label: "Mango" },
                  { label: "Nectarine" },
                  { label: "Orange" },
                  { label: "Papaya" },
                  { label: "Quince" },
                  { label: "Raspberry" },
                  { label: "Strawberry" },
                  { label: "Tangerine" },
                  { label: "Ugli Fruit" },
                  { label: "Vanilla" },
                  { label: "Watermelon" },
                ];

                if (text) {
                  opts = opts.filter((o) =>
                    o.label.toLowerCase().includes(text.toLowerCase()),
                  );
                }
                resolve(opts);
              }, 10);
            });
          }}
          getLabel={(option) => option.label}
          value={value}
          onChange={(val) => {
            setValue(val);
          }}
          renderOption={(option, props) => (
            <ListItem {...props}>{option.label}</ListItem>
          )}
        />
      </Section>
      <Section title="Basic" gap={2}>
        <InputNumber
          ref={ref}
          endIcon={<SendIcon />}
          placeholder="Write a message..."
          name="email"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
      </Section>
      <Section title="Basic" gap={2}>
        <Input
          ref={ref}
          endIcon={<SendIcon />}
          placeholder="Write a message..."
          name="email"
          autoFocus
        />
        <Input
          variant="outline"
          startIcon={<SearchIcon />}
          endIcon={<SendIcon />}
        />
      </Section>
      <Section title="Size" gap={2}>
        <Input size="sm" endIcon={<SendIcon />} />
        <Input size="md" endIcon={<SendIcon />} />
        <Input size="lg" endIcon={<SendIcon />} />
      </Section>
      <Section title="Error" gap={2}>
        <Input size="sm" endIcon={<SendIcon />} error />
        <Input
          size="md"
          endIcon={<SendIcon />}
          error
          helperText="Please fill this box"
        />
        <Input size="lg" endIcon={<SendIcon />} />
      </Section>
      <Section title="Disabled" gap={2}>
        <Input size="md" endIcon={<SendIcon />} disabled />
      </Section>
      <Section title="Multiline" gap={2}>
        <Input
          size="md"
          endIcon={
            <IconButton variant="text">
              <SendIcon />
            </IconButton>
          }
          multiline
          value={v}
          placeholder="Type a message..."
          onChange={(nv: any) => {
            setV(nv.target.value);
          }}
        />
      </Section>
      <Section title="Autocomplete" gap={2}>
        <Autocomplete
          placeholder="Select option"
          options={async (text: string) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                let opts = [
                  { label: "Apple" },
                  { label: "Banana" },
                  { label: "Cherry" },
                  { label: "Date" },
                  { label: "Elderberry" },
                  { label: "Fig" },
                  { label: "Grape" },
                  { label: "Honeydew" },
                  { label: "Indian Fig" },
                  { label: "Jackfruit" },
                  { label: "Kiwi" },
                  { label: "Lemon" },
                  { label: "Mango" },
                  { label: "Nectarine" },
                  { label: "Orange" },
                  { label: "Papaya" },
                  { label: "Quince" },
                  { label: "Raspberry" },
                  { label: "Strawberry" },
                  { label: "Tangerine" },
                  { label: "Ugli Fruit" },
                  { label: "Vanilla" },
                  { label: "Watermelon" },
                ];

                if (text) {
                  opts = opts.filter((o) =>
                    o.label.toLowerCase().includes(text.toLowerCase()),
                  );
                }
                resolve(opts);
              }, 10);
            });
          }}
          getLabel={(option) => option.label}
          value={value}
          onChange={(val) => {
            setValue(val);
          }}
          renderOption={(option, props) => (
            <ListItem {...props}>{option.label}</ListItem>
          )}
        />
      </Section>
    </Stack>
  );
};

export default Inputs;
