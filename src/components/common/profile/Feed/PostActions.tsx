import { Flex, Box, Link } from "@chakra-ui/react";
import { FiShare, FiHeart, FiBookmark, FiMessageCircle } from "react-icons/fi";
export default function PostActions() {
  return (
    <Flex p="5px" justifyContent="space-between" mb="10px">
      <Flex justifyContent="flex-start" align="center" gap="10px">
        <Link>
          <Box as={FiHeart} size="25px" color="black" />
        </Link>
        <Link>
          <Box as={FiMessageCircle} size="25px" color="black" />
        </Link>
        <Link>
          <Box as={FiShare} size="22px" color="black" />
        </Link>
      </Flex>
      <Flex justifyContent="flex-end">
        <Link>
          <Box as={FiBookmark} size="25px" color="black" />
        </Link>
      </Flex>
    </Flex>
  );
}
