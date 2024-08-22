import { Heading, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
export default function About() {
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
      <Flex id="about" direction="column" py="50px" align="center">
        <Flex
          bg="white"
          direction="column"
          w={{ base: "80%", md: "50%" }}
          align="center"
          py="30px"
          px={{ base: "20px", md: "50px" }}
          borderRadius="10px"
        >
          <Heading fontSize="28px">What is DJfan?</Heading>
          <Text textAlign="center" pt="6px">
            By supporting creators you love on DJfan, you're becoming an active
            participant in their creative process. As a member, you receive
            exclusive content, community access, behind-the-scenes updates, and
            the pride of fuelling work that matters to you.
          </Text>
        </Flex>
      </Flex>
    </motion.div>
  );
}
