import { Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { DJUsersContext } from "../../contexts/NavigationContext";
import { DJUser } from "../../hooks/useUser";
import { CardWithAvatar } from "../common/explore/CardWithAvatar";
import { UserInfo } from "../common/explore/UserInfo";

const DJUsersPage = () => {
  const { DJUsers } = useContext(DJUsersContext);

  return (
    <Flex justifyContent="center">
      <Flex direction="column" w="100%" h="calc(100vh - 80px)" p="5">
        <Text fontSize="xl" fontWeight="700" textAlign="center" mb="20px">
          DJ Users
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, "2xl": 4 }} spacing="10">
          {DJUsers.map((user: DJUser) => {
            const {
              display_name: name,
              profile_url: username,
              profile_picture,
              cover_photo,
            } = user;
            
            const avatarURL = profile_picture?.includes("https://")
              ? profile_picture
              : "https://files.djfan.app/" + profile_picture;
            const coverURL = cover_photo?.includes("https://")
              ? cover_photo
              : "https://files.djfan.app/" + cover_photo;
            const linkToProfile = "/artists/" + username;

            return (
              <CardWithAvatar
                key={user.user_id}
                avatarProps={{
                  src: avatarURL,
                  name,
                }}
                coverBg={coverURL}
              >
                <UserInfo mt="3" name={name} />
                <Button
                  colorScheme="purple"
                  rounded="full"
                  size="sm"
                  onClick={() => {
                    document.location = linkToProfile;
                  }}
                >
                  Go to Profile
                </Button>
              </CardWithAvatar>
            );
          })}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default DJUsersPage;
