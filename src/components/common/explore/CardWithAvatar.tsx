import {
  Avatar,
  AvatarProps,
  Box,
  Flex,
  FlexProps,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

interface CardWithAvatarProps extends FlexProps {
  avatarProps: AvatarProps;
  coverBg: string;
}

export const CardWithAvatar = (props: CardWithAvatarProps) => {
  const { children, coverBg, avatarProps, ...rest } = props;
  return (
    <Flex
      direction="column"
      alignItems="center"
      rounded="3xl"
      padding="8"
      position="relative"
      bg={useColorModeValue("black", "gray.700")}
      border="1px solid cyan"
      {...rest}
    >
      <Box
        position="absolute"
        inset="0"
        rounded="3xl"
        backgroundImage={coverBg}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        roundedTop="inherit"
        filter={"brightness(0.35)"}
      />
      <Avatar size="xl" {...avatarProps} />
      {children}
    </Flex>
  );
};
