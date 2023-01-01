import React from "react";
import { RiHome5Fill } from "react-icons/ri";
import { BsWallet2 } from "react-icons/bs";
import { IoIosSwap } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  console.log(router.pathname);

  return (
    <div className="sm:block shrink-0 bg-gray-800 hidden py-4 px-3 border-gray-600 w-48 md:w-72 h-full border-r">
      <div>
        <img src="/logo-dark.svg" className="mx-auto w-10 h-10 mt-5" />
      </div>
      <div className="block mt-4 ">
        <ul>
          <li
            className={`hover:bg-slate-600 ${
              router.pathname === "/" ? " text-blue-300" : " text-gray-300"
            }  mt-3 gap-3 w-full flex items-center px-8 active:text-blue-300 h-14 rounded-full`}
          >
            <Link href="/" className=" gap-3 w-full flex items-center">
              <RiHome5Fill size={24} />
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
    </div>
  );
};

export default Sidebar;
