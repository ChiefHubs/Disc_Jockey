import { Avatar, Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Venue, useVenueConnection } from "../../../hooks/useVenues";
import { useContext, useEffect, useState } from "react";
import { Connection, useMyConnections } from "../../../hooks/useUser";
import { VenueUsersContext } from "../../../contexts/NavigationContext";
import { useLocation } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import LinkQrCode from "../QrCode/LinkQrCode";
import { MdOutlineIosShare } from "react-icons/md";

interface ProfileProps {
  venue?: Venue;
  onClickMembership: () => void;
  isUserLoggedIn: boolean;
}

const VenueHeader = ({ venue, onClickMembership, isUserLoggedIn }: ProfileProps) => {
  isUserLoggedIn;
  const [btnActive, setBtnActive] = useState<boolean>(false);
  const { handleClickFollowBtn } = useContext(VenueUsersContext);
  const { data: myConnections, refetch } = useMyConnections();
  const [connectionDetails, setConnectionDetails] = useState<any>();
  const avatarSizes = { base: "100px", sm: "150px" };
  const location = useLocation();

  useEffect(() => {
    if (venue?.url && myConnections) {
      isConnected(venue.url, myConnections);
    }
  }, [venue, myConnections]);

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
    const res = await useVenueConnection(venue?.url as string);
    if (res.connected) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }

    if (venue?.url && myConnections) {
      refetch().then(() => {
        if (isConnected(venue.url, myConnections)) {
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
        backgroundImage={`url('${venue?.photo}')`}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      >
        <Flex align="center" flexDirection="column">
          <Box>
            <Avatar
              display="block"
              flexDirection="row"
              border="3px solid white"
              width={avatarSizes}
              height={avatarSizes}
              src={venue?.logo}
            />
          </Box>
          <Stack spacing={0} align="center" justify="center" p={0} pos="relative">
            <Text fontSize="24px" fontWeight="bold" color="white">
              {venue?.name}
            </Text>
            <Flex mt="10px" gap="5">
              {isUserLoggedIn && (
                <>
                  <Button colorScheme="blue" onClick={onClickMembership}>
                    Memberships
                  </Button>
                  <Button leftIcon={<BiUser />} color={btnActive ? "#805ad5" : "black"} onClick={handleClick}>
                    {btnActive ? "Following" : "Follow"}
                  </Button>
                </>
              )}
            </Flex>
          </Stack>
        </Flex>
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

export default VenueHeader;
