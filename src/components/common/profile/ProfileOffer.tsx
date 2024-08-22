import {
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { FaQuestionCircle } from "react-icons/fa";

type Props = {
  onClickOffer: () => void;
};

export default function ProfileOffer({ onClickOffer }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      py="10px"
      justifyContent="center"
      alignItems="center"
      color="#fff"
      bgGradient="linear(to-r, #0e0725, #5c03bc, #e536ab)"
      w="100%"
      fontWeight="600"
      cursor="pointer"
      borderTop="1px solid #fff"
      gap="15px"
      _hover={{ color: "#fff", bgGradient: "linear(to-r, #b429f9, #26c5f3)" }}
      onClick={onClickOffer}
    >
      Unlock VIP posts & perks for $1{" "}
      <FaQuestionCircle
        fontSize="18px"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onOpen();
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Text fontSize="20px" textAlign="center" fontWeight="600">
              What is VIP?
            </Text>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>FREE</Th>
                    <Th>VIP</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Free Posts</Td>
                    <Td>Free Posts</Td>
                  </Tr>
                  <Tr>
                    <Td>View Events</Td>
                    <Td>View Events</Td>
                  </Tr>
                  <Tr>
                    <Td></Td>
                    <Td>Exclusive Content</Td>
                  </Tr>
                  <Tr>
                    <Td></Td>
                    <Td>Private Playlists</Td>
                  </Tr>
                  <Tr>
                    <Td></Td>
                    <Td>Music Early Access</Td>
                  </Tr>
                  <Tr>
                    <Td></Td>
                    <Td>Community Chat</Td>
                  </Tr>
                  <Tr>
                    <Td></Td>
                    <Td>Pre-Sale Tickets</Td>
                  </Tr>
                  <Tr>
                    <Td></Td>
                    <Td>Guestlist & Meetups</Td>
                  </Tr>

                  <Tr>
                    <Td></Td>
                    <Td>Giveaways & more</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
