import { Box, Tab, TabPanel, TabPanels, TabList, Tabs, Flex } from "@chakra-ui/react";
import { VenueTab } from "../../layouts/VenueLayout";
import VenueAbout from "./VenueAbout";
import VenueEvents from "./VenueEvents";
import VenueMembership from "./VenueMembership";

interface VenueMenuProps {
  menus: Array<VenueTab>;
  activeTab: number;
  onChangeActiveTab: (val: number) => void;
  isAlreadySubscribed?: boolean;
}

export default function ProfileMenu({ menus, activeTab, onChangeActiveTab }: VenueMenuProps) {
  return (
    <Box w="100%">
      <Tabs index={activeTab} onChange={onChangeActiveTab} isLazy isFitted>
        <TabList overflowX="auto" py={0.5}>
          {menus.map((tab, index) => (
            <Tab
              key={index}
              minW="fit-content"
              color="white"
              bgColor="black"
              borderWidth={1}
              borderColor="white"
              borderBottom="none"
              _active={{ color: "cyan", bgColor: "white" }}
              _selected={{ color: "cyan" }}
              _disabled={{ color: "gray", bgColor: "black" }}
            >
              <Flex alignItems="center" gap={1.5}>
                {tab.icon}
                <span>{tab.name}</span>
              </Flex>
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel>
            <VenueEvents />
          </TabPanel>
          <TabPanel bg="black">
            <VenueAbout />
          </TabPanel>
          <TabPanel p="0">
            <VenueMembership />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
