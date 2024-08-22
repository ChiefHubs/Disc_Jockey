import { Flex, Text, Box, CircularProgress } from "@chakra-ui/react";
import EventCard from "./Feed/EventCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { EventPeriod, useEvents, useUserEventData } from "../../../hooks/useEvents";
import React, { useEffect, useState } from "react";
import Filter from "./Event/Filter";
import { useUser, useUserConnectionCheck, IConnectedUser, DJUser, useMyConnections } from "../../../hooks/useUser";
import { useProfile } from "../../../hooks/useProfile";

export default function ProfileEvents() {
  const pageSize = 10;
  const [currentTab, setCurrentTab] = useState<EventPeriod>(EventPeriod.UPCOMING);
  const { username } = useParams<{ username: string }>();
  const { data: profile, isLoading } = useProfile(username as string);
  const {
    data: events,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoadingEvents,
  } = useEvents(username as string, { pageSize, period: currentTab });
  const [userEvents, setUserEvents] = useState<any>([]);
  const [accessLevel, setAccessLevel] = useState(1);
  const { data: user, isLoading: loadingUserData } = useUser();
  const isUserLoggedIn = !!user?.user_id;
  const { data: myConnections, refetch } = useMyConnections();
  const [connectionDetails, setConnectionDetails] = useState<any>();

  useEffect(() => {
    if (profile && myConnections) {
      const connectionDetails = myConnections.find((obj) => obj.url === profile.profile_url);
      if (connectionDetails) {
        setConnectionDetails(connectionDetails);
        setAccessLevel(connectionDetails.accesslevel_id);
      } else {
        setConnectionDetails(false);
      }
    }
  }, [profile, myConnections]);

  const getUserEvents = async () => {
    const eventIds: number[] = [];
    events?.pages?.forEach((page) => {
      page &&
        page.forEach((event) => {
          eventIds.push(event.id);
        });
    });
    if (eventIds.length > 0) {
      const userEventData = await useUserEventData(eventIds);
      setUserEvents(userEventData);
    }
  };

  useEffect(() => {
    getUserEvents();
  }, [events]);

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <>
      <Flex mb="20px" justifyContent="flex-end" id="feed">
        <Filter currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </Flex>
      <InfiniteScroll
        dataLength={(events?.pages.length || 0) * pageSize}
        next={handleLoadMore}
        hasMore={hasNextPage ?? false}
        loader={
          <Box height="5rem" display="flex" justifyContent="center" p={2}>
            <CircularProgress isIndeterminate />
          </Box>
        }
        endMessage={
          <Text fontSize="lg" fontWeight={600} textAlign="center">
            {!isLoadingEvents && <>All events displayed</>}
          </Text>
        }
      >
        <Flex w="100%" flexDirection="column" justifyContent="center" align="center" p="0px" gap="20px" pb="50px">
          {events?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((event, ind) => (
                <Box key={ind} width={{ base: "100%", md: "500px" }}>
                  <EventCard event={event} userEvents={userEvents} isUserLoggedIn={isUserLoggedIn} />
                </Box>
              ))}
            </React.Fragment>
          ))}
        </Flex>
      </InfiniteScroll>
    </>
  );
}
