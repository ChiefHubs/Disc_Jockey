import {
  Box,
  CloseButton,
  Flex,
  Image,
  Divider,
  Button,
  ResponsiveValue,
  Heading,
  HStack,
  Avatar,
  Badge,
} from "@chakra-ui/react";

import HeaderSearch from "./HeaderSearch";
import {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import CSS from "csstype";
import {
  useMyConnections,
  useUser,
  useUserConnectionCheck,
} from "../../hooks/useUser";
import {
  FiHome,
  FiMusic,
  FiLock,
  FiShoppingBag,
  FiCalendar,
} from "react-icons/fi";
import { BiSolidCrown, BiEnvelope } from "react-icons/bi";
import { DJUsersContext } from "../../contexts/NavigationContext";

const accessLevels = ["", "Following", "GOLD", "VIP"];

const navItems = [
  {
    label: "Feed",
    icon: <FiHome />,
    linkTo: "/feed",
  },
  {
    label: "Messages",
    icon: <BiEnvelope />,
    linkTo: "/messages",
  },
  {
    label: "Explore Creators",
    icon: <FiMusic />,
    linkTo: "/explore",
  },
  {
    label: "Explore Venues",
    icon: <FiHome />,
    linkTo: "/venues",
  },
  {
    label: "Explore Events",
    icon: <FiCalendar />,
    linkTo: "/events",
  },
  {
    label: "Memberships",
    icon: <FiLock />,
    linkTo: "/me/profile?tab=subscriptions",
  },
  {
    label: "Purchases",
    icon: <FiShoppingBag />,
    linkTo: "/me/profile?tab=purchases",
  },
];

/*
if (import.meta.env.VITE_ENV == "DEV" || import.meta.env.VITE_ENV == "STAGE") {
  navItems.push({
    label: "Explore Venues",
    icon: <FiHome />,
    linkTo: "/venues",
  });
}
*/

interface SidebarProps {
  onClose: () => void;
  display?: ResponsiveValue<CSS.Property.Display>;
}

const Sidebar: FunctionComponent<SidebarProps> = ({ onClose, display }) => {
  // const { t } = useTranslation();
  // const { data: connectedUsers, refetch } = useUserConnectionCheck();
  // console.log("connectedUsers", connectedUsers);
  const { data: userData } = useUser();
  const { data: myConnections, refetch } = useMyConnections();
  const { followBtnClicked, handleClickFollowBtn } = useContext(DJUsersContext);
  const sectionOneRef = useRef<HTMLDivElement>(null);
  const [sectionOneHeight, setSectionOneHeight] = useState(0);
  const sortedUsers = useMemo(() => {
    if (!myConnections) return [];
    return myConnections
      .map((user) => {
        return user;
      })
      .filter((user) => user.user_id !== userData?.user_id); // remove self from the list
  }, [myConnections]);

  useEffect(() => {
    if (followBtnClicked) {
      refetch();
      handleClickFollowBtn(false);
    }
  }, [followBtnClicked, refetch, handleClickFollowBtn]);

  useEffect(() => {
    if (sectionOneRef.current) {
      setSectionOneHeight(sectionOneRef.current.clientHeight);
    }
  }, []);

  return (
    <Flex
      direction="column"
      transition="3s ease"
      bg="black"
      borderLeft="3px solid #58faea"
      w={{ base: "full", md: 80 }}
      pos="fixed"
      h="100%"
      display={display}
    >
      <Flex
        id="top-sidebar"
        pb="30"
        alignItems="center"
        m="0"
        justifyContent="flex-start"
        flexDirection="column"
        ref={sectionOneRef}
      >
        <Flex
          height="71px"
          w="full"
          display={{ base: "none", md: "flex" }}
          justifyContent="start"
          align="center"
          flexDirection="row"
          px="25px"
          cursor="pointer"
          onClick={() => {
            document.location = "/feed";
          }}
        >
          <Image
            src="https://files.djfan.app/images/logo/DJFAN_HOR_WHITE.svg"
            alt="DJfan Logo"
            width="130px"
          />
        </Flex>
        <Flex
          display={{ base: "flex", md: "none" }}
          justifyContent="space-between"
          alignItems="center"
          w="full"
          px="3"
          py="3"
        >
          <Image
            src="https://files.djfan.app/images/logo/DJFAN_HOR_WHITE.svg"
            alt="DJfan Logo"
            width="100px"
          />
          <CloseButton color="white" onClick={onClose} />
        </Flex>
        <Divider />

        <Flex
          flexDirection="column"
          mt="5px"
          gap="5px"
          w="full"
          justify="center"
          align="center"
        >
          <Box
            display={{ base: "flex", md: "none" }}
            px="25px"
            pt={{ base: "20px", md: "0" }}
          >
            <HeaderSearch />
          </Box>
          <Flex
            flexDirection="column"
            mt="5"
            w="full"
            gap="5px"
            justifyContent="center"
          >
            {navItems.map((nav, index) => (
              <Link key={index} to={nav.linkTo} onClick={onClose}>
                <Button
                  leftIcon={nav.icon}
                  minW="120px"
                  width="100%"
                  justifyContent="flex-start"
                  bgColor="transparent"
                  color="white"
                  fontWeight="normal"
                  _hover={{
                    bgColor: "gray",
                  }}
                  padding={"0px 10px"}
                  paddingLeft="30px"
                  fontSize="18px"
                >
                  {nav.label}
                </Button>
              </Link>
            ))}
          </Flex>
        </Flex>
      </Flex>

      <Flex
        flexDirection="column"
        gap="10px"
        px="10px"
        pl="30px"
        overflowY="auto"
        style={{
          height: `calc(100vh - ${sectionOneHeight}px)`,
        }}
      >
        <Heading color="white" fontSize="16px" fontWeight="600" mb="8px">
          Connections{" "}
          <span style={{ color: "#58faea" }}>
            ({sortedUsers && sortedUsers.length})
          </span>
        </Heading>
        <Flex direction="column" gap="10px" w="full">
          {sortedUsers &&
            sortedUsers.map((connection, index) => (
              <Link
                key={index}
                to={
                  connection.type == 1
                    ? `/artists/${connection.url}`
                    : `/venues/${connection.url}`
                }
                onClick={onClose}
              >
                <HStack gap="10px">
                  <Avatar
                    height="30px"
                    width="30px"
                    border="1px solid cyan"
                    src={connection.primary_image}
                  />
                  <Heading color="white" fontSize="14px" fontWeight="600">
                    {connection.name}
                  </Heading>
                  <Badge
                    variant="solid"
                    color="#58faea"
                    bg="unset"
                    border="1px solid #58faea"
                    fontSize="10px"
                    display="flex"
                    alignItems="center"
                    gap="2px"
                  >
                    {connection.accesslevel_id === 3 && <BiSolidCrown />}
                    {accessLevels[connection.accesslevel_id]}
                  </Badge>
                </HStack>
              </Link>
            ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
