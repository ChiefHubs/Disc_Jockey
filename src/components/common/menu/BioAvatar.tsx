import { useNavigate } from "react-router-dom";
import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  HStack,
  Avatar,
  Divider,
  MenuDivider,
  MenuGroup,
} from "@chakra-ui/react";

export default function BioAvatar() {
  const navigate = useNavigate();

  const signOut = function () {
    window.open(import.meta.env.VITE_DJFAN_SIGN_OUT_URL, "_self");
  };

  return (
    <Flex alignItems="center">
      <Menu>
        <MenuButton
          py={2}
          transition="all 0.3s"
          _focus={{ boxShadow: "none" }}
          ml="10px"
        >
          <HStack spacing="4">
            <Avatar
              height="35px"
              width="35px"
              src={""}
              backgroundColor="black"
              border="1px solid #fff"
            />
          </HStack>
        </MenuButton>
        <MenuList fontSize="lg" bg="white" borderColor="gray.200">
          <MenuItem onClick={() => navigate("/me/profile")}>
            My Account
          </MenuItem>
          {/*}
          <MenuItem>Settings</MenuItem>
          <MenuItem>Billing</MenuItem>
          <MenuDivider />
            */}
          <MenuDivider />
          {/* 
          <MenuGroup title="Terms & Policies" ml="3">
          </MenuGroup>
          */}

          <Menu isLazy>
            <MenuButton paddingLeft="8px" paddingTop="4px" paddingBottom="4px">
              Terms & Policies
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate("/terms-of-use")}>
                Terms
              </MenuItem>
              <MenuItem onClick={() => navigate("/privacy-policy")}>
                Privacy
              </MenuItem>
              <MenuItem onClick={() => navigate("/cookies")}>Cookie</MenuItem>
            </MenuList>
          </Menu>

          <Divider padding="4px" />

          <MenuItem onClick={() => (document.location = "/support")}>
            Support
          </MenuItem>

          <Divider padding="4px" />

          <MenuItem onClick={signOut}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
