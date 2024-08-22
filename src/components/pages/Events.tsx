import {
  Button,
  SimpleGrid,
  Container,
  Heading,
  CircularProgress,
  Box,
  Flex,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useMemo } from "react";
import { CardWithAvatar } from "../common/explore/CardWithAvatar";
import { UserInfo } from "../common/explore/UserInfo";
import { useEventsForCalendar, useContriesData } from "../../hooks/useEvents";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaChevronDown } from "react-icons/fa";
import RightSidebarModal from "../common/RightSidebarModal";

import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

interface CountryInfo {
  country_code: string;
  country: string;
}

const Events = () => {
  const queryClient = useQueryClient();
  const date = "Date";
  const location = "Location";
  const [countries, setCountries] = React.useState<CountryInfo[]>([]);
  const [countryCode, setCountryCode] = React.useState("");
  const [countryName, setCountryName] = React.useState("");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [filterDateStart, setFilterDateStart] = React.useState("");
  const [filterDateEnd, setFilterDateEnd] = React.useState("");
  const [startDayForDisplay, setStartDayForDisplay] =
    React.useState<String>("");
  const [startMonthForDisplay, setStartMonthForDisplay] =
    React.useState<String>("");
  const [startYearForDisplay, setStartYearForDisplay] =
    React.useState<String>("");
  const [endDayForDisplay, setEndDayForDisplay] = React.useState<String | null>(
    null
  );
  const [endMonthForDisplay, setEndMonthForDisplay] =
    React.useState<String | null>(null);
  const [endYearForDisplay, setEndYearForDisplay] =
    React.useState<String | null>(null);
  const [filterFlag, setFilterFlag] = React.useState(0);
  const pageSize = 16;

  const queryKey = React.useMemo(
    () => [
      "events",
      "calendar",
      countryCode,
      startYearForDisplay,
      startMonthForDisplay,
      startDayForDisplay,
      endYearForDisplay,
      endMonthForDisplay,
      endDayForDisplay,
    ],
    [
      countryCode,
      startYearForDisplay,
      startMonthForDisplay,
      startDayForDisplay,
      endYearForDisplay,
      endMonthForDisplay,
      endDayForDisplay,
    ]
  );

  const {
    data: explores,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
  } = useEventsForCalendar(
    {
      pageSize,
      _country_code: countryCode,
      _startdate: `${startYearForDisplay}-${startMonthForDisplay}-${startDayForDisplay}`,
      _enddate: `${endYearForDisplay}-${endMonthForDisplay}-${endDayForDisplay}`,
    },
    queryKey
  );

  const handleLoadMore = () => {
    fetchNextPage();
  };
  const openFilterModal = (flag) => {
    setIsSidebarOpen(!isSidebarOpen);
    setFilterFlag(Number(flag));
  };

  React.useEffect(() => {
    const date = new Date(filterDateStart);

    // Get the date
    const day = date.getDate();

    // Get the month (0-based index, so we add 1)
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    setStartDayForDisplay(day.toString());
    setStartMonthForDisplay(month.toString());
    setStartYearForDisplay(year.toString());

    const _date = new Date(filterDateEnd);

    // Get the date
    const _day = _date.getDate();

    // Get the month (0-based index, so we add 1)
    const _month = _date.getMonth() + 1;
    const _year = _date.getFullYear();
    setEndDayForDisplay(_day.toString());
    setEndMonthForDisplay(_month.toString());
    setEndYearForDisplay(_year.toString());
  }, [filterDateEnd, filterDateStart]);

  // React.useEffect(() => {
  //   refetch();
  // }, [queryKey, refetch]);
  React.useEffect(() => {
    queryClient.invalidateQueries(queryKey);
  }, [queryClient, queryKey]);

  const getGeoInfo = async (_countries) => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        const code = data.country_code_iso3.toLowerCase();
        const currentCountryInfo = _countries.find((item) => {
          if (item.country_code == code) return item;
        });
        setCountryName(currentCountryInfo?.country || location);
        setCountryCode(currentCountryInfo?.country_code || "");
        console.log("---setCountryName------", countries);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCountries = async () => {
    useContriesData()
      .then((countries) => {
        setCountries(countries);
        getGeoInfo(countries);
        setDefaultDate();
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  };

  const setDefaultDate = async () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    setFilterDateStart(today.toLocaleDateString());
    setFilterDateEnd(nextWeek.toLocaleDateString());
  };

  React.useEffect(() => {
    getCountries();
  }, []);

  // React.useEffect(() => {
  //   const { data: explores } = useEventsForCalendar({
  //     pageSize,
  //     _country_code: countryCode,
  //     _startdate: `${startYearForDisplay}-${startMonthForDisplay}-${startDayForDisplay}`,
  //     _enddate: `${endYearForDisplay}-${endMonthForDisplay}-${endDayForDisplay}`,
  //   });
  //   setEvents(explores);
  // }, [countryName]);

  const handleReset = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    setFilterDateStart(today.toLocaleDateString());
    setFilterDateEnd(nextWeek.toLocaleDateString());
    getGeoInfo(countries);
  };

  return (
    <Container
      maxW="full"
      minH="1000px"
      bg="white"
      pb="20px"
      px={{ base: "0", sm: "8" }}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mx={{ base: "0", sm: "-8" }}
        mb="20px"
        py="5px"
        bgColor="rgb(133, 83, 244)"
        flexDirection={"row"}
      >
        <Box flex="1" />
        <Heading color="white" textAlign={"center"} flex="1">
          Events
        </Heading>
        <Flex justifyContent="space-between" alignItems="center" flex="1">
          <Button
            colorScheme="transparent"
            border="2px"
            borderColor="green.500"
            borderRadius="20px"
            rightIcon={<FaChevronDown />}
            onClick={() => openFilterModal(0)}
          >
            {countryName}
          </Button>
          <Button
            colorScheme="transparent"
            border="2px"
            borderColor="green.500"
            borderRadius="20px"
            rightIcon={<FaChevronDown />}
            onClick={() => openFilterModal(1)}
          >
            {filterDateStart === "" || filterDateEnd === ""
              ? date
              : `${startMonthForDisplay}-${startDayForDisplay} ~ ${endMonthForDisplay}-${endDayForDisplay}`}
          </Button>
          <Button
            colorScheme="transparent"
            border="2px"
            borderColor="green.500"
            borderRadius="20px"
            onClick={() => handleReset()}
          >
            {`Reset`}
          </Button>
        </Flex>
        <RightSidebarModal
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          flag={filterFlag}
          startDate={filterDateStart}
          endDate={filterDateEnd}
          setStartDate={setFilterDateStart}
          setEndDate={setFilterDateEnd}
          countries={countries}
          setCountryCode={setCountryCode}
          setCountryName={setCountryName}
        />
      </Flex>
      {isLoading || isFetching ? (
        <Box height="5rem" display="flex" justifyContent="center" p={2}>
          <CircularProgress isIndeterminate />
        </Box>
      ) : explores?.pages[0]?.length === 0 ? (
        <Box textAlign="center" p={4}>
          No events found for the selected filters.
        </Box>
      ) : (
        <InfiniteScroll
          dataLength={(explores?.pages.length ?? 0) * pageSize}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader={
            <Box height="5rem" display="flex" justifyContent="center" p={2}>
              <CircularProgress isIndeterminate />
            </Box>
          }
        >
          <SimpleGrid
            columns={{ base: 1, md: 2, "2xl": 4 }}
            spacing="10"
            margin="2px"
          >
            {explores?.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.map((event) => {
                  const {
                    url: url,
                    event_name,
                    venue_photo,
                    venue_logo,
                  } = event;
                  return (
                    <CardWithAvatar
                      margin="2px"
                      key={url}
                      avatarProps={{
                        src: venue_logo,
                        name: event_name,
                        border: "2px solid #d8c6ffd4",
                      }}
                      coverBg={venue_photo || ""}
                    >
                      <UserInfo mt="3" name={event_name} />
                      <Button
                        colorScheme="purple"
                        rounded="full"
                        size="sm"
                        onClick={() => {
                          {
                            document.location = "/events/" + url;
                          }
                        }}
                      >
                        Go to Event
                      </Button>
                    </CardWithAvatar>
                  );
                })}
              </React.Fragment>
            ))}
          </SimpleGrid>
        </InfiniteScroll>
      )}
    </Container>
  );
};

export default Events;
