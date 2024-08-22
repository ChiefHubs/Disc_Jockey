import { AgnosticRouteObject } from "@remix-run/router";
import { matchRoutes, useLocation } from "react-router-dom";

const useCurrentPath = (routes: Array<{ path: string }>) => {
  const location = useLocation();

  return matchRoutes(routes, location)?.find(
    (m) => m.pathname === location.pathname
  );
};

export default useCurrentPath;
