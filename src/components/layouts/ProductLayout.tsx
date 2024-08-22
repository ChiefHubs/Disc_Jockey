import { Flex } from "@chakra-ui/react";
import ProductPageCard from "../common/profile/Feed/ProductPageCard";
import { useParams, useLocation } from "react-router-dom";
import { getMessageProduct, useProductDetails } from "../../hooks/useProfile";

export default function ProductLayout() {
  const location = useLocation();
  let { productId } = useParams();
  const { dj } = useParams<{ dj: string }>();
  if (location.pathname.indexOf("buy_messages") > 0) {
    var { data: product } = getMessageProduct(dj ?? "");
  } else {
    var { data: product } = useProductDetails(productId ?? "");
  }

  if (!product) return null;

  return (
    <Flex
      w="100%"
      h="100%"
      flexDirection="column"
      align="center"
      p="0px"
      pt="40px"
      pb="50px"
      bgImage="linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%)"
    >
      <ProductPageCard product={product?.[0]} />
    </Flex>
  );
}
