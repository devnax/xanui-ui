import React, { useState } from "react";
import Stack from "../../src/Stack";
import Avatar from "../../src/Avatar";
import Section from "../Layout/Section";
import AvatarBox from "../../src/AvatarBox";
import AvatarPicker from "../../src/AvatarPicker";
import Box from "../../src/Box";

const Avatars = () => {
  const [avatarPic, setAvatarPic] = useState("");

  return (
    <Stack>
      <Section title="Basic" flexRow gap={2}>
        <Avatar />
        <Avatar size={45} skeleton />
        <Avatar size={50} />
      </Section>
      <Section title="AvatarBox" flexRow gap={2}>
        <Box bgcolor="paper.primary" p={1} radius={1}>
          <AvatarBox
            title="AvatarBox"
            subtitle="This is a subtitle"
            src="https://avatars.githubusercontent.com/u/110792391?v=4"
          />
        </Box>
      </Section>
      <Section title="AvatarPicker" flexRow gap={2}>
        <AvatarPicker
          value={avatarPic}
          defaultPreview="https://avatars.githubusercontent.com/u/110792391?v=4"
          maxSize={1 * 1024}
          avatarSize={50}
          onChange={(file) => {
            console.log(file);
            setAvatarPic(file ? URL.createObjectURL(file as File) : "");
          }}
          onDelete={(file: File | string) => {
            console.log("delete:", file);
            setAvatarPic("");
          }}
        />
      </Section>
    </Stack>
  );
};

export default Avatars;
