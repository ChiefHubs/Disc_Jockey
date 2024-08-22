import { Flex, Text, Box, CircularProgress } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { EventPeriod, useEvents, useUserEventData } from "../../../hooks/useEvents";
import React, { useEffect, useState } from "react";
import { useVenue, useVenueEvents } from "../../../hooks/useVenues";
import Filter from "../profile/Event/Filter";
import VenueEventCard from "./VenueEventCard";
import { useMyConnections, useUser } from "../../../hooks/useUser";

export default function VenueEvents() {
  const pageSize = 10;
  const [currentTab, setCurrentTab] = useState<EventPeriod>(EventPeriod.UPCOMING);
  const { venueurl } = useParams<{ venueurl: string }>();
  const { data: venueEvents, fetchNextPage, hasNextPage } = useVenueEvents(venueurl as string, { pageSize, period: currentTab });
  const { data: user } = useUser();
  const isUserLoggedIn = !!user?.user_id;
  const [accessLevel, setAccessLevel] = useState(1);
  const [userEvents, setUserEvents] = useState<any>([]);
  const { data: myConnections, refetch } = useMyConnections();
  const [connectionDetails, setConnectionDetails] = useState<any>();

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
    const eventIds: number[] = [];
    venueEvents?.pages?.forEach((page) => {
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
  }, [venueEvents]);

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <>
      <Flex mb="20px" justifyContent="flex-end" id="feed">
        <Filter currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </Flex>
      <InfiniteScroll
        dataLength={(venueEvents?.pages.length || 0) * pageSize}
        next={handleLoadMore}
        hasMore={hasNextPage ?? false}
        loader={
          <Box height="5rem" display="flex" justifyContent="center" p={2}>
            <CircularProgress isIndeterminate />
          </Box>
        }
        endMessage={
          <Text fontSize="lg" fontWeight={600} textAlign="center">
            All events displayed
          </Text>
        }
      >
        <Flex w="100%" flexDirection="column" justifyContent="center" align="center" p="0px" gap="20px" pb="50px">
          {venueEvents?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((event, ind) => (
                <Box key={ind} width={{ base: "100%", md: "500px" }}>
                  <VenueEventCard event={event} userEvents={userEvents} isUserLoggedIn={isUserLoggedIn} accessLevel={accessLevel} />
                </Box>
              ))}
            </React.Fragment>
          ))}
        </Flex>
      </InfiniteScroll>
    </>
  );
}
