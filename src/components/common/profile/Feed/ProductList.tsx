import { Box, CircularProgress, Flex, Text } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import ProductCardDownload from "./ProductCardDownload";
import ProductCardAudio from "./ProductCardAudio";
import ProductCardPodcast from "./ProductCardPodcast";
import InfiniteScroll from "react-infinite-scroll-component";
import { useProducts, useProfile } from "../../../../hooks/useProfile";
import { useParams } from "react-router-dom";
import React from "react";
import {
  IConnectedUser,
  useUserConnectionCheck,
} from "../../../../hooks/useUser";

type ProfileProductsProps = {
  productType: number[];
};

const ProductList = ({ productType }: ProfileProductsProps) => {
  const pageSize = 10;
  const { username } = useParams<{ username: string }>();
  const { data: profile } = useProfile(username as string);
  const {
    data: products,
    fetchNextPage,
    hasNextPage,
  } = useProducts(profile?.profile_url || "", {
    pageSize,
    productType: productType.join(","),
  });
  const { data: connectedUsers } = useUserConnectionCheck();

  const djConnection = () => {
    if (!connectedUsers) return false;
    let check = false;
    connectedUsers.every((dj: IConnectedUser) => {
      if (profile?.profile_url == dj["dj"][0]["profile_url"]) {
        if (parseInt(dj["dj"][0]["accesslevel_id"]) == 3) {
          check = true;
          return;
        }
      }
    });
    return check;
  };

  return (
    <InfiniteScroll
      dataLength={(products?.pages?.length ?? 0) * pageSize}
      next={fetchNextPage}
      hasMore={hasNextPage ?? false}
      loader={
        <Box height="5rem" display="flex" justifyContent="center" p={2}>
          <CircularProgress isIndeterminate />
        </Box>
      }
      endMessage={
        <Text fontSize="lg" fontWeight={600} textAlign="center">
          All products displayed
        </Text>
      }
    >
      <Flex
        w={{ base: "100%", md: "500px" }}
        maxW="100%"
        flexDirection="column"
        justifyContent="center"
        align="center"
        m="auto"
        p="0px"
        gap="20px"
        pb="50px"
      >
        {products?.pages?.map((page, index) => {
          if (!page || !Array.isArray(page)) return null;

          return (
            <React.Fragment key={index}>
              {page?.map((product) => {
                if (
                  product.type === 1 ||
                  (product.type === 5 && !djConnection())
                ) {
                  return null;
                }
                // video and file
                if (product.type == 6 || product.type == 3) {
                  return (
                    <ProductCardDownload
                      key={product.id}
                      product={product}
                      profilePicture={profile?.profile_picture}
                    />
                  );
                }
                // podcast
                if (product.type == 4) {
                  return (
                    <ProductCardPodcast
                      key={product.id}
                      product={product}
                      profilePicture={profile?.profile_picture}
                    />
                  );
                }
                // audio
                if (product.type == 2) {
                  return (
                    <ProductCardAudio
                      key={product.id}
                      product={product}
                      profilePicture={profile?.profile_picture}
                    />
                  );
                }
                // default
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    profilePicture={profile?.profile_picture}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </Flex>
    </InfiniteScroll>
  );
};

export default ProductList;
