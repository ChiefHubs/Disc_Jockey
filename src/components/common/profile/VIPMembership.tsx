import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Flex,
  List,
  ListIcon,
  ListItem,
  Text,
  CardFooter,
  Heading,
  useToast,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaCheckCircle, FaArrowRight, FaCheck } from "react-icons/fa";
import { ISubscription, getPurchaseLink, upgradeSubscription } from "../../../hooks/useProfile";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import { BiSolidLockOpen } from "react-icons/bi";
import { useCookies } from "react-cookie";
import CreateFreeAccount from "../Buttons/CreateFreeAccount";

type Props = {
  showAll?: boolean;
  isUpgrading?: boolean;
  subscription?: ISubscription;
  memberOf?: string;
  urlLocation?: string;
};

export default function VIPMembership({ showAll = true, isUpgrading = false, subscription, memberOf = "", urlLocation = "" }: Props) {
  const [showFullContentInit, setShowFullContentInit] = useState(showAll);
  const [showFullContent, setShowFullContent] = useState(showAll);
  const { data: user } = useUser();
  const isUserLoggedIn = !!user?.user_id;
  const [isHovered, setIsHovered] = useState(false);
  const { username } = useParams<{ username: string }>();
  const [isPurchaseAvailable, setIsPurchaseAvailable] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["redirect_page"]);
  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const handleClickPurchase = async () => {
    const purchaseLink = await getPurchaseLink((username as string) || (memberOf as string), "vip", urlLocation);
    if (purchaseLink) {
      window.open(purchaseLink, "_self");
    } else {
      setIsPurchaseAvailable(false);
    }
  };

  const handleUpgrade = async () => {
    try {
      const resUpgrade = await upgradeSubscription((subscription?.id ?? -1).toString());
      if (resUpgrade) {
        toast({
          title: "Upgraded to VIP!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate(`/artists/${subscription?.profile_url}`);
      }
    } catch (error) {
      console.log("handleUpgrade", error);
      toast({
        title: "Upgrade failed, please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Card w={isUpgrading ? "full" : "350px"} height="100%" align="center" overflow="hidden" borderRadius="15px">
        <CardHeader pt="25px" pb="10px" m="0" w="full" justifyContent="center">
          <Text fontWeight="600" textAlign="center" fontSize={{ base: "20px", md: "24px" }} color="#111111">
            VIP Membership
          </Text>
          <Flex justifyContent="center" gap="5px" align="center">
            <Text display="flex" alignItems="center">
              <Box as="span" fontSize={{ base: "22px", md: "24px" }} fontWeight="400">
                $
              </Box>
              <Box as="span" fontSize={{ base: "28px", md: "30px" }} fontWeight="600" paddingTop="10px" paddingBottom="10px">
                10.00
              </Box>
            </Text>
            <Text fontSize={{ base: "12px", md: "12px" }} color="#999999" fontWeight="600" mb={{ base: "-12px", md: "-12px" }}>
              / MONTH
            </Text>
          </Flex>
        </CardHeader>

        {!showFullContentInit && (
          <Box style={{ paddingBottom: "12px" }}>
            <Button onClick={toggleContent}>{showFullContent ? "Show less" : "View more"}</Button>
          </Box>
        )}

        {showFullContent && (
          <CardBody display="flex" flexDirection="column" alignContent="center" p="0" pb="25px">
            <Text color="#8553f4" pb="10px" textAlign="center" fontWeight="600">
              <i>What you get?</i>
            </Text>
            <List spacing={4} w="100%">
              {items.map((item) => (
                <ListItem key={item} display="flex" flexDirection="row" alignItems="center">
                  <ListIcon as={FaCheckCircle} color="#22F07E" />
                  {item}
                </ListItem>
              ))}
            </List>
          </CardBody>
        )}

        {isUserLoggedIn && (
          <CardFooter
            borderTop="1px solid black"
            bg="#8553f4"
            w="full"
            py="20px"
            justifyContent="center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            _hover={{
              background: "#22f07e",
            }}
            cursor="pointer"
            onClick={isUpgrading ? handleUpgrade : handleClickPurchase}
          >
            <Heading
              display="flex"
              flexDirection="row"
              alignItems="center"
              color="white"
              gap="10px"
              fontSize={{ base: "20px", md: "22px" }}
            >
              {isPurchaseAvailable ? (
                <>
                  {isUpgrading ? "CONFIRM UPGRADE" : "SELECT PLAN"}
                  <Box fontSize={{ base: "14px", md: "16px" }}>
                    <Box as={isHovered ? FaCheck : FaArrowRight} />
                  </Box>
                </>
              ) : (
                <Text fontSize="16px" textTransform="uppercase">
                  Purchase unavailable right now
                </Text>
              )}
            </Heading>
          </CardFooter>
        )}

        {!isUserLoggedIn && (
          <CardFooter borderTop="1px solid black" bg="#8553f4" w="full" py="20px" justifyContent="center" cursor="pointer">
            <Heading
              display="flex"
              flexDirection="row"
              alignItems="center"
              color="white"
              gap="10px"
              fontSize={{ base: "20px", md: "22px" }}
            >
              <Box fontSize={{ base: "14px", md: "16px" }}>
                <CreateFreeAccount />
                {/* 
                <Button
                  borderRadius="5px"
                  leftIcon={<BiSolidLockOpen />}
                  color="#300a6e"
                  onClick={() => {
                    setCookie("redirect_page", window.location.href, {
                      path: "/",
                      domain: ".djfan.app",
                    });
                    window.open(
                      import.meta.env.VITE_DJFAN_SIGN_UP_URL,
                      "_self"
                    );
                  }}
                >
                  Create free account
                </Button>
                */}
              </Box>
            </Heading>
          </CardFooter>
        )}
      </Card>
    </>
  );
}

const items: string[] = [
  "Access Exclusive Content",
  "Detailed Tour Schedule",
  "Private Playlists & Setlists",
  "Early Access to New Music",
  "Community Chat",
  "Purchase Tickets Early",
  "Obtain Guestlist Places",
  "Meet & Greet Invitations",
  "Obtain Backstage Passes",
  "20% Off Merch Store",
  "Submit Demos for Feedback",
  "Ticket & Merch Giveaways",
  "Behind-the-Scenes Content",
];
