import React, { useEffect } from 'react'
import {FiSend} from "react-icons/fi"
import {AiOutlineInfoCircle, AiOutlineQrcode} from "react-icons/ai"
import Link from 'next/link'
import Sidebar from '../components/Sidebar'
import BottomTab from '../components/BottomTab'

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
      <BottomTab />
      <div className='overflow-y-auto h-full w-full'>
        <div className='w-full py-8 px-4 md:px-12 md:py-12'>
            <h4 className='text-sm md:text-base font-semibold'>POLYGON MAINNET</h4>
            <div className='flex gap-3 mt-2 items-center'>
            <h2 className='font-bold text-2xl mt-0 md:text-4xl'>$0.00</h2>
            <AiOutlineInfoCircle/>
            </div>

            <div className='mt-8 flex items-center gap-3'>
                <button style={{padding:"10px 20px", width:"120px"}} className='bg-slate-800 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg'><AiOutlineQrcode/> Receive</button>

                <button style={{padding:"10px 20px",width:"120px"}} className='bg-slate-800 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg'><FiSend/> send</button>
            </div>
            
            
        </div>

      </div>
    </div>
  )
}

export default wallet