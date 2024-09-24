import {
  Flex,
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Button,
  Image,
} from "@chakra-ui/react";
import { IProduct, useProfile } from "../../../../hooks/useProfile";
import { useNavigate, useParams } from "react-router-dom";
type ProductCardProps = {
  product: IProduct;
  profilePicture?: string;
};

export default function ProductCardAudio({
  product,
  profilePicture,
}: ProductCardProps) {
  const audio = product.audio?.[0];
  const { username } = useParams();
  const { data: profile } = useProfile(username as string);
  const navigate = useNavigate();

  return (
    <Card
      border="2px solid cyan"
      borderRadius="15px"
      overflow="hidden"
      w={{ base: "100%", md: "350px" }}
      bg="black"
    >
      <CardHeader
        display="flex"
        flexDir="column"
        pb="30px"
        pt="5px"
        alignItems="center"
      >
        <Image
          w="60%"
          pt="20px"
          src={audio?.artwork}
          fallbackSrc={profilePicture}
          alt="product image"
        />
      </CardHeader>
      <CardBody pt="5px">
        <Flex mt="-15px" align="center" direction="column">
          <Heading fontSize="24px" px="10px" color="white" textAlign="center">
            {audio?.release_name}.{audio?.location.split(".").pop()}
          </Heading>
          <Heading fontSize="18px" pt="5px" color="cyan" paddingTop="5px">
            {audio?.artist != "" && audio?.artist}
            {audio?.artist == "" && profile?.display_name}
          </Heading>
          <Box pt="20px" pb="10px">
            <Button
              fontSize="16px"
              flex="1"
              variant="solid"
              colorScheme="purple"
              onClick={() => {
                navigate(`${username}/product/${product.id}`);
              }}
            >
              View product
            </Button>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
}
