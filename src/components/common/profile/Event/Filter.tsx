import { Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import { EventPeriod } from "../../../../hooks/useEvents";

type FilterProps = {
  currentTab: EventPeriod;
  setCurrentTab: (tab: EventPeriod) => void;
};

export default function Filter({ currentTab = EventPeriod.UPCOMING, setCurrentTab }: FilterProps) {
  const { colorMode } = useColorMode();

  return (
    <Flex direction="row">
      <Button p="0px" bg="transparent" variant="no-effects">
        <Flex
          align="center"
          w="110px"
          borderRadius="30px"
          justifyContent="center"
          backgroundColor={currentTab === EventPeriod.UPCOMING ? (colorMode === "dark" ? "#a37cf0" : "#a37cf0") : ""}
          py="10px"
          px="10px"
          mx="5px"
          cursor="pointer"
          border="0px solid"
          borderColor={currentTab === EventPeriod.UPCOMING ? (colorMode === "dark" ? "transparent" : "secondaryGray.400") : "transparent"}
          bgColor={currentTab === EventPeriod.UPCOMING ? (colorMode === "dark" ? "transparent" : "purple.400") : "transparent"}
          transition="all .22s ease"
          onClick={() => setCurrentTab(EventPeriod.UPCOMING)}
        >
          <Text
            fontSize="sm"
            color={currentTab === EventPeriod.UPCOMING ? (colorMode === "dark" ? "#fff" : "#fff") : "#000"}
            fontWeight="bold"
          >
            Upcoming
          </Text>
        </Flex>
      </Button>
      <Button p="0px" bg="transparent" variant="no-effects">
        <Flex
          align="center"
          w={{ base: "80px", lg: "105px" }}
          borderRadius="30px"
          justifyContent="center"
          backgroundColor={currentTab === EventPeriod.PAST ? (colorMode === "dark" ? "#a37cf0" : "#a37cf0") : ""}
          py="10px"
          border="0px solid"
          borderColor={currentTab === EventPeriod.PAST ? (colorMode === "dark" ? "transparent" : "secondaryGray.400") : "transparent"}
          bgColor={currentTab === EventPeriod.PAST ? (colorMode === "dark" ? "transparent" : "purple.400") : "transparent"}
          cursor="pointer"
          transition="all .22s ease"
          onClick={() => setCurrentTab(EventPeriod.PAST)}
        >
          <Text fontSize="sm" color={currentTab === EventPeriod.PAST ? (colorMode === "dark" ? "#fff" : "#fff") : "#000"} fontWeight="bold">
            Past
          </Text>
        </Flex>
      </Button>
    </Flex>
  );
}
