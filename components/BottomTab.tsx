import React from 'react'
import { RiHome5Line } from "react-icons/ri";
import { BsWallet2 } from "react-icons/bs";
import { IoIosSwap } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useRouter } from 'next/router';
import Link from 'next/link';

const BottomTab = () => {
    const router  = useRouter()
  return (
<div className="w-full md:hidden">
  {/* <section id="bottom-navigation" class="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow"> // if shown only tablet/mobile*/}
  <section id="bottom-navigation" className="block w-full fixed inset-x-0 bottom-0 z-10 bg-gray-800 shadow">
    <div id="tabs" className="flex w-full mx-auto justify-around gap-5 py-3 px-4 items-center">
      <Link href="/" className={`${
              router.pathname === "/" ? " text-blue-300" : " text-gray-300"
            }   text-center pt-2 pb-1`}>
         <RiHome5Line size={22} />
      </Link>
      <Link href="wallet" className={`${
              router.pathname === "/wallet" ? " text-blue-300" : " text-gray-300"
            }   text-center pt-2 pb-1`}>
       <BsWallet2 size={20} />
      </Link>
      <Link href="swap" className={`${
              router.pathname === "/swap" ? " text-blue-300" : " text-gray-300"
            }   text-center pt-2 pb-1`}>
       <IoIosSwap size={20} />
      </Link>
      <Link href="profile" className={`${
              router.pathname === "/profile" ? " text-blue-300" : " text-gray-300"
            }   text-center pt-2 pb-1`}>
        <CgProfile size={20} />
      </Link>
    </div>
  </section>
</div>

  )
}

export default BottomTab