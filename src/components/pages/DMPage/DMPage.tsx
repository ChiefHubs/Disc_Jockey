import { Box, Flex, Heading } from "@chakra-ui/react";
import { useUser, useUserChatToken } from "../../../hooks/useUser";
import {
  Channel,
  ChannelList,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Window,
  useChatContext,
} from "stream-chat-react";
import { useEffect, useState } from "react";
import { AscDesc, ChannelFilters, User } from "stream-chat";
import { getMyDMChannels } from "../../../hooks/useChat";
import "./index.css";
import ChannelListPreview from "./ChannelListPreview";

const sort = [{ last_message_at: -1 as AscDesc }];

const DMPage = () => {
  const { client, channel: activeChannel } = useChatContext();
  const [loading, setLoading] = useState(true);
  const { data: user } = useUser();
  const { data: userChatToken } = useUserChatToken();
  const [streamChatFilters, setStreamChatFilters] = useState<ChannelFilters>(
    {}
  );

  const initChannel = async () => {
    if (client && user?.user_id && userChatToken && !client.user) {
      const userStreamChat: User = {
        id: user?.user_id?.toString() as string,
        name: user?.username as string,
        image: "",
      };
      await client.connectUser(userStreamChat, userChatToken);
    }
    const myDMChannels = await getMyDMChannels();
    if (!myDMChannels.length) return;
    const filter = {
      type: "messaging",
      id: {
        $in: myDMChannels.map((x) => x.channel_id),
      },
    };
    setStreamChatFilters(filter);
    setLoading(false);
  };

  useEffect(() => {
    initChannel();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, client]);

  if (!client || loading) {
    return <LoadingIndicator />;
  }

  return (
    <Flex h="70vh" flexDirection="column">
      <Box textAlign="center" py="5" bgColor="rgb(133, 83, 244)">
        <Heading color="white">Direct Messages</Heading>
      </Box>
      <Flex flexGrow="1" className="dm-chat">
        <ChannelList
          filters={streamChatFilters}
          sort={sort}
          Preview={ChannelListPreview}
        />
        <Channel>
          <Window>
            <MessageList unsafeHTML={true} />
            {activeChannel &&
              ((activeChannel?.data?.message_count as number) ?? 0) > 0 && (
                <MessageInput />
              )}
          </Window>
        </Channel>
      </Flex>
    </Flex>
  );
};

export default DMPage;
