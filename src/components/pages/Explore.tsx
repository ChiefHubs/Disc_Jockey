import {
  Button,
  SimpleGrid,
  Container,
  Heading,
  CircularProgress,
  Box,
  Flex,
} from "@chakra-ui/react";
import * as React from "react";
import { CardWithAvatar } from "../common/explore/CardWithAvatar";
import { UserInfo } from "../common/explore/UserInfo";
import { useExplores } from "../../hooks/useExplores";
import InfiniteScroll from "react-infinite-scroll-component";

const Explore = () => {
  const pageSize = 16;
  const {
    data: explores,
    fetchNextPage,
    hasNextPage,
  } = useExplores({ pageSize });

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <Container
      maxW="full"
      minH="1000px"
      bg="white"
      pb="20px"
      px={{ base: "0", sm: "8" }}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        mx={{ base: "0", sm: "-8" }}
        mb="20px"
        py="5"
        bgColor="rgb(133, 83, 244)"
      >
        <Heading color="white">Explore</Heading>
      </Flex>
      <InfiniteScroll
        dataLength={(explores?.pages.length ?? 0) * pageSize}
        next={handleLoadMore}
        hasMore={hasNextPage ?? false}
        loader={
          <Box height="5rem" display="flex" justifyContent="center" p={2}>
            <CircularProgress isIndeterminate />
          </Box>
        }
      >
        <SimpleGrid columns={{ base: 1, md: 2, "2xl": 4 }} spacing="10">
          {explores?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((user) => {
                const {
                  profile_url: url,
                  display_name: name,
                  profile_picture: bio,
                  cover_photo: src,
                } = user;
                return (
                  <CardWithAvatar
                    key={url}
                    avatarProps={{
                      src: bio,
                      name,
                      border: "2px solid #d8c6ffd4",
                    }}
                    coverBg={src}
                  >
                    <UserInfo mt="3" name={name} />
                    <Button
                      colorScheme="purple"
                      rounded="full"
                      size="sm"
                      onClick={() => {
                        {
                          document.location = "/artists/" + url;
                        }
                      }}
                    >
                      Go to Profile
                    </Button>
                  </CardWithAvatar>
                );
              })}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </Container>
  );
};

export default Explore;
