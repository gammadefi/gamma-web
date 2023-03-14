import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useAuth } from "../zustand/auth.store";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";


function MyApp({ Component, pageProps }: AppProps) { 

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
     
      <Toaster />    
    </>
  );
}

export default MyApp;
