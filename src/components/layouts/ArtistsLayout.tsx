import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import ProfileHeader from "../common/profile/ProfileHeader";
import ProfileMenu from "../common/profile/ProfileMenu";
import ProfilePosts from "../common/profile/ProfilePosts";
import { SvgIcon } from "../common/SvgIcon";
import { useParams } from "react-router-dom";
import { getSpecialOfferPaymentLink, useProfile } from "../../hooks/useProfile";
import { useMyConnections, useUser } from "../../hooks/useUser";
import Helmet from "react-helmet";
import ProfileOffer from "../common/profile/ProfileOffer";
import FloatingVIPfooter from "../common/profile/FloatingVIPfooter";
// import LoginPrompt from "../common/profile/LoginPrompt";
// import ForceSignUpInPrompt from "../common/profile/ForceSignUpInPrompt";
// import ForceSignUpInPage from "../common/profile/ForceSignUpPage";
// import ComingSoon from "../common/ComingSoon";
import { useCookies } from "react-cookie";

export interface ArtistTab {
  id: number;
  index: number;
  name: string;
  path: string;
  icon?: React.ReactElement;
  content?: React.ReactElement | string;
  disabled?: boolean;
  tabName?: string;
  requiredAuth?: boolean;
  requiredLogin?: boolean;
}

const artistTabs: Array<ArtistTab> = [
  {
    index: 0,
    id: 1,
    name: "Posts",
    path: `/artists/:username/posts`,
    icon: <SvgIcon name="home" size="small" />,
    content: <ProfilePosts />,
    tabName: "posts",
    requiredAuth: false,
    requiredLogin: false,
  },
  {
    index: 1,
    id: 2,
    name: "Community Chat",
    path: `/artists/:username/community-chat`,
    icon: <SvgIcon name="home" size="small" />,
    tabName: "community-chat",
    requiredAuth: false,
    requiredLogin: false,
  },
  {
    index: 2,
    id: 3,
    name: "About",
    icon: <SvgIcon name="user" size="small" />,
    path: `/artists/:username/about`,
    tabName: "about",
    requiredAuth: false,
    requiredLogin: false,
  },
  {
    index: 3,
    id: 4,
    name: "Music",
    icon: <SvgIcon name="music" size="small" />,
    path: `/artists/:username/tracks`,
    tabName: "tracks",
    requiredAuth: false,
    requiredLogin: false,
  },
  {
    index: 4,
    id: 5,
    name: "Store",
    icon: <SvgIcon name="store" size="small" />,
    path: `/artists/:username/store`,
    tabName: "store",
    requiredAuth: false,
    requiredLogin: false,
  },
  {
    index: 5,
    id: 6,
    name: "Videos",
    icon: <SvgIcon name="video" size="small" />,
    path: `/artists/:username/videos`,
    tabName: "videos",
    requiredAuth: false,
    requiredLogin: false,
  },
  {
    index: 6,
    id: 7,
    name: "Events",
    icon: <SvgIcon name="calendar" size="small" />,
    path: `/artists/:username/events`,
    tabName: "events",
    requiredAuth: false,
    requiredLogin: false,
  },
  {
    index: 7,
    id: 8,
    name: "Membership",
    icon: <SvgIcon name="lock" size="small" />,
    path: `/artists/:username/membership`,
    tabName: "membership",
    requiredAuth: false,
    requiredLogin: false,
  },
];

interface ArtistsLayoutProps {}

const ArtistsLayout: FunctionComponent<ArtistsLayoutProps> = () => {
  const [cookies, setCookie] = useCookies(["dj"]);
  if (!cookies.dj) {
    setCookie("dj", window.location.href, {
      path: "/",
      domain: ".djfan.app",
      maxAge: 2600000,
    });
  }

  const { data: user, isLoading: loadingUserData } = useUser();
  const { username } = useParams<{ username: string }>();
  const { data: profile, isLoading } = useProfile(username as string);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentArtistTab, setCurrentArtistTab] = useState(0);
  const [tabs, setTabs] = useState(artistTabs);
  const isUserLoggedIn = !!user?.user_id;
  const DJName = profile?.display_name;
  const DJProfilePictureURL = profile?.profile_picture;
  const [accessLevel, setAccessLevel] = useState(0);
  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);
  const { data: myConnections, refetch } = useMyConnections();
  const [connectionDetails, setConnectionDetails] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile && myConnections) {
      const connectionDetails = myConnections.find(
        (obj) => obj.url === profile.profile_url
      );
      if (connectionDetails) {
        setConnectionDetails(connectionDetails);
        setAccessLevel(connectionDetails.accesslevel_id);
        if (connectionDetails.accesslevel_id > 1) {
          setIsAlreadySubscribed(true);
        }
      } else {
        setConnectionDetails(false);
      }
    }
  }, [profile, myConnections]);

  useEffect(() => {
    if (isLoading) return;
    if (!profile) {
      navigate("/error");
    }
  }, [profile, isLoading, navigate]);

  const isAlreadyRedirected = useRef(false);

  useEffect(() => {
    if (isUserLoggedIn) {
      const definedTabs = artistTabs.map((tab) => {
        tab.disabled = false;
        return tab;
      });
      setTabs(definedTabs);
    } else {
      const filteredTabs = tabs.filter((tab) => !tab.requiredAuth);
      for (const [key, tab] of Object.entries(filteredTabs)) {
        // if (!isUserLoggedIn && tab.id !== 2) {
        /*  
        if (!isUserLoggedIn && tab.requiredLogin) {
          tab.disabled = true;
        } else {
          tab.disabled = false;
        }
        */
      }
      setTabs(filteredTabs);
    }
  }, [isUserLoggedIn]);

  useEffect(() => {
    if (loadingUserData) return;
    const currentTab = searchParams?.get("tab");
    setCurrentArtistTab(tabs.find((t) => t.tabName === currentTab)?.index ?? 0);
    if (currentTab) {
      /*
      if (!isUserLoggedIn && !isAlreadyRedirected.current) {
        navigate(`/artists/${username}?tab=posts`);
        isAlreadyRedirected.current = true;
        return;
      }
      */
      const tab = tabs.find((t) => t.tabName === currentTab);
      if (tab) {
        onChange(tabs.indexOf(tab as ArtistTab));
        return;
      }
    } else {
      // for init state
      if (isUserLoggedIn) {
        setSearchParams({ tab: tabs[0].tabName as string });
      } else {
        // setSearchParams({ tab: tabs[2].tabName as string });
        setSearchParams({ tab: tabs[0].tabName as string });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, isUserLoggedIn, loadingUserData]);

  const onChange = (val: number) => {
    const newTab = tabs[val];
    setCurrentArtistTab(newTab.index);
    setSearchParams({ tab: newTab?.tabName as string });
  };

  const handleClickMembership = () => {
    const tab = tabs.find((t) => t.tabName === "membership");
    setCurrentArtistTab(tabs.indexOf(tab as ArtistTab));
    setSearchParams({ tab: tab?.tabName as string });
  };

  const renderArtistContent = () => {
    let metaImage = document.querySelector('meta[property="og:image"]');
    if (metaImage != null) {
      metaImage.setAttribute(
        "content",
        "" + (profile?.profile_picture && profile.profile_picture)
      );
    } else {
      metaImage = document.createElement("meta");
      metaImage["property"] = "og:image";
      metaImage["content"] =
        "" + (profile?.profile_picture && profile.profile_picture);
      const head = document.querySelector("head") || null;
      if (head != null) {
        head.insertAdjacentElement("beforeend", metaImage);
      }
    }

    const handleGetPaymentLink = async () => {
      if (!username) return;
      try {
        const res = await getSpecialOfferPaymentLink(username);
        console.log(res);
        if (res) {
          window.open(res, "_self");
        }
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <>
        <Helmet>
          <title>{`${DJName ?? ""} | DJfan`}</title>
          <meta property="og:type" content="website"></meta>
          <meta
            property="og:url"
            content={`https://djfan.app/artists/${username}`}
          ></meta>
          <meta
            property="og:title"
            content={`${DJName} | Discover exclusive DJ content only on DJfan`}
          ></meta>
          <meta
            property="og:description"
            content={`Discover more of ${DJName}. Access tracks, playlists, videos, & exclusive releases. Members also get VIP invites, pre-release tickets, discounts, community chat & more.`}
          ></meta>
          <meta property="og:image" content={`${DJProfilePictureURL}`}></meta>
          <meta property="twitter:card" content="summary_large_image"></meta>
          <meta
            property="twitter:url"
            content={`https://djfan.app/artists/${username}`}
          ></meta>
          <meta
            property="twitter:title"
            content={`${DJName} | Discover exclusive content only on DJfan`}
          ></meta>
          <meta
            property="twitter:description"
            content={`Discover more of ${DJName}. Access tracks, playlists, videos, & exclusive releases. Members also get VIP invites, pre-release tickets, discounts, community chat & more.`}
          ></meta>
          <meta
            property="twitter:image"
            content={`${DJProfilePictureURL}`}
          ></meta>
        </Helmet>
        <ProfileHeader
          profile={profile}
          onClickMembership={handleClickMembership}
          isUserLoggedIn={isUserLoggedIn}
          isComingSoon={!DJProfilePictureURL}
        />
        {isUserLoggedIn && (
          <Box
            display={{ md: "none" }}
            style={{
              display: isAlreadySubscribed ? "none" : "block",
            }}
          >
            <ProfileOffer onClickOffer={handleGetPaymentLink} />
          </Box>
        )}

        {/* 
        {isUserLoggedIn && (
          <>
            {!DJProfilePictureURL ? (
              <ComingSoon />
            ) : (
              <ProfileMenu
                menus={tabs}
                activeTab={currentArtistTab}
                onChangeActiveTab={onChange}
                isAlreadySubscribed={isAlreadySubscribed}
              />
            )}
            {isUserLoggedIn && (
              <Box p={2} overflow="auto">
                <Outlet />
              </Box>
            )}
          </>
        )}
      */}
        <ProfileMenu
          menus={tabs}
          activeTab={currentArtistTab}
          onChangeActiveTab={onChange}
          isAlreadySubscribed={isAlreadySubscribed}
        />
        <Box p={2} overflow="auto">
          <Outlet />
        </Box>

        {isUserLoggedIn && (
          <Box
            display={{ md: "none" }}
            style={{
              display: isAlreadySubscribed ? "none" : "block",
            }}
          >
            <FloatingVIPfooter onClickOffer={handleGetPaymentLink} />
          </Box>
        )}
        {/* 
        {!isUserLoggedIn && <ForceSignUpInPage />}
        */}
      </>
    );
  };

  if (isLoading || loadingUserData) return <></>;

  return <>{renderArtistContent()}</>;
};

export default ArtistsLayout;
