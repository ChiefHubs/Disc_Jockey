import { Flex, TabPanel, TabPanels, TabList, Tabs, Tab } from "@chakra-ui/react";
import GoldMembership from "./MembershipGold";
import VIPMembership from "./MembershipVip";

export default function VenueMembership({}) {
  return (
    <Flex
      id="xx2"
      flexDirection="column"
      justifyContent="center"
      backgroundImage="https://files.djfan.app/images/bg-dj.jpg"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      align="center"
      p="0"
      gap="20px"
      pb="50px"
    >
      <Flex
        id="xx3"
        mt="40px"
        display={{ base: "none", md: "flex" }}
        width={{ base: "100%", md: "100%" }}
        gap="50px"
        justifyContent="center"
      >
        <GoldMembership />
        <VIPMembership />
      </Flex>
      <Flex
        id="xx4"
        flexDirection="column"
        p="0"
        m="0"
        mt={{ base: "calc(1rem + 10px)", md: 0 }}
        alignItems="center"
        display={{ base: "flex", md: "none" }}
        width="100%"
      >
        <Tabs width={{ base: "100%", md: "80%" }} align="center" variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab fontSize={{ base: "22px", md: "26px" }} color="white" _selected={{ color: "white", bg: "#710CAC" }}>
              GOLD
            </Tab>
            <Tab fontSize={{ base: "22px", md: "26px" }} color="white" _selected={{ color: "white", bg: "#710CAC" }}>
              VIP
            </Tab>
          </TabList>
          <TabPanels p="0">
            <TabPanel>
              <GoldMembership />
            </TabPanel>
            <TabPanel>
              <VIPMembership />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
}
