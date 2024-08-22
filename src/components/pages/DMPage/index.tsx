import { useEffect, useState } from "react";
import { StreamChat, User } from "stream-chat";
import { Chat } from "stream-chat-react";
import DMPage from "./DMPage";
import "stream-chat-react/dist/css/v2/index.css";
import "./index.css";
import { useUser, useUserChatToken } from "../../../hooks/useUser";

const ChatWrapper = () => {
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const { data: user, isLoading: isLoadingUser } = useUser();
  const { data: userChatToken, isLoading: isLoadingChatToken } =
    useUserChatToken();

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
    if (user?.user_id && userChatToken) {
      initChat();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userChatToken]);

  if (!chatClient || isLoadingUser || isLoadingChatToken) return null;

  return (
    <Chat client={chatClient} theme="str-chat__theme-light">
      <DMPage />
    </Chat>
  );
};

export default ChatWrapper;
