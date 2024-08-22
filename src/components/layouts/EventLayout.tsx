import { Box, Button, Flex, FormControl, FormLabel, Spacer, Switch, useToast, Show, Hide, Center, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  EventGuestListStatus,
  GuestList,
  ProfileEvent,
  getEventById,
  getGuestListEvent,
  updateGuestListEvent,
} from "../../hooks/useEvents";
import EventCard from "../common/profile/Feed/EventCard";
import { useUser } from "../../hooks/useUser";
import { getMySubscriptionDetails, useProfile } from "../../hooks/useProfile";
import { AccessLevel } from "../pages/meProfile/Subscriptions";
import FloatingBackButton from "../../components/common/Buttons/FloatingBackButton";
import QRcode from "../common/profile/Event/QRcode";
import ProfileHeader from "../common/profile/ProfileHeader";

export default function EventLayout() {
  const params = useParams<{ eventId: string; username: string }>();
  const { eventId, username } = params;
  const [eventData, setEventData] = useState<ProfileEvent | undefined>(undefined);
  const navigate = useNavigate();
  const { data: user } = useUser();
  const { data: profile, isLoading } = useProfile(username as string);
  const [showToggleButton, setShowToggleButton] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  const [toggleButtonDisabled, setToggleButtonDisabled] = useState(false);
  const [guestListData, setGuestListData] = useState<GuestList>();
  const toast = useToast();
  const [infoMessageGuestlist, setInfoMessageGuestlist] = useState<string>("");
  const isUserLoggedIn = !!user?.user_id;

  const fetchEvent = async (username: string, eventId: string) => {
    try {
      const res = await getEventById(username, eventId);
      setEventData(
        (res ?? []).find((e) => {
          if (e.url == eventId || e.id === Number(eventId)) {
            return e;
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (eventId && username) {
      fetchEvent(username, eventId);
    }
  }, [eventId, username]);

  const fetchGuestList = async (username: string, eventId: string) => {
    try {
      const resGuestlist = await getGuestListEvent(username, eventId);
      setGuestListData({
        guestlist: resGuestlist.guestlist,
        status: resGuestlist.status,
        allowChange: resGuestlist["allow-change"],
        status_id: resGuestlist.status_id,
        code: resGuestlist.code,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (eventData && username) {
      fetchGuestList(username, String(eventData.event_id));
    }
  }, [eventData]);

  useEffect(() => {
    if (guestListData !== undefined) {
      if (guestListData.status == EventGuestListStatus.ON_SHORT_LIST) {
        setInfoMessageGuestlist("For now you are on the short list, we keep you informed.");
      }
      if (guestListData.status == EventGuestListStatus.ON_LIST) {
        setInfoMessageGuestlist("Congratulation, you made the guestlist!");
      }
      if (guestListData.status == EventGuestListStatus.OFF_LIST) {
        setInfoMessageGuestlist("Unfortunately, the guestlist is full. Keep an eye out as there will be more opportunities!");
      }
    }
    //isValidMember !== undefined || isValidMember &&
    if (guestListData !== undefined) {
      if (guestListData && guestListData.status !== EventGuestListStatus.NOT_STARTED) {
        setShowToggleButton(true);
        setToggleState(guestListData.status === EventGuestListStatus.SIGNED_UP);
        setToggleButtonDisabled(!guestListData?.allowChange);
      }
    }
  }, [guestListData]);

  const handleChangeGuestList = async (e) => {
    if (!username || !eventId) return;

    try {
      const res = await updateGuestListEvent(username, eventId, e.target.checked);
      if (res.result) {
        toast({
          title: `Guest list ${e.target.checked ? "enabled" : "disabled"}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleClickMembership = () => {
    /*
    const tab = tabs.find((t) => t.tabName === "membership");
    setCurrentArtistTab(tabs.indexOf(tab as ArtistTab));
    setSearchParams({ tab: tab?.tabName as string });
    */
  };

  return (
    <>
      <ProfileHeader profile={profile} isUserLoggedIn={isUserLoggedIn} onClickMembership={handleClickMembership} />
      <Flex
        w="100%"
        flexDirection="column"
        align="center"
        justify="center"
        p={{
          base: "20px",
          md: "50px",
        }}
      >
        <Box width={{ base: "100%", md: "500px" }}>
          {(infoMessageGuestlist != "" || showToggleButton) && (
            <>
              <Box
                w="100%"
                style={{
                  backgroundColor: "purple",
                  color: "#fff",
                  borderRadius: "8px",
                  marginBottom: "15px",
                  padding: "4px",
                }}
              >
                {infoMessageGuestlist == "" && showToggleButton && (
                  <FormControl display="flex" alignItems="center" mt="10px">
                    <Center w="100%">
                      <FormLabel htmlFor="guestlist" style={{ fontSize: "1.2em", fontWeight: "600" }}>
                        Subscribe to guest list
                      </FormLabel>
                      <Switch
                        id="guestlist"
                        defaultChecked={toggleState}
                        checked={toggleState}
                        isDisabled={toggleButtonDisabled}
                        onChange={handleChangeGuestList}
                        mb="2"
                        size="lg"
                      />
                    </Center>
                  </FormControl>
                )}

                {infoMessageGuestlist != "" && (
                  <Flex paddingTop="10px">
                    <Box w="100%" style={{ padding: "10px" }}>
                      <Box
                        w="100%"
                        style={{
                          textAlign: "center",
                          fontSize: "1.1em",
                          fontWeight: "600",
                        }}
                      >
                        {infoMessageGuestlist}
                      </Box>
                      <Box w="100%" style={{ textAlign: "center" }}>
                        {guestListData?.code != "" && (
                          <>
                            <QRcode link={guestListData?.code || ""} />
                          </>
                        )}
                      </Box>
                    </Box>
                  </Flex>
                )}
              </Box>
            </>
          )}

          <Box w="100%">
            {eventData && <EventCard event={eventData} isUserLoggedIn={isUserLoggedIn} guestListData={guestListData} singlePage={true} />}
          </Box>
        </Box>
      </Flex>
    </>
  );
}

{
  /*
<>
            <Hide breakpoint="(max-width: 768px)">
              <Flex paddingTop="10px">
                <Box w="100%" mb="20px">
                  <Spacer />
                  <Button
                    fontSize="16px"
                    variant="solid"
                    colorScheme="purple"
                    onClick={() => {
                      navigate(`/artists/${username}?tab=events`);
                    }}
                  >
                    back
                  </Button>
                </Box>
              </Flex>
            </Hide>
            <Show breakpoint="(max-width: 768px)">
              <Box style={{ height: "30px" }}>
                <FloatingBackButton
                  btnText="back"
                  onClickHandler={() => {
                    navigate(`/artists/${username}?tab=events`);
                  }}
                />
              </Box>
            </Show>
          </>
        */
}
