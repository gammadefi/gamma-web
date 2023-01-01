import React, { useEffect } from 'react'
import {RiHome5Fill} from "react-icons/ri"
import {BsWallet2} from "react-icons/bs"
import {IoIosSwap} from "react-icons/io"
import {CgProfile} from "react-icons/cg"
import Link from 'next/link'
import Sidebar from '../components/Sidebar'

function wallet() {

  const isSignedIn: any = () => {
    return true
    
  }

  useEffect(() => {
    if (isSignedIn === false) {
      location.replace("/login")
   }
    
  }, [])
  

  
  return (
    <div className='h-screen bg-gray-900 text-white sm:flex items-center'>
      <Sidebar />
      <div className='overflow-y-auto'>

      </div>
    </div>
  )
}

export default wallet