import {
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Link,
} from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";

export default function Sidebar() {
  return (
    <DrawerContent>
      <DrawerBody>
        <DrawerCloseButton color="black" />
        <Flex direction="column" pt="20px">
          <Link display="flex" gap="8px" alignItems="center" fontSize="20px">
            <FaHome fontSize="20px" />
            Home
          </Link>

          <p>Some contents...</p>
          <p>Some contents...</p>
        </Flex>
      </DrawerBody>
    </DrawerContent>
  );
}
