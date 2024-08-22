import {
  Button,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FeedType } from "../../../../hooks/useFeeds";

type FilterProps = {
  currentTab: FeedType;
  setCurrentTab: (tab: FeedType) => void;
};

export default function Filter({
  currentTab = FeedType.All,
  setCurrentTab,
}: FilterProps) {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="row">
      <Button p="0px" bg="transparent" variant="no-effects">
        <Flex
          align="center"
          w={{ base: "80px", lg: "105px" }}
          borderRadius="30px"
          justifyContent="center"
          backgroundColor={
            currentTab === FeedType.Me
              ? colorMode === "dark"
                ? "#a37cf0"
                : "#a37cf0"
              : ""
          }
          py="10px"
          border="0px solid"
          borderColor={
            currentTab === FeedType.Me
              ? colorMode === "dark"
                ? "transparent"
                : "secondaryGray.400"
              : "transparent"
          }
          bgColor={
            currentTab === FeedType.Me
              ? colorMode === "dark"
                ? "transparent"
                : "purple.400"
              : "transparent"
          }
          cursor="pointer"
          transition="all .22s ease"
          onClick={() => setCurrentTab(FeedType.Me)}
        >
          <Text
            fontSize="sm"
            color={
              currentTab === FeedType.Me
                ? colorMode === "dark"
                  ? "#fff"
                  : "#fff"
                : "#000"
            }
            fontWeight="bold"
          >
            My Feed
          </Text>
        </Flex>
      </Button>

      <Button p="0px" bg="transparent" variant="no-effects">
        <Flex
          align="center"
          w={{ base: "80px", sm: "100px" }}
          borderRadius="30px"
          justifyContent="center"
          backgroundColor={
            currentTab === FeedType.All
              ? colorMode === "dark"
                ? "#a37cf0"
                : "#a37cf0"
              : ""
          }
          py="10px"
          px="10px"
          mx="5px"
          cursor="pointer"
          border="0px solid"
          borderColor={
            currentTab === FeedType.All
              ? colorMode === "dark"
                ? "transparent"
                : "secondaryGray.400"
              : "transparent"
          }
          bgColor={
            currentTab === FeedType.All
              ? colorMode === "dark"
                ? "transparent"
                : "purple.400"
              : "transparent"
          }
          transition="all .22s ease"
          onClick={() => setCurrentTab(FeedType.All)}
        >
          <Text
            fontSize="sm"
            color={
              currentTab === FeedType.All
                ? colorMode === "dark"
                  ? "#fff"
                  : "#fff"
                : "#000"
            }
            fontWeight="bold"
          >
            Popular
          </Text>
        </Flex>
      </Button>
    </Flex>
  );
}
