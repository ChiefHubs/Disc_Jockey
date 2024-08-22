import { Box, Text, Button } from "@chakra-ui/react";

export default function NoPurchases() {
  return (
    <Box p="10px" pb="10px">
      <Text fontSize="16px" pb="15px">
        <i>You haven't made any purchases yet.</i>
      </Text>
      <Button as="a" href="/explore">
        Explore DJs
      </Button>
    </Box>
  );
}