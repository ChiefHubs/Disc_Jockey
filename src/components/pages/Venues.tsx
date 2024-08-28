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
import { useVenues } from "../../hooks/useVenues";
import InfiniteScroll from "react-infinite-scroll-component";

const Venues = () => {
  const pageSize = 16;
  const {
    data: explores,
    fetchNextPage,
    hasNextPage,
  } = useVenues({ pageSize });

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
        py="5px"
        bgColor="rgb(133, 83, 244)"
      >
        <Heading color="white">Venues</Heading>
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
        <SimpleGrid
          columns={{ base: 1, md: 2, "2xl": 4 }}
          spacing="10"
          margin="2px"
        >
          {explores?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((venue) => {
                const {
                  url: url,
                  name: name,
                  photo: photo,
                  logo: logo,
                } = venue;
                return (
                  <CardWithAvatar
                    margin="2px"
                    key={url}
                    avatarProps={{
                      src: logo,
                      name,
                      border: "2px solid #d8c6ffd4",
                    }}
                    coverBg={photo}
                  >
                    <UserInfo mt="3" name={name} />
                    <Button
                      colorScheme="purple"
                      rounded="full"
                      size="sm"
                      onClick={() => {
                        {
                          document.location = "/venues/" + url;
                        }
                      }}
                    >
                      Go to Venue
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

export default Venues;
