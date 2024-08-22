import { Flex, Heading, Button } from "@chakra-ui/react";
import { FaHeadphones } from "react-icons/fa";

export default function ComingSoon() {
  return (
    <Flex
      w="100%"
      flexDirection="column"
      pt="80px"
      align="center"
      gap="10px"
      bgGradient="linear(to-r, #0e0725, #5c03bc, #e536ab)"
      height="80vh"
      borderTop="2px solid cyan"
    >
      <Heading fontSize={{ base: "28px", md: "32px" }} pb="15px" color="#fff">
        Full profile coming soon!
      </Heading>
      <Button
        bg="white"
        borderRadius="5px"
        leftIcon={<FaHeadphones fontSize="16px" />}
        as="a"
        href="https://djfan.app/explore"
        fontSize="20px"
        lineHeight="1em"
        fontWeight="800"
        color="#111111"
        transition="all 0.3s ease"
        px="20px"
        _hover={{
          bg: "#be04f1",
          color: "#fff",
        }}
      >
        EXPLORE
      </Button>
    </Flex>
  );
}