import { Avatar, AvatarGroup, Flex, Box, Text, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const avatars = [
  {
    name: "Richy Ahmed",
    src: "https://files.djfan.app/cache/706eec1f-ea13-41e4-a3f7-fd4dbc98ced2.webp",
  },
  {
    name: "Exoticdj",
    src: "https://files.djfan.app/cache/cfd61f22-662d-4d80-bfca-694b10ef6c89.webp",
  },
  {
    name: "Gretsenia Martins",
    src: "https://files.djfan.app/cache/175d23ef-6b48-4629-873a-ccbcec60b1e7.webp",
  },
  /*
  {
    name: "Vitrie Vitoli",
    src: "https://files.djfan.app/",
  },
  */
  {
    name: "Lord See Chan",
    src: "https://files.djfan.app/cache/c7ec77d0-abff-4038-bb92-28a2e21fd88d.webp",
  },
  {
    name: "Lee Spence",
    src: "https://files.djfan.app/cache/8e6daa7d-c832-4c73-bd9d-9ea38a7fb873.webp",
  },
  // Add as many avatars as you need
  ...new Array(19).fill({ name: "placeholder", src: "placeholder" }),
];

export default function Avatars() {
  const navigate = useNavigate();
  return (
    <Flex flexDirection="column" align={{ base: "center", md: "center" }}>
      <HStack position={"relative"} px="25px">
        <Box
          position={"absolute"}
          borderRadius="10px"
          p="0"
          zIndex={"1"}
          right={"5px"}
          top={"-2px"}
          transform={"rotate(30deg)"}
          background="-webkit-linear-gradient(90deg, hsla(152, 100%, 50%, 1) 0%, hsla(186, 100%, 69%, 1) 100%);"
        >
          <Text
            px="5px"
            py="2px"
            fontStyle="italic"
            fontWeight="700"
            color="black"
            fontSize={{ base: "12px" }}
          >
            NEW DJ'S
          </Text>
        </Box>
        <AvatarGroup size="lg" max={5} className="avatar-excess">
          {avatars.map((avt) => {
            const { name, src, path = "/" } = avt;
            return (
              <Avatar
                size="lg"
                border="2px solid #69F2EB !important"
                name={name}
                src={src}
                key={name}
                cursor="pointer"
                onClick={() => {
                  navigate(path);
                }}
              />
            );
          })}
        </AvatarGroup>
      </HStack>
    </Flex>
  );
}
