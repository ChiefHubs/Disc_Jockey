import { Flex, Text, Card, Heading, Box, CircularProgress } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useVenue } from "../../../hooks/useVenues";

export default function VenueAbout() {
  const { venueurl } = useParams<{ venueurl: string }>();
  const { data: venue, error, isLoading } = useVenue(venueurl as string);

  return (
    <Flex w="100%" flexDirection="column" justifyContent="center" align="center" p="0px" gap="20px" pb="50px">
      <Card w={{ base: "100%", md: "500px" }} style={{ backgroundColor: "#000", color: "#FFF" }} p="30px" border="2px solid cyan">
        <Heading fontSize="28px" pb="15px">
          About
        </Heading>
        {error ? null : isLoading ? (
          <Box height="5rem" display="flex" justifyContent="center" p={2}>
            <CircularProgress isIndeterminate />
          </Box>
        ) : (
          <>
            <Text
              dangerouslySetInnerHTML={{
                __html: venue ? venue.blurb : "",
              }}
              lineHeight="1.5em"
            ></Text>
          </>
        )}

        {venue?.address && (
          <Box style={{ paddingTop: "18px" }}>
            <Text style={{ fontWeight: "600" }}>Addres</Text>
            <Text style={{ fontStyle: "italic" }}>{venue.address}</Text>
          </Box>
        )}
        {venue?.website && (
          <Box style={{ paddingTop: "18px" }}>
            <Text style={{ fontWeight: "600" }}>Website</Text>
            <Text style={{ fontStyle: "italic" }}>{venue.website}</Text>
          </Box>
        )}
      </Card>
    </Flex>
  );
}
