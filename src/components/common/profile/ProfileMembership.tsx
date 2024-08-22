import { Flex, TabPanel, TabPanels, TabList, Tabs, Tab } from "@chakra-ui/react";
import GoldMembership from "./GoldMembership";
import VIPMembership from "./VIPMembership";
import VIPoffer from "./VIPoffer";

export default function ProfileMembership({}) {
  return (
    <Flex
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
      <Flex mt="40px" display={{ base: "none", md: "flex" }} width={{ base: "100%", md: "100%" }} gap="50px" justifyContent="center">
        <GoldMembership />
        <VIPMembership />
      </Flex>
      <Flex
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
          <TabPanels p="0" mt="10px">
            <TabPanel p="0">
              <GoldMembership />
            </TabPanel>
            <TabPanel p="0">
              <VIPMembership />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
}
