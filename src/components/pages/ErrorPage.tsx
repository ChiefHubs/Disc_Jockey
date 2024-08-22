import { Flex, Heading } from "@chakra-ui/react";

const ErrorPage = () => {
  return (
    <Flex
      minH="100vh"
      width="100vw"
      bgGradient="linear(to-r, #0e0725, #5c03bc, #e536ab)"
      direction="column"
      alignItems="center"
      pt="100px"
      gap="40px"
    >
      <Heading
        color="#fff"
        fontSize={{ base: "70px", md: "100px" }}
        width={{ base: "100%", md: "700px" }}
        textAlign="center"
        lineHeight="1.2em"
      >
        sorry this page isn't available :(
      </Heading>
      <Flex
        as="a"
        href="/"
        bg="#fff"
        color="#111"
        p="20px"
        borderRadius="20px"
        fontSize={{ base: "30px", md: "40px" }}
        lineHeight="1em"
        fontWeight="600"
        _hover={{ color: "#fff", bg: "#111" }}
      >
        BACK HOME
      </Flex>
    </Flex>
  );
};

export default ErrorPage;
