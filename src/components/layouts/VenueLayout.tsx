import { useCookies } from "react-cookie";
import { SvgIcon } from "../common/SvgIcon";
import { useParams } from "react-router-dom";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useUser } from "../../hooks/useUser";
import { useVenue } from "../../hooks/useVenues";
import VenueHeader from "../common/venue/VenueHeader";
import VenueMenu from "../common/venue/VenueMenu";
import Helmet from "react-helmet";
import ForceSignUpInPage from "../common/profile/ForceSignUpPage";

export interface VenueTab {
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

const venueTabs: Array<VenueTab> = [
  {
    index: 0,
    id: 7,
    name: "Events",
    icon: <SvgIcon name="calendar" size="small" />,
    path: `/venues/:venueurl/events`,
    tabName: "events",
    requiredAuth: false,
    requiredLogin: false,
  },
  {
    index: 1,
    id: 3,
    name: "About",
    icon: <SvgIcon name="home" size="small" />,
    path: `/venues/:venueurl/about`,
    tabName: "about",
    requiredAuth: false,
    requiredLogin: false,
  },
  {
    index: 2,
    id: 8,
    name: "Membership",
    icon: <SvgIcon name="lock" size="small" />,
    path: `/venues/:venueurl/membership`,
    tabName: "membership",
    requiredAuth: false,
    requiredLogin: false,
  },

  /*  
  {
    index: 0,
    id: 1,
    name: "Posts",
    path: `/venues/:venueurl/posts`,
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
    path: `/venues/:venueurl/community-chat`,
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
    path: `/venues/:venueurl/about`,
    tabName: "about",
    requiredAuth: false,
    requiredLogin: false,
  },
  {
    index: 3,
    id: 4,
    name: "Music",
    icon: <SvgIcon name="music" size="small" />,
    path: `/venues/:venueurl/tracks`,
    tabName: "tracks",
    requiredAuth: false,
    requiredLogin: false,
  },
  {
    index: 4,
    id: 5,
    name: "Store",
    icon: <SvgIcon name="store" size="small" />,
    path: `/venues/:venueurl/store`,
    tabName: "store",
    requiredAuth: false,
    requiredLogin: false,
  },
  {
    index: 5,
    id: 6,
    name: "Videos",
    icon: <SvgIcon name="video" size="small" />,
    path: `/venues/:venueurl/videos`,
    tabName: "videos",
    requiredAuth: false,
    requiredLogin: false,
  },
  {
    index: 6,
    id: 7,
    name: "Events",
    icon: <SvgIcon name="calendar" size="small" />,
    path: `/venues/:venueurl/tour-dates`,
    tabName: "tour-dates",
    requiredAuth: false,
    requiredLogin: false,
  },
  */
];

interface VenuesLayoutProps {}

const VenuesLayout: FunctionComponent<VenuesLayoutProps> = () => {
  const { data: user, isLoading: loadingUserData } = useUser();
  const { venueurl } = useParams<{ venueurl: string }>();
  const { data: venue, isLoading } = useVenue(venueurl as string);
  const [currentVenueTab, setCurrentVenueTab] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState(venueTabs);
  const isUserLoggedIn = !!user?.user_id;

  const onChange = (val: number) => {
    const newTab = tabs[val];
    setCurrentVenueTab(newTab.index);
    setSearchParams({ tab: newTab?.tabName as string });
  };

  useEffect(() => {
    if (isLoading) return;
    if (!venue) {
      navigate("/error");
    }
  }, [venue, isLoading, navigate]);

  useEffect(() => {
    if (isUserLoggedIn) {
      const definedTabs = venueTabs.map((tab) => {
        tab.disabled = false;
        return tab;
      });
      setTabs(definedTabs);
    } else {
      const filteredTabs = tabs.filter((tab) => !tab.requiredAuth);
      setTabs(filteredTabs);
    }
  }, [isUserLoggedIn]);

  const handleClickMembership = () => {
    const tab = tabs.find((t) => t.tabName === "membership");
    setCurrentVenueTab(tabs.indexOf(tab as VenueTab));
    setSearchParams({ tab: tab?.tabName as string });
  };

  const renderVenueContent = () => {
    return (
      <>
        <Helmet>
          <title>{`${venue?.name} | DJfan`}</title>
          <meta property="og:type" content="website"></meta>
          <meta
            property="og:url"
            content={`https://djfan.app/venues/${venueurl}`}
          ></meta>
          <meta
            property="og:title"
            content={`${venue?.name} | Discover exclusive DJ content only on DJfan`}
          ></meta>
          <meta
            property="og:description"
            content={`Discover more of ${venue?.name}.`}
          ></meta>
          <meta property="og:image" content={`${venue?.logo}`}></meta>
          <meta property="twitter:card" content="summary_large_image"></meta>
          <meta
            property="twitter:url"
            content={`https://djfan.app/artists/${venueurl}`}
          ></meta>
          <meta
            property="twitter:title"
            content={`${venue?.name} | Discover exclusive content only on DJfan`}
          ></meta>
          <meta
            property="twitter:description"
            content={`Discover more of ${venue?.name}.`}
          ></meta>
          <meta property="twitter:image" content={`${venue?.logo}`}></meta>
        </Helmet>
        <VenueHeader
          venue={venue}
          onClickMembership={handleClickMembership}
          isUserLoggedIn={isUserLoggedIn}
        />
        <>
          <VenueMenu
            menus={tabs}
            activeTab={currentVenueTab}
            onChangeActiveTab={onChange}
          />
          <Box p={2} overflow="auto">
            <Outlet />
          </Box>
        </>
        {/* {!isUserLoggedIn && <ForceSignUpInPage view={"venue"} />} */}
      </>
    );
  };

  if (isLoading || loadingUserData) return <></>;

  return <>{renderVenueContent()}</>;
};

export default VenuesLayout;
