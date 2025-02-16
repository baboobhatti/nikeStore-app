import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const login = () => {
  return (
      <>
    <div className='w-72  mx-auto mb-44 mt-6'>
      <div className=''>
        <div className='flex justify-center items-center'><Image src='/images/nikelogo.png' alt='photo' width={80} height={80}/>
        </div>
        <div className='text-1xl font-semibold flex justify-center mx-auto items-start text-center'><p className='w-6/12 sm:w-5/12'>YOUR ACCOUNT FOR EVERYTHING NIKE</p></div>
     </div>

      <div>
      <form className='mt-4 mx-auto w-72' action="">
            <input className='block border-2 w-72 pl-2 py-1 mx-auto mb-4 rounded' type="email" placeholder='Email' />
            <input className='block border-2 w-72 pl-2 py-1 mx-auto rounded mb-3' type="password" placeholder='Password' />
            <label  className='mx-auto flex w-72 border-2 items-center text-xs gap-1'><input  className='' type="checkbox"/> Keep me signed in <Link className='ml-16' href='/#'>Forgotten password?</Link></label>
            <p className='w-64 text-sm ml-6 mt-5'>By logging in you agree to Nikes Privacy Policy and Terms of Use.</p>
            <button className='w-64 bg-black text-white mx-auto block rounded-full py-2 mt-6' type='button'>SIGN IN</button>
            <p className='w-[280] mx-auto text-sm mt-2 text-center'>Not a Member? <Link className='ml-3 underline' href="/joinus">Join US</Link></p>
        </form>
      </div>
    </div>
      </>
  )
}
export default login
