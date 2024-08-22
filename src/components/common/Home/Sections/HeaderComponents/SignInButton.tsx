import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function SignInButton() {
  const [cookie, setCookie] = useCookies(["redirect_page", "dj_page"]);
  const [cookieReady, setCookieReady] = useState(false);

  useEffect(() => {
    if (cookie) {
      setCookieReady(true);
    }
  }, [cookie]);

  return (
    <>
      {cookieReady && (
        <Button
          bg="white"
          borderRadius="5px"
          fontSize="15px"
          fontWeight="600"
          variant="unstyled"
          color="#111111"
          transition="all 0.3s ease"
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
                event: "signin_start",
                element: "sign-in-btn",
                user_type: "fan",
                eventTimeout: 1000,
                eventCallback: function (id: string) {
                  if (id == "GTM-MXLNMK2") {
                    window.open(import.meta.env.VITE_DJFAN_SIGN_IN_URL, "_self");
                  }
                },
              });
            } else {
              window.open(import.meta.env.VITE_DJFAN_SIGN_IN_URL, "_self");
            }
          }}
          border="2px solid black"
          px="15px"
          height="35px"
          _hover={{
            boxShadow: `.15rem .15rem 0 #69f2eb, .3rem .3rem 0 #DB62FD`,
            color: "black",
            background: "white",
            border: "2px solid black",
          }}
        >
          SIGN IN
        </Button>
      )}
    </>
  );
}
