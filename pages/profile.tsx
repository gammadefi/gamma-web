import React, { useEffect, useState } from "react";
import { RiHome5Fill } from "react-icons/ri";
import { BsWallet2 } from "react-icons/bs";
import { IoIosSwap } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import BottomTab from "../components/BottomTab";
import { useRouter } from "next/router";
import { useAuth } from "../zustand/auth.store";
import { protectAddress, protectEmail } from "../utils";
import Loader from "../components/Loader";
import { fDate } from "../utils/formatTime";

function profile() {
  const [loading, setLoading] = useState(true)
  const profile = useAuth.getState().profile

  const router = useRouter()
  useEffect(() => {
    if (useAuth.getState().loggedIn === false) {
      router.push('/login');
      
    }
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [useAuth.getState().loggedIn]);

  return (
    <>
       {loading && useAuth.getState().loggedIn === false? <Loader /> : (
           <div className="h-screen bg-gray-900 text-white sm:flex items-center">
           <Sidebar />
           <BottomTab />
           <div className="overflow-y-auto h-full w-full  py-8 px-4 md:px-8">
             <div className="flex items-center flex-wrap gap-3 justify-between">
               <div className="flex items-center  gap-3">
                 <img
                   src="/default-profile.svg"
                   className="border-2 border-gray-300 rounded-full"
                 />
                 <div>
                   <h2 className="text-xl md:text-2xl font-semibold">@{profile?.firstName}</h2>
                   <h4 className="text-sm text-gray-300">
                     {profile?.email}
                   </h4>
                 </div>
               </div>
               <div className="flex items-center gap-2">
               <button
                 style={{ padding: "10px 20px",}}
                 className="bg-slate-800 mt-5 md:mt-0 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
               >
                 Edit Profile Photo
               </button>
               <button
                 style={{ padding: "10px 20px", }}
                 className="bg-slate-800 mt-5 md:mt-0 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
               >
                 settings
               </button>
               </div>
              
             </div>
     
             <div className="w-full rounded-lg border mt-8 border-slate-600">
               <div className="border-b border-slate-600 px-3 py-5">
                 <h3 className="text-xl font-semibold">Personal Info</h3>
               </div>
               <div className="border-b flex items-center justify-between border-slate-600 hover:bg-slate-700 px-3 md:px-5 py-5">
                 <h3 className="text-base font-semibold text-gray-300">
                   Legal name
                 </h3>
                 <h3 className="text-lg font-bold text-gray-300">{`${profile?.firstName} ${profile?.lastName}`}</h3>
               </div>
               <div className="border-b flex items-center justify-between border-slate-600 hover:bg-slate-700 px-3 md:px-5 py-5">
                 <h3 className="text-base font-semibold text-gray-300">
                   Date of birth
                 </h3>
                 <h3 className="text-lg font-bold text-gray-300">{fDate(profile?.dob)}</h3>
               </div>
               <div className=" flex items-center justify-between border-slate-600 hover:bg-slate-700 px-3 md:px-5 py-5">
                 <h3 className="text-base font-semibold text-gray-300">Address</h3>
                 <h3 className="text-lg font-medium text-gray-300"></h3>
               </div>
             </div>
     
             <div className="w-full rounded-lg border mt-8 border-slate-600">
               <div className="border-b border-slate-600 px-3 py-5">
                 <h3 className="text-xl font-semibold">Contact Info</h3>
               </div>
               <div className="border-b flex items-center justify-between border-slate-600 hover:bg-slate-700 px-3 md:px-5 py-5">
                 <h3 className="text-base font-semibold text-gray-300">
                   Display name
                 </h3>
                 <h3 className="text-lg font-bold text-gray-300">@{profile?.firstName}</h3>
               </div>
               <div className="border-b flex items-center justify-between border-slate-600 hover:bg-slate-700 px-3 md:px-5 py-5">
                 <h3 className="text-base font-semibold text-gray-300">
                  Email address
                 </h3>
                 <h3 className="text-base break-words text-right font-sembold text-gray-400">{protectEmail(profile?.email)}</h3>
               </div>
               <div className=" flex items-center justify-between border-slate-600 hover:bg-slate-700 px-3 md:px-5 py-5">
                 <h3 className="text-base font-semibold text-gray-300">Wallet Address</h3>
                 <h3 className="text-sm text-ellipsis text-right font-medium text-gray-400 break-words">{protectAddress(profile?.walletAddress)}</h3>
               </div>
             </div>
     
             <div className="w-full mb-12 rounded-lg flex flex-wrap items-center justify-between px-4 py-6 border mt-8 border-slate-600">
               <div>
                 <h3 className="text-xl font-semibold">Close account</h3>
     
                 <h5 className="text-sm text-gray-400 mt-4">
                   Closing your account can’t be undone.<br/> Please make sure your
                   account balance is $0.00 before you begin.
                 </h5>
               </div>
               <button
                 style={{ padding: "10px 20px", width: "200px" }}
                 className="bg-slate-800 mt-5 md:mt-0 text-red-500 flex items-center justify-center gap-2 border font-semibold border-slate-500 rounded-lg"
               >
                 Close account
               </button>
             </div>
           </div>
         </div>
       )}
    </>
   
   
  );
}

export default profile;
