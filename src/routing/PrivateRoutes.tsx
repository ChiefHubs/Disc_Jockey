import { FunctionComponent } from "react";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import ExternalNavigate from "./ExternalNavigate";
import { useCookies } from "react-cookie";
import { getPurchaseLinkWithPurchase } from "../hooks/useProfile";
import { Spinner } from "@chakra-ui/react";

interface PrivateRoutesProps {}

const PrivateRoutes: FunctionComponent<PrivateRoutesProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user, isLoading } = useUser();
  const [cookies, setCookie, removeCookie] = useCookies([
    "redirect_page",
    "dj_page",
    "user_id",
    "user_type",
    "signup",
    "signin",
    "purchase",
  ]);
  const currentPath = location.pathname;

  const handlePurchase = async (purchase: any) => {
    try {
      const purchaseLink = await getPurchaseLinkWithPurchase(purchase);
      if (purchaseLink) {
        window.open(purchaseLink, "_self");
      } else {
        window.open("/feed", "_self");
      }
    } catch (error) {
      window.open("/feed", "_self");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    const arrPath = currentPath.split("/");
    if (arrPath.length > 2) {
      if (arrPath[1] == "artists") {
        navigate(`/${arrPath[1]}/${arrPath[2]}`);
      }
    }
    return <ExternalNavigate to={import.meta.env.VITE_DJFAN_SIGN_IN_URL} />;
  } else {
    const purchase = cookies.purchase || false;
    if (purchase) {
      removeCookie("purchase", { path: "/", domain: ".djfan.app" });
      handlePurchase(purchase);
      return <></>;
    }
    const redirect = cookies.redirect_page || false;
    if (cookies.redirect_page) {
      removeCookie("redirect_page", { path: "/", domain: ".djfan.app" });
    }

    if (cookies.signup || cookies.signin) {
      let sign = (cookies.signup ? "up" : "") + (cookies.signin ? "in" : "");
      if (cookies.signup) {
        removeCookie("signup", { path: "/", domain: ".djfan.app" });
      }
      if (cookies.signin) {
        removeCookie("signin", { path: "/", domain: ".djfan.app" });
      }
      setCookie("user_id", user?.user_key, { path: "/", domain: ".djfan.app" });
      setCookie("user_type", user?.dj ? "dj" : "fan", {
        path: "/",
        domain: ".djfan.app",
      });
      if (window["google_tag_manager"]) {
        window.dataLayer.push({
          event: "sign_" + sign,
          user_id: user?.user_key,
          user_type: user?.dj ? "dj" : "fan",
          referer_dj: cookies.dj_page,
          eventTimeout: 1000,
          eventCallback: function (id: string) {
            if (id == "GTM-MXLNMK2") {
              navigate(
                redirect
                  ? new URL(redirect).pathname == "/"
                    ? "/feed"
                    : new URL(redirect).pathname
                  : "/feed"
              );
            }
          },
        });
      } else {
        navigate(
          redirect
            ? new URL(redirect).pathname == "/"
              ? "/feed"
              : new URL(redirect).pathname
            : "/feed"
        );
      }
    }
    return <Outlet />;
  }
};

export default PrivateRoutes;
