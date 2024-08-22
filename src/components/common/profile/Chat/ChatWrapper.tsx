import { useEffect, useState } from "react";
import { StreamChat, User } from "stream-chat";
import { Chat } from "stream-chat-react";
import ChatPage from ".";
import "stream-chat-react/dist/css/v2/index.css";
import "./index.css";
import { useUser, useUserChatToken } from "../../../../hooks/useUser";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

type Props = {
  isAlreadySubscribed?: boolean;
};

const ChatWrapper = ({ isAlreadySubscribed }: Props) => {
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const { data: user, isLoading: isLoadingUser } = useUser();
  const { data: userChatToken, isLoading: isLoadingChatToken } =
    useUserChatToken();
  const [showModal, setShowModal] = useState(
    isAlreadySubscribed ? false : true
  );

  const initChat = async () => {
    const streamChatClient = new StreamChat(
      import.meta.env.VITE_STREAM_CHAT_API_KEY as string
    );
    const userStreamChat: User = {
      id: user?.user_id?.toString() as string,
      name: user?.username as string,
      image: user?.avatar as string,
    };
    streamChatClient.connectUser(userStreamChat, userChatToken);
    setChatClient(streamChatClient);
  };

  useEffect(() => {
    if (user?.user_id && userChatToken && isAlreadySubscribed) {
      initChat();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userChatToken]);

  const onClose = () => {
    setShowModal(false);
  };

  const onGoToMembership = () => {
    setShowModal(false);
    const currentRoute = window.location.pathname;
    window.location.href = `${currentRoute}?tab=membership`;
  };

  if (!isAlreadySubscribed)
    return (
      <>
        <Modal
          isOpen={showModal}
          onClose={onClose}
          isCentered
          size="xl"
          scrollBehavior="inside"
          closeOnOverlayClick={true}
          closeOnEsc={true}
        >
          <ModalOverlay />
          <ModalContent p={5}>
            <ModalBody>
              <Text fontSize="20px" textAlign="center" fontWeight="600">
                Community chat is only available for Gold and VIP members
              </Text>
            </ModalBody>

            <Button
              variant="link"
              colorScheme="blue"
              size="md"
              onClick={onGoToMembership}
            >
              Click here to become a member
            </Button>
            <Button
              mt="20px"
              variant="solid"
              colorScheme="blue"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>
          </ModalContent>
        </Modal>
      </>
    );

  if (!chatClient || isLoadingUser || isLoadingChatToken) return null;

  return (
    <Chat client={chatClient} theme="str-chat__theme-light">
      <ChatPage />
    </Chat>
  );
};

export default ChatWrapper;
