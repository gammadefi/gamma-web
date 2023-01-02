import React from 'react'
import ThemePicker from '../../components/ThemePicker'

function newCard() {
  return (
    <div className='h-screen bg-gray-900 text-white px-8 py-8 flex items-center justify-center'>
        <div className='max-w-2xl'>
            
            <h3 className='font-semibold md:text-xl text-lg text-gray-200 mt-1'>Create a new card</h3>

            <div className='mt-6 w-full px-3'>

                 <div className="mx-auto md:w-[400px] sm:w-[320px] w-full">
                 <label className='font-semibold text-gray-200'>Pick a theme</label>
                 <ThemePicker onChange={(val:any) => console.log(val)
                 } />
                </div>
                <div className="mx-auto mt-5 md:w-[400px] sm:w-[320px] w-full">
                    <label className='font-semibold text-gray-200'>Name on card</label>
                    <input placeholder='eg. John Doe' className='h-12 w-full mx-auto border bg-transparent mt-2 rounded px-4' />
                </div>
            </div>

        </div>
    </div>
  )
}

export default newCard