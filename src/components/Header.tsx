'use client'
import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
  <>
<div className='bg-gray-100 sm:bg-white flex justify-between px-8 pl-3 md:px-8'>

<div className=''> <Image src='/images/nikelogo.png' alt='photo' width={80} height={90}/></div>
{/* 'flex items-center ml-30' */}
<div className={`${
            isOpen ? "block" : "hidden"
          } absolute top-24 left-0 w-full sm:static sm:w-auto sm:flex sm:items-center`}>
  <ul className='bg-gray-100 text-center flex gap-3 justify-center flex-col sm:bg-white sm:flex-row sm:gap-6'>
    <li><Link href='/'>New & Featured</Link></li>
    <li><Link href='/'>Men</Link></li>
    <li><Link href='/'>Women</Link></li>
    <li><Link href='/'>Kids</Link></li>
    <li><Link href='/'>Sale</Link></li>
    <li className='text-lg'><Link href='/'>SNKRS</Link></li>
  </ul>
</div>

<div className='items-center mr-3 hidden lg:flex '>
  <input className='bg-gray-100 rounded-3xl h-10 mr-4 pl-8 border-none' type='text' placeholder='Search'/>
  <Image className='mr-4' src='/images/newheart.png' alt='photo' width={30} height={30}/>
  <Image src='/images/newbag.png' alt='photo' width={20} height={20}/>
</div>
 
<div className='flex items-center sm:hidden h-6 mt-3'>
<button
          className=" text-black focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
</div>
</div>
    </>
  )
}

export default Header
