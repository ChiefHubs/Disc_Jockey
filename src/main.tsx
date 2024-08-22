import { ChakraProvider, Spinner } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routing/routes.tsx";
// import "./i18n.ts";
import theme from "./theme.ts";
import "./index.css";
import CookieConsent from "react-cookie-consent";
// import { Offline } from "react-detect-offline";
import { Box } from "@chakra-ui/react";

// import ReactGA from "react-ga4";
// import { CookiesProvider } from "react-cookie";
/*
<CookiesProvider defaultSetOptions={{ path: "/" }}>
</CookiesProvider>
*/

/*
ReactGA.initialize("G-BHFRV7L89R", {
  testMode: !!import.meta.env.DEV,
});
*/

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      cacheTime: 300_000,
      staleTime: 20 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Suspense fallback={<Spinner />}>
          <RouterProvider router={router} />
        </Suspense>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
    {/*
    <CookieConsent
      location="bottom"
      buttonText="I understand"
      acceptOnScroll={true}
      acceptOnScrollPercentage={50}
      customButtonWrapperAttributes={{ style: { width: "100%" } }}
      style={{ background: "#2B373B" }}
      buttonStyle={{ background: "#9F7AEA", color: "#FFF", fontSize: "14px", fontWeight: "bold", borderRadius: "10px", float: "right" }}
      expires={150}
    >
      DJFAN uses cookies to enhance the user experience.
    </CookieConsent>
    */}
    {/*
    <Offline>
      <Box
        style={{
          position: "fixed",
          bottom: "0px",
          zIndex: "999",
          backgroundColor: "#D22B2B",
          height: "50px",
          width: "100%",
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "bold",
          lineHeight: "50px",
          color: "#fff",
        }}
      >
        Connection lost
      </Box>
    </Offline>
    */}
    <Box
      style={{
        position: "fixed",
        left: "0",
        bottom: "0",
        zIndex: "9999",
        backgroundColor: "#6A0DAD",
        height: "3px",
        width: "3px",
        borderRadius: "0px 10px 0px 0px",
      }}
    ></Box>
  </React.StrictMode>
);
