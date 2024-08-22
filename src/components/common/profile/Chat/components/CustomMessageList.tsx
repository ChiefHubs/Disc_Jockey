
import {
  MessageList,
  useChannelStateContext,
} from "stream-chat-react";
import { CustomMessage } from "./CustomMessage";
import { useEffect, useRef } from "react";

export const CustomMessageList = ({ ownerChannelID }) => {
  const { messages } = useChannelStateContext();
  const totalMessages = useRef(messages?.length);

  useEffect(() => {
    if (messages?.length && messages.length !== totalMessages.current) {
      window.scrollTo(0, document.body.scrollHeight);
      totalMessages.current = messages.length;
    }
  }, [messages]);

  return (
    <MessageList
      Message={() => <CustomMessage ownerChannelID={ownerChannelID} />}
    />
  );
};
