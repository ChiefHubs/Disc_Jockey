import { Flex, Text, Stack, Box } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
interface FeatureProps {
  text: string;
}

const Feature = ({ text }: FeatureProps) => (
  <Stack direction={"row"} align={"center"} px="20px">
    <Text fontWeight="600" color="white" fontSize="16px">
      {text}
    </Text>
  </Stack>
);

const features = [
  { text: "Members-Only Content" },
  { text: "Unreleased Tracks & Previews" },
  { text: "Guestlists & Backstage Passes" },
  { text: "Purchase Tickets Early" },
  { text: "Tour Dates & Set Times" },
  { text: "Behind-The-Scenes" },
  { text: "Direct & Group Chats" },
  { text: "Set Track Lists & Playlists" },
  { text: "Ticket & Merch Discounts" },
  { text: "Meet & Greet Invitations" },
  { text: "Submit Demos for Feedback" },
  { text: "Freebies, Giveaways & Contents" },
];

export default function Features() {
  return (
    <Box py="10px" bg="#e72b91">
      <Marquee>
        <Flex flexWrap="wrap">
          {features.map(({ text }) => (
            <Feature key={text} text={text} />
          ))}
        </Flex>
      </Marquee>
    </Box>
  );
}
