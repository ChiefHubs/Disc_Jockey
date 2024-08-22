import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import ErrorPage from "../components/pages/ErrorPage";
import HomePage from "../components/pages/HomePage";
import ResetPassword from "../components/pages/ResetPassword";
import ChangeEmail from "../components/pages/ChangeEmail";
import MeProfilePage from "../components/pages/MeProfilePage";
import PrivateRoutes from "./PrivateRoutes";
import ArtistsLayout from "../components/layouts/ArtistsLayout";
import Me from "../components/layouts/Me";
import DJUsersPage from "../components/pages/DJUsersPage";
import DJSearchEvents from "../components/pages/DJSearchEvents";
import Settings from "../components/pages/Settings";
import Feed from "../components/pages/Feed";
import Explore from "../components/pages/Explore";
import ProductLayout from "../components/layouts/ProductLayout";
import TermsOfUse from "../components/pages/TermsOfUse";
import PrivacyPolicy from "../components/pages/PrivacyPolicy";
import Cookies from "../components/pages/Cookies";
import SinglePost from "../components/pages/SinglePost";

import React, { Suspense, useEffect } from "react";
import EventLayout from "../components/layouts/EventLayout";
import Support from "../components/pages/Support";
import Venues from "../components/pages/Venues";
import VenuesLayout from "../components/layouts/VenueLayout";
import Scanner from "../components/pages/Scanner";
import VenueEventLayout from "../components/layouts/VenueEventLayout";
import Events from "../components/pages/Events";

// eslint-disable-next-line react-refresh/only-export-components
const DMPage = React.lazy(() => import("../components/pages/DMPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "terms-of-use",
        element: <TermsOfUse />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "cookies",
        element: <Cookies />,
      },
      {
        path: "artists",
        element: <ArtistsLayout />,
        children: [
          {
            path: ":username",
            element: <HomePage />,
          },
        ],
      },
      {
        path: "artists/:username/event/:eventId",
        element: <EventLayout />,
      },
      {
        path: "venues/:venueurl",
        element: <VenuesLayout />,
        /*
        element: (
          <ConditionalRouteUserLayout>
            <VenuesLayout />
          </ConditionalRouteUserLayout>
        ),
        */
      },

      {
        path: "venues/:venueurl/event/:eventurl",
        element: <VenueEventLayout />,
      },

      {
        path: "error",
        element: <ErrorPage />,
      },
      {
        path: "support",
        element: <Support />,
      },

      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "scanner/:event_key",
            element: <Scanner />,
          },
          {
            index: true,
            element: <Navigate to="/feed" replace />,
          },
          {
            path: "feed",
            element: <Feed />,
          },
          {
            path: "explore",
            element: <Explore />,
          },
          {
            path: "venues",
            element: <Venues />,
          },
          {
            path: "events",
            element: <Events />,
          },
          {
            path: "messages",
            element: (
              <Suspense>
                <DMPage />
              </Suspense>
            ),
          },
          {
            path: "notifications",
            element: <HomePage />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "dj_users",
            element: <DJUsersPage />,
          },
          {
            path: "dj_events",
            element: <DJSearchEvents />,
          },
          {
            path: "artists/:dj/buy_messages",
            element: <ProductLayout />,
          },
          {
            path: "artists/:dj/post/:postId",
            element: <SinglePost />,
          },
          {
            path: "artists/:username/product/:productId",
            element: <ProductLayout />,
          },
          {
            path: "artists/:username/event/:eventId",
            element: <EventLayout />,
          },
          {
            path: "me",
            element: <Me />,
            children: [{ path: "profile", element: <MeProfilePage /> }],
          },
          {
            path: "me/reset_password/:hashKey",
            element: <ResetPassword />,
          },
          {
            path: "reset_password/:hashKey",
            element: <ResetPassword />,
          },
          {
            path: "change_email/:hashKey",
            element: <ChangeEmail />,
          },
          {
            path: "me/change_email/:hashKey",
            element: <ChangeEmail />,
          },
        ],
      },
    ],
  },
]);

export default router;
