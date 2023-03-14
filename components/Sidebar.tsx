import React, { useState } from "react";
import { RiHome5Fill,RiHome5Line } from "react-icons/ri";
import { BsWallet2 } from "react-icons/bs";
import { IoIosSwap } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import {TbReceipt2} from "react-icons/tb"
import {MdLogout} from "react-icons/md"
import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "./Modal";
import { useAuth } from "../zustand/auth.store";

const Sidebar = () => {
  const router = useRouter();
  const [logout, setLogout] = useState(false)

  console.log(router.pathname);

  const logOut = () => {
   setLogout(true)
  }

  return (
    <div className="md:block relative shrink-0 bg-gray-900 hidden py-4 px-3 border-gray-600 w-48 md:w-72 h-full border-r">
      <Modal onClick={() => setLogout(false)} open={logout}>
            <div className="w-[300px] p-5">
              <h6 className="text-center text-gray-800 text-lg font-semibold">
                Logout
              </h6>
              <p className="mt-4 text-center  text-gray-700 font-normal">
                Are you sure you want to log out?
              </p>
              <div className="flex mt-6 items-center justify-center">
                <div className="mr-1">
                  <button
                    className="bg-white  text-blue-600 mr-2 font-semibold px-3 h-10"
                    onClick={() => setLogout(false)}
                  >
                    Cancel
                  </button>
                </div>
                <div className="ml-1">
                <button
                    className="bg-blue-600 flex items-center justify-center rounded  text-primary mr-2 font-semibold px-3 h-10"
                    onClick={() => {
                      useAuth.getState().logout();
                      setLogout(false)
                    }}
                  >
                    Log Out
                  </button>
                 
                </div>
              </div>
            </div>
          </Modal>
      <div>
        <img src="/logod.svg" className="mx-auto w-auto h-8 mt-5" />
      </div>
      <div className="block mt-6 ">
        <ul>
          <li
            className={`hover:bg-slate-600 ${
              router.pathname === "/" ? " text-blue-300" : " text-gray-300"
            }  mt-3 gap-3 w-full flex items-center px-8 active:text-blue-300 h-14 rounded-full`}
          >
            <Link href="/" className=" gap-3 w-full flex items-center">
              <RiHome5Line size={24} />
              <h4 className="font-semibol">Home</h4>
            </Link>
          </li>
          <li
            className={`hover:bg-slate-600 ${
              router.pathname === "/wallet"
                ? " text-blue-300"
                : " text-gray-300"
            }  mt-3 gap-3 w-full flex items-center px-8 active:text-blue-300 h-14 rounded-full`}
          >
            <Link href="wallet" className=" gap-3 w-full flex items-center">
              <BsWallet2 size={24} />
              <h4 className="font-semibold">wallet</h4>
            </Link>
          </li>
          <li
            className={`hover:bg-slate-600 ${
              router.pathname === "/swap" ? " text-blue-300" : " text-gray-300"
            }  mt-3 gap-3 w-full flex items-center px-8 active:text-blue-300 h-14 rounded-full`}
          >
            <Link href="swap" className=" gap-3 w-full flex items-center">
              <IoIosSwap size={24} />
              <h4 className="font-semibold  ">Swap</h4>
            </Link>
           
          </li>
          <li
            className={`hover:bg-slate-600 ${
              router.pathname === "/transactions" ? " text-blue-300" : " text-gray-300"
            }  mt-3 gap-3 w-full flex items-center px-8 active:text-blue-300 h-14 rounded-full`}
          >
            <Link href="transactions" className=" gap-3 w-full flex items-center">
              <TbReceipt2 size={24} />
              <h4 className="font-semibold  ">Transaction</h4>
            </Link>
          </li>
          <li
            className={`hover:bg-slate-600 ${
              router.pathname === "/profile"
                ? " text-blue-300"
                : " text-gray-300"
            }  mt-3 gap-3 w-full flex items-center px-8 active:text-blue-300 h-14 rounded-full`}
          >
            <Link href="profile" className=" gap-3 w-full flex items-center">
              <CgProfile size={24} />
              <h4 className="font-semibold ">Profile</h4>
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-full absolute bottom-0  px-4 py-4">
         <button onClick={() => logOut()} className="flex text-red-500 items-center gap-4 px-3">
            <MdLogout size={24} />
            Logout
         </button>
      </div>
    </div>
  );
};

export default Sidebar;
