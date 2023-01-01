import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";

function index() {
  const router = useRouter()
  const isSignedIn: any = () => {
    return true;
  };

  useEffect(() => {
    if (isSignedIn === false) {
      router.replace("/login")
    }
  }, []);

  return (
    <div className="h-screen bg-gray-900 text-white sm:flex items-center">
      <Sidebar />
      <div className="overflow-y-auto"></div>
    </div>
  );
}

export default index;
