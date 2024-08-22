import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSinglePost } from "../../../hooks/usePosts";
import { useLikePosts as getLikePost } from "../../../hooks/useFeeds";
import Post from "../../posts/Post";
import { Button, Container, Flex } from "@chakra-ui/react";
import Comments from "./Comments";

const SinglePost = () => {
  const navigate = useNavigate();
  const { dj, postId } = useParams();
  const { data, isLoading } = useSinglePost(dj ?? "", postId ?? "");
  const [likePosts, setLikePosts] = useState<number[]>([]);

  const initSinglePost = async () => {
    const likePostIds = await getLikePost([Number(postId ?? "0")]);
    setLikePosts(likePostIds);
  };

  useEffect(() => {
    if (dj && postId) {
      initSinglePost();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return null;

  return (
    <Container p="0" py="20px" m="0" maxW="100%" id="con" px="20px">
      <Flex
        w={{ base: "100%", md: "500px" }}
        flexDirection="column"
        justifyContent="center"
        align="center"
        mx="auto"
        p="0px"
        gap="20px"
      >
        <Button
          fontSize="16px"
          variant="solid"
          colorScheme="purple"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <Post
          post={data}
          likePostIds={likePosts}
          handleChangeLikePostIds={setLikePosts}
          onDeletePostCallback={() => {
            window.history.back();
          }}
          customFooter={<Comments />}
        />
      </Flex>
    </Container>
  );
};

export default SinglePost;
