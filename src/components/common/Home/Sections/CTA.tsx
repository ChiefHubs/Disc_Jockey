import { Flex, Text, Stack, Box, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import CreateAccount from "./HeaderComponents/CreateAccount";

export default function Features() {
  return (
    <motion.div
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
        overflow: "hidden",
      }}
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{ backgroundPosition: "100% 50%" }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse",
        repeatDelay: 1,
      }}
    >
      <Box py="10px">
        <Flex flexDir="column" align="center" gap="20px" py="40px">
          <Heading
            color="white"
            fontSize={{ base: "28px", md: "40px" }}
            w={{ base: "90%", md: "80%" }}
            textAlign="center"
            lineHeight="1.2em"
          >
            Discover hidden gems, unlock exclusive content & events, meet DJs,
            and join a community that shares your passion.
          </Heading>
          <CreateAccount />
        </Flex>
      </Box>
    </motion.div>
  );
}
