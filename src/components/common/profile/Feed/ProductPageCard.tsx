import {
  Flex,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  // Text,
  Heading,
  Button,
  Image,
  // Menu,
  // MenuButton,
  // MenuItem,
  // MenuList,
} from "@chakra-ui/react";
// import { BiLike, BiTrash } from "react-icons/bi";
// import { FiShare, FiMoreVertical } from "react-icons/fi";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { IProduct, useProfile } from "../../../../hooks/useProfile";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import apiClient from "../../../../services/api-client";
// import { Purchase } from "../../../../hooks/usePurchases";
// import ReactGA from "react-ga4";

type ProductPageCardProps = {
  product: IProduct;
};

// const PostMenu = ({ icon, label }) => (
//   <MenuItem py="10px" aria-label={label}>
//     <Box as={icon} size="14px" mr="8px" />
//     <Text>{label}</Text>
//   </MenuItem>
// );

export default function ProductPageCard({ product }: ProductPageCardProps) {
  const audio = product?.audio?.[0];
  const navigate = useNavigate();
  const { username } = useParams();
  const { data: profile } = useProfile(username as string);
  const profilePicture = profile?.profile_picture;

  const [idOfLoadingButton, setIDOfLoadingButton] = useState<number>(-1);
  const [isBuying, setIsBuying] = useState(false);

  const handleBuyProduct = async (productId: number) => {
    setIsBuying(true);
    try {
      const res = await apiClient.get("/products/payment_link/" + productId);
      const { data } = res;
      if (data) {
        const { result } = data;
        window.open(result, "_self");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsBuying(false);
    }
  };

  const handleDownloadPurchase = async (productId, index: number) => {
    /*
    ReactGA.send({
      event: "begin_checkout",
      ecommerce: {
        currency: "USD",
        items: [
          {
            index: 0,
            item_id: product.sku,
            item_name: product.name,
            item_brand: audio?.label ?? audio?.artist,
            price: (product.default_price?.unit_amount_decimal ?? 0) / 100,
            quantity: 1,
          },
        ],
        value:
          ((product.default_price?.unit_amount_decimal ?? 0) / 100 / 100) * 80,
      },
    });
    */
    setIDOfLoadingButton(index);
    try {
      const res = await apiClient.get(`/products/download/${productId}`);
      const { data } = res;
      if (data.result) {
        const { result } = data;
        setTimeout(() => {
          window.open(result, "_blank");
        }, 100);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIDOfLoadingButton(-1);
    }
  };

  return (
    <Card
      border="2px solid cyan"
      borderRadius="15px"
      overflow="hidden"
      w={{ base: "90%", sm: "350px" }}
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
          src={audio?.artwork ?? product?.image_url}
          alt="product image"
          fallbackSrc={profilePicture}
        />
        <Flex
          justify="flex-end"
          px="5px"
          pt="10px"
          position="absolute"
          right="5px"
          top="0px"
        >
          {/*
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
      */}
        </Flex>
      </CardHeader>

      {product.type === 2 && (
        <CardBody pt="5px">
          <Flex mt="-15px" align="center" direction="column">
            <Heading fontSize="24px" px="10px" color="white">
              {audio?.label}
            </Heading>
            <Heading fontSize="18px" pt="5px" color="cyan">
              <Box as="span" color="cyan">
                by{" "}
              </Box>
              {audio?.artist != "" && audio?.artist}
              {audio?.artist == "" && profile?.display_name}
            </Heading>
          </Flex>
          {audio?.sample.indexOf("/NA?") < 0 && (
            <AudioPlayer src={audio?.sample} preload="none" autoPlay={false} />
          )}
        </CardBody>
      )}
      <CardFooter p="0" pt="10px" pb="20px">
        <Flex mt="5px" align="center" direction="column" w="100%">
          {product.type === 2 ? (
            <Heading fontSize="1.1e" px="10px" color="white">
              {audio?.release_name}.{audio?.location.split(".").pop()}
            </Heading>
          ) : (
            <Heading fontSize="1.1e" px="10px" color="white">
              {product.name}
            </Heading>
          )}
          {product.type === 2 && (
            <Heading fontSize="16px" px="10px" color="white">
              Digital Download
            </Heading>
          )}
          <Heading fontSize="22px" pt="5px" color="cyan">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: product.default_price?.currency || "USD",
            }).format(product.default_price?.unit_amount_decimal / 100)}
          </Heading>
          <Flex pt="10px" alignItems="center" gap="5">
            <Button
              fontSize="16px"
              variant="solid"
              colorScheme="purple"
              onClick={() => navigate(`/artists/${username}?tab=store`)}
            >
              Back
            </Button>
            {product.purchased == 1 && product.type === 2 && (
              <Button
                isLoading={idOfLoadingButton === 1}
                fontSize="16px"
                variant="solid"
                colorScheme="purple"
                onClick={async () =>
                  await handleDownloadPurchase(product.id, 1)
                }
              >
                Download
              </Button>
            )}

            {(product.purchased != 1 || product.type === 5) && (
              <Button
                isLoading={isBuying}
                fontSize="16px"
                variant="solid"
                colorScheme="purple"
                onClick={() => handleBuyProduct(product.id)}
              >
                Buy
              </Button>
            )}
          </Flex>
        </Flex>
      </CardFooter>
    </Card>
  );
}
