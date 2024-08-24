import {
  Flex,
  Box,
  Heading,
  Image,
  HStack,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import { useCookies } from "react-cookie";
import { FaCheckCircle, FaCheck } from "react-icons/fa";

interface propForceSignUpInPage {
  view?: string;
}

export default function ForceSignUpInPage({
  view = "artist",
}: propForceSignUpInPage) {
  const [, setCookie] = useCookies(["redirect_page", "dj_page"]);
  const items = ["Free Content", "Event & Venue Dates", "Store"];

  return (
    <Flex>
      <VStack w="100%">
        <VStack pt="20px" pb="25px">
          <Button
            px="20px"
            width="200px"
            fontSize="20px"
            height="40px"
            iconSpacing="1"
            bgGradient="linear(to-r, #5c03bc, #e536ab)"
            lineHeight="1em"
            color="#fff"
            border="1px solid #5c03bc"
            _hover={{ bgGradient: "linear(to-r,#e536ab, #5c03bc)" }}
            onClick={() => {
              let href = window.location.href.toString();
              setCookie(
                "dj_page",
                href.indexOf("artist") > 0
                  ? href.split("/").pop()?.split("?")[0]
                  : "",
                {
                  path: "/",
                  domain: ".djfan.app",
                }
              );
              setCookie("redirect_page", href, {
                path: "/",
                domain: ".djfan.app",
              });
              if (window["google_tag_manager"]) {
                window.dataLayer.push({
                  event: "signup_start",
                  referer_dj: href.toString().split("/").pop()?.split("?")[0],
                  element: "login-prompt-sign-up-btn",
                  user_type: "fan",
                  eventTimeout: 1000,
                  eventCallback: function () {
                    window.location.href =
                      import.meta.env.VITE_DJFAN_SIGN_UP_URL;
                  },
                });
              } else {
                window.location.href = import.meta.env.VITE_DJFAN_SIGN_UP_URL;
              }
            }}
          >
            SIGN UP FREE
          </Button>

          <Heading
            fontSize="1.1em"
            borderRadius="5px"
            fontWeight="600"
            style={{ padding: "12px" }}
          >
            OR
          </Heading>

          <Button
            width="200px"
            px="20px"
            fontSize="20px"
            height="40px"
            color="#111"
            bg="#fff"
            border="1px solid #111"
            lineHeight="1em"
            _hover={{ bg: "#fff" }}
            onClick={() => {
              let href = window.location.href.toString();
              setCookie(
                "dj_page",
                href.indexOf("artist") > 0
                  ? href.split("/").pop()?.split("?")[0]
                  : "",
                {
                  path: "/",
                  domain: ".djfan.app",
                }
              );
              setCookie("redirect_page", href, {
                path: "/",
                domain: ".djfan.app",
              });
              if (window["google_tag_manager"]) {
                window.dataLayer.push({
                  event: "signup_start",
                  referer_dj: href.toString().split("/").pop()?.split("?")[0],
                  element: "login-prompt-sign-in-btn",
                  eventTimeout: 1000,
                  eventCallback: function (id: string) {
                    if (id == "GTM-MXLNMK2") {
                      window.location.href =
                        import.meta.env.VITE_DJFAN_SIGN_IN_URL;
                    }
                  },
                });
              } else {
                window.location.href = import.meta.env.VITE_DJFAN_SIGN_IN_URL;
              }
            }}
          >
            LOG IN
          </Button>

          {view == "artist" && (
            <>
              <Heading
                fontSize="1.3em"
                fontWeight="400"
                style={{ paddingTop: "30px", paddingBottom: "12px" }}
              >
                Get access to my
              </Heading>
              <Flex style={{ display: "flex" }}>
                <List spacing={4} w="100%">
                  {items.map((item) => (
                    <ListItem
                      key={item}
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                    >
                      <ListIcon as={FaCheckCircle} color="#22F07E" />
                      {item}
                    </ListItem>
                  ))}
                </List>
              </Flex>
            </>
          )}
        </VStack>
      </VStack>
    </Flex>
  );
}
