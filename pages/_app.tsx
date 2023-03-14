import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useAuth } from "../zustand/auth.store";


function MyApp({ Component, pageProps }: AppProps) { 

  return (
    <>
      <Component {...pageProps} />
      <Toaster />    
    </>
  );
}

export default MyApp;
