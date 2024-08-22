import { Flex, Heading, Image, VStack, Modal, ModalOverlay, ModalContent, Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import GoldMembershipGuestlist from "./MembershipGuestlist";

type SubscriptionDetails = {
  venuename: string;
  type: string;
  level: string;
  event_id: string;
  redirect: string;
};

interface Props {
  onClose?: () => void;
  subscriptionDetails: SubscriptionDetails;
}

export default function MembershipPrompt({ onClose = () => {}, subscriptionDetails }: Props) {
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
            <Image w="110px" src="https://files.djfan.app/images/djfan-beta.png" />
          </VStack>
          <VStack>
            <Heading fontSize="1.1em" borderRadius="5px" lineHeight="1em" fontWeight="600" mb="10px">
              <Flex
                display={{ base: "flex" }}
                width="100%"
                justifyContent="center"
                margin="10px"
                fontSize="1.3em"
                paddingTop="12px"
                paddingBottom="12px"
              >
                Guestlist pass requires:
              </Flex>
              <Flex display={{ base: "flex" }} width="100%" justifyContent="center" marginTop="15px">
                <GoldMembershipGuestlist subscriptionDetails={subscriptionDetails} />
              </Flex>
            </Heading>
          </VStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
}
