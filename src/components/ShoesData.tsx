import React from 'react';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import Datatypes from './Datatypes';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
// import allProducts from '@/app/allproducts/querydata';

const ShoesData = async () => {
  const query = `*[_type == "product"]{
    _id,
    productName,
    category,
    price,
    inventory,
    colors,
    status,
    "imageUrl": image.asset._ref,  // Removed extra comma
    description 
  }[0..2]`;

  const data = await client.fetch(query);

  return (
    <div className='w-[94%] mb-6 mx-auto'>
      {/* 01 */}
      <div className='flex justify-between items-center'>
        <div className='ml-4 text-xl font-semibold'><p>Best of Air Max</p></div>
        <div className='flex py-2 gap-2 items-center mr-1'>
          <div className='text-sm font-semibold'><p>Shop</p></div>
          <div className='bg-gray-100 p-1 rounded-full'><Image className="" src='/images/back48.png' alt='photo' width={10} height={10} /></div>
          <div className='bg-gray-200 p-1 rounded-full'><Image className="" src='/images/more48.png' alt='photo' width={10} height={10} /></div>
        </div>
      </div>

      {/* 02 */}
      <div className='grid grid-cols-3 gap-1'>
        {data.map((product: Datatypes) => {
          // Ensure imageUrl is valid
          const imageUrl = product.imageUrl ? urlFor(product.imageUrl).url() : 'productImage';

          return (
            <Link key={product._id} href="../allproducts">
              <Image className="w-full" src={imageUrl} alt="productImage" width={500} height={500} />
              <div className='text-xs mt-1 sm:ml-1 md:text-sm font-semibold'>
                <div className='flex flex-col'>
                  <p>{product.productName}</p>
                  <p>{product.price}</p>
                </div>
                <p className='text-gray-500'>{product.category}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ShoesData;


