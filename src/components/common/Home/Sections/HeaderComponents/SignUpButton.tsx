import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function SignUpButton() {
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
          px="10px"
          fontSize="16px"
          height="34px"
          iconSpacing="1"
          bgGradient="linear(to-r, #5c03bc, #e536ab)"
          lineHeight="1em"
          color="#fff"
          border="1px solid #5c03bc"
          _hover={{ bgGradient: "linear(to-r,#e536ab, #5c03bc)" }}
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
                event: "signup_start",
                referer_dj: href.toString().split("/").pop()?.split("?")[0],
                element: "sign-up-btn",
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
        >
          SIGN UP
        </Button>
      )}
    </>
  );
}
