import {
  Flex,
  Box,
  Card,
  CardHeader,
  CardBody,
  Text,
  Heading,
  Button,
  Image,
  useToast,
} from "@chakra-ui/react";
import { GuestList, ProfileEvent } from "../../../../hooks/useEvents";
import { BiRightArrowCircle } from "react-icons/bi";
import dayjs from "dayjs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MembershipPrompt from "../../../common/profile/MembershipPrompt";
import MembershipPromptNew from "../../../common/profile/MembershipPromptNew";
import { useCookies } from "react-cookie";
// import { v4 as uuidv4 } from "uuid";
// import { Helmet, HelmetData } from "react-helmet-async";

interface EventCardProps {
  event: ProfileEvent;
  userEvents?: userEvent[];
  guestListData?: GuestList;
  isUserLoggedIn?: boolean;
  singlePage?: boolean;
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

export default function EventCard({
  event,
  userEvents = [],
  isUserLoggedIn = false,
  singlePage = false,
  guestListData,
}: EventCardProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [userEventStatus, setUserEventStatus] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lineUpList, setLineUpList] = useState<Lineup[]>([]);
  const { username } = useParams<{ username: string }>();
  const [, setCookie] = useCookies(["purchase"]);

  useEffect(() => {
    if (event.lineup) {
      setLineUpList(JSON.parse(event.lineup));
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const subscriptionDetails = {
    djname: username || "",
    type: "subscription",
    level: "gold",
    event_id: event.id.toString(),
    redirect: "event",
  };

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

  let daysFromStart = event.guest_invite_start
    ? dayjs().diff(dayjs(event.guest_invite_start), "day")
    : -1;
  let daysTillEnd = event.guest_invite_start
    ? dayjs(event.guest_invite_end).diff(dayjs(), "day")
    : -1;
  let hoursTillEnd = event.guest_invite_start
    ? dayjs(event.guest_invite_end).diff(dayjs(), "hour")
    : -1;

  return (
    <>
      {isUserLoggedIn && (
        <>
          {isModalOpen && (
            <MembershipPrompt
              accesslevel={2}
              onClose={closeModal}
              urlLocation={window.location.href}
            />
          )}
        </>
      )}

      {!isUserLoggedIn && (
        <>
          {" "}
          {isModalOpen && (
            <MembershipPromptNew
              onClose={closeModal}
              subscriptionDetails={subscriptionDetails}
            />
          )}
        </>
      )}

      <Flex
        w={{ base: "100%", md: "500px" }}
        maxW="100%"
        flexDirection="column"
        justifyContent="center"
        align="center"
        m="auto"
        p="0px"
      >
        <Card border="2px solid black" borderRadius="15px" overflow="hidden">
          <CardHeader p="0" bg="black">
            <Image
              h="220px"
              bg="#85C1E9"
              objectFit="cover"
              w="100%"
              src={event.artwork}
              alt="Event"
              style={{ cursor: !singlePage ? "pointer" : "" }}
              onClick={() => {
                if (!singlePage) {
                  navigate(
                    `${pathname}/event/${
                      event?.url != "" ? event.url : event.id
                    }`
                  );
                }
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
                {dayjs(event.event_date).format("dddd D MMMM")} ,{" "}
                {event?.venue_id > 0
                  ? event.venue_name
                  : event.venue + " " + event.city}
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
                          <Text
                            as="span"
                            style={{ padding: "6px", whiteSpace: "nowrap" }}
                          >
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
                            style={{
                              fontWeight: "600",
                              fontSize: "18px",
                              whiteSpace: "nowrap",
                              cursor: "pointer",
                            }}
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
                    {event?.guest_invite_number > 0 &&
                      daysFromStart >= 0 &&
                      daysTillEnd >= 0 &&
                      event.guestlist_available > 0 && (
                        <Flex
                          bg="#E6E6FA"
                          color="black"
                          borderTop="solid 2px transparent"
                          borderBottom="solid 2px transparent"
                          justifyContent="center"
                          w="100%"
                          minHeight="100px"
                          display="inline-grid"
                          style={{
                            cursor: "pointer",
                            borderTop: "2px #000 solid",
                            paddingTop: "16px",
                            paddingBottom: "8px",
                            textAlign: "center",
                          }}
                        >
                          <Box style={{ fontSize: "18px", fontWeight: "400" }}>
                            Secure your spot on the guestlist,
                          </Box>
                          <Box style={{ fontSize: "18px", fontWeight: "400" }}>
                            acquire Gold membership now.
                          </Box>
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
                                  /* handleClickPurchaseWithoutRegistration(event.id.toString()); */
                                }}
                              >
                                {daysTillEnd > 2 && (
                                  <>
                                    {" "}
                                    {daysTillEnd} day
                                    {daysTillEnd > 1 ? "s" : ""} left,
                                  </>
                                )}
                                {daysTillEnd <= 2 && (
                                  <>
                                    {" "}
                                    {hoursTillEnd} hour
                                    {hoursTillEnd > 1 ? "s" : ""} left,
                                  </>
                                )}{" "}
                                click here!
                              </button>
                              <Box
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "400",
                                  paddingTop: "6px",
                                }}
                              >
                                Still {event.guestlist_available}{" "}
                                <Text as="span" style={{ fontWeight: "600" }}>
                                  {event.guestlist_available > 1
                                    ? " passes "
                                    : " pass "}
                                </Text>{" "}
                                available
                              </Box>
                            </Box>
                          </Flex>
                        </Flex>
                      )}
                  </>
                )}

                {isUserLoggedIn && (
                  <>
                    {event?.guest_invite_number > 0 &&
                      daysFromStart >= 0 &&
                      daysTillEnd >= 0 && (
                        <>
                          {userEventStatus == null &&
                            !guestListData?.status &&
                            event.guestlist_available > 0 && (
                              <Box w="100%" justifyContent="center">
                                <Flex
                                  bg="#E6E6FA"
                                  color="black"
                                  borderTop="solid 2px transparent"
                                  borderBottom="solid 2px transparent"
                                  justifyContent="center"
                                  w="100%"
                                  minHeight="100px"
                                  display="inline-grid"
                                  style={{
                                    cursor: "pointer",
                                    borderTop: "2px #000 solid",
                                    paddingTop: "16px",
                                    paddingBottom: "8px",
                                    textAlign: "center",
                                  }}
                                >
                                  <Box
                                    style={{
                                      fontSize: "18px",
                                      fontWeight: "400",
                                    }}
                                  >
                                    Secure your spot on the guestlist,
                                  </Box>
                                  <Box
                                    style={{
                                      fontSize: "18px",
                                      fontWeight: "400",
                                    }}
                                  >
                                    acquire Gold membership now.
                                  </Box>
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
                                            {daysTillEnd} day
                                            {daysTillEnd > 1 ? "s" : ""} left,
                                          </>
                                        )}
                                        {daysTillEnd <= 2 && (
                                          <>
                                            {" "}
                                            {hoursTillEnd} hour
                                            {hoursTillEnd > 1 ? "s" : ""} left,
                                          </>
                                        )}{" "}
                                        click here!
                                      </button>
                                      <Box
                                        style={{
                                          fontSize: "18px",
                                          fontWeight: "400",
                                          paddingTop: "6px",
                                        }}
                                      >
                                        Still {event.guestlist_available}{" "}
                                        {event.guestlist_available > 1
                                          ? " passes "
                                          : " pass "}{" "}
                                        available
                                      </Box>
                                    </Box>
                                  </Flex>
                                </Flex>
                              </Box>
                            )}
                          {userEventStatus != null &&
                            event.guestlist_available > 0 && (
                              <Flex
                                bg="purple"
                                color="white"
                                borderTop="solid 2px transparent"
                                borderBottom="solid 2px transparent"
                                justifyContent="center"
                                w="100%"
                              >
                                <Box w="100%" justifyContent="center">
                                  {userEventStatus >= 0 &&
                                    userEventStatus <= 3 && (
                                      <Box w="100%" justifyContent="center">
                                        <Flex
                                          bg="#E6E6FA"
                                          color="black"
                                          borderTop="solid 2px transparent"
                                          borderBottom="solid 2px transparent"
                                          justifyContent="center"
                                          w="100%"
                                          minHeight="100px"
                                          display="inline-grid"
                                          style={{
                                            borderTop: "2px #000 solid",
                                            paddingTop: "16px",
                                            paddingBottom: "8px",
                                            textAlign: "center",
                                          }}
                                        >
                                          <Box
                                            style={{
                                              fontSize: "18px",
                                              fontWeight: "400",
                                            }}
                                          >
                                            Get on the guestlist!
                                          </Box>
                                          <Button
                                            rightIcon={
                                              <BiRightArrowCircle size="22px" />
                                            }
                                            fontSize="16px"
                                            flex="1"
                                            variant="solid"
                                            colorScheme="purple"
                                            onClick={() => {
                                              navigate(
                                                `${pathname}/event/${
                                                  event?.url != ""
                                                    ? event.url
                                                    : event.id
                                                }`
                                              );
                                            }}
                                          >
                                            {daysTillEnd > 2 && (
                                              <>
                                                {" "}
                                                Only {daysTillEnd} day
                                                {daysTillEnd > 1 ? "s" : ""}{" "}
                                                left.
                                              </>
                                            )}
                                            {daysTillEnd <= 2 && (
                                              <>
                                                {" "}
                                                Only {hoursTillEnd} hour
                                                {hoursTillEnd > 1 ? "s" : ""}{" "}
                                                left.
                                              </>
                                            )}
                                          </Button>
                                        </Flex>
                                      </Box>
                                    )}

                                  {userEventStatus == 4 && (
                                    <Box w="100%" justifyContent="center">
                                      <Flex
                                        bg="#E6E6FA"
                                        color="black"
                                        borderTop="solid 2px transparent"
                                        borderBottom="solid 2px transparent"
                                        justifyContent="center"
                                        w="100%"
                                        minHeight="100px"
                                        display="inline-grid"
                                        style={{
                                          cursor: "pointer",
                                          borderTop: "2px #000 solid",
                                          paddingTop: "16px",
                                          paddingBottom: "8px",
                                          textAlign: "center",
                                        }}
                                        onClick={() => {
                                          navigate(
                                            `${pathname}/event/${
                                              event?.url != ""
                                                ? event.url
                                                : event.id
                                            }`
                                          );
                                        }}
                                      >
                                        <Box
                                          style={{
                                            fontSize: "18px",
                                            fontWeight: "400",
                                          }}
                                        >
                                          You are signed up for the guest list.{" "}
                                          <br />
                                          Your guestlist pass becomes available
                                          in
                                          {daysTillEnd > 2 && (
                                            <>
                                              {" "}
                                              {daysTillEnd} day
                                              {daysTillEnd > 1 ? "s" : ""}.
                                              <br />
                                            </>
                                          )}
                                          {daysTillEnd <= 2 && (
                                            <>
                                              {" "}
                                              {hoursTillEnd + 1} hour
                                              {hoursTillEnd + 1 > 1 ? "s" : ""}.
                                              <br />
                                            </>
                                          )}
                                          We inform you by email when ready.{" "}
                                        </Box>
                                      </Flex>
                                    </Box>
                                  )}
                                </Box>
                              </Flex>
                            )}
                        </>
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

            <Box style={{ paddingTop: "25px" }}>
              <Box>
                {event.venue_logo && (
                  <Image
                    boxSize="80px"
                    objectFit="cover"
                    src={event.venue_logo}
                    alt="Venue logo"
                  />
                )}
              </Box>
              <Box>
                <Text ml="5px" color="white">
                  <Box as="span" fontWeight="bold" color="cyan">
                    Venue{" "}
                  </Box>
                  {event?.venue_id > 0
                    ? event.venue_name
                    : event.venue + " " + event.city}
                </Text>
                {event?.venue_id > 0 && (
                  <>
                    <Box color="white">{event.venue_blurb}</Box>
                    <Box as="span" fontWeight="bold" color="cyan">
                      Address{" "}
                    </Box>
                    <Box color="white">{event.venue_address}</Box>
                  </>
                )}
              </Box>
            </Box>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
}
