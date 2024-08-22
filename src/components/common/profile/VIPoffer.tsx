import { Flex, Text, Heading, Stack, Box } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { FaGift } from "react-icons/fa";

export default function VIPoffer() {
  return (
    <motion.div
      style={{
        background: "linear-gradient(-45deg, #40c9ff, #e81cff)",
        backgroundSize: "400% 400%",
        overflow: "hidden",
      }}
      whileHover={{ background: "#0FDD6C" }}
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{ backgroundPosition: "100% 50%" }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse",
        repeatDelay: 1,
      }}
    >
      <Box py="10px">
        <Marquee>
          {Array(50).fill(
            <Flex
              align="center"
              gap="10px"
              py={{ base: "0px", md: "5px" }}
              mx={{ base: "20px", md: "30px" }}
              as="a"
              href="#"
            >
              <Box
                as={FaGift}
                color="white"
                fontSize={{ base: "18px", md: "18px" }}
              />
              <Heading fontSize={{ base: "16px", md: "20px" }} color="white">
                VIP Special Offer
              </Heading>
            </Flex>
          )}
        </Marquee>
      </Box>
    </motion.div>
  );
}
