import {
  Center,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Account } from "./meProfile/Account";
import { Subscriptions } from "./meProfile/Subscriptions";
import { Purchases } from "./meProfile/Purchases";
import { useUser } from "../../hooks/useUser";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

type MenuItems = {
  id: number;
  tabName: string;
  name: string;
};

const menus: MenuItems[] = [
  {
    id: 0,
    tabName: "account",
    name: "Account",
  },
  {
    id: 1,
    tabName: "purchases",
    name: "Purchases",
  },
  {
    id: 2,
    tabName: "subscriptions",
    name: "Memberships",
  },
];

const MeProfilePage = () => {
  const { data: user, refetch } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<number>(0);

  const onChangeUsername = async () => {
    await refetch();
  };

  const onChange = (val: number) => {
    const newTab = menus[val];
    setActiveTab(newTab.id);
    setSearchParams({ tab: newTab?.tabName as string });
  };

  useEffect(() => {
    const currentTab = searchParams?.get("tab");
    setActiveTab(menus.find((t) => t.tabName === currentTab)?.id ?? 0);
    if (currentTab) {
      const tab = menus.find((t) => t.tabName === currentTab);
      if (tab) {
        onChange(menus.indexOf(tab));
        return;
      }
    } else {
      setSearchParams({ tab: menus[0].tabName as string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <Flex justifyContent="center">
      <Flex direction="column" w="100%">
        <Center w="100%">
          <Text fontSize="2xl" as="b" paddingBottom={4}>
            {user?.display_name && user.display_name}
          </Text>
        </Center>

        <Tabs
          variant="unstyled"
          isLazy
          isFitted
          onChange={onChange}
          index={activeTab}
        >
          <TabList bgColor="white" borderRadius={15}>
            {menus.map((tab, index) => (
              <Tab key={index} _selected={{ color: "purple" }}>
                <Text py="1">{tab.name}</Text>
              </Tab>
            ))}
          </TabList>
          <TabPanels mt={5} bgColor="white" borderRadius={15}>
            <TabPanel>
              <Account onChangeUsername={onChangeUsername} />
            </TabPanel>
            <TabPanel>
              <Purchases />
            </TabPanel>
            <TabPanel>
              <Subscriptions />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default MeProfilePage;
