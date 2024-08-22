import { Box, Heading, Img, Text, Flex, Link, VStack } from "@chakra-ui/react";
import ProductInfo from "./ProductInfo";
import { FaPlay } from "react-icons/fa";
import { Purchase, PurchaseProductType } from "../../../hooks/usePurchases";

type PurschaseItemProps = {
  purchaseItem: Purchase;
};

const PurschaseItem = ({ purchaseItem }: PurschaseItemProps) => {
  return (
    <Flex
      w={{ base: "80%", md: "250px" }}
      margin="0 10%"
      flexDir={"column"}
      overflow={"hidden"}
      bg="white"
      border={"2px solid #111111"}
      borderRadius={"5px"}
    >
      <Box position={"relative"}>
        {/* {purchaseItem?.product_type === PurchaseProductType.AUDIO && (
          <Box
            bg="whiteAlpha.500"
            p="10px"
            position={"absolute"}
            bottom="15px"
            right="15px"
            borderRadius={"50px"}
          >
            <FaPlay color="white" fontSize={"14px"} />
          </Box>
        )} */}
        <Img
          src={purchaseItem?.image_url ?? ""}
          h="full"
          w="100%"
          maxH="250px"
          objectFit="cover"
          border={"3px solid cyan"}
        />
      </Box>

      <VStack gap="2px" py="10px">
        <Heading color={"black"} fontSize="16px">
          {purchaseItem?.label ?? "Product Name"}
        </Heading>
        <Text color={"black"} fontSize="12px" fontWeight="500">
          {purchaseItem?.credits ?? "Author Name"}
        </Text>
        <Text color={"black"} fontSize="12px">
          {purchaseItem?.description ?? "Product Name"}
        </Text>
      </VStack>
      <ProductInfo purchaseItem={purchaseItem} />
    </Flex>
  );
};

export default PurschaseItem;
