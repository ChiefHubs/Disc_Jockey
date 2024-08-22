import { Card, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";

type FeatureCardData = {
  src: string;
  title: string;
  description: string;
};

const featureCardsData: FeatureCardData[] = [
  {
    src: "https://files.djfan.app/images/unlock-exclusive.webp",
    title: "Unlock Exclusive Content",
    description:
      "Access photos, videos, tracks, hidden playlists & more only available here.",
  },
  {
    src: "https://files.djfan.app/images/unreleased-music.webp",
    title: "Unreleased + New Music",
    description:
      "Discover tracks you didn't know existed plus get to preview new tracks before release.",
  },

  {
    src: "https://files.djfan.app/images/backstage.webp",
    title: "Backstage & Guestlists ",
    description:
      "Direct member-only invites for VIP access to DJ sets, after-parties, and secret shows.",
  },

  {
    src: "https://files.djfan.app/images/first-release.webp",
    title: "First Release Tickets ",
    description:
      "Get early access and member discounts for tickets, merch, & other products.",
  },
  {
    src: "https://files.djfan.app/images/one-stop-destination.webp",
    title: "One-Stop Destination",
    description:
      "Get all mixes, tracks, & videos from your favorite DJs in one streamlined platform.",
  },
  {
    src: "https://files.djfan.app/images/direct-communication.webp",
    title: "Direct Communication",
    description:
      "Interact with your favorite DJs and like-minded music lovers in the community.",
  },
  {
    src: "https://files.djfan.app/images/ad-free.webp",
    title: "Ad-Free Experience",
    description:
      "Enjoy uninterrupted music, videos, mixes, masterclasses, without pesky ads.",
  },
];

export default function FeatureCards() {
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      py={{ base: "30px", md: "50px" }}
    >
      <Flex
        flexWrap="wrap"
        gap="20px"
        flexDir="row"
        maxW="1100px"
        justifyContent={{ base: "center", md: "space-between" }}
      >
        <Flex
          bg="linear-gradient(75deg,#8553F4, #811E86)"
          direction="column"
          justifyContent="center"
          w={{ base: "90%", md: "66%" }}
          maxW="1100px"
          align="center"
          py="30px"
          px={{ base: "20px", md: "30px" }}
          borderRadius="10px"
          color="white"
          gap={{ base: "0px", md: "10px" }}
        >
          <Heading fontSize={{ base: "28px", md: "36px" }}>
            Why join DJfan?
          </Heading>
          <Text
            textAlign="center"
            pt="6px"
            fontSize={{ base: "18px", md: "22px" }}
          >
            Creators on DJfan ensure that your support is rewarded. As a member,
            you receive exclusive content, community access, behind-the-scenes
            updates, and the pride of fuelling work that matters to you.
          </Text>
        </Flex>
        {featureCardsData.map((card) => (
          <Card
            key={card.title}
            borderRadius="10px"
            w={{ base: "90%", md: "32%" }}
            overflow="hidden"
            textAlign="center"
            border="2px solid #111"
          >
            <Image maxH="200px" objectFit="cover" src={card.src} />
            <VStack gap="5px" px="15px" py={{ base: "15px", md: "20px" }}>
              <Heading fontSize="20px" fontWeight="700">
                {card.title}
              </Heading>
              <Text w="100%" fontSize="16px" fontWeight="500">
                {card.description}
              </Text>
            </VStack>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
}
