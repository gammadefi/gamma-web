import React, { useEffect } from 'react'
import {AiOutlineSetting} from "react-icons/ai"
import {MdOutlineSwapVert} from "react-icons/md"
import Link from 'next/link'
import Sidebar from '../components/Sidebar'

function swap() {

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
      <div className='overflow-y-auto w-full'>
        <div className='w-full justify-center flex py-8'>
            <div className='md:w-[420px] sm:w-80 w-72 border border-slate-500  px-3 rounded-lg py-3'>
                <div className='flex py-2 items-center justify-between'>
                    <h4 className='text-lg font-bold'>Swap</h4>
                    <button><AiOutlineSetting size={24} /></button>

                </div>
                <div className='bg-slate-800 rounded-lg my-3 pt-4 w-full'>
                    <div className='flex justify-between items-center px-3 py-2 border-b border-slate-600'>
                       <button>ETH</button>
                       <input defaultValue={0} className='bg-transparent w-full text-right py-3 px-3 focus:outline-none' />
                    </div>
                    <div className='flex justify-between items-center py-3 px-3'>
                        <h4 className='text-gray-500'>Balance : <span className='text-white'>{"0.00 ETH"}</span></h4>
                        <h4>~$0</h4>
                    </div>
                </div>

                <div className='h-10 w-10 bg-slate-800 mx-auto rounded-full flex items-center justify-center'>
                    <MdOutlineSwapVert size={20} className="text-gray-500" />
                </div>

                <div className='bg-slate-800 rounded-lg my-3 pt-4 w-full'>
                    <div className='flex justify-between items-center px-3 py-2 border-b border-slate-600'>
                       <button>Matic</button>
                       <input defaultValue={0} className='bg-transparent w-full text-right py-3 px-3 focus:outline-none' />
                    </div>
                    <div className='flex justify-between items-center py-3 px-3'>
                        <h4 className='text-gray-500'>Balance : <span className='text-white'>{"0.00 ETH"}</span></h4>
                        <h4>~$0</h4>
                    </div>
                </div>
                <button className='w-full h-12 rounded-lg disabled:bg-slate-600 bg-gray-200 text-gray-800'>Approve</button>

            </div>

        </div>

      </div>
    </div>
  )
}

export default swap