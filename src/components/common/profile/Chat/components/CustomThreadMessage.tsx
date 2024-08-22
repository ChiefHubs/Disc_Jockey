import {
  Box,
  Avatar,
  VStack,
  Text,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { BiShare, BiSolidFlagAlt } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import { MessageTimestamp, useChannelStateContext } from "stream-chat-react";
import { FaHeadphones } from "react-icons/fa";
import { RiVipCrownFill } from "react-icons/ri";

type Props = {
  ownerChannelID: string;
};

export default function CustomThreadMessage({ ownerChannelID }: Props) {
  const { thread, threadMessages } = useChannelStateContext();

  return (
    <Box>
      {(threadMessages?.length ?? 0) > 0 &&
        threadMessages?.map((threadMessage) => {
          return (
            <HStack
              key={threadMessage.id}
              mt="10px"
              mb="-5px"
              w="100%"
              gap="0px"
              justifyContent={"flex-start"}
              pl="30px"
            >
              <CurvedShape />
              <Flex
                borderRadius="5px"
                alignItems={"center"}
                bg="#e6e1ff"
                py="4px"
                px="15px"
                gap="5px"
                w="min-content"
              >
                <Avatar
                  w="20px"
                  height="20px"
                  src={threadMessage?.user?.image}
                />
                <Flex flexDirection="column">
                  <Text
                    display="flex"
                    fontSize="10px"
                    fontWeight="600"
                    lineHeight="1em"
                    alignItems="center"
                  >
                    {threadMessage?.user?.name}
                  </Text>
                  <Text maxW="100%" lineHeight="1em" fontSize="10px" mt="5px">
                    {threadMessage?.text}
                  </Text>
                </Flex>
              </Flex>
            </HStack>
          );
        })}
      <VStack
        gap="0"
        w="100%"
        mt="10px"
        bg="white"
        left="10px"
        borderRadius="10px"
        overflow="hidden"
      >
        <VStack w="100%" py="15px" pr="15px" pl="10px">
          <HStack w="100%" gap="10px" alignItems="flex-start">
            <Avatar w="40px" height="40px" src={thread?.user?.image} />

            <Stack w="100%" gap="2px">
              <HStack alignItems="flex-start" justify="space-between">
                <HStack gap="4px">
                  <Text
                    display="flex"
                    fontSize="15px"
                    fontWeight="600"
                    lineHeight="1em"
                    alignItems="center"
                    gap="4px"
                  >
                    {thread?.user?.name}
                    {ownerChannelID === thread?.user?.id ? (
                      <FaHeadphones fontSize="15px" color="#7d5aeb" />
                    ) : (
                      <RiVipCrownFill fontSize="15px" color="#06d6a0" />
                    )}
                  </Text>
                  <Text lineHeight="1em" fontSize="10px" ml="2px" mb="-4px">
                    <MessageTimestamp />
                  </Text>
                </HStack>
                <HStack alignItems="flex-start">
                  <Menu>
                    <MenuButton
                      transition="all 0.3s"
                      _focus={{ boxShadow: "none" }}
                    >
                      <Box
                        as={FiMoreHorizontal}
                        size="20px"
                        color="gray"
                        mt="-3px"
                      />
                    </MenuButton>
                    <MenuList
                      minW="max-content"
                      fontSize="14px"
                      bg="white"
                      p="0"
                      m="0"
                      borderColor="gray.200"
                    >
                      <MenuItem py="10px" aria-label="label">
                        <Box as={BiShare} size="14px" mr="8px" />
                        <Text>Reply</Text>
                      </MenuItem>
                      <MenuItem py="10px" aria-label="label">
                        <Box as={BiSolidFlagAlt} size="14px" mr="8px" />
                        <Text>Report</Text>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              </HStack>

              <Text fontSize="14px" lineHeight="1.4em">
                {thread?.text}
              </Text>
            </Stack>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
}

const CurvedShape = () => {
  return (
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 60 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 42C2 19.9086 19.9086 2 42 2H86"
        stroke="#7d5aeb"
        strokeWidth="5"
      />
    </svg>
  );
};
