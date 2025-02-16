
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import allProducts from './querydata'
import Datatypes from '@/components/Datatypes'
import { urlFor } from '@/sanity/lib/image'


const Products = async () => {
  const fetchedData:Datatypes[] = await allProducts();
  // console.log(fetchedData);
  return (
    <>    
      <div className='w-[94%] flex mx-auto justify-between items-center'>
<div className='ml-5 font-semibold'><p>New (500)</p></div>
<div className='flex w-56 justify-between py-2 items-center'>
  <div className='flex gap-x-2 items-center'>
    <p className='font-semibold'>Hide Filter</p>
    <Image className="h-4" src='/prdimg/filter.jpg' alt='photo' width={18} height={20} />
  </div>
  <div className='flex items-center gap-x-1'>
    <p className='font-semibold'>Sort by</p>
    <Image className="" src='/prdimg/sorticon.png' alt='photo' width={20} height={20} />
  </div>
</div>
</div>

<div className='w-[94%] mx-auto grid grid-cols-12 gap-4'>
{/* section-01 */}
<div className='hidden col-span-3 pl-5 sm:block'>
  {/* <div className='col-span-9'> */}
  <div className=' border-r-8 border-gray-500'>
    <ul className='flex flex-col gap-1 text-sm border-r-6'>
      <li>Shoes</li>
      <li>Sports Bras</li>
      <li>Taps $ Tshirts</li>
      <li>Hoodies & Sweatshirts</li>
      <li>Jackets</li>
      <li>Shorts</li>
      <li>Trausers</li>
      <li>Tracksuits</li>
      <li>Socks</li>
      <li>Accessories & Equipments</li>
    </ul>
  </div>
  <div className='mt-6'>
    <form action="" >
      <fieldset>

        <div className='mt-2 border-t-2'>
          <legend className='mb-1'>Gender</legend>
          <div className='text-sm'>
            <input className='' type="checkbox" />
            <label className='ml-2'>Man</label>
          </div>
          <div className='text-sm'>
            <input className='' type="checkbox" />
            <label className='ml-2'>Woman</label>
          </div>
          <div className='text-sm'>
            <input className='' type="checkbox" />
            <label className='ml-2'>Unisex</label>
          </div>
        </div>

        <div className='mt-2 border-t-2'>
          <legend className='mb-1'>Kids</legend>
          <div className='text-sm'>
            <input className='' type="checkbox" />
            <label className='ml-2'>Boy</label>
          </div>
          <div className='text-sm'>
            <input className='' type="checkbox" />
            <label className='ml-2'>Girl</label>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</div>

 {/* <Link href="">Addcart</Link> */}
        {/* section-2 */}
        <div className='col-span-12 sm:col-span-9'>
          <div className='grid grid-cols-3 gap-3 border-b-2 pb-10 mb-6'>
            {
              fetchedData.map((storeData:Datatypes) => {                
                return(
                          <div key={storeData._id}>
                          {/* cart-1 */}
                          <Link href={`/allproducts/${storeData._id}`}>
                            <Image className="w-full" src={storeData.imageUrl ? urlFor(storeData.imageUrl).url() : '/images/femal.png'} alt='photo' width={500} height={500} />
                          </Link>
                          <div className='text-xs  mt-1 sm:ml-1 md:text-sm  font-semibold'>
                            <div className='flex flex-col'>
                              <p>{storeData.productName}</p>
                              <p>{storeData.price}</p>
                            </div>
                            <p className='text-gray-500'>{storeData.category}</p>
                          </div>
                        </div>
                        )
               })
            }     
            
          </div>
          {/*Base  */}
          
<div className='mb-14'>
            <p className='text-3lg text-gray-800 font-semibold'>Related Categories</p>
            <div className='mt-4 flex flex-wrap gap-2'>
              <button className='border-2 px-3 py-1 rounded-full'>Best Products</button>
              <button className='border-2 px-3 py-1 rounded-full'>Best Shoes</button>
              <button className='border-2 px-3 py-1 rounded-full'>New Basketball Shoes</button>
              <button className='border-2 px-3 py-1 rounded-full'>New Football Shoes</button>
              <button className='border-2 px-3 py-1 rounded-full'>New Mens Shoes</button>
              <button className='border-2 px-3 py-1 rounded-full'>New Running Shoes</button>
              <button className='border-2 px-3 py-1 rounded-full'>Best Mens Shoes</button>
              <button className='border-2 px-3 py-1 rounded-full'>New Jordan Shoes</button>
              <button className='border-2 px-3 py-1 rounded-full'>Best Womeens Shoes</button>
              <button className='border-2 px-3 py-1 rounded-full'>Best Gym Shoes</button>
            </div>
          </div>
        </div>
      </div>
      
      
    </>
  )
}

export default Products

