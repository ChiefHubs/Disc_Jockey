import {
  Flex,
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

export default function LoginPrompt() {
  const [modalVisible, setModalVisible] = useState(false);
  const isDisplayedModal = useRef(false);
  const [, setCookie] = useCookies(["redirect_page", "dj_page"]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100 && !isDisplayedModal?.current) {
        setModalVisible(true);
        isDisplayedModal.current = true;
      }
    };

    // window.addEventListener("scroll", toggleVisibility);

    setTimeout(() => {
      if (!isDisplayedModal?.current) {
        setModalVisible(true);
        isDisplayedModal.current = true;
      }
    }, 30000);

    return () => window.removeEventListener("scroll", toggleVisibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
      <ModalOverlay />
      <ModalContent border="1px solid #fff" overflow="hidden" borderRadius="10px">
        <VStack w="100%">
          <Flex position="absolute" right="10px" top="10px">
            <FiX color="#fff" onClick={() => setModalVisible(false)} fontSize="30px" cursor="pointer" />
          </Flex>

          <VStack bg="#111" w="100%" py="15px">
            <Image w="140px" src="https://files.djfan.app/images/logo/DJFAN_HOR_WHITE.svg" />
          </VStack>
          <VStack pt="20px" pb="25px">
            <Heading fontSize="22px" borderRadius="5px" lineHeight="1em" fontWeight="600" mb="10px">
              Please sign in to view these posts
            </Heading>
            <HStack>
              <Button
                px="10px"
                fontSize="16px"
                height="34px"
                color="#111"
                bg="#fff"
                border="1px solid #111"
                lineHeight="1em"
                _hover={{ bg: "#fff" }}
                onClick={() => {
                  let href = window.location.href.toString();
                  setCookie("dj_page", href.indexOf("artist") > 0 ? href.split("/").pop()?.split("?")[0] : "", {
                    path: "/",
                    domain: ".djfan.app",
                  });
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
                          window.location.href = import.meta.env.VITE_DJFAN_SIGN_IN_URL;
                        }
                      },
                    });
                  } else {
                    window.location.href = import.meta.env.VITE_DJFAN_SIGN_IN_URL;
                  }
                }}
              >
                SIGN IN
              </Button>
              <Button
                px="10px"
                fontSize="16px"
                height="34px"
                iconSpacing="1"
                bgGradient="linear(to-r, #5c03bc, #e536ab)"
                lineHeight="1em"
                color="#fff"
                border="1px solid #5c03bc"
                _hover={{ bgGradient: "linear(to-r,#e536ab, #5c03bc)" }}
                onClick={() => {
                  let href = window.location.href.toString();
                  setCookie("dj_page", href.indexOf("artist") > 0 ? href.split("/").pop()?.split("?")[0] : "", {
                    path: "/",
                    domain: ".djfan.app",
                  });
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
                        window.location.href = import.meta.env.VITE_DJFAN_SIGN_UP_URL;
                      },
                    });
                  } else {
                    window.location.href = import.meta.env.VITE_DJFAN_SIGN_UP_URL;
                  }
                }}
              >
                SIGN UP
              </Button>
            </HStack>
            <Heading fontSize="18px" borderRadius="5px" lineHeight="1em" fontWeight="600" mt="20px">
              Why create a free account?
            </Heading>
            <List spacing={2}>
              <ListItem>
                <ListIcon as={FiCheck} color="green.500" />
                Access to free content
              </ListItem>
              <ListItem>
                <ListIcon as={FiCheck} color="green.500" />
                Regular updates from DJs
              </ListItem>
              <ListItem>
                <ListIcon as={FiCheck} color="green.500" />
                Community features
              </ListItem>
              <ListItem>
                <ListIcon as={FiCheck} color="green.500" />
                30-seconds to sign up
              </ListItem>
            </List>
          </VStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
}
