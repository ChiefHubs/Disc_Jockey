import { ChakraProvider, Spinner } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routing/routes.tsx";
import theme from "./theme.ts";
import "./index.css";
import { Box } from "@chakra-ui/react";

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
