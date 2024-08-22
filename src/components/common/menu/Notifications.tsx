import {
  Icon,
  IconButton,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuDivider,
  MenuList
} from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";

export default function Notifications() {
  return (
    <Flex alignItems="center" flexDirection="row">
      <Menu>
        <MenuButton transition="all 0.3s" _focus={{ boxShadow: "none" }}>
          <IconButton
            aria-label="icon"
            icon={<FiBell />}
            display="flex"
            m={0}
            p="5px"
            width={{ base: "15px", md: "30px" }}
            height={{ base: "15px", md: "30px" }}
            fontSize={{ base: "25px", md: "25px" }}
            variant="unstyled"
          />
        </MenuButton>
        <MenuList fontSize="lg" bg="white" borderColor="gray.200">
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Billing</MenuItem>
          <MenuDivider />
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
