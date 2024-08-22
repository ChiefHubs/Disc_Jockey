import {
  Avatar,
  Box,
  HStack,
  Text,
  MenuList,
  MenuDivider,
  Menu,
  MenuButton,
  MenuItem,
  Flex,
} from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";

interface SidebarUserProps {
  name: string;
  image: string;
  account: string;
}

export default function SidebarUser(props: SidebarUserProps) {
  const { name, image, account } = props;
  return (
    <HStack spacing="3" ps="2" justify="space-between">
      <Box>
        <Text pb="5px" color="white" fontWeight="medium" fontSize="14px">
          {name}
        </Text>
        <Text color="white" fontSize="12px">
          {account}
        </Text>
      </Box>
      <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
          <Box display="flex">
            <HiDotsVertical color="white" size="20px" />
          </Box>
        </MenuButton>
        <MenuList fontSize="lg" bg="white" borderColor="gray.200">
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Billing</MenuItem>
          <MenuItem>Terms of Use</MenuItem>
          <MenuItem>Privacy Policy</MenuItem>
          <MenuDivider />
          <MenuItem>Sign out</MenuItem>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
        </MenuList>
      </Menu>
    </HStack>
  );
}
