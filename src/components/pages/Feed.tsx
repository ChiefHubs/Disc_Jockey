import {
  Box,
  CircularProgress,
  Container,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Filter from "../common/profile/Feed/Filter";
import {
  useFeeds,
  useLikePosts as getLikePost,
  FeedType,
} from "../../hooks/useFeeds";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../posts/Post";

const Feed = () => {
  const pageSize = 10;
  const [currentTab, setCurrentTab] = useState<FeedType>(FeedType.All);
  const {
    data: feeds,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useFeeds({ pageSize, select: currentTab });
  const [likePosts, setLikePosts] = useState<number[]>([]);

  const getLikePosts = async () => {
    const postIds: number[] = [];
    feeds?.pages?.forEach((page) => {
      page && page.forEach((post) => {
        postIds.push(post.id);
      });
    });
    const likePostIds = await getLikePost(postIds);
    setLikePosts(likePostIds);
  };

  useEffect(() => {
    getLikePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feeds]);

  const handleLoadMore = () => {
    fetchNextPage();
  };

  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Container p="0" py="20px" m="0" maxW="100%" id="con" px="20px">
      <Flex mb="20px" justifyContent="space-between" id="feed">
        <Text me="auto" fontSize="26px" fontWeight="700" color={textColor}>
          Feed
        </Text>
        <Filter currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </Flex>
      <InfiniteScroll
        dataLength={(feeds?.pages.length ?? 0) * pageSize}
        next={handleLoadMore}
        hasMore={hasNextPage ?? false}
        loader={
          <Box height="5rem" display="flex" justifyContent="center" p={2}>
            <CircularProgress isIndeterminate />
          </Box>
        }
      >
        <Flex
          w={{ base: "100%", md: "500px" }}
          flexDirection="column"
          justifyContent="center"
          align="center"
          mx="auto"
          p="0px"
          gap="20px"
        >
          {feeds?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page && page.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  likePostIds={likePosts}
                  handleChangeLikePostIds={setLikePosts}
                  onDeletePostCallback={refetch}
                />
              ))}
            </React.Fragment>
          ))}
        </Flex>
      </InfiniteScroll>
    </Container>
  );
};

export default Feed;
