import {
  Flex,
  Heading,
  Image,
  HStack,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";

import { TabPanel, TabPanels, TabList, Tabs, Tab } from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import { FiX, FiCheck } from "react-icons/fi";

import GoldMembership from "./GoldMembership";
import VIPMembership from "./VIPMembership";

interface Props {
  accesslevel: number;
  onClose?: () => void;
  memberOf?: string;
  urlLocation?: string;
}

export default function MembershipPrompt({ accesslevel, onClose = () => {}, memberOf = "", urlLocation = "" }: Props) {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <Modal isOpen={modalVisible} onClose={onClose}>
      <ModalOverlay />
      <ModalContent border="1px solid #fff" overflow="hidden" borderRadius="10px" style={{ margin: "3px" }}>
        <VStack w="100%">
          <Flex position="absolute" right="10px" top="10px">
            <FiX color="#fff" onClick={onClose} fontSize="30px" cursor="pointer" />
          </Flex>
          <VStack bg="#111" w="100%" py="6px">
            <Image w="110px" src="https://files.djfan.app/images/logo/DJFAN_HOR_WHITE.svg" />
          </VStack>
          <VStack>
            <Heading fontSize="1.1em" borderRadius="5px" lineHeight="1em" fontWeight="600" mb="10px">
              <Flex display={{ base: "flex" }} width="100%" justifyContent="center" margin="10px" fontSize="1.2em">
                Choose your membership
              </Flex>
              <Flex display={{ base: "flex" }} width="100%" justifyContent="center" marginTop="15px">
                <Tabs width="100%" align="center" variant="soft-rounded" colorScheme="green" defaultIndex={accesslevel == 3 ? 1 : 0}>
                  <TabList>
                    <Tab
                      fontSize={{ base: "22px", md: "26px" }}
                      color="white"
                      background="grey"
                      _selected={{ color: "white", bg: "#8553f4" }}
                      marginLeft="4px"
                      marginRight="4px"
                    >
                      GOLD
                    </Tab>
                    <Tab
                      fontSize={{ base: "22px", md: "26px" }}
                      color="white"
                      background="grey"
                      _selected={{ color: "white", bg: "#8553f4" }}
                      marginLeft="4px"
                      marginRight="4px"
                    >
                      VIP
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <GoldMembership showAll={false} memberOf={memberOf} urlLocation={urlLocation} />
                    </TabPanel>
                    <TabPanel>
                      <VIPMembership showAll={false} memberOf={memberOf} urlLocation={urlLocation} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
                {/* 
                {accesslevel == 2 && <GoldMembership />}
                {accesslevel == 3 && <VIPMembership />}
                */}
              </Flex>
            </Heading>
          </VStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
}
