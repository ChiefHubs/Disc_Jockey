import { Flex, Box, Card, CardHeader, CardBody, Text, Heading, Button, Image, useToast, Center } from "@chakra-ui/react";
import { ProfileEvent } from "../../../hooks/useVenues";
import { BiRightArrowCircle } from "react-icons/bi";
import dayjs from "dayjs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MembershipPrompt from "../profile/MembershipPrompt";
import { useCookies } from "react-cookie";
import VenueNewFanMembership from "./VenueNewFanMembership";
// import { GuestList } from "../../../hooks/useEvents";

interface EventCardProps {
  event: ProfileEvent;
  userEvents?: userEvent[];
  accessLevel: number;
  isUserLoggedIn?: boolean;
  guestlistElement?: any;
}

interface userEvent {
  event_id: number;
  status_id: number;
}

type Lineup = {
  dj: string;
  url: string;
  img: string;
};

const share = function (params = { image: "", title: "", text: "", url: "" }) {
  if (navigator.share) {
    let metaImage = document.querySelector('meta[property="og:image"]');
    if (metaImage == null) {
      metaImage = document.createElement("meta");
      metaImage["property"] = "og:image";
      metaImage["content"] = params.image;
      const head = document.querySelector("head") || null;
      if (head != null) {
        head.insertAdjacentElement("beforeend", metaImage);
      }
    } else {
      metaImage.setAttribute("content", params.image);
    }
    navigator
      .share({
        title: params.title,
        text: params.text,
        url: params.url,
      })
      .then(() => console.log())
      .catch((error) => console.log(error));
  } else {
    navigator.clipboard.writeText(params.url);
    return true;
  }
  return false;
};

export default function EventCard({ event, userEvents, isUserLoggedIn = false, guestlistElement: GuestlistElement }: EventCardProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [userEventStatus, setUserEventStatus] = useState<any>(null);
  const params = useParams();
  const venueurl = params?.venueurl || "";
  const eventurl = params?.eventurl || "";
  const [lineUpList, setLineUpList] = useState<Lineup[]>([]);
  const [, setCookie] = useCookies(["purchase"]);

  const GuestlistComponent: React.FC = () => (GuestlistElement ? <GuestlistElement /> : <></>);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const subscriptionDetails = {
    venuename: venueurl,
    type: "subscription",
    level: "gold",
    event_id: event.id.toString(),
    redirect: "event",
  };

  useEffect(() => {
    if (event.lineup) {
      setLineUpList(JSON.parse(event.lineup));
    }
  }, []);

  useEffect(() => {
    doUserEvents();
  }, [userEvents]);

  const doUserEvents = function () {
    if (userEvents) {
      userEvents.findIndex((item) => {
        if (parseInt(Object.keys(item)[0]) == event.id) {
          setUserEventStatus(Object.values(item)[0]);
        }
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  let daysFromStart = event.guest_invite_start ? dayjs().diff(dayjs(event.guest_invite_start), "day") : -1;
  let daysTillEnd = event.guest_invite_start ? dayjs(event.guest_invite_end).diff(dayjs(), "day") : -1;
  let hoursTillEnd = event.guest_invite_start ? dayjs(event.guest_invite_end).diff(dayjs(), "hour") : -1;

  return (
    <>
      {isUserLoggedIn && <> {isModalOpen && <MembershipPrompt accesslevel={2} onClose={closeModal} memberOf={venueurl} />} </>}

      {!isUserLoggedIn && <> {isModalOpen && <VenueNewFanMembership onClose={closeModal} subscriptionDetails={subscriptionDetails} />}</>}

      <Flex w={{ base: "100%", md: "500px" }} maxW="100%" flexDirection="column" justifyContent="center" align="center" m="auto" p="0px">
        <Card border="2px solid black" borderRadius="15px" overflow="hidden">
          <CardHeader p="0" bg="black">
            <Image
              h="220px"
              bg="#85C1E9"
              objectFit="cover"
              w="100%"
              src={event.artwork}
              alt="Event"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/venues/${venueurl}/event/${event?.url != "" ? event.url : event.id}`);
              }}
            />
            <Flex
              bg="white"
              px="15px"
              py="5px"
              borderTop="solid 2px transparent"
              borderBottom="solid 2px transparent"
              justifyContent="space-between"
            >
              <Text color="black" fontWeight="600">
                {dayjs(event.event_date).format("dddd D MMMM")} , {event.venue} {event?.venue_id > 0 ? "" : event.city}
              </Text>
              <Text color="black" fontWeight="600">
                {event.start_time?.slice(0, 5)}
              </Text>
            </Flex>

            {lineUpList.length > 0 && (
              <>
                <Flex
                  px="15px"
                  py="5px"
                  borderTop="solid 2px transparent"
                  borderBottom="solid 2px transparent"
                  justifyContent="space-between"
                  style={{
                    backgroundColor: "#600170",
                    color: "#FFF",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <Text fontWeight="600">Line up:</Text>
                </Flex>
                <Flex
                  w="100%"
                  justifyContent="center"
                  style={{
                    backgroundColor: "#600170",
                    color: "#FFF",
                    display: "block",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    fontStyle: "italic",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  {lineUpList.map((dj, index) => {
                    if (dj.url == "") {
                      return (
                        <span key={index}>
                          <Text as="span" style={{ padding: "6px", whiteSpace: "nowrap" }}>
                            {dj.dj}
                          </Text>
                          {index < lineUpList.length - 1 ? ", " : ""}
                        </span>
                      );
                    } else {
                      return (
                        <span key={index}>
                          <Text
                            as="span"
                            style={{ fontWeight: "600", fontSize: "18px", whiteSpace: "nowrap", cursor: "pointer" }}
                            onClick={() => {
                              navigate(`/artists/${dj.url}`);
                            }}
                          >
                            {dj.dj}
                          </Text>
                          {index < lineUpList.length - 1 ? ", " : ""}
                        </span>
                      );
                    }
                  })}
                </Flex>
                <Flex
                  style={{
                    backgroundColor: "#600170",
                    color: "#FFF",
                    display: "block",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    height: "10px",
                  }}
                ></Flex>
              </>
            )}

            {!isLoading && (
              <>
                {!isUserLoggedIn && (
                  <>
                    {event.guestlist_available > 0 && daysFromStart >= 0 && daysTillEnd >= 0 && (
                      <Flex
                        bg="#E6E6FA"
                        color="black"
                        borderTop="solid 2px transparent"
                        borderBottom="solid 2px transparent"
                        justifyContent="center"
                        w="100%"
                        minHeight="100px"
                        display="inline-grid"
                        style={{ cursor: "pointer", borderTop: "2px #000 solid", paddingTop: "16px", paddingBottom: "8px" }}
                      >
                        <Box style={{ fontSize: "18px", fontWeight: "400" }}>Secure your spot on the guestlist,</Box>
                        <Box style={{ fontSize: "18px", fontWeight: "400" }}>acquire Gold membership now.</Box>
                        <Flex justifyContent="center" w="100%">
                          <Box p="12px">
                            <button
                              className="gradient-button"
                              style={{
                                fontWeight: "600",
                                fontSize: "1.1em",
                                height: "42px",
                                lineHeight: "1.1em",
                                border: "1px solid #5c03bc",
                              }}
                              onClick={() => {
                                setIsModalOpen(true);
                              }}
                            >
                              {daysTillEnd > 2 && (
                                <>
                                  {" "}
                                  {daysTillEnd} day{daysTillEnd > 1 ? "s" : ""} left,
                                </>
                              )}
                              {daysTillEnd <= 2 && (
                                <>
                                  {" "}
                                  {hoursTillEnd} hour{hoursTillEnd > 1 ? "s" : ""} left,
                                </>
                              )}{" "}
                              click here!
                            </button>
                            <Box style={{ fontSize: "18px", fontWeight: "400", paddingTop: "6px" }}>
                              Still {event.guestlist_available} {event.guestlist_available > 1 ? " passes " : " pass "} available
                            </Box>
                          </Box>
                        </Flex>
                      </Flex>
                    )}
                  </>
                )}

                {isUserLoggedIn && (
                  <>
                    {userEventStatus >= 2 && userEventStatus <= 4 && event.guestlist_available > 0 && (
                      <Box w="100%" justifyContent="center">
                        <Flex
                          bg="#E6E6FA"
                          color="black"
                          justifyContent="center"
                          w="100%"
                          minHeight="100px"
                          display="inline-grid"
                          style={{
                            cursor: "pointer",
                            paddingTop: "16px",
                            paddingBottom: "8px",
                            textAlign: "center",
                          }}
                        >
                          {eventurl == "" ? (
                            <>
                              {userEventStatus >= 2 && userEventStatus <= 3 && (
                                <>
                                  <Box style={{ fontSize: "18px", fontWeight: "400" }}>Get on the guestlist!</Box>
                                  <Button
                                    rightIcon={<BiRightArrowCircle size="22px" />}
                                    fontSize="16px"
                                    flex="1"
                                    variant="solid"
                                    colorScheme="purple"
                                    onClick={() => {
                                      navigate(`/venues/${venueurl}/event/${event?.url != "" ? event.url : event.id}`);
                                    }}
                                  >
                                    {daysTillEnd > 2 && (
                                      <>
                                        {" "}
                                        Only {daysTillEnd} day{daysTillEnd > 1 ? "s" : ""} left.
                                      </>
                                    )}
                                    {daysTillEnd <= 2 && (
                                      <>
                                        {" "}
                                        Only {hoursTillEnd} hour{hoursTillEnd > 1 ? "s" : ""} left.
                                      </>
                                    )}
                                  </Button>
                                </>
                              )}
                              {userEventStatus == 4 && (
                                <Box w="100%" justifyContent="center">
                                  <Flex
                                    bg="#E6E6FA"
                                    color="black"
                                    justifyContent="center"
                                    w="100%"
                                    minHeight="100px"
                                    display="inline-grid"
                                    style={{
                                      cursor: "pointer",
                                      paddingTop: "16px",
                                      paddingBottom: "8px",
                                      textAlign: "center",
                                    }}
                                    onClick={() => {
                                      navigate(`/venues/${venueurl}/event/${event?.url != "" ? event.url : event.id}`);
                                    }}
                                  >
                                    <Box style={{ fontSize: "18px", fontWeight: "400" }}>
                                      You are signed up for the guest list. Your guestlist pass becomes available in{" "}
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
                                  </Flex>
                                </Box>
                              )}
                            </>
                          ) : (
                            <>
                              {userEventStatus >= 2 && userEventStatus <= 4 && (
                                <>
                                  <GuestlistComponent />
                                </>
                              )}
                            </>
                          )}
                        </Flex>
                      </Box>
                    )}

                    {userEventStatus >= 8 && (
                      <Box w="100%" justifyContent="center">
                        <Flex
                          bg="#E6E6FA"
                          color="black"
                          justifyContent="center"
                          w="100%"
                          minHeight="100px"
                          display="inline-grid"
                          style={{
                            cursor: "pointer",
                            paddingTop: "16px",
                            paddingBottom: "8px",
                            textAlign: "center",
                          }}
                        >
                          {eventurl == "" ? (
                            <>
                              <Box style={{ fontSize: "18px", fontWeight: "400" }}>You are on the guest list.</Box>
                              <Button
                                rightIcon={<BiRightArrowCircle size="22px" />}
                                fontSize="16px"
                                flex="1"
                                variant="solid"
                                colorScheme="purple"
                                onClick={() => {
                                  navigate(`/venues/${venueurl}/event/${event?.url != "" ? event.url : event.id}`);
                                }}
                              >
                                Get your guestlist pass here.
                              </Button>
                            </>
                          ) : (
                            <GuestlistComponent />
                          )}
                        </Flex>
                      </Box>
                    )}

                    {!userEventStatus && event.guestlist_available > 0 && (
                      <Box w="100%" justifyContent="center">
                        <Flex
                          bg="#E6E6FA"
                          color="black"
                          justifyContent="center"
                          w="100%"
                          minHeight="100px"
                          display="inline-grid"
                          style={{
                            cursor: "pointer",
                            paddingTop: "16px",
                            paddingBottom: "8px",
                            textAlign: "center",
                          }}
                        >
                          <Box style={{ fontSize: "18px", fontWeight: "400" }}>Secure your spot on the guestlist,</Box>
                          <Box style={{ fontSize: "18px", fontWeight: "400" }}>acquire Gold membership now.</Box>
                          <Flex justifyContent="center" w="100%">
                            <Box p="12px">
                              <button
                                className="gradient-button"
                                style={{
                                  fontWeight: "600",
                                  fontSize: "1.1em",
                                  height: "42px",
                                  lineHeight: "1.1em",
                                  border: "1px solid #5c03bc",
                                }}
                                onClick={() => {
                                  setIsModalOpen(true);
                                }}
                              >
                                {daysTillEnd > 2 && (
                                  <>
                                    {" "}
                                    {daysTillEnd} day{daysTillEnd > 1 ? "s" : ""} left,
                                  </>
                                )}
                                {daysTillEnd <= 2 && (
                                  <>
                                    {" "}
                                    {hoursTillEnd} hour{hoursTillEnd > 1 ? "s" : ""} left,
                                  </>
                                )}{" "}
                                click here!
                              </button>
                              <Box style={{ fontSize: "18px", fontWeight: "400", paddingTop: "6px" }}>
                                Still {event.guestlist_available} {event.guestlist_available > 1 ? " passes " : " pass "} available
                              </Box>
                            </Box>
                          </Flex>
                        </Flex>
                      </Box>
                    )}
                  </>
                )}
              </>
            )}
          </CardHeader>
          <CardBody pt="5px" bg="black">
            <Heading pb="10px" fontSize="28px" color="white">
              {event.event_name}
            </Heading>
            <Text fontSize="14px" color="white">
              {event.description}
            </Text>
            {event?.link_buy_tickets.toString().length > 5 && (
              <Box pt="20px" pb="10px">
                <Button
                  rightIcon={<BiRightArrowCircle size="18px" />}
                  fontSize="16px"
                  flex="1"
                  variant="solid"
                  colorScheme="purple"
                  onClick={() => {
                    open(event.link_buy_tickets);
                  }}
                >
                  Buy Tickets
                </Button>
              </Box>
            )}
          </CardBody>
        </Card>
      </Flex>
    </>
  );
}
