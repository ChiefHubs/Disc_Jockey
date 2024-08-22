import { Box, Image, Flex, HStack, Button, Link } from "@chakra-ui/react";
import SignInButton from "./HeaderComponents/SignInButton";
import SignUpButton from "./HeaderComponents/SignUpButton";
import { useNavbar } from "./useNavbar";
import { FaHeadphones } from "react-icons/fa";
import { useUser } from "../../../../hooks/useUser";
// import { useEffect, useState } from "react";

export default function Header() {
  const { rootProps } = useNavbar();
  const { data: user } = useUser();

  return (
    <Box as="nav" role="navigation" position="sticky" top="0" zIndex="docked" bg="bg-accent" {...rootProps}>
      <Flex bg="black" borderBottom="1px solid #ffffff" w="100%" display="flex" justifyContent="center">
        <Flex maxW="1024px" w="100%" alignItems="center" justifyContent={"space-between"} px={{ base: "10px", md: "0px" }} py="10px">
          <Link href="/">
            <Image id="logo" w="100px" src="https://files.djfan.app/images/logo/DJFAN_HOR_WHITE.svg" />
          </Link>
          {!user && (
            <HStack gap="8px">
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
                  window.open("https://creators.djfan.app", "_self");
                }}
                border="2px solid black"
                height="35px"
              >
                <Box fontSize="14px">
                  <FaHeadphones />
                </Box>
                DJ
              </Button>
              <SignUpButton />
              <SignInButton />
            </HStack>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
