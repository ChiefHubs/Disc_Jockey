import {
  Flex,
  Text,
  Box,
  CircularProgress,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEventsForSearch } from "../../hooks/useEvents";
import EventCard from "../common/profile/Feed/EventCard";

export default function DJSearchEvents() {
  const [search, setSearch] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { data: events, isLoading, } = useEventsForSearch({ search, startDate, endDate });

  const handleChangeSearch = (value: string) => {
    setSearch(value);
  }

  const handleChangeStartDate = (value: string) => {
    setStartDate(value);
  }

  const handleChangeEndDate = (value: string) => {
    setEndDate(value);
  }

  return (
    <Flex
      w="100%"
      flexDirection="column"
      justifyContent="center"
      align="center"
      p="0px"
      gap="20px"
      pb="50px"
    >
      <Flex justifyContent="space-between" flexWrap="wrap" gap="5" mb="5">
        <Box>
          <Text>Search:</Text>
          <Input
            value={search}
            onChange={(e) => handleChangeSearch(e.target.value)}
            border="2px solid gray"
          />
        </Box>
        <Box>
          <Text>Start Date:</Text>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => handleChangeStartDate(e.target.value)}
            border="2px solid gray"
          />
        </Box>
        <Box>
          <Text>End Date:</Text>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => handleChangeEndDate(e.target.value)}
            border="2px solid gray"
          />
        </Box>
      </Flex>
      {isLoading && (
        <Box height="5rem" display="flex" justifyContent="center" p={2}>
          <CircularProgress isIndeterminate />
        </Box>
      )}
      {events?.map((event, index) => (
        <Box key={index} width={{ base: "100%", md: "500px" }}>
          <EventCard event={event} />
        </Box>
      ))}
    </Flex>
  );
}
