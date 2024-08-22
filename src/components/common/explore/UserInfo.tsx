import {
  HStack,
  Heading,
  StackProps,
  Text,
  VStack
} from "@chakra-ui/react";
import * as React from "react";

interface UserInfoProps extends StackProps {
  name: string;
}

export const UserInfo = (props: UserInfoProps) => {
  const { name, ...stackProps } = props;
  return (
    <VStack spacing="1" flex="1" {...stackProps} pb="15px">
      <HStack>
        <Heading textAlign="center" size="md" color="white" zIndex="1">{name}</Heading>
      </HStack>
    </VStack>
  );
};
