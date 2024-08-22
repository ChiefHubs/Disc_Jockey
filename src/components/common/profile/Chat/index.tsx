import { useEffect, useState } from "react";
import { AscDesc, Channel as ChannelType, User } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  LoadingIndicator,
  MessageInput,
  Thread,
  Window,
  useChatContext,
} from "stream-chat-react";
import { useProfile } from "../../../../hooks/useProfile";
import { useParams } from "react-router-dom";
import { useUser, useUserChatToken } from "../../../../hooks/useUser";
import { CustomMessageList } from "./components/CustomMessageList";
import CustomThreadMessage from "./components/CustomThreadMessage";
import './index.css'

const ProfileCommunityChat = () => {
  const { username } = useParams<{ username: string }>();
  const { data: profile } = useProfile(username as string);
  const { client } = useChatContext();
  const [channel, setChannel] = useState<ChannelType>();
  const [loading, setLoading] = useState(true);
  const { data: user } = useUser();
  const { data: userChatToken } = useUserChatToken();

  const initChannel = async () => {
    if (client && user?.user_id && userChatToken && !client.user) {
      const userStreamChat: User = {
        id: user?.user_id?.toString() as string,
        name: user?.username as string,
        image: "",
      };
      await client.connectUser(userStreamChat, userChatToken);
    }
    const filter = {
      type: "messaging",
      id: { $in: [profile?.user_id?.toString() ?? ""] },
      members: {
        $in: [
          user?.user_id?.toString() ?? "",
          profile?.user_id?.toString() ?? "",
        ],
      },
    };
    const sort = [{ last_message_at: -1 as AscDesc }];
    if (client.user) {
      try {
        const channels = await client.queryChannels(filter, sort, {
          watch: true,
          state: true,
        });
        const currentChannel = channels[0];
        setChannel(currentChannel);
      } catch (err) {
        console.log("err", err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (profile?.user_id && profile?.display_name) {
      initChannel();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, userChatToken, user, client]);

  if (!client || loading) {
    return <LoadingIndicator />;
  }

  return (
    <Channel
      channel={channel}
      // ThreadHeader={() => <div></div>}
      ThreadStart={() => <div></div>}
    >
      <Window>
        <ChannelHeader />
        <CustomMessageList
          ownerChannelID={profile?.user_id?.toString() ?? ""}
        />
        <MessageInput />
      </Window>
      <Thread Message={() => <CustomThreadMessage 
        ownerChannelID={profile?.user_id?.toString() ?? ""}
      />}
      />
    </Channel>
  );
};

export default ProfileCommunityChat;
