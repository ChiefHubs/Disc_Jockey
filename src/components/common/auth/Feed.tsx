import { Container, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { FeedType, useFeeds } from "../../../hooks/useFeeds";
import Post from "../../posts/Post";

const Feed = () => {
  const pageSize = 10;
  const { data: feeds, refetch } = useFeeds({
    pageSize,
    select: FeedType.Home,
  });

  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Container p="0" py="20px" m="0" maxW="100%" id="con" px="20px">
      <Flex mb="20px" justifyContent="space-between" id="feed">
        <Text me="auto" fontSize="26px" fontWeight="700" color={textColor}>
          Latest public featured posts
        </Text>
      </Flex>
      <Flex
        w={{ base: "100%", md: "500px" }}
        flexDirection="column"
        justifyContent="center"
        align="center"
        mx="auto"
        p="0px"
        gap="20px"
      >
        {feeds?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map(
              (post) => (
                (post.page = "home"),
                (
                  <Post
                    key={post.id}
                    post={post}
                    onDeletePostCallback={refetch}
                  />
                )
              )
            )}
          </React.Fragment>
        ))}
      </Flex>
    </Container>
  );
};

export default Feed;
