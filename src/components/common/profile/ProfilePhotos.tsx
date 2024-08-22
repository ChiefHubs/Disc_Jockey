import { Flex, Text, Box, CircularProgress } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { usePostsForSpecialType } from "../../../hooks/usePosts";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";
import Post from "../../posts/Post";

export default function ProfilePhotos() {
  const pageSize = 10,
    type = 4;
  const { username } = useParams<{ username: string }>();
  const {
    data: photos,
    fetchNextPage,
    hasNextPage,
  } = usePostsForSpecialType(username as string, { pageSize, type });

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <InfiniteScroll
      dataLength={(photos?.pages.length ?? 0) * pageSize}
      next={handleLoadMore}
      hasMore={hasNextPage ?? false}
      loader={
        <Box height="5rem" display="flex" justifyContent="center" p={2}>
          <CircularProgress isIndeterminate />
        </Box>
      }
      endMessage={
        <Text fontSize="lg" fontWeight={600} textAlign="center">
          All photos displayed
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
        {photos?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </React.Fragment>
        ))}
      </Flex>
    </InfiniteScroll>
  );
}
