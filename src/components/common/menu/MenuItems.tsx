import { HStack } from "@chakra-ui/react";

import BioAvatar from "./BioAvatar";
import Notifications from "./Notifications";
import Messages from "./Messages";

export default function UserProfile() {
  return (
    <HStack gap="0px">
      <Notifications />
      <Messages />

      <BioAvatar />
    </HStack>
  );
}
