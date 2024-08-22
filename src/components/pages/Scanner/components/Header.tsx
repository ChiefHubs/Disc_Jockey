import { Box, Flex, Link, Image } from "@chakra-ui/react";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
const Header = () => {
  return (
    <Box>
      <Flex bgGradient="linear(to-r, #0e0725, #5c03bc, #e536ab)" borderBottom="1px solid #ffffff" w="100%" justifyContent="center" py="5px">
        <Flex w="100%" maxW="1000px" alignItems="center" justifyContent={"space-between"} p="10px" pr="15px">
          <Flex w="30%" justifyContent="flex-start" display={{ base: "none", md: "flex" }}>
            <Flex
              as="a"
              href="/"
              color="#fff"
              lineHeight="1em"
              gap="5px"
              fontWeight="600"
              fontSize="18px"
              py="5px"
              alignItems="center"
              _hover={{ color: "cyan" }}
            >
              <FaArrowLeft fontSize="12px" />
              Home
            </Flex>
          </Flex>
          <Flex w="60%" justifyContent={{ base: "flex-start", md: "center" }}>
            <Box>
              <Link href="/">
                <Image id="logo" w="120px" src="https://files.djfan.app/images/logo/DJFAN_HOR_WHITE.svg" />
              </Link>
            </Box>
          </Flex>
          <Flex w="30%" justifyContent="flex-end"></Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
