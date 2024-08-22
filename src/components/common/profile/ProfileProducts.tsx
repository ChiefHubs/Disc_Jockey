import {
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useState } from "react";
import ProductList from "./Feed/ProductList";

export default function ProfileProducts() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <VStack w="100%" p="10px" pt="5px" pb="50px" overflow="hidden">
      <Tabs
        id="product-tabs"
        w={{ base: "100%", md: "70%" }}
        isFitted
        index={tabIndex}
        onChange={(index) => setTabIndex(index)}
      >
        <TabList m="-15px" id="product-tab-list">
          <Tab>Tracks</Tab>
          <Tab>Downloads</Tab>
          <Tab>Podcasts</Tab>
          <Tab>Merch</Tab>
        </TabList>

        <TabPanels pt="15px" id="product-tab-panels">
          <TabPanel>
            <VStack gap="20px">
              <ProductList productType={[2]} />
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack gap="20px">
              <ProductList productType={[3, 6]} />
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack gap="20px">
              <ProductList productType={[4]} />
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack gap="20px">
              <ProductList productType={[7]} />
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}
