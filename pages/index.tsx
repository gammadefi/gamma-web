import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import BottomTab from "../components/BottomTab";
import {CiCreditCard1} from "react-icons/ci"
import { useAuth } from "../zustand/auth.store";

function index() {
  const router = useRouter()
  const isSignedIn: any = () => {
    return useAuth.getState().loggedIn;
  };

  useEffect(() => {
    if (isSignedIn() === false) {
      router.replace("/login")
    }
  }, []);

  return (
    <div className="h-screen bg-gray-900 text-white sm:flex items-center">
      <Sidebar />
      <BottomTab />
      <div className='overflow-y-auto h-full w-full'>
        <div className='w-full py-8 px-4 md:px-12 md:py-12'>
            <h4 className='text-sm md:text-lg font-semibold'>Hi @Emekaag</h4>
            <div className="w-full flex items-center  mt-4 justify-center">
                <div>
                  <img src="/card.png" className="h-40 w-auto mx-auto mt-8" />
                <h2 className="text-center text-lg font-bold text-gray-100">No Cards</h2>
                <h4 className="text-center text-gray-400 mt-2">Create a new virtual card to start  <br/> spending assets</h4>
                <button onClick={() => router.push("cards/new")} style={{padding:"10px 20px",}} className='bg-blue-300 flex text-slate-800 items-center justify-center gap-2 border font-bold border-slate-500 rounded-full mx-auto mt-4'><CiCreditCard1 size={20}/>New Card</button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}

export default index;
