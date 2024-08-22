import { Box, Flex, IconButton, Button } from "@chakra-ui/react";
import { FaFacebook, FaEnvelope, FaApple, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SocialButtons() {
  return (
    <Box>
      <Flex
        direction="row"
        gap="10px"
        flexWrap="nowrap"
        justifyContent="center"
      >
        <IconButton
          aria-label="Login with Apple"
          icon={<FaApple />}
          color="black"
          border="1px solid lightgray"
          fontSize="30px"
          height="45px"
          width="50px"
          variant="solid"
          background="white"
          _hover={{
            borderColor: "black",
            color: "white",
            background: "black",
          }}
        />
        <IconButton
          aria-label="Login with Google"
          icon={<FcGoogle />}
          border="1px solid lightgray"
          fontSize="25px"
          height="45px"
          width="50px"
          variant="solid"
          background="white"
          _hover={{
            borderColor: "#f2f2f2",
            background: "#f2f2f2",
          }}
        />
        <IconButton
          aria-label="Login with Facebook"
          icon={<FaFacebook />}
          color="#1877F2"
          border="1px solid lightgray"
          fontSize="25px"
          height="45px"
          width="50px"
          variant="solid"
          background="white"
          _hover={{
            borderColor: "#1877F2",
            color: "white",
            background: "#1877F2",
          }}
        />
        <IconButton
          aria-label="Login with Twitter"
          icon={<FaTwitter />}
          color="#1DA1F2"
          border="1px solid lightgray"
          fontSize="25px"
          height="45px"
          width="50px"
          variant="solid"
          background="white"
          _hover={{
            borderColor: "#1DA1F2",
            color: "white",
            background: "#1DA1F2",
          }}
        />
      </Flex>
    </Box>
  );
}
