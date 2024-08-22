import { Box, Tab, TabPanel, TabPanels, TabList, Tabs, Flex } from "@chakra-ui/react";
import ProfilePosts from "./ProfilePosts";
import ProfileBio from "./ProfileBio";
import ProfileEvents from "./ProfileEvents";
import ProfileMembership from "./ProfileMembership";
import ProfileTracks from "./ProfileTracks";
import ProfilePhotos from "./ProfilePhotos";
import ProfileVideos from "./ProfileVideos";
import ProfileProducts from "./ProfileProducts";
import { ArtistTab } from "../../layouts/ArtistsLayout";
// import ProfileCommunityChat from "./Chat";
import React, { Suspense } from "react";
const ProfileCommunityChat = React.lazy(() => import("./Chat/ChatWrapper"));

interface ProfileMenuProps {
  menus: Array<ArtistTab>;
  activeTab: number;
  onChangeActiveTab: (val: number) => void;
  isAlreadySubscribed?: boolean;
}

export default function ProfileMenu({ menus, activeTab, onChangeActiveTab, isAlreadySubscribed }: ProfileMenuProps) {
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
            <ProfilePosts />
          </TabPanel>
          <TabPanel>
            <Suspense>
              <ProfileCommunityChat isAlreadySubscribed={isAlreadySubscribed} />
            </Suspense>
          </TabPanel>
          <TabPanel bg="black">
            <ProfileBio />
          </TabPanel>
          <TabPanel>
            <ProfileTracks />
          </TabPanel>
          <TabPanel>
            <ProfileProducts />
          </TabPanel>
          {menus.find((x) => x.tabName === "photos") && (
            <TabPanel>
              <ProfilePhotos />
            </TabPanel>
          )}
          {menus.find((x) => x.tabName === "videos") && (
            <TabPanel>
              <ProfileVideos />
            </TabPanel>
          )}
          <TabPanel>
            <ProfileEvents />
          </TabPanel>
          <TabPanel p="0">
            <ProfileMembership />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
