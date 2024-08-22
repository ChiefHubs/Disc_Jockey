import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Avatars from "./Avatars";
import CreateAccount from "./HeaderComponents/CreateAccount";

export default function Hero() {
  return (
    <Box
      w="100%"
      backgroundImage="url(https://files.djfan.app/images/herobg-dj.webp)"
      display="flex"
      justifyContent="center"
      px={{ base: "15px", md: "10px" }}
      py={{ base: "30px", md: "50px" }}
    >
      <Flex maxW={{ base: "100%", md: "1024px" }} alignItems="center">
        <VStack w={"100%"} gap="20px">
          <Heading
            color="white"
            fontSize={{ base: "36px", md: "58px" }}
            lineHeight="1.2em"
            maxW={{ base: "100%", md: "90%" }}
            textAlign={"center"}
          >
            Engage with top DJ's & become part of their{" "}
            <Text
              bgGradient="linear(to-l, #5bffec, #f480ff)"
              bgClip="text"
              as="span"
            >
              inner circle
            </Text>
            .
          </Heading>

          <Text
            color="white"
            fontWeight="500"
            fontSize={{ base: "20px", md: "24px" }}
            maxW={{ base: "100%", md: "80%" }}
            textAlign={"center"}
          >
            DJfan has everything you want from your favourite DJs,{" "}
            <b>all in one place</b>. Access free & exclusive tracks, mixes,
            videos, playlists, tutorials and more.
          </Text>
          <Box mb={{ base: "20px", md: "24px" }}>
            <CreateAccount />
          </Box>
          <Avatars />
        </VStack>
      </Flex>
    </Box>
  );
}
