import { Box } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { useCookies } from "react-cookie";

export default function CreateAccount() {
  const [, setCookie] = useCookies(["redirect_page", "dj_page"]);

  return (
    <Box
      bg="white"
      borderRadius="5px"
      as="a"
      target="_self"
      fontSize="16px"
      fontWeight="800"
      color="#111111"
      transition="all 0.3s ease"
      border="2px solid black"
      px="15px"
      display="flex"
      gap="5px"
      alignItems="center"
      alignSelf={"center"}
      height="45px"
      cursor="pointer"
      boxShadow=".15rem .15rem 0 #69f2eb"
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
            element: "create-account-btn",
            user_type: "fan",
            eventTimeout: 1000,
            eventCallback: function (id: string) {
              if (id == "GTM-MXLNMK2") {
                window.open(import.meta.env.VITE_DJFAN_SIGN_UP_URL, "_self");
              }
            },
          });
        } else {
          window.open(import.meta.env.VITE_DJFAN_SIGN_UP_URL, "_self");
        }
      }}
      _hover={{
        boxShadow: `.15rem .15rem 0 #00ff87`,
        fontWeight: "800",
        border: "2px solid black",
      }}
    >
      CREATE FREE ACCOUNT{" "}
      <Box fontSize="16px">
        <FaArrowRight />
      </Box>
    </Box>
  );
}
