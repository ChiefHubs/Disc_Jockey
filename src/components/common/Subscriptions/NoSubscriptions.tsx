import { Box, Text, Button } from "@chakra-ui/react";

export default function NoSubscriptions() {
  return (
    <Box p="10px" pb="10px">
      <Text fontSize="16px" pb="15px">
        <i>You don't have any subscriptions yet</i>
      </Text>
      <Button as="a" href="/explore">
        Explore DJs
      </Button>
    </Box>
  );
}