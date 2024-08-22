import { FunctionComponent } from "react";
import { Box, Text } from "@chakra-ui/react";

interface TextContentProps {
  text: string;
}

const TextContent: FunctionComponent<TextContentProps> = ({ text }) => {
  return (
    <Box px={4} py={3}>
      <Text
        variant="sm"
        whiteSpace="pre-line"
        dangerouslySetInnerHTML={{ __html: text }}
      ></Text>
    </Box>
  );
};

export default TextContent;
