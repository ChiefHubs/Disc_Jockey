import { Avatar, Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Profile } from "../../../hooks/useProfile";
import { MdOutlineIosShare } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Connection, useUserConnection as patchUserConnection, useMyConnections } from "../../../hooks/useUser";
import { DJUsersContext } from "../../../contexts/NavigationContext";
import LinkQrCode from "../QrCode/LinkQrCode";

interface ProfileProps {
  profile?: Profile;
  onClickMembership: () => void;
  isUserLoggedIn: boolean;
  isComingSoon?: boolean;
}

const ProfileHeader = ({ profile, onClickMembership, isUserLoggedIn, isComingSoon = false }: ProfileProps) => {
  const navigate = useNavigate();
  const [btnActive, setBtnActive] = useState<boolean>(false);
  const { handleClickFollowBtn } = useContext(DJUsersContext);
  const { data: myConnections, refetch } = useMyConnections();
  const [connectionDetails, setConnectionDetails] = useState<any>();
  const location = useLocation();

  useEffect(() => {
    if (profile && myConnections) {
      isConnected(profile.profile_url, myConnections);
    }
  }, [profile, myConnections]);

  const isConnected = (profile_url: string, myConnections: Connection[]) => {
    const connectionDetails = myConnections.find((obj) => obj.url === profile_url);
    if (connectionDetails) {
      setConnectionDetails(connectionDetails);
      setBtnActive(true);
      return true;
    } else {
      setConnectionDetails(false);
      setBtnActive(false);
      return false;
    }
  };

  const handleClick = async () => {
    handleClickFollowBtn(true);
    const res = await patchUserConnection(profile?.profile_url as string);
    if (res.connected) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }

    if (profile?.profile_url && myConnections) {
      refetch().then(() => {
        if (isConnected(profile.profile_url, myConnections)) {
          setBtnActive(true);
        } else {
          setBtnActive(false);
        }
      });
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const avatarSizes = { base: "100px", sm: "150px" };

  return (
    <>
      {isModalOpen && <LinkQrCode onClose={closeModal} urlLocation={`${import.meta.env.VITE_DJFAN_FAN_URL}${location.pathname}`} />}

      <Box
        className="ProfileHeader"
        px={8}
        pt="30px"
        pb="30px"
        mx="auto"
        bg="pink"
        backgroundImage={`url('${profile?.cover_photo}')`}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      >
        <Flex align="center" flexDirection="column">
          <Box>
            <Avatar
              onClick={() => {
                navigate(`/artists/${profile?.profile_url}`);
              }}
              style={{ cursor: "pointer" }}
              display="block"
              flexDirection="row"
              border="3px solid white"
              width={avatarSizes}
              height={avatarSizes}
              src={profile?.profile_picture}
            />
          </Box>
          <Stack spacing={0} align="center" justify="center" p={0} pos="relative">
            <Text fontSize="24px" fontWeight="bold" color="white">
              {profile?.display_name}
            </Text>
            <Text fontSize="16px" color="white">
              {profile?.title}
            </Text>
            <Flex mt="10px" gap="5">
              {isUserLoggedIn &&
                (isComingSoon ? (
                  <Button color={"black"}>Coming soon</Button>
                ) : (
                  <>
                    <Button colorScheme="blue" onClick={onClickMembership}>
                      Memberships
                    </Button>
                    <Button leftIcon={<BiUser />} color={btnActive ? "#805ad5" : "black"} onClick={handleClick}>
                      {btnActive ? "Following" : "Follow"}
                    </Button>
                  </>
                ))}
            </Flex>
          </Stack>
        </Flex>
        {/*
        <Box
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            backgroundColor: "#FFF",
            width: "36px",
            height: "36px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          <BsQrCode style={{ width: "100%", height: "100%", padding: "4px" }} onClick={openModal} />
        </Box>
        */}
        <Box
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "36px",
            height: "36px",
            cursor: "pointer",
          }}
        >
          <MdOutlineIosShare style={{ color: "#FFF", width: "100%", height: "100%", padding: "4px" }} onClick={openModal} />
        </Box>
      </Box>
    </>
  );
};

export default ProfileHeader;
