
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
        <div className='text-1xl font-semibold flex justify-center mx-auto items-start text-center'><p className='w-6/12 sm:w-5/12'>BECOME A NIKE MEMBER</p></div>
     </div>

      <div className=''>
         <form className='mt-4 mx-auto w-72' action="">
             
            <input className='block border-2 w-72 pl-4 py-1 mx-auto mb-4 rounded' type="email" placeholder='Email' />
            <input className='block border-2 w-72 pl-4 py-1 mx-auto mb-4 rounded' type="password" placeholder='Password' />
            <input className='block border-2 w-72 pl-4 py-1 mx-auto mb-4 rounded' type="email" placeholder='First Name' />
            <input className='block border-2 w-72 pl-4 py-1 mx-auto mb-4 rounded' type="password" placeholder='Last Name' />
            <input className='block border-2 w-72 pl-4 py-1 mx-auto mb-4 rounded' type="password" placeholder='DOB' />

            <select className='block border-2 w-72 pl-4 py-1 mx-auto mb-4 rounded' name="country">
            <option className='' value="">Pakistan</option>
            <option className='' value="dog">India</option>
            <option className='' value="cat">China</option>
            </select>


             <div className='w-72 mx-auto'>
            <label className='mr-7'><input type="radio" name="radio" value="male" /> Male</label>
            <label><input type="radio" name="radio" value="female" /> Female</label>
            </div>
            {/* <div className=' flex justify-between w-[280] mx-auto text-xs mt-3 items-center'>         */}
           <label className='block w-72 mx-auto my-4 '><input  className='' type="checkbox"/> Sign Up for emails to get updates</label>
            

            <p className='w-64 text-xm mx-auto mt-5'>By logging in you agree to Nikes Privacy Policy and Terms of Use.</p>
            <button className='w-64 bg-black text-white mx-auto block rounded-full py-2 mt-6' type='button'>JOIN US</button>
            <p className='w-72 mx-auto text-sm mt-2 text-center'>Already a Member? <Link className='ml-3 underline' href="/login">Sign In</Link></p>
        </form>
      </div>
    </div>
      </>
  )
}
export default login
