import Link from 'next/link'
import { useRouter } from 'next/router'
import React, {useState} from 'react'
import { toast } from 'react-hot-toast'
import { AuthActions } from '../zustand/auth.store'

const login = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const submitEmail = async () => {
        setIsLoading(true)

        AuthActions.setLoggedUserIn(true)

        setTimeout(() => {
           setIsLoading(false) 
           toast.success("login successfully")
           router.replace('/')
        }, 5000);
    }
  return (
    <div style={{backgroundImage:'url(/Element2.svg)', backgroundPosition:"center", backgroundSize:"cover", backgroundRepeat:"no-repeat"}} className='h-screen bg-gray-900 text-white px-8 py-8 flex items-center justify-center'>
        <div className='max-w-2xl'>
            <div className='flex items-center justify-center gap-3'>
                <img src='/logod.svg' className='h-8 w-auto mx-auto' alt='G' />
            </div>
            <h3 className='text-center font-semibold text-sm md:text-base text-gray-200 mt-1'>Spend crypto easily </h3>

            <div className='mt-6 w-full'>
                
                <div className="mx-auto md:w-[400px] w-[320px]">
                    <input placeholder='Email Address' className='h-12 w-full mx-auto border bg-slate-800 mt-2 rounded px-4' />
                    <input placeholder='Password' className='h-12 w-full mx-auto border bg-slate-800 mt-4 rounded px-4' />
                </div>

                <button disabled={isLoading} onClick={submitEmail} className='w-full relative h-12 disabled:bg-slate-600 rounded mt-6 bg-[#2563EB] font-bold text-white'>{isLoading ? 
                (<svg className="spinner mx-auto" viewBox="0 0 50 50">
                  <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                </svg>) :"Next"}</button>
                <h4 className='text-center font-semibold mt-3 text-sm'>By signing in you agree to the </h4>
                <h4 className='text-center font-semibold text-sm'><a className='text-blue-300'>Terms of Service</a> & <a  className='text-blue-300'>Privacy Policy</a> </h4>

                <div className='mt-8 flex items-center justify-center gap-2'>
                <h4 className='text-center font-semibold text-sm'>Don't have an account</h4>
                <Link href="/sign-up" className='text-sm text-blue-300 font-bold'>Sign Up</Link>
                </div>
            </div>

        </div>
    </div>
  )
}

export default login