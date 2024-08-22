import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
} from "react-icons/fc";

export default function ContentTypes() {
  return (
    <Flex bg="black" flexDir="column" alignItems="center" w="100%" py="50px">
      <Heading color="white" textAlign="center">
        What content do DJs post?
      </Heading>
      <Flex mt="30px" gap="20px">
        <VStack gap="10px">
          <Image w="50px" src="https://files.djfan.app/images/9370782.png" />
          <Text color="white" fontWeight="600">
            Text Posts
          </Text>
        </VStack>
        <VStack gap="10px">
          <Image w="50px" src="https://files.djfan.app/images/imagetext.png" />
          <Text color="white" fontWeight="600">
            Image Posts
          </Text>
        </VStack>
        <VStack gap="10px">
          <Image w="50px" src="https://files.djfan.app/images/9975051.png" />
          <Text color="white" fontWeight="600">
            Private Content
          </Text>
        </VStack>
      </Flex>
    </Flex>
  );
}
