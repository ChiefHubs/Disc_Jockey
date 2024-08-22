import { Box, Flex, Image, Link, Text, HStack, Menu, Button, MenuButton, MenuList, MenuItem, Divider } from "@chakra-ui/react";
import {
  // FaChevronDown, FaArrowRight,
  FaHeadphones,
} from "react-icons/fa";
import SignInButton from "./HeaderComponents/SignInButton";
import SignUpButton from "./HeaderComponents/SignUpButton";

export default function Footer() {
  const legalLinks = [
    { path: "/privacy-policy", label: "Privacy Policy" },
    { path: "/terms-of-use", label: "Terms of Use" },
    { path: "/cookies", label: "Cookie Notice" },
    /*
      {
        { path: "/#", label: "Complaints Policy" },
        { path: "/#", label: "DMCA" },
      },
    */
  ];

  // const languageOptions = [
  //   { code: "🇬🇧", label: "English" },
  //   { code: "🇪🇸", label: "Español" },
  // ];

  return (
    <Flex
      as="footer"
      bg="black"
      gap="10px"
      justifyContent={{ base: "center", md: "space-between" }}
      flexDirection={{ base: "column", md: "row" }}
      py={{ base: "20px" }}
      align="center"
      px={{ base: "10px", md: "50px" }}
    >
      <Flex align="center" gap="20px" maxW="1200px" flexDirection={{ base: "column", md: "row" }}>
        <Link href="/">
          <Image w="130px" src="https://files.djfan.app/images/logo/DJFAN_HOR_WHITE.svg" />
        </Link>
        <HStack gap="15px">
          <Button
            ml={{ base: "0px", md: "10px" }}
            display="flex"
            alignItems="center"
            gap="4px"
            color="#111111"
            background="-webkit-linear-gradient(90deg, hsla(152, 100%, 50%, 1) 0%, hsla(186, 100%, 69%, 1) 100%);"
            px="8px"
            py="4px"
            borderRadius="5px"
            fontWeight="600"
            transition="all 0.3s ease"
            onClick={() => {
              window.open("https://djfan.app", "_self");
            }}
            border="2px solid black"
            height="35px"
          >
            <Box fontSize="14px">
              <FaHeadphones />
            </Box>
            DJ ACCESS
          </Button>

          <SignUpButton />
          <SignInButton />

          {/* 
          <Box
            bg="#ffffff"
            as="a"
            href="#"
            ml={{ base: "0px", md: "10px" }}
            display="flex"
            alignItems="center"
            gap="4px"
            color="#111111"
            px="8px"
            py="4px"
            borderRadius="5px"
            fontWeight="600"
            onClick={}
          >
            SIGN IN
            <Box fontSize="14px">
              <FaArrowRight />
            </Box>
          </Box>
          */}

          {/* 
          <Menu>
            <MenuButton as={Box} cursor="pointer">
              <Box
                ml={{ base: "0px", md: "10px" }}
                display="flex"
                alignItems="center"
                gap="4px"
                color="#111111"
                background="-webkit-linear-gradient(90deg, hsla(152, 100%, 50%, 1) 0%, hsla(186, 100%, 69%, 1) 100%);"
                px="8px"
                py="4px"
                borderRadius="5px"
                fontWeight="600"
              >
                <Box fontSize="14px">
                  <FaHeadphones />
                </Box>
                DJ ACCESS
              </Box>
            </MenuButton>
            <MenuList minW="unset">
              <MenuItem
                as="a"
                href="https://creators.djfan.app/sign-in/"
                fontWeight="600"
              >
                DJ SIGN IN
              </MenuItem>
              <MenuItem
                as="a"
                href="https://creators.djfan.app/creator-signup/"
                fontWeight="600"
              >
                DJ SIGN UP
              </MenuItem>
            </MenuList>
          </Menu>
        */}
        </HStack>
      </Flex>
      <Divider mt="15px" display={{ base: "flex", md: "none" }} />
      <Flex alignItems="center" gap={{ base: "10px", md: "10px" }} flexDirection={{ base: "column", md: "row" }} wrap="nowrap">
        <HStack gap="20px">
          <Link color="white" fontWeight="600" fontSize="16px" href="/support">
            Support
          </Link>
          <Menu>
            <MenuButton as={Link} color="white" fontWeight="600" fontSize="16px">
              Legal
            </MenuButton>
            <MenuList minW="unset" color="#111111">
              {legalLinks.map((link, ind) => (
                <MenuItem as="a" href={link.path} key={(link?.path ?? "") + ind}>
                  {link.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </HStack>
        {/* TODO: hide for now as requirement, enable later */}
        {/* <Menu>
          <MenuButton as={Box} cursor="pointer">
            <Box
              ml={{ base: "0px", md: "10px" }}
              display="flex"
              alignItems="center"
              gap="4px"
              color="#ffffff"
              border="1px solid white"
              px="8px"
              py="4px"
              borderRadius="5px"
              fontWeight="600"
              fontSize="14px"
            >
              English 🇬🇧
              <Box fontSize="12px">
                <FaChevronDown />
              </Box>
            </Box>
          </MenuButton>
          <MenuList minW="unset" fontSize="14px" fontWeight="500">
            {languageOptions.map((option) => (
              <MenuItem as="a" href="#" key={option.code}>
                {option.label} {option.code}
              </MenuItem>
            ))}
          </MenuList>
        </Menu> */}
        <Text ml={{ base: "0px", md: "10px" }} fontSize="sm" color="white">
          &copy; {new Date().getFullYear()} DJfan Ltd. All rights reserved.
        </Text>
      </Flex>
    </Flex>
  );
}
