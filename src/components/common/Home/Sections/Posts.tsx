import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { FeedType, useFeeds } from "../../../../hooks/useFeeds";
import Post from "../../../posts/Post";

export default function Posts() {
  const pageSize = 5;
  const { data: feeds, refetch } = useFeeds({
    pageSize,
    select: FeedType.Home,
  });

  return (
    <Box w="100%" justifyContent="center" pb="50px">
      <Center bg="white" py="30px">
        <Flex
          flexDir="column"
          w={{ base: "90%", md: "450px" }}
          align="center"
          gap="30px"
        >
          <Heading fontSize={{ base: "24px", sm: "28px" }}>
            Latest Featured Posts
          </Heading>

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
        </Flex>
      </Center>
    </Box>
  );
}
