import { Box, Flex, FormControl, FormLabel, Switch, useToast, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { EventGuestListStatus, ProfileEvent, useUserEventData } from "../../hooks/useEvents";
import { getEventGuestList, getVenueEvent, updateVenueGuestListEvent, useVenue, GuestList } from "../../hooks/useVenues";
import VenueEventCard from "../common/venue/VenueEventCard";
import { useMyConnections, useUser } from "../../hooks/useUser";
import QRcode from "../common/profile/Event/QRcode";
import VenueHeader from "../common/venue/VenueHeader";

export default function VenueEventLayout() {
  const params = useParams();
  const venueurl = params?.venueurl || "";
  const eventurl = params?.eventurl || "";
  const { data: venue, isLoading } = useVenue(venueurl as string);
  const [eventData, setEventData] = useState<ProfileEvent | undefined>(undefined);
  const [accessLevel, setAccessLevel] = useState(1);
  const navigate = useNavigate();
  const { data: user } = useUser();
  const [showToggleButton, setShowToggleButton] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  const [toggleButtonDisabled, setToggleButtonDisabled] = useState(false);
  const [guestListData, setGuestListData] = useState<GuestList>();
  const toast = useToast();
  const isUserLoggedIn = !!user?.user_id;
  const { data: myConnections, refetch } = useMyConnections();
  const [connectionDetails, setConnectionDetails] = useState<any>();
  const [userEvents, setUserEvents] = useState<any>([]);

  useEffect(() => {
    if (venueurl && myConnections) {
      const connectionDetails = myConnections.find((obj) => obj.url === venueurl);
      if (connectionDetails) {
        setConnectionDetails(connectionDetails);
        setAccessLevel(connectionDetails.accesslevel_id);
      } else {
        setConnectionDetails(false);
      }
    }
  }, [venueurl, myConnections]);

  const getUserEvents = async () => {
    if (eventData?.id) {
      const eventIds: number[] = [];
      eventIds.push(eventData.id);
      const userEventData = await useUserEventData(eventIds);
      setUserEvents(userEventData);
    }
  };

  useEffect(() => {
    getUserEvents();
  }, [eventData]);

  const fetchEvent = async (venueurl: string, eventurl: string) => {
    try {
      const res = await getVenueEvent(venueurl, eventurl);
      setEventData(
        (res ?? []).find((e) => {
          if (e.url == eventurl || e.id === Number(eventurl)) {
            return e;
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (venueurl && eventurl) {
      fetchEvent(venueurl, eventurl);
    }
  }, [venueurl, eventurl]);

  const fetchGuestList = async (venueurl: string, eventurl: string) => {
    try {
      const resGuestlist = await getEventGuestList(venueurl, eventurl);
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
    if (venueurl && eventData) {
      fetchGuestList(venueurl, String(eventData.event_id));
    }
  }, [venueurl, eventData]);

  useEffect(() => {
    if (guestListData !== undefined) {
      if (guestListData.guestlist && guestListData.status !== EventGuestListStatus.NOT_STARTED) {
        setShowToggleButton(true);
        setToggleState(guestListData.status === EventGuestListStatus.SIGNED_UP);
        setToggleButtonDisabled(!guestListData?.allowChange);
      }
    }
  }, [guestListData]);

  const handleChangeGuestList = async (e) => {
    if (!venueurl || !eventurl) return;

    try {
      const res = await updateVenueGuestListEvent(venueurl, eventurl, e.target.checked);
      if (res.result) {
        setToggleState(!toggleState);
        toast({
          title: `Guest list ${e.target.checked ? "enabled" : "disabled"}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const daysTillEnd = eventData?.guest_invite_start ? dayjs(eventData?.guest_invite_end).diff(dayjs(), "day") : -1;
  const hoursTillEnd = eventData?.guest_invite_start ? dayjs(eventData?.guest_invite_end).diff(dayjs(), "hour") : -1;

  const GuestlistElement: React.FC = () => (
    <Box>
      {guestListData && guestListData.status_id <= 4 && (
        <>
          {showToggleButton && (
            <>
              <Box>
                {toggleState && (
                  <Box style={{ fontSize: "18px", fontWeight: "400" }}>
                    You are signed up for the guest list.
                    <br /> Your guestlist pass becomes available in{" "}
                    {daysTillEnd > 2 && (
                      <>
                        {" "}
                        {daysTillEnd} day{daysTillEnd > 1 ? "s" : ""}.<br />
                      </>
                    )}
                    {daysTillEnd <= 2 && (
                      <>
                        {" "}
                        {hoursTillEnd} hour{hoursTillEnd + 1 > 1 ? "s" : ""}.<br />
                      </>
                    )}{" "}
                    We inform you by email when ready.{" "}
                  </Box>
                )}
              </Box>
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
            </>
          )}
        </>
      )}

      {guestListData && guestListData.status_id >= 8 && (
        <>
          <Flex>
            <Box w="100%">
              <Box
                w="100%"
                style={{
                  textAlign: "center",
                  fontSize: "1.1em",
                  fontWeight: "600",
                }}
              >
                You are on guestlist!
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
        </>
      )}
    </Box>
  );

  const handleClickMembership = () => {};

  return (
    <>
      <VenueHeader venue={venue} onClickMembership={handleClickMembership} isUserLoggedIn={isUserLoggedIn} />
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
          <Box w="100%">
            {eventData && (
              <VenueEventCard
                event={eventData}
                userEvents={userEvents}
                isUserLoggedIn={isUserLoggedIn}
                accessLevel={accessLevel}
                guestlistElement={GuestlistElement}
              />
            )}
          </Box>
        </Box>
      </Flex>
    </>
  );
}
