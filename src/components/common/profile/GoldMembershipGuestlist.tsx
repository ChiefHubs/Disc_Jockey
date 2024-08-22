import { Box, Card, CardHeader, CardBody, Flex, List, ListIcon, ListItem, Text, CardFooter, Heading, Button } from "@chakra-ui/react";

import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaArrowRight, FaCheck } from "react-icons/fa";
import { getPurchaseLink } from "../../../hooks/useProfile";
import { useParams } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import { useCookies } from "react-cookie";

type SubscriptionDetails = {
  djname: string;
  type: string;
  level: string;
  event_id: string;
  redirect: string;
};

interface Props {
  subscriptionDetails: SubscriptionDetails;
}

export default function GoldMembership({ subscriptionDetails }: Props) {
  const [showFullContentInit, setShowFullContentInit] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [, setCookie] = useCookies(["purchase"]);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const items = [
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

  const strikeThroughItems = [
    "Meet & Greet Invitations",
    "Obtain Backstage Passes",
    "20% Off Merch Store",
    "Submit Demos for Feedback",
    "Ticket & Merch Giveaways",
    "Behind-the-Scenes Content",
  ];

  return (
    <>
      <Card w="350px" height="100%" align="center" overflow="hidden" borderRadius="15px">
        <CardHeader pt="25px" pb="10px" m="0" w="full" justifyContent="center">
          <Text fontWeight="600" textAlign="center" fontSize={{ base: "20px", md: "24px" }} color="#111111">
            Gold Membership
          </Text>
          <Flex justifyContent="center" gap="5px" align="center">
            <Text display="flex" alignItems="center">
              <Box as="span" fontSize={{ base: "22px", md: "24px" }} fontWeight="400">
                $
              </Box>
              <Box as="span" fontSize={{ base: "28px", md: "30px" }} fontWeight="600" paddingTop="10px" paddingBottom="10px">
                5.00
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
                  <ListIcon
                    as={strikeThroughItems.includes(item) ? FaTimesCircle : FaCheckCircle}
                    color={strikeThroughItems.includes(item) ? "#FF7777s" : "#22F07E"}
                  />
                  {strikeThroughItems.includes(item) ? (
                    <Box as="s" color="gray.400">
                      {item}
                    </Box>
                  ) : (
                    item
                  )}
                </ListItem>
              ))}
            </List>
          </CardBody>
        )}

        <CardFooter borderTop="1px solid black" bg="#8553f4" w="full" py="20px" justifyContent="center" cursor="pointer">
          <Heading display="flex" flexDirection="row" alignItems="center" color="white" gap="10px" fontSize={{ base: "20px", md: "22px" }}>
            <Box fontSize={{ base: "14px", md: "16px" }}>
              <Button
                flex="1"
                borderRadius="5px"
                color="#300a6e"
                fontSize="22px"
                onClick={() => {
                  let href = window.location.href.toString();
                  setCookie("purchase", JSON.stringify(subscriptionDetails), {
                    path: "/",
                    domain: ".djfan.app",
                  });
                  if (window["google_tag_manager"]) {
                    window.dataLayer.push({
                      event: "signup_start",
                      referer_dj: href.toString().split("/").pop()?.split("?")[0],
                      element: "sign_up_and_subscribe_btn",
                      user_type: "fan",
                      eventTimeout: 1000,
                      eventCallback: function (id: string) {
                        if (id == "GTM-MXLNMK2") {
                          window.open(
                            import.meta.env.VITE_ENV == "PROD"
                              ? "https://auth.djfan.app/auth/signup"
                              : "https://dev-signin.djfan.app/auth/signup",
                            "_self"
                          );
                        }
                      },
                    });
                  } else {
                    window.open(
                      import.meta.env.VITE_ENV == "PROD"
                        ? "https://auth.djfan.app/auth/signup"
                        : "https://dev-signin.djfan.app/auth/signup",
                      "_self"
                    );
                  }
                }}
              >
                Sign up & Subscribe
              </Button>
            </Box>
          </Heading>
        </CardFooter>
      </Card>
    </>
  );
}
