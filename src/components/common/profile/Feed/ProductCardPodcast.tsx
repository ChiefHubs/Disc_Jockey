import {
  Flex,
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Button,
  Image,
  // Text,
  // MenuItem,
  // Menu,
  // MenuButton,
  // MenuList,
} from "@chakra-ui/react";
import { IProduct, useProfile } from "../../../../hooks/useProfile";
import { useNavigate, useParams } from "react-router-dom";
/* import { BiLike, BiTrash } from "react-icons/bi";
    import { FiShare, FiMoreVertical } from "react-icons/fi";
    
    type PostMenuProps = {
      icon: React.ElementType;
      label: string;
    };
    
    const PostMenu = ({ icon, label }: PostMenuProps) => (
      <MenuItem py="10px" aria-label={label}>
        <Box as={icon} size="14px" mr="8px" />
        <Text>{label}</Text>
      </MenuItem>
    ); */

type ProductCardProps = {
  product: IProduct;
  profilePicture?: string;
};

export default function ProductCardPodcast({
  product,
  profilePicture,
}: ProductCardProps) {
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
          src={product?.image_url}
          fallbackSrc={profilePicture}
          alt="product image"
        />
        {/* <Flex
              justify="flex-end"
              px="5px"
              pt="10px"
              position="absolute"
              right="5px"
              top="0px"
            >
              <Menu>
                <MenuButton transition="all 0.3s" _focus={{ boxShadow: "none" }}>
                  <Box as={FiMoreVertical} size="20px" color="lightgray" />
                </MenuButton>
                <MenuList
                  minW="max-content"
                  fontSize="14px"
                  bg="white"
                  p="0"
                  m="0"
                  borderColor="gray.200"
                >
                  <PostMenu icon={BiLike} label="Edit Product" />
                  <PostMenu icon={BiTrash} label="Delete Product" />
                  <PostMenu icon={FiShare} label="Share Product" />
                </MenuList>
              </Menu>
            </Flex> */}
      </CardHeader>
      <CardBody pt="5px">
        <Flex mt="-15px" align="center" direction="column">
          <Heading fontSize="24px" px="10px" color="white" textAlign="center">
            {product.name}
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
