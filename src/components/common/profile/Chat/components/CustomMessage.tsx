import {
  MessageTimestamp,
  // useChannelStateContext,
  useMessageContext,
} from "stream-chat-react";
import {
  Box,
  Avatar,
  VStack,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Stack,
  Button,
} from "@chakra-ui/react";
import { BiShare, BiSolidFlagAlt } from "react-icons/bi";
import { FaHeadphones } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { RiVipCrownFill } from "react-icons/ri";
// import { useEffect } from "react";

type Props = {
  ownerChannelID: string;
};

export const CustomMessage = ({ ownerChannelID }: Props) => {
  const { message, getMessageActions, handleFlag, handleOpenThread } =
    useMessageContext();
  const messageActions = getMessageActions();
  // const { channel } = useChannelStateContext();

  // const initChannel = async () => {
  //   if (channel && message?.id && (message?.reply_count ?? 0) > 0) {
  //     const res = await channel.getReplies(message.id, { limit: 20 });
  //     console.log("res", res);
  //   }
  // };

  // useEffect(() => {
  //   if (channel) {
  //     initChannel();
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [channel, message]);

  return (
    <VStack
      gap="0"
      w="100%"
      bg="white"
      left="10px"
      borderRadius="10px"
      overflow="hidden"
    >
      <VStack w="100%" py="15px" pr="15px" pl="10px">
        <HStack w="100%" gap="10px" alignItems="flex-start">
          <Avatar w="40px" height="40px" src={message.user?.image} />
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
                  {message.user?.name}
                  {ownerChannelID === message.user?.id ? (
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
                    {messageActions.includes("reply") && (
                      <MenuItem
                        py="10px"
                        aria-label="label"
                        onClick={handleOpenThread}
                      >
                        <Box as={BiShare} size="14px" mr="8px" />
                        <Text>Reply</Text>
                      </MenuItem>
                    )}
                    {messageActions.includes("flag") && (
                      <MenuItem
                        py="10px"
                        aria-label="label"
                        onClick={handleFlag}
                      >
                        <Box as={BiSolidFlagAlt} size="14px" mr="8px" />
                        <Text>Report</Text>
                      </MenuItem>
                    )}
                  </MenuList>
                </Menu>
              </HStack>
            </HStack>
            <Text
              fontSize="14px"
              lineHeight="1.4em"
              dangerouslySetInnerHTML={{
                __html: message.html ?? "",
              }}
            ></Text>
          </Stack>
        </HStack>
        {(message?.reply_count ?? 0) > 0 && (
          <Button
            textAlign="left"
            alignSelf="start"
            ml="50px"
            cursor="pointer"
            fontSize="12px"
            fontStyle="italic"
            fontWeight="800"
            onClick={handleOpenThread}
          >
            {message.reply_count}{" "}
            {message.reply_count === 1 ? "Reply" : "Replies"}
          </Button>
        )}
      </VStack>
    </VStack>
  );
};
