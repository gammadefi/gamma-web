import React from 'react'
import {AttentionSeeker} from "react-awesome-reveal"

const Loader = () => {
  return (
    <div className='h-screen w-full bg-gray-900 flex items-center justify-center'>
        <AttentionSeeker effect='pulse'>
            <img src='/loader.svg' className='h-12 w-full' />
        </AttentionSeeker>
       
        

    </div>
  )
}

export default Loader