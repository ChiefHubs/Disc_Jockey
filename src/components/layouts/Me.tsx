import { FunctionComponent, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { Box } from "@chakra-ui/react";
import ProfileHeader from "../common/profile/ProfileHeader";
import ProfileMenu from "../common/profile/ProfileMenu";
import useCurrentPath from "../../hooks/utils/useCurrentPath";
import ProfilePosts from "../common/profile/ProfilePosts";
import { SvgIcon } from "../common/SvgIcon";
import { useParams } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";

interface MeLayoutProps {}

const Me: FunctionComponent<MeLayoutProps> = () => {
  return (
    <>
      <Box p={2} overflow="auto">
        <Outlet />
      </Box>
    </>
  );
};

export default Me;
