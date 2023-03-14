
import React from 'react'
import {AttentionSeeker} from "react-awesome-reveal"

const Loader2 = () => {
  return (
    <div className="modal-background fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-70 z-50">
		<div className='h-full w-full flex items-center justify-center'>
            <AttentionSeeker effect='pulse'>
                <img src='/loader.svg' className='h-12 w-full' />
            </AttentionSeeker>
       
        

         </div>
	</div>
    
  )
}

export default Loader2
