import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import { DJUsersProvider } from "../../contexts/NavigationContext";

interface UserLayoutProps {
  children?: React.ReactNode;
}

const UserLayout: FunctionComponent<UserLayoutProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <DJUsersProvider>
      <Box minH="100vh" bg="gray.100">
        <Sidebar onClose={onClose} display={{ base: "none", md: "block" }} />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="xs"
        >
          <DrawerContent>
            <Sidebar onClose={onClose} />
          </DrawerContent>
        </Drawer>

        <Header onOpen={onOpen} />
        <Box ml={{ base: 0, md: 80 }}>{children ?? <Outlet />}</Box>
      </Box>
    </DJUsersProvider>
  );
};

export default UserLayout;
