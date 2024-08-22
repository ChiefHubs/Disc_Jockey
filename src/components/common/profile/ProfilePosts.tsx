import { Flex, Text, Box, CircularProgress, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { usePosts } from "../../../hooks/usePosts";
import InfiniteScroll from "react-infinite-scroll-component";
import React, { useEffect, useState } from "react";
import Post from "../../posts/Post";
import { useUser } from "../../../hooks/useUser";
import { BiSolidLockOpen } from "react-icons/bi";
import { useLikePosts as getLikePost } from "../../../hooks/useFeeds";
import UnlockContent from "../Buttons/UnlockContent";

export default function ProfilePosts() {
  const pageSize = 10;
  const { data: user } = useUser();
  const isUserLoggedIn = !!user?.user_id;
  const { username } = useParams<{ username: string }>();
  const { data: posts, fetchNextPage, hasNextPage, refetch } = usePosts(username as string, { pageSize });
  const [likePosts, setLikePosts] = useState<number[]>([]);

  const getLikePosts = async () => {
    const postIds: number[] = [];
    posts?.pages?.forEach((page) => {
      page &&
        page.forEach((post) => {
          postIds.push(post.id);
        });
    });
    const likePostIds = await getLikePost(postIds);
    setLikePosts(likePostIds);
  };

  useEffect(() => {
    getLikePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  const handleLoadMore = () => {
    if (isUserLoggedIn) fetchNextPage();
  };

  return (
    <InfiniteScroll
      dataLength={(posts?.pages.length ?? 0) * pageSize}
      next={handleLoadMore}
      hasMore={hasNextPage ?? false}
      loader={
        isUserLoggedIn ? (
          <>
            <Box height="5rem" display="flex" justifyContent="center" p={2}>
              <CircularProgress isIndeterminate />
            </Box>
          </>
        ) : (
          <>
            <Box height="5rem" display="flex" justifyContent="center" p={2}>
              {/* 
              <UnlockContent />
              */}

              {/*
              <Button
                borderRadius="5px"
                leftIcon={<BiSolidLockOpen />}
                color="#300a6e"
                onClick={() => {
                  document.location = import.meta.env.VITE_DJFAN_SIGN_IN_URL;
                }}
              >
                Unlock content
              </Button>
              */}
            </Box>
          </>
        )
      }
      endMessage={
        <>
          {(posts?.pages ?? []).flat().length > 0 ? (
            <Text fontSize="lg" fontWeight={600} textAlign="center">
              All posts displayed
            </Text>
          ) : null}
        </>
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
        {posts?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => {
              return (
                <Post
                  key={post.id}
                  post={post}
                  onDeletePostCallback={refetch}
                  likePostIds={likePosts}
                  handleChangeLikePostIds={setLikePosts}
                />
              );
            })}
          </React.Fragment>
        ))}
      </Flex>
    </InfiniteScroll>
  );
}
